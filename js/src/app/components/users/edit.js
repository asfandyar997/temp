import template from './../../views/users/edit.html';
import C from './../../config/constants';
import _ from './../../utils/utilities';
import DateTime from '../../utils/date';
import Form from './../../mixins/form';
import FormCheckPassword from './../../mixins/form-confirm-password';
import Model from './../../models/user';
import Authorization from './../../mixins/authorization';
import LoadUser from './../../mixins/load-user';
import {ISO_3166_Alpha_2} from "../../config/countries";

const ModelSelect = VueSearchSelect.ModelSelect;
const ModelListSelect = VueSearchSelect.ModelListSelect;
const DEFAULT_USERNAME_FEEDBACK = 'This field is required (unique)';

export default {
    components: {
        ModelSelect,
        ModelListSelect
    },
    mixins: [
        Form,
        FormCheckPassword,
        Authorization,
        LoadUser
    ],
    data() {
        return {
            form: {...Model},
            types: [],
            now: new Date(),
            dobInitialized: false,
            isUsernameChecking: false,
            usernameFeedback: DEFAULT_USERNAME_FEEDBACK,
            countries: ISO_3166_Alpha_2
        }
    },
    props: {
        uid: String,
        record: Object
    },
    template: template.render(),
    computed: {
        isNew() {
            return this.$route.name === 'user-add';
        },
        isFormTypePlayer() {
            return this.form.type === C.USER_TYPE.USER;
        },
        dobNotValid() {
            return this.dobInitialized && _.empty(this.form.dob);
        },
        dob: {
            get() {
                if (_.empty(this.form.dob)) {
                    return '';
                }
                return this.form.dob instanceof Date ? this.form.dob : new Date(this.form.dob);
            },
            set(value) {
                this.form.dob = _.empty(value) ? null : DateTime.format(value, DateTime.FORMATS.isoDate);
            }
        }
    },
    methods: {
        onInputChange(e, type) {
            this.onInputValidate(e, type);

            if (type === 'date-input') {
                this.dobInitialized = true;
            }
            if (['password', 'confirm_password'].indexOf(type) !== -1) {
                this.checkConfirmPassword();
            }
        },
        onInputUsername: _.debounce(function (e) {
            if (this.isUsernameChecking) {
                return;
            }

            this.isUsernameChecking = true;
            this.$server.post('/users/validateUsername', {
                username: this.form.username
            }).then((response) => {
                if (response.data.success) {
                    e.target.classList.remove('is-invalid');
                } else {
                    e.target.classList.add('is-invalid');
                }
                this.usernameFeedback = response.data.validatorResults ? response.data.validatorResults[0] : DEFAULT_USERNAME_FEEDBACK;
            }).catch((error) => this.$toast(error.message, false)).then(() => this.isUsernameChecking = false);
        }, 500),
        onSubmit() {
            if (this.isUsernameChecking) {
                return;
            }
            const isFormValid = document.forms['user-form'].checkValidity();

            if (!isFormValid) {
                this.$toast('Form validation failed', false);
                return;
            }

            this.isWorking = true;
            this.$server.post(`/users/${this.isNew ? 'create' : 'update'}`, this.form).then((response) => {
                this.$toast(response.data.msg, response.data.success);
                if (response.data.success) {
                    this.$router.push({
                        name: 'users',
                        query: {
                            refresh: 1
                        }
                    })
                }
            }).catch((error) => this.$toast(error.message, false)).then(() => this.isWorking = false);
        },
        onPayments() {
            this.$router.push({
                name: 'payments'
            });

            setTimeout(() => {
                this.$router.push({
                    name: 'payments',
                    query: {
                        refresh: 1,
                        user: this.form.email
                    }
                })
            }, 0);
        },
    },
    created() {
        if (this.record) {
            this.form = {...this.record};
        } else if (!this.isNew) {
            this.loadUser().then(response => {
                if (!response.success) {
                    this.back();
                }
                this.form = response.data;
            });
        }

        if (this.isRoot) {
            this.types.push(
                {text: 'Root', value: C.USER_TYPE.ROOT},
                {text: 'Administrator', value: C.USER_TYPE.ADMINISTRATOR}
            );
        }

        this.types.push(
            {text: 'Player', value: C.USER_TYPE.USER}
        );
    }
}
