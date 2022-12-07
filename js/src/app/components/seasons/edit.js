import template from './../../views/seasons/edit.html';
import Form from './../../mixins/form';
import Model from './../../models/season';
import Authorization from './../../mixins/authorization';

export default {
    components: {},
    mixins: [
        Form,
        Authorization
    ],
    data() {
        return {
            form: {...Model},
            min: new Date().getFullYear()
        }
    },
    props: {
        id: String,
        record: Object
    },
    template: template.render(),
    computed: {
        isNew() {
            return this.$route.name === 'seasons-add';
        },
    },
    methods: {
        onInputChange(e, type) {
            this.onInputValidate(e, type);
        },
        onSubmit() {
            const isFormValid = document.forms['seasons-form'].checkValidity();

            if (!isFormValid) {
                this.$toast('Form validation failed', false);
                return;
            }

            this.isWorking = true;
            this.$server.post(`/seasons/${this.isNew ? 'create' : 'update'}`, this.form).then((response) => {
                this.$toast(response.data.msg, response.data.success);
                if (response.data.success) {
                    this.$router.push({
                        name: 'seasons',
                        query: {
                            refresh: 1
                        }
                    })
                }
            }).catch((error) => this.$toast(error.message, false)).then(() => this.isWorking = false);
        },
        load() {
            this.$root.loading = true;
            return this.$server.get(`/seasons/${this.id}/view`).then(response => {
                this.$root.loading = false;
                return response.data;
            });
        }
    },
    created() {
        if (this.record) {
            this.form = {...this.record};
        } else if (!this.isNew) {
            this.load().then(response => {
                if (!response.success) {
                    this.back();
                }
                this.form = response.data;
            });
        }
    }
}
