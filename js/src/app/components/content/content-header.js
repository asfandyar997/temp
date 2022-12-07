import C from "../../config/constants";
import template from './../../views/content/content-header.html';

export default {
    props: {
        auto: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        subtitle: {
            type: String
        }
    },
    methods: {
        _sync(val) {
            if (!this.auto) {
                this.data = {
                    title: String(this.title).toString(),
                    subtitle: this.subtitle ? String(this.subtitle).toString() : ''
                };
                return;
            }
            if (val.meta.title) {
                this.data = {
                    title: val.meta.title,
                    subtitle: val.meta.subtitle || ''
                };
            }
        }
    },
    watch: {
        '$route'(val) {
            this._sync(val);
        }
    },
    data() {
        return {
            data: {
                title: '',
                subtitle: ''
            }
        }
    },
    created() {
        this._sync(this.$route);

        this.$bus.$on(C.EVENT.DASHBOARD.CONTENT_HEADER, (data) => {
            this.data = data;
        });
    },
    template: template.render()
}
