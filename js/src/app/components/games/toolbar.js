import template from './../../views/games/toolbar.html';
import Toolbar from './../../mixins/toolbar';
import _ from "../../utils/utilities";
import C from "../../config/constants";

const MultiSelect = VueSearchSelect.MultiSelect;

const FILTERS = Object.freeze({
    open_date: [],
    priceFrom: '',
    priceTo: '',
    valueFrom: '',
    valueTo: '',
    playersFrom: '',
    playersTo: '',
    status: []
});

export default {
    data() {
        return {
            statuses: [
                {
                    value: C.GAME_STATUS.PENDING,
                    text: "Pending"
                }, {
                    value: C.GAME_STATUS.IN_PROGRESS,
                    text: "In Progress"
                }, {
                    value: C.GAME_STATUS.CLOSED,
                    text: "Closed"
                }
            ]
        }
    },
    mixins: [
        Toolbar
    ],
    components: {
        MultiSelect
    },
    computed: {
        open_date: {
            get() {
                return this.params.open_date;
            },
            set(values) {
                const offset = new Date().getTimezoneOffset();
                this.params.open_date = [
                    new Date(values[0].getTime() - offset * 60 * 1000),
                    new Date(values[1].getTime() - offset * 60 * 1000)
                ];
            }
        }
    },
    template: template.render(),
    methods: {
        onStatusChange(items) {
            this.params.status = items;
            this.onChange();
        },
        sync() {
            this.params = !this.value ? {} : _.deepCopy(this.value);
            this.params.open_date = this.value.open_date ? this.value.open_date.slice() : [];
            this.params.status = this.value.status ? this.value.status.slice() : [];
        },
        onNewGame() {
            const url = this.$router.resolve({
                name: 'game-add'
            });
            window.location.assign(url.href);
            window.location.reload();
        }
    }
}
