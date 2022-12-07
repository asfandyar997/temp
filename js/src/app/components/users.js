import C from './../config/constants';
import _ from './../utils/utilities';
import Grid from './../mixins/grid';
import Formatters from './../utils/formatters';
import Toolbar from './users/toolbar';
import Loader from './loader';
import template from './../views/users.html';
import DateTime from './../utils/date';

const DATETIME_FORMAT = DateTime.FORMATS.ukDateTime;

export default {
    mixins: [
        Grid
    ],
    components: {
        Toolbar,
        Loader
    },
    data() {
        return {
            perPage: 10,
            columns: [
                {
                    title: 'ID',
                    name: 'id',
                    sortField: 'id',
                    visible: false
                }, {
                    name: 'avatar',
                    sortField: 'avatar',
                    __slot: 'avatar'
                }, {
                    title: 'Name',
                    name: 'full_name',
                    sortField: 'full_name'
                }, {
                    title: 'E-mail',
                    name: 'email',
                    sortField: 'email'
                }, {
                    title: 'Group',
                    name: 'type',
                    sortField: 'type',
                    __slot: 'type'
                }, {
                    name: 'last_login',
                    sortField: 'last_login',
                    title: 'Last Login',
                    formatter: (value) => Formatters.dateTime(value, '--', DATETIME_FORMAT)
                }, {
                    name: 'created',
                    sortField: 'created',
                    title: 'Created Date',
                    formatter: (value) => Formatters.dateTime(value, '--', DATETIME_FORMAT)
                }, {
                    name: 'modified',
                    sortField: 'modified',
                    title: 'Modified Date',
                    formatter: (value) => Formatters.dateTime(value, 'Not modified yet', DATETIME_FORMAT)
                }, {
                    name: 'approved',
                    sortField: 'approved',
                    title: 'W2 Approved',
                    __slot: 'approved'
                }, 'active', 'actions'
            ]
        }
    },
    props: {
        user: Object,
        settings: Object
    },
    methods: {
        avatarBackground(props) {
            const path = _.empty(props.rowData.avatar) ? C.DEFAULTS.PROFILE.AVATAR_PLACEHOLDER : `${C.PATH.FILES}${props.rowData.avatar}`;
            return `background-image: url(${path})`;
        },
        delete(data) {
            return this.$server.delete(`/users/${data.uid}/delete`);
        },
        onActionClick(action, data) {
            switch (action) {
                case 'active':
                    this.$server.put(`/users/${data.uid}/active`, {
                        active: data.active
                    });
                    break;
                case 'edit':
                    this.$router.push({
                        name: 'user-edit',
                        params: {
                            uid: data.uid,
                            record: data
                        }
                    });
                    break;
                case 'delete':
                    this.$snotify.confirm(`Delete the selected user?`, data.full_name, {
                        timeout: 5000,
                        showProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        position: 'centerCenter',
                        buttons: [{
                            text: 'Cancel',
                            action: (toast) => {
                                this.$snotify.remove(toast.id);
                            }
                        }, {
                            text: 'Proceed',
                            action: (toast) => {
                                this.$snotify.remove(toast.id);
                                this.loading = true;
                                this.delete(data).then((response) => {
                                    this.loading = false;
                                    if (response.data.success) {
                                        this.$snotify.success(response.data.msg);
                                        this.refresh();
                                    } else {
                                        this.$snotify.error(response.data.msg);
                                    }
                                }).catch(error => {
                                    this.$snotify.error(error);
                                });
                            },
                            bold: false
                        }]
                    });
                    break;
            }
        }
    },
    watch: {
        '$route': function (to) {
            if (to.name === 'users') {
                if (to.query && to.query.keyword) {
                    this.params.filters.keyword = to.query.keyword;
                }
                this.onRouteChange(to);
            }
        }
    },
    created() {
        if (this.$route.query && this.$route.query.keyword) {
            this.params.filters.keyword = this.$route.query.keyword;
        }
    },
    template: template.render()
}
