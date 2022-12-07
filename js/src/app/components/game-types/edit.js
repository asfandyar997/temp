import template from './../../views/game-types/edit.html';
import Form from './../../mixins/form';
import Model from './../../models/game-type';

export default {
    components: {},
    mixins: [
        Form
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
    computed: {},
    methods: {
        onInputChange(e, type) {
            this.onInputValidate(e, type);
        },
        onSubmit() {
            this.isWorking = true;
            this.$server.post('/game-types/update', this.form).then((response) => {
                this.$toast(response.data.msg, response.data.success);
                if (response.data.success) {
                    this.$router.push({
                        name: 'game-types',
                        query: {
                            refresh: 1
                        }
                    })
                }
            }).catch((error) => this.$toast(error.message, false)).then(() => this.isWorking = false);
        },
        load() {
            this.$root.loading = true;
            return this.$server.get(`/game-types/${this.id}/view`).then(response => {
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
