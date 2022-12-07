import Grid from './../mixins/grid';
import Toolbar from './seasons/toolbar';
import Loader from './loader';
import template from './../views/seasons.html';
import Formatters from "../utils/formatters";
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
            sortOrder: [{
                field: 'sid',
                direction: 'desc'
            }],
            columns: [
                {
                    title: 'ID',
                    name: 'id',
                    sortField: 'id',
                    visible: false
                }, {
                    title: 'Season Year (unique)',
                    name: 'sid',
                    sortField: 'sid',
                    __slot: 'sid'
                }, {
                    title: 'Season Name',
                    name: 'name',
                    sortField: 'name'
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
        delete(data) {
            return this.$server.delete(`/seasons/${data.id}/delete`);
        },
        onActionClick(action, data) {
            switch (action) {
                case 'edit':
                    this.$router.push({
                        name: 'seasons-edit',
                        params: {
                            id: data.id,
                            record: data
                        }
                    });
                    break;
                case 'delete':
                    this.$snotify.confirm(`Delete the selected season?`, `${data.sid} (${data.name})`, {
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
            if (to.name === 'seasons') {
                this.onRouteChange(to);
            }
        }
    },
    template: template.render()
}
