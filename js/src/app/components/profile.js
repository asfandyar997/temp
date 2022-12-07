import Form from './../mixins/form';
import FormConfirmPassword from './../mixins/form-confirm-password';
import InputImageUpload from './input-image-upload';
import C from './../config/constants';
import template from '../views/profile.html';
import _ from '../utils/utilities';

export default {
    mixins: [
        Form,
        FormConfirmPassword
    ],
    components: {
        InputImageUpload
    },
    props: {
        user: Object,
        settings: Object
    },
    data() {
        return {
            imageMsg: '',
            isImageSuccess: false
        }
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

            if (['password', 'confirm_password'].indexOf(type) !== -1) {
                this.checkConfirmPassword();
            }
        },
        onSubmit() {
            this.isWorking = true;
            this.$server.post('/user/update', this.form).then((response) => {
                this.$toast(response.data.msg, response.data.success);
                if (response.data.success) {
                    /**
                     * Update image new file name (if any)
                     */
                    this.form.avatar = response.data.avatar;
                    this.$bus.$emit(C.EVENT.DASHBOARD.REFRESH);
                }
            }).catch((error) => this.$toast(error.message, false)).then(() => this.isWorking = false);
        }
    },
    created() {
        this.form = _.deepCopy(this.user);
    },
    template: template.render()
}
