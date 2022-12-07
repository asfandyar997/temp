import template from './../../views/teams/edit.html';
import Form from './../../mixins/form';
import Model from './../../models/team';
import Authorization from './../../mixins/authorization';
import InputImageUpload from '../../components/input-image-upload';

export default {
    components: {
        InputImageUpload
    },
    mixins: [
        Form,
        Authorization
    ],
    data() {
        return {
            form: {...Model},
            imageMsg: '',
            isImageSuccess: false
        }
    },
    props: {
        uid: String,
        record: Object
    },
    template: template.render(),
    computed: {
        isNew() {
            return this.$route.name === 'team-add';
        },
    },
    methods: {
        onImageSuccess(msg, file) {
            this.isImageSuccess = true;
            this.imageMsg = msg;
        },
        onImageFail(msg) {
            this.isImageSuccess = false;
            this.imageMsg = msg;
        },
        onInputChange(e, type) {
            this.onInputValidate(e, type);
        },
        onSubmit() {
            const isFormValid = document.forms['team-form'].checkValidity();

            if (!isFormValid) {
                this.$toast('Form validation failed', false);
                return;
            }

            this.isWorking = true;
            this.$server.post(`/teams/${this.isNew ? 'create' : 'update'}`, this.form).then((response) => {
                this.$toast(response.data.msg, response.data.success);
                if (response.data.success) {
                    this.$router.push({
                        name: 'teams',
                        query: {
                            refresh: 1
                        }
                    })
                }
            }).catch((error) => this.$toast(error.message, false)).then(() => this.isWorking = false);
        },
        load() {
            this.$root.loading = true;
            return this.$server.get(`/teams/${this.uid}/view`).then(response => {
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
