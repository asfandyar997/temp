import template from './../../views/games/fixtures.html';
import C from "../../config/constants";
import _ from "../../utils/utilities";
import DateTime from "../../utils/date";
import Fixture from "../../models/fixture";

const ModelSelect = VueSearchSelect.ModelSelect;

export default {
    mixins: [],
    components: {
        ModelSelect
    },
    data() {
        return {
            filter: {
                from: '',
                to: ''
            },
            matches: [],
            teams: [],
            match: {
                home_team_id: '',
                away_team_id: '',
                match_date: ''
            }
        }
    },
    props: {
        index: Number,
        ruid: String,
        gameTypeId: Number,
        round: Object
    },
    methods: {
        dt(date) {
            return DateTime.format(date, 'd/mm/yyyy HH:MM');
        },
        load() {
            this.$root.loading = true;
            return this.$server.get(`/rounds/${this.ruid}/view`).then(response => {
                this.$root.loading = false;
                return response.data;
            });
        },
        async onSearch() {
            const response = await this.loadMatches();
            this.matches = response.data || [];
        },
        onAdd(index) {
            const match = this.matches[index];
            if (this.round.fixtures.find((fixture) => fixture.opta_uid === match.opta_uid)) {
                this.$toast("This fixture already added", false);
                return;
            }

            this.round.fixtures.push(match);
            this.matches.splice(index, 1);
        },
        onAddAll() {
            let matches = [...this.matches];
            const left = [];
            matches.forEach((match, index) => {
                if (this.round.fixtures.find((fixture) => fixture.opta_uid === match.opta_uid)) {
                    left.push(index);
                    return;
                }
                this.round.fixtures.push(match);
            });
            matches = [];
            left.forEach((index) => {
                matches.push(this.matches[index]);
            });
            this.matches = matches;
        },
        onRemove(index) {
            this.round.fixtures.splice(index, 1);
            this.onSearch();
        },
        loadMatches() {
            this.$root.loading = true;
            const filter = {
                from: this.filter.from ? DateTime.format(this.filter.from, DateTime.FORMATS.isoDateTime) : null,
                to: this.filter.to ? DateTime.format(this.filter.to, DateTime.FORMATS.isoDateTime) : null
            };
            return this.$server.get(`/fixtures/${this.gameTypeId}/available`, {
                params: filter
            }).then(response => {
                this.$root.loading = false;
                return response.data;
            });
        },
        loadTeams() {
            this.$root.loading = true;
            return this.$server.get(`/teams/list`).then(response => {
                this.$root.loading = false;
                return response.data.records.map((record) => {
                    return {
                        text: record.name,
                        value: record.id
                    }
                });
            });
        },
        updateHeader(title = `GW${this.round.no}`, subtitle = 'Fixtures') {
            this.$bus.$emit(C.EVENT.DASHBOARD.CONTENT_HEADER, {
                title,
                subtitle
            });
        },
        onSubmitMatch() {
            if (_.empty(this.match.home_team_id) || _.empty(this.match.away_team_id) || _.empty(this.match.match_date)) {
                this.$toast('Form validation failed', false);
                return;
            }

            let match = {...Fixture, ...this.match};
            match.round_id = this.round.id;
            let home_team = this.teams.find((team) => team.value === this.match.home_team_id);
            let away_team = this.teams.find((team) => team.value === this.match.away_team_id);

            match.home_team = {
                id: home_team.value,
                name: home_team.text
            }

            match.away_team = {
                id: away_team.value,
                name: away_team.text
            }

            match.match_date = DateTime.format(match.match_date, DateTime.FORMATS.isoFullDateTime);

            this.round.fixtures.push(match);
        },
        onSave() {
            let round = {...this.round};
            round.entry_open = DateTime.format(round.entry_open, DateTime.FORMATS.isoFullDateTime);
            round.entry_close = DateTime.format(round.entry_close, DateTime.FORMATS.isoFullDateTime);
            this.$bus.$emit(C.EVENT.FIXTURES.UPDATE, round, this.index);
            this.$router.back();
        },
        onCancel() {
            this.$router.back();
        }
    },
    watch: {},
    computed: {
        no() {
            return this.round ? `GW${this.round.no}` : '...';
        },
        entryOpen() {
            return this.round ? DateTime.format(typeof this.round.entry_open === "string" ? new Date(this.round.entry_open) : this.round.entry_open, DateTime.FORMATS.ukDateTime) : '--';
        },
        entryClose() {
            return this.round ? DateTime.format(typeof this.round.entry_close === "string" ? new Date(this.round.entry_close) : this.round.entry_close, DateTime.FORMATS.ukDateTime) : '--';
        },
        statusLabel() {
            return this.round ? this.round.status.replace('_', ' ') : '';
        },
        fixtures() {
            return this.round ? this.round.fixtures : [];
        }
    },
    async created() {
        this.teams = await this.loadTeams();

        if (!this.round) {
            if (!this.ruid) {
                this.$router.back();
                return;
            }
            this.updateHeader('Loading...', '');
            const response = await this.load();
            if (!response.success) {
                this.$router.back();
                return;
            }

            const round = {...response.data};
            round.entry_open = new Date(round.entry_open);
            round.entry_close = new Date(round.entry_close);
            setTimeout(() => {
                this.round = round;
                this.updateHeader();
            }, 1e3);
        } else {
            this.updateHeader();
        }
        this.onSearch();
    },
    template: template.render()
}
