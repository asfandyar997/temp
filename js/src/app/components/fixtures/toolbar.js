import template from './../../views/fixtures/toolbar.html';
import Toolbar from './../../mixins/toolbar';
import _ from '../../utils/utilities';
import C from '../../config/constants';

const MultiSelect = VueSearchSelect.MultiSelect;

const FILTERS = Object.freeze({
    match_date: [],
    states: []
});

export const STATES = [
    {
        value: C.FIXTURE_STATE.PREMATCH,
        text: "Prematch"
    }, {
        value: C.FIXTURE_STATE.FULLTIME,
        text: "Fulltime"
    }, {
        value: C.FIXTURE_STATE.POSTPONED,
        text: "Postponed"
    }, {
        value: C.FIXTURE_STATE.LIVE,
        text: "Live"
    }, {
        value: C.FIXTURE_STATE.ABANDONED,
        text: "Abandoned"
    }, {
        value: C.FIXTURE_STATE.CANCELLED,
        text: "Cancelled"
    }
];

export default {
    data() {
        return {
            states: STATES
        }
    },
    mixins: [
        Toolbar
    ],
    components: {
        MultiSelect
    },
    computed: {
        match_date: {
            get() {
                return this.params.match_date;
            },
            set(values) {
                const offset = new Date().getTimezoneOffset();
                this.params.match_date = [
                    new Date(values[0].getTime() - offset * 60 * 1000),
                    new Date(values[1].getTime() - offset * 60 * 1000)
                ];
            }
        }
    },
    template: template.render(),
    methods: {
        onStateChange(items) {
            this.params.states = items;
            this.onChange();
        },
        sync() {
            this.params = !this.value ? {} : _.deepCopy(this.value);
            this.params.match_date = this.value.match_date ? this.value.match_date.slice() : [];
            this.params.states = this.value.states ? this.value.states.slice() : [];
        }
    }
}
