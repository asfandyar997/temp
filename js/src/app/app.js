// noinspection ES6UnusedImports
import * as Polyfills from './utils/polyfills';
import C from './config/constants';
import Loader from './components/loader';
import SignIn from './components/sign-in';
import Dashboard from './components/dashboard.js';
import Home from './components/home.js';
import Profile from './components/profile';
import Users from './components/users.js';
import Payments from './components/payments.js';
import UserEdit from './components/users/edit';
import Settings from './components/settings.js';
import SettingEdit from './components/settings/edit';
import Seasons from './components/seasons.js';
import SeasonEdit from './components/seasons/edit';
import GameTypes from './components/game-types.js';
import GameTypeEdit from './components/game-types/edit';
import Teams from './components/teams.js';
import TeamEdit from './components/teams/edit';
import Games from './components/games.js';
import GameEdit from './components/games/edit';
import GameFixtures from './components/games/fixtures';
import GameTeams from './components/games/teams';
import Fixtures from './components/fixtures.js';
import FixtureEdit from './components/fixtures/edit';

Vue.use({
    install(Vue) {
        const EventBus = new Vue();
        let csrf, token;

        try {
            csrf = document.head.querySelector('[name~=csrf-token][content]').content;
        } catch (e) {
            csrf = window.Cookies.get('csrfToken');
        }

        try {
            token = atob(document.head.querySelector('[name~=api-token][content]').content);
        } catch (e) {
            token = '';
        }

        Vue.prototype.$server = axios.create({
            baseURL: '/',
            headers: {
                'X-CSRF-Token': atob(csrf)
            }
        });

        Vue.prototype.$log = console.log.bind(console);

        Vue.prototype.$notImplemented = function () {
            this.$snotify.info('Not implemented yet');
        };

        /**
         * Toast component method.
         *
         * @param options string|object Text or toast config.
         * @param success boolean Success flag.
         */
        Vue.prototype.$toast = function (options, success = true) {
            if (typeof options === 'string') {
                this.$snotify.create({
                    body: options,
                    config: {
                        type: success ? 'success' : 'error'
                    }
                });
            } else if (typeof options === 'object') {
                this.$snotify.create({
                    body: options.text,
                    config: {
                        type: options.type
                    }
                });
            }
        };

        Object.defineProperties(Vue.prototype, {
            $bus: {
                get: function () {
                    return EventBus;
                }
            }
        });

        /*
         * Extra Vue.use here
         */
        Vue.use(Vuetable);
        Vue.use(vueDirectiveTooltip);
        Vue.use(DatePicker);
        Vue.use(VueHtml5Editor, {
            visibleModules: [
                "text",
                "color",
                "align",
                "list",
                "link",
                "unlink",
                "tabulation",
                "hr",
                "eraser",
                "undo"
            ],
            icons: {
                text: "fas fa-pencil-alt",
                list: "fas fa-list-ul",
                link: "fas fa-link",
                unlink: "fas fa-unlink"
            }
        });
    }
});

/**
 * @class Router
 * @type {Vue}
 */
