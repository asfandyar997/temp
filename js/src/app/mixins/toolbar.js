import _ from './../utils/utilities';
import C from './../config/constants';

export default {
    data() {
        return {
            params: {},
            prefix: _.guid()
        }
    },
    props: {
        value: Object
    },
    methods: {
        onRefresh() {
            this.$emit(C.EVENT.REFRESH);
        },
        onChange() {
            this.$nextTick(() => this.$emit(C.EVENT.INPUT, this.params));
        },
        reset() {
            this.params.filters = {...FILTERS || {}};
            this.onChange();
        },
        sync() {
            this.params = !this.value ? {} : _.deepCopy(this.value);
        }
    },
    watch: {
        /**
         * If component keep own state it has to listen changes on model (keep alive)
         */
        value() {
            this.sync();
        }
    },
    created() {
        this.sync();
    }
}
