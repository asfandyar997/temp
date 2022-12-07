import C from './../config/constants';
import _ from './../utils/utilities';
import Grid from './../mixins/grid';
import Formatters from './../utils/formatters';
import Toolbar from './teams/toolbar';
import Loader from './loader';
import template from './../views/teams.html';
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
                    name: 'logo',
                    sortField: 'logo',
                    __slot: 'logo'
                }, {
                    title: 'Name',
                    name: 'name',
                    sortField: 'name'
                }, {
                    title: 'Opta UID',
                    name: 'opta_uid',
                    sortField: 'opta_uid'
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
                }, 'actions'
            ]
        }
    },
    props: {
        user: Object,
        settings: Object
    },
    methods: {
        logoBackground(props) {
            const path = _.empty(props.rowData.logo) ? C.DEFAULTS.COMMON.IMAGE_PLACEHOLDER : `${C.PATH.FILES}${props.rowData.logo}`;
            return `background-image: url(${path})`;
        },
        delete(data) {
            return this.$server.delete(`/teams/${data.uid}/delete`);
        },
        onActionClick(action, data) {
            switch (action) {
                case 'edit':
                    this.$router.push({
                        name: 'team-edit',
                        params: {
                            uid: data.uid,
                            record: data
                        }
                    });
                    break;
                case 'delete':
                    this.$snotify.confirm(`Delete the selected team?`, data.name, {
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
            if (to.name === 'teams') {
                this.onRouteChange(to);
            }
        }
    },
    template: template.render()
}
