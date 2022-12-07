import template from './../../views/settings/edit.html';
import C from './../../config/constants';
import _ from './../../utils/utilities';
import Form from './../../mixins/form';
import Model from './../../models/setting';
import Authorization from './../../mixins/authorization';

const TYPE = C.SETTING_TYPE;

export default {
    components: {

    },
    mixins: [
        Form,
        Authorization
    ],
    data() {
        return {
            form: {...Model}
        }
    },
    props: {
        id: String,
        record: Object
    },
    template: template.render(),
    computed: {
        jsonValue: {
            get() {
                if (this.form.type !== TYPE.JSON) {
                    return {}
                }
                return JSON.parse(this.form.value);
            },
            set(val) {
                if (this.form.type !== TYPE.JSON) {
                    return;
                }
                this.form.value = JSON.stringify(val);
            }
        }
    },
    methods: {
        onInputChange(e, type) {
            this.onInputValidate(e, type);


        },
        onSubmit() {
            const formStatus = document.forms['setting-form'].checkValidity();
            let jsonStatus = true;
            if (this.form.type === TYPE.JSON) {
                try {
                    this.$refs.jsonEditor.editor.get()
                } catch (e) {
                    jsonStatus = false;
                }
            } else if (this.form.type === TYPE.HTML) {
                this.form.value = this.$refs.htmlEditor.$el.querySelector('.content').getInnerHTML();
            }

            if (!formStatus || !jsonStatus) {
                this.$toast('Form validation failed', false);
                return;
            }

            this.isWorking = true;
            this.$server.post('/settings/update', this.form).then((response) => {
                this.$toast(response.data.msg, response.data.success);
                if (response.data.success) {
                    this.$router.push({
                        name: 'settings',
                        query: {
                            refresh: 1
                        }
                    })
                }
            }).catch((error) => this.$toast(error.message, false)).then(() => this.isWorking = false);
        },
        loadSetting() {
            this.$root.loading = true;
            return this.$server.get(`/settings/${this.id}/view`).then(response => {
                this.$root.loading = false;
                return response.data;
            });
        }
    },
    created() {
        if (this.record) {
            this.form = {...this.record};
        } else {
            this.loadSetting().then(response => {
                if (!response.success) {
                    this.back();
                }
                this.form = response.data;
            });
        }
    }
}
