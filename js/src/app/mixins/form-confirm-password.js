export default {
    methods: {
        checkConfirmPassword() {
            if (typeof this.form.password === 'undefined' || this.form.password === '') {
                return true;
            }
            let input = this.$el.querySelector('[name="confirm_password"]');
            if (this.form.password !== this.form.confirm_password) {
                input.classList.add('is-invalid');
                return false;
            } else {
                input.classList.remove('is-invalid');
                return true;
            }
        }
    }
}
