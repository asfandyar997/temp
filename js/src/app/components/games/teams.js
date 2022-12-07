import template from './../../views/games/teams.html';
import _ from './../../utils/utilities';
import C from './../../config/constants';
import Modal from './../../mixins/modal';

export default {
    mixins: [
        Modal
    ],
    components: {},
    data() {
        return {
            componentMeta: Object.freeze({
                name: 'game-teams'
            }),
            records: [],
            isWorking: false
        }
    },
    props: {
        uid: String
    },
    template: template.render(),
    methods: {
        load() {
            this.isWorking = true;
            this.$root.loading = true;
            return this.$server.get(`/games/${this.uid}/teams`).then(response => {
                this.records = (response.data.records || []).map((value) => {
                    value.filter = `in-pick:${value.game_id}-${value.id}`;
                    return value;
                });
                this.$root.loading = false;
                this.isWorking = false;
                return response.data;
            });
        },
        logoUrl(file) {
            return _.empty(file) ? C.DEFAULTS.COMMON.IMAGE_PLACEHOLDER : `${C.PATH.FILES}${file}`;
        }
    },
    watch: {},
    created() {
        this.load();
    }
}
