import Grid from './../mixins/grid';
import Toolbar from './game-types/toolbar';
import Loader from './loader';
import template from './../views/game-types.html';

export default {
    mixins: [
        Grid
    ],
    components: {
        Toolbar,
        Loader
    },
    data() {
        return {
            perPage: 10,
            sortOrder: [{
                field: 'id',
                direction: 'asc'
            }],
            columns: [
                {
                    title: 'ID',
                    name: 'id',
                    sortField: 'id',
                    visible: true
                }, {
                    title: 'Name',
                    name: 'name',
                    sortField: 'name'
                }, {
                    title: 'Opta Competition ID',
                    name: 'opta_competition_id',
                    sortField: 'opta_competition_id',
                    __slot: 'opta_competition_id'
                }, 'active', 'actions'
            ]
        }
    },
    props: {
        user: Object,
        settings: Object
    },
    methods: {
        onActionClick(action, data) {
            switch (action) {
                case 'active':
                    this.$server.put(`/game-types/${data.id}/active`, {
                        active: data.active
                    });
                    break;
                case 'edit':
                    this.$router.push({
                        name: 'game-types-edit',
                        params: {
                            id: data.id,
                            record: data
                        }
                    });
                    break;
            }
        }
    },
    watch: {
        '$route': function (to) {
            if (to.name === 'game-types') {
                this.onRouteChange(to);
            }
        }
    },
    template: template.render()
}
