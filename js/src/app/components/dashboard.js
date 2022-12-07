import DashboardHeader from './dashboard/dashboard-header';
import DashboardSidebar from './dashboard/dashboard-sidebar';
import DashboardContent from './dashboard/dashboard-content';
import ViewportResize from './../mixins/viewport-resize';
import Polling from './../mixins/polling';
import C from './../config/constants';
import template from '../views/dashboard.html';
import DateTime from "../utils/date";

export default {
    mixins: [
        ViewportResize,
        Polling
    ],
    components: {
        DashboardHeader,
        DashboardSidebar,
        DashboardContent
    },
    props: {
        rawConfig: String
    },
    data() {
        return {
            showContainer: false,
            sidebarCollapsed: false,
            noSidebar: false,
            config$: null
        };
    },
    computed: {
        config: {
            get: function () {
                if (this.config$ !== null) {
                    return this.config$;
                }
                return JSON.parse(atob(this.rawConfig));
            },
            set: function (value) {
                this.config$ = value;
            }
        },
        user() {
            return this.config.user;
        },
        settings() {
            return this.config.settings || {};
        }
    },
    methods: {
        toggleSidebar(value) {
            this.sidebarCollapsed = value || !this.sidebarCollapsed;
        },
        refresh() {
            this.$server.post('/dashboard/refresh').then((response) => this.config = response.data);
        },
        onViewportResize() {
            if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 767) {
                this.toggleSidebar(true);
            }
        },
        startPolling() {
            this.beforeStartPooling();
            this.polling$ = setInterval(() => {
                this.refresh()
            }, 30e3);
        }
    },
    template: template.render(),
    mounted() {
        this.showContainer = true;
        this.startPolling();
    },
    created() {
        this.$on(C.EVENT.DASHBOARD.SIDEBAR, this.toggleSidebar);
        this.$on(C.EVENT.DASHBOARD.REFRESH, this.refresh);
        this.onViewportResize();
    }
}
