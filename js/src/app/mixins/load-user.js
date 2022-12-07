/**
 * Load user method mixin.
 */
export default {
    methods: {
        loadUser() {
            this.$root.loading = true;
            return this.$server.get(`/users/${this.uid}/view`).then(response => {
                this.$root.loading = false;
                return response.data;
            });
        }
    }
};
