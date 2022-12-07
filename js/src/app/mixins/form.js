import _ from './../utils/utilities';

export default {
    data() {
        return {
            form: {},
            isWorking: false,
            prefix: _.guid()
        }
    },
    methods: {
        onInputValidate(e, type) {
            let input = e ? e.target : null;
            if (!input) {
                return;
            }
            input.checkValidity();
            if (input.validity.valid) {
                e.target.classList.remove('is-invalid');
            }
        },
        onInputInvalid(e) {
            e.target.classList.add('is-invalid');
        },
        back() {
            this.$router.back();
        },
        onCancel() {
            this.back();
        }
    }
}
