import C from './../config/constants';

const USER_TYPE = C.USER_TYPE;

export default {
    methods: {
        is(type) {
            if (!this.$root.$refs.Dashboard) {
                return null;
            }
            return this.$root.$refs.Dashboard.user.type === type;
        }
    },
    computed: {
        isAdmin() {
            return this.is(USER_TYPE.ADMINISTRATOR);
        },
        isRoot() {
            return this.is(USER_TYPE.ROOT);
        }
    }
}
