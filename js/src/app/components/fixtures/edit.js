import template from './../../views/fixtures/edit.html';
import Form from './../../mixins/form';
import Model from './../../models/fixture';
import { STATES } from "./toolbar";
import DateTime from "../../utils/date";
import _ from "../../utils/utilities"

const ModelSelect = VueSearchSelect.ModelSelect;

export default {
    components: {
        ModelSelect
    },
    mixins: [
        Form
    ],
    data() {
        return {
            form: {...Model},
            states: STATES
        }
    },
    props: {
        uid: String,
        record: Object
    },
    template: template.render(),
    computed: {
        teams() {
            let values = [
                {
                    value: null,
                    text: 'Draw'
                }
            ];
            if (this.form.home_team) {
                values = values.concat([
                    {
                        value: this.form.home_team_id,
                        text: this.form.home_team.name
                    }, {
                        value: this.form.away_team_id,
                        text: this.form.away_team.name
                    }
                ]);
            }

            return values;
        },
        matchDate: {
            set(value) {
                this.form.match_date = value ? new DateTime(value).format(DateTime.FORMATS.isoFullDateTime) : null;
            },
            get() {
                return this.form.match_date ? new Date(this.form.match_date) : '';
            }
        }
    },
    methods: {
        onInputChange(e, type) {
            this.onInputValidate(e, type);
        },
        onSubmit() {
            const isFormValid = document.forms['fixture-form'].checkValidity();

            if (!isFormValid) {
                this.$toast('Form validation failed', false);
                return;
            }

            if (_.empty(this.form.match_date)) {
                this.$toast('Match Date is mandatory field', false);
                return;
            }

            if (_.empty(this.form.state)) {
                this.$toast('Status is mandatory field', false);
                return;
            }

            this.isWorking = true;
            this.$server.post(`/fixtures/update`, this.form).then((response) => {
                this.$toast(response.data.msg, response.data.success);
                if (response.data.success) {
                    this.$router.push({
                        name: 'fixtures',
                        query: {
                            refresh: 1
                        }
                    })
                }
            }).catch((error) => this.$toast(error.message, false)).then(() => this.isWorking = false);
        },
        load() {
            this.$root.loading = true;
            return this.$server.get(`/fixtures/${this.uid}/view`).then(response => {
                this.$root.loading = false;
                return response.data;
            });
        }
    },
    created() {
        if (this.record) {
            this.form = {...this.record};
        } else {
            this.load().then(response => {
                if (!response.success) {
                    this.back();
                }
                this.form = response.data;
            });
        }
    }
}