let router = new VueRouter({
        routes: [
            {
                path: '/',
                component: Home,
                name: 'home',
                meta: {
                    title: 'Dashboard',
                    subtitle: 'overall statistics about the app'
                },
                children: []
            }, {
                path: '/profile',
                component: Profile,
                name: 'profile',
                meta: {
                    title: 'My Profile',
                    subtitle: 'your account details'
                }
            }, {
                path: '/settings',
                component: Settings,
                name: 'settings',
                meta: {
                    title: 'Settings',
                    subtitle: 'global system configuration'
                },
                children: [
                    {
                        path: '/settings/:id',
                        component: SettingEdit,
                        name: 'setting-edit',
                        meta: {
                            title: 'Edit setting',
                            subtitle: 'change configuration key'
                        },
                        props: true
                    }
                ]
            }, {
                path: '/seasons',
                component: Seasons,
                name: 'seasons',
                meta: {
                    title: 'Seasons',
                    subtitle: 'game seasons'
                },
                children: [
                    {
                        path: '/seasons/add',
                        component: SeasonEdit,
                        name: 'seasons-add',
                        meta: {
                            title: 'New Season',
                            subtitle: 'add season details'
                        }
                    }, {
                        path: '/seasons/:id',
                        component: SeasonEdit,
                        name: 'seasons-edit',
                        meta: {
                            title: 'Edit season',
                            subtitle: 'change season details'
                        },
                        props: true
                    }
                ]
            }, {
                path: '/game-types',
                component: GameTypes,
                name: 'game-types',
                meta: {
                    title: 'Game Types',
                    subtitle: 'game competitions'
                },
                children: [
                    {
                        path: '/game-types/:id',
                        component: GameTypeEdit,
                        name: 'game-types-edit',
                        meta: {
                            title: 'Edit game type',
                            subtitle: 'change game type'
                        },
                        props: true
                    }
                ]
            }, {
                path: '/users',
                component: Users,
                name: 'users',
                meta: {
                    title: 'Users',
                    subtitle: 'users who have access to the system'
                },
                children: [
                    {
                        path: '/users/add',
                        component: UserEdit,
                        name: 'user-add',
                        meta: {
                            title: 'New User',
                            subtitle: 'fill user details'
                        }
                    }, {
                        path: '/users/:uid',
                        component: UserEdit,
                        name: 'user-edit',
                        meta: {
                            title: 'Edit User',
                            subtitle: 'change user details'
                        },
                        props: true
                    }
                ]
            }, {
                path: '/payments',
                component: Payments,
                name: 'payments',
                meta: {
                    title: 'Payments',
                    subtitle: 'registered payments in the system'
                },
                props: true
            }, {
                path: '/teams',
                component: Teams,
                name: 'teams',
                meta: {
                    title: 'Teams',
                    subtitle: 'game teams'
                },
                children: [
                    {
                        path: '/teams/add',
                        component: TeamEdit,
                        name: 'team-add',
                        meta: {
                            title: 'New Team',
                            subtitle: 'fill team details'
                        }
                    }, {
                        path: '/teams/:uid',
                        component: TeamEdit,
                        name: 'team-edit',
                        meta: {
                            title: 'Edit Team',
                            subtitle: 'change team details'
                        },
                        props: true
                    }
                ]
            }, {
                path: '/games',
                component: Games,
                name: 'games',
                meta: {
                    title: 'Games',
                    subtitle: 'games list'
                },
                children: [
                    {
                        path: '/games/add',
                        component: GameEdit,
                        name: 'game-add',
                        meta: {
                            title: 'New Game',
                            subtitle: 'fill game details'
                        },
                        children: [
                            {
                                path: 'fixtures',
                                component: GameFixtures,
                                name: 'game-add-fixtures',
                                meta: {
                                    title: 'Fixtures',
                                    subtitle: 'add fixtures'
                                },
                                props: true
                            }
                        ]
                    }, {
                        path: '/games/:uid',
                        component: GameEdit,
                        name: 'game-edit',
                        meta: {
                            title: 'Edit Game',
                            subtitle: 'change game details'
                        },
                        props: true,
                        children: [
                            {
                                path: 'fixtures/:ruid',
                                component: GameFixtures,
                                name: 'game-edit-fixtures',
                                meta: {
                                    title: 'Fixtures',
                                    subtitle: 'edit fixtures'
                                },
                                props: true
                            }, {
                                path: 'teams',
                                component: GameTeams,
                                name: 'game-teams',
                                props: true
                            }

                        ]
                    }
                ]
            }, {
                path: '/fixtures',
                component: Fixtures,
                name: 'fixtures',
                meta: {
                    title: 'Fixtures',
                    subtitle: 'all matches'
                },
                children: [
                    {
                        path: '/fixtures/:uid',
                        component: FixtureEdit,
                        name: 'fixture-edit',
                        meta: {
                            title: 'Edit Fixture',
                            subtitle: 'change match details'
                        },
                        props: true
                    }
                ]
            }
        ]
    }),
    /**
     * @class App
     * @type {Vue}
     */
    app = new Vue({
        el: '#app',
        router,
        components: {
            /*
             * Global components
             */
            Loader,
            SignIn,
            Dashboard
        },
        data: {
            loading: true
        },
        methods: {
            isProduction() {
                return this.$el.dataset.isProduction === 'true';
            },
            isAuthenticated() {
                let userId = this.getDataset().userId;
                return typeof userId !== 'undefined' && userId !== null && userId !== '';
            },
            getDataset() {
                return this.$el.dataset;
            }
        },
        mounted() {
            if (!this.isProduction()) {
                this.$log(`User Id: %c${this.getDataset().userId}`, 'font-weight:bold;color:orange');
            }
            document.addEventListener('keyup', (event) => {
                if (event.key === 'Escape') {
                    this.$bus.$emit(C.EVENT.ESCAPE);
                }
            });

            this.loading = false;
        }
    });

if (!app.isProduction()) {
    window.$app = app;
}
