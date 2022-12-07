import _ from "../../utils/utilities";
import C from "../../config/constants";
import Model from "../../models/round";
import template from './../../views/games/round.html';

export default {
    data() {
        return {
            val: {...Model}
        }
    },
    computed: {
        statusLabel() {
            return this.val.status.replace('_', ' ');
        },
        isDisabled() {
            return this.val.status !== C.ROUND_STATUS.PENDING;
        },
        isNew() {
            return _.empty(this.val.id);
        }
    },
    mixins: [],
    components: {},
    props: {
        value: Object,
        index: Number
    },
    methods: {
        _sync() {
            this.val = !this.value ? '' : _.clone(this.value);

            if (typeof this.val.entry_open === "string") {
                this.val.entry_open = new Date(this.val.entry_open);
            }

            if (typeof this.val.entry_close === "string") {
                this.val.entry_close = new Date(this.val.entry_close);
            }
        },
        onDelete() {
            this.$bus.$emit(C.EVENT.ROUND.DELETE, this.index);
        },
        onFixtures() {
            this.$bus.$emit(C.EVENT.ROUND.FIXTURES, this.val, this.index);
        },
        onChange() {
            this.$bus.$emit(C.EVENT.FIXTURES.UPDATE, this.val, this.index);
        }
    },
    watch: {
        /**
         * If component keep own state it has to listen changes on model (keep alive)
         */
        value() {
            this._sync()
        }
    },
    /**
     * Prevent mutations
     */
    created() {
        this._sync();
    },
    template: template.render()
}
