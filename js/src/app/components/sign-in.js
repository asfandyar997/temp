import template from '../views/sign-in.html';
import _ from "./../utils/utilities";

/**
 * Sign In form
 */
export default {
    mixins: [],
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            isWorking: false,
            hasError: false,
            message: '',
            prefix: _.guid()
        };
    },
    props: {
        redirect: String
    },
    methods: {
        onInputChange(e) {
            let input = e.target;
            input.checkValidity();
            if (input.validity.valid) {
                e.target.classList.remove('is-invalid');
            }
        },
        onInputInvalid(e) {
            e.target.classList.add('is-invalid');
        },
        getRedirect() {
            const url = new URL(location.href);
            return url.searchParams.get('redirect');
        },
        onSubmit() {
            this.$root.loading = true;
            this.isWorking = true;
            this.$server.post('/authenticate', Object.assign({
                redirect: this.redirect
            }, this.form)).then((response) => {
                this.hasError = !response.data.success;
                this.message = response.data.msg;
                if (response.data.success) {
                    let url = this.getRedirect() || response.data.redirect;
                    if (url !== null) {
                        (() => location.href = url).delay(1000);
                    } else {
                        url = location.protocol + '//' + location.host + '/?r=' + Math.random() * 10e17;
                    }
                } else {
                    this.isWorking = false;
                }
            }).catch((error) => {
                this.hasError = true;
                this.message = error.message;
                this.isWorking = false;
            }).then(() => this.$root.loading = false);
        }
    },
    template: template.render()
}
