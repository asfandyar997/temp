import template from './../../views/games/edit.html';
import _ from './../../utils/utilities';
import C from './../../config/constants';
import Form from './../../mixins/form';
import Model from './../../models/game';
import ModelRound from './../../models/round';
import Round from './round';
import DateTime from "../../utils/date";

const ModelSelect = VueSearchSelect.ModelSelect;

export default {
    components: {
        ModelSelect,
        Round
    },
    mixins: [
        Form
    ],
    data() {
        return {
            form: {...Model},
            types: [],
            seasons: [],
            statuses: [
                {
                    value: C.GAME_STATUS.PENDING,
                    text: 'Pending'
                }, {
                    value: C.GAME_STATUS.IN_PROGRESS,
                    text: 'In Progress'
                }, {
                    value: C.GAME_STATUS.CLOSED,
                    text: 'Closed'
                }
            ],
            roundNumber: 1
        }
    },
    props: {
        uid: String,
        record: Object
    },
    template: template.render(),
    computed: {
        isNew() {
            return this.$route.name === 'game-add';
        },
        addRoundButtonLabel() {
            return this.roundNumber > 1 ? 'Add weeks' : 'Add week'
        },
        prizePot() {
            const value = Number.parseFloat(this.form.value) || 0;
            return Number(value ? (value - (value * C.COSTS_PERCENT)) : 0).toFixed(2);
        },
        nextGameWeek() {
            if (this.form.current_round_id) {
                const roundIndex = this.form.rounds.findIndex((value) => value.id === this.form.current_round_id);
                if (roundIndex === -1 || !this.form.rounds[roundIndex+1]) {
                    return '--';
                }
                return `W${this.form.rounds[roundIndex+1].no}`;
            } else {
                return this.form.rounds && this.form.rounds[0] ? `W${this.form.rounds[0].no}` : '--';
            }
        },
    },
    methods: {
        onInputChange(e, type) {
            this.onInputValidate(e, type);
        },
        onSubmit() {
            const isFormValid = document.forms['game-form'].checkValidity();

            if (!isFormValid) {
                this.$toast('Form validation failed', false);
                return;
            }

            if (_.empty(this.form.game_type_id)) {
                this.$toast('Game Type is mandatory field', false);
                return;
            }

            this.form.rounds = this.form.rounds.map((item, index) => {
                if (typeof item.entry_open === "string") {
                    item.entry_open = item.entry_open.replace("T", " ").substring(0, 19);
                }

                if (item.entry_open instanceof Date) {
                    item.entry_open = new DateTime(item.entry_open).format(DateTime.FORMATS.isoFullDateTime);
                }

                if (typeof item.entry_close === "string") {
                    item.entry_close = item.entry_close.replace("T", " ").substring(0, 19);
                }

                if (item.entry_close instanceof Date) {
                    item.entry_close = new DateTime(item.entry_close).format(DateTime.FORMATS.isoFullDateTime);
                }

                return item;
            });


            if (this.form.rounds.length > 0 && this.form.rounds.some((round) => {
                return _.empty(round.entry_open) || _.empty(round.entry_close);
            })) {
                this.$toast('Entry open/close are mandatory fields', false);
                return;
            }

            this.isWorking = true;
            this.$server.post(`/games/update`, this.form).then((response) => {
                this.$toast(response.data.msg, response.data.success);
                if (response.data.success) {
                    this.$router.push({
                        name: 'games',
                        query: {
                            refresh: 1
                        }
                    })
                }
            }).catch((error) => this.$toast(error.message, false)).then(() => this.isWorking = false);
        },
        load() {
            this.$root.loading = true;
            return this.$server.get(`/games/${this.uid}/view`).then(response => {
                this.$root.loading = false;
                return response.data;
            });
        },
        loadTypesList() {
            return this.$server.get(`/game-types/list`).then(response => {
                return response.data;
            });
        },
        loadSeasonsList() {
            return this.$server.get(`/seasons/list`).then(response => {
                return response.data;
            });
        },
        onGenerateRounds() {
            for (let i = 0; i < this.roundNumber; i++) {
                let round = {...ModelRound};
                round.no = this.form.rounds.length + 1;
                this.form.rounds.push(round);
            }
        },
        onShowTeams() {
            try {
                this.$router.push({
                    name: 'game-teams',
                    params: {
                        uid: this.uid
                    }
                });
            } catch (e) {

            }
        },
        statusLabel(status) {
            return status.replace('_', ' ');
        },
        dt(date) {
            return DateTime.format(date, 'd/mm/yyyy HH:MM');
        },
        onExport() {

        },
    },
    created() {
        this.$root.loading = true;
        this.loadTypesList().then((response) => {
            this.types = response.data.map(type => {
                return {
                    text: type.name,
                    value: type.id
                }
            });
            this.loadSeasonsList().then((response) => {
                this.$root.loading = false;

                this.seasons = response.data.map(season => {
                    return {
                        text: `[${season.sid}] ${season.name}`,
                        value: season.id
                    }
                });

                if (this.record) {
                    this.form = {...this.record};
                } else if (!this.isNew) {
                    this.load().then(response => {
                        if (!response.success) {
                            this.back();
                        }
                        this.form = response.data;
                    });
                }
            });
        });

        this.$bus.$on(C.EVENT.ROUND.DELETE, (index) => {
            this.form.rounds.splice(index, 1);
        });

        this.$bus.$on(C.EVENT.FIXTURES.UPDATE, (round, index) => {
            this.form.rounds[index] = round;
        });

        this.$bus.$on(C.EVENT.ROUND.FIXTURES, (round, index) => {
            if (
                _.empty(round.entry_open) || _.empty(round.entry_close) ||
                new Date(round.entry_open) >= new Date(round.entry_close)) {
                this.$toast('Check Entry Open/Close dates', false);
                return;
            }

            this.$router.push({
                name: this.isNew ? 'game-add-fixtures' : 'game-edit-fixtures',
                params: {
                    index,
                    round,
                    gameTypeId: this.form.game_type_id,
                    ruid: round.uid
                }
            }).catch(() => {})
        });
    }
}
