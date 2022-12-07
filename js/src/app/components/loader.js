import template from '../views/loader.html';

export default {
    props: {
        active: {
            type: Boolean,
            default: false
        },
        global: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isActive: this.active
        }
    },
    watch: {
        active(value) {
            this.isActive = value
        }
    },
    template: template.render()
}
