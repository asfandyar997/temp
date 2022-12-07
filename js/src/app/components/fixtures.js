import C from './../config/constants';
import Grid from './../mixins/grid';
import Formatters from './../utils/formatters';
import Toolbar from './fixtures/toolbar';
import Loader from './loader';
import template from './../views/fixtures.html';
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
            sortOrder: [{
                field: 'Fixtures.match_date',
                direction: 'asc'
            }],
            perPage: 25,
            columns: [
                {
                    title: 'ID',
                    name: 'id',
                    sortField: 'id',
                    visible: false
                }, {
                    title: 'Home Team',
                    name: 'home_team.name',
                    sortField: 'HomeTeams.name'
                }, {
                    title: 'Away Team',
                    name: 'away_team.name',
                    sortField: 'AwayTeams.name'
                }, {
                    title: 'Results',
                    sortable: false,
                    name: 'results',
                    __slot: 'results'
                }, {
                    name: 'match_date',
                    sortField: 'Fixtures.match_date',
                    title: 'Match Date',
                    formatter: (value) => Formatters.dateTime(value, '--', DATETIME_FORMAT)
                }, {
                    name: 'state',
                    sortField: 'Fixtures.state',
                    title: 'Status',
                    formatter: (value) => {
                        switch (value) {
                            case C.FIXTURE_STATE.PREMATCH:
                                return 'Prematch';
                            case C.FIXTURE_STATE.FULLTIME:
                                return 'Fulltime';
                            case C.FIXTURE_STATE.POSTPONED:
                                return 'Postponed';
                            case C.FIXTURE_STATE.ABANDONED:
                                return 'Abandoned';
                            case C.FIXTURE_STATE.LIVE:
                                return 'Live';
                            case C.FIXTURE_STATE.CANCELLED:
                                return 'Cancelled';
                        }
                    }
                }, {
                    name: 'api_driven',
                    sortField: 'Fixtures.opta_uid',
                    title: 'API Driven',
                    __slot: 'api_driven'
                }, {
                    name: 'last_update',
                    sortField: 'Fixtures.last_update',
                    title: 'Last Update',
                    formatter: (value) => Formatters.dateTime(value, '--', DATETIME_FORMAT)
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
            return this.$server.delete(`/fixtures/${data.uid}/delete`);
        },
        onActionClick(action, data) {
            switch (action) {
                case 'edit':
                    this.$router.push({
                        name: 'fixture-edit',
                        params: {
                            uid: data.uid,
                            record: data
                        }
                    });
                    break;
                case 'delete':
                    this.$snotify.confirm(`Delete the selected fixture?`, data.name, {
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
            if (to.name === 'fixtures') {
                this.onRouteChange(to);
            }
        }
    },
    template: template.render()
}
