import template from '../views/home.html';
// import RecentTenants from './home/recent-tenants';

export default {
    components: {
        AnimatedNumber,
        // RecentTenants
    },
    props: {

    },
    data() {
        return {
            stats: {
                active: 0,
                awaiting: 0,
                messages: 0
            }
        }
    },
    methods: {
        load() {
            return this.$server.get('/dashboard/stats').then(response => this.stats = response.data);
        }
    },
    watch: {
        '$route'(to) {
            if (to.name === 'home') {
                this.load();
            }
        }
    },
    created() {
        this.load();
    },
    template: template.render()
}
