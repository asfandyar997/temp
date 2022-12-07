import template from './../views/messages.html';
import Formatters from './../utils/formatters';
import C from '../config/constants';
import _ from '../utils/utilities';

const PER_PAGE = C.DEFAULTS.MESSAGES.USERS.PER_PAGE;

export default {
    components: {},
    data() {
        return {
            page: 1,
            items: [],
            pagination: {},
            lastElement: null,
            isWorking: false,
            initialized: false,
            filters: {
                keyword: ''
            },
            threads: []
        };
    },
    props: {
        user: Object,
        settings: Object
    },
    methods: {
        onSearch: _.debounce(function () {
            this.load();
        }, 500),
        prettyDate(date) {
            if (!date) {
                return '';
            }
            return Formatters.prettyDate(date);
        },
        load(page = 1, perPage = PER_PAGE, mode = C.FETCH_MODE.REPLACE) {
            this.isWorking = true;
            this.page = page;
            this.lastElement = document.querySelector('.user-list li:last-child');
            return this.$server.get('/messages/users', {
                params: {
                    page: page,
                    per_page: perPage,
                    filters: this.filters
                }
            }).then((response) => {
                if (mode === C.FETCH_MODE.APPEND) {
                    this.items = this.items.concat(response.data.records);
                } else {
                    this.items = response.data.records;
                }
                this.pagination = response.data.pagination;
                this.initialized = true;
            }).finally(() => this.isWorking = false);
        },
        append() {
            return this.load(this.page + 1, PER_PAGE, C.FETCH_MODE.APPEND).then(() => {
                if (this.lastElement) {
                    this.lastElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        },
        scrollTop() {
            document.querySelector('.users-body').scrollTop = 0;
        }
    },
    created() {
        this.load();
        this.$bus.$on(C.EVENT.REFRESH, () => this.load().then(() => this.scrollTop()));
        this.$bus.$on(C.EVENT.READ, (thread, n) => {
            if (typeof thread === 'object' && thread.user_id) {
                let user = this.items.find(usr => usr.id === thread.user_id);
                if (user) {
                    user.unread -= n;
                    if (user.unread < 0) {
                        user.unread = 0;
                    }
                }
            }
        });
    },
    template: template.render()
};
