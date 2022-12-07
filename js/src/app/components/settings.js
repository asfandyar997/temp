import Grid from './../mixins/grid';
import Toolbar from './settings/toolbar';
import Loader from './loader';
import template from './../views/settings.html';

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
                field: 'group',
                direction: 'asc'
            }],
            columns: [
                {
                    title: 'ID',
                    name: 'id',
                    sortField: 'id',
                    visible: false
                }, {
                    title: 'Group',
                    name: 'group',
                    sortField: 'group',
                    __slot: 'group'
                }, {
                    title: 'Key',
                    name: 'key',
                    sortField: 'key'
                }, {
                    title: 'Type / Value',
                    name: 'type',
                    sortField: 'type',
                    __slot: 'type'
                }, {
                    title: 'Description',
                    name: 'description',
                    sortField: 'description',
                    __slot: 'description'
                }, 'actions'
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
                case 'edit':
                    this.$router.push({
                        name: 'setting-edit',
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
            if (to.name === 'settings') {
                this.onRouteChange(to);
            }
        }
    },
    template: template.render()
}
