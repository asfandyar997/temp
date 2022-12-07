/**
 * Polling mixin.
 */
export default {
    data() {
        return {
            polling$: null
        }
    },
    methods: {
        stopPolling() {
            if (this.polling$) {
                clearInterval(this.polling$);
            }
        },
        beforeStartPooling() {
            this.stopPolling()
        }
    }
}
