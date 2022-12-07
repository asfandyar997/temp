import Grid from './../mixins/grid';
import Formatters from './../utils/formatters';
import Toolbar from './games/toolbar';
import Loader from './loader';
import template from './../views/games.html';
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
                field: 'Games.created',
                direction: 'desc'
            }],
            perPage: 10,
            columns: [
                {
                    title: 'ID',
                    name: 'id',
                    sortField: 'id',
                    visible: false
                }, {
                    title: 'Game name',
                    name: 'name',
                    sortField: 'Games.name'
                }, {
                    title: 'Price',
                    name: 'price',
                    sortField: 'price',
                    formatter: (value) => Formatters.price(value)
                }, {
                    title: 'Game type',
                    name: 'game_type.name',
                    sortField: 'GameTypes.name'
                }, {
                    title: 'Progress',
                    name: 'status',
                    sortField: 'status',
                    __slot: 'status'
                }, {
                    title: 'Value',
                    name: 'value',
                    sortField: 'value',
                    formatter: (value) => Formatters.price(value)
                }, {
                    title: 'Current Week',
                    name: 'current_round',
                    sortField: 'CurrentRound.no',
                    __slot: 'current_round'
                }, {
                    title: 'Players',
                    name: 'player_count',
                    sortField: 'player_count'
                }, {
                    title: 'Entries',
                    name: 'picks_count',
                    sortField: 'picks_count'
                }, {
                    title: 'Remaining Entries',
                    name: 'picks_active_count',
                    sortField: 'picks_active_count'
                }, {
                    name: 'created',
                    sortField: 'Games.created',
                    title: 'Created Date',
                    formatter: (value) => Formatters.dateTime(value, '--', DATETIME_FORMAT)
                }, {
                    name: 'modified',
                    sortField: 'Games.modified',
                    title: 'Modified Date',
                    formatter: (value) => Formatters.dateTime(value, 'Not modified yet', DATETIME_FORMAT)
                }, 'active', 'actions'
            ]
        }
    },
    props: {
        user: Object,
        settings: Object
    },
    methods: {
        delete(data) {
            return this.$server.delete(`/games/${data.uid}/delete`);
        },
        onActionClick(action, data) {
            switch (action) {
                case 'active':
                    this.$server.put(`/games/${data.uid}/active`, {
                        active: data.active
                    });
                    break;
                case 'edit':
                    const url = this.$router.resolve({
                        name: 'game-edit',
                        params: {
                            uid: data.uid,
                            record: data
                        }
                    });
                    window.location.assign(url.href);
                    window.location.reload();
                    break;
                case 'delete':
                    this.$snotify.confirm(`Delete the selected game?`, data.name, {
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
            if (to.name === 'games') {
                this.onRouteChange(to);
            }
        }
    },
    template: template.render()
}
