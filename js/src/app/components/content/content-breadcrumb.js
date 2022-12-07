import template from './../../views/content/content-breadcrumb.html';

export default {
    data() {
        return {
            routes: []
        }
    },
    methods: {
        routeTo(path) {
            this.$router.push(path);
        },
        _sync(val) {
            try {
                let routes = [];
                val.matched.forEach((route) => {
                    if (route.meta.title) {
                        routes.push({
                            label: route.meta.title,
                            link: route.path
                        })
                    }
                });
                if (routes[0].link !== '/' && routes[0].link !== '') {
                    routes.unshift({
                        label: this.$router.matcher.match('/').meta.title,
                        link: '/'
                    })
                }
                this.routes = routes;
            } catch (e) {
                this.routes = [];
            }
        }
    },
    watch: {
        '$route'(val) {
            this._sync(val)
        }
    },
    created() {
        this._sync(this.$route);
    },
    template: template.render()
}
