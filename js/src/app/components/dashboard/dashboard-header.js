import template from './../../views/dashboard/dashboard-header.html';
import Autocomplete from './../../mixins/autocomplete';

export default {
    mixins: [
        Autocomplete
    ],
    data() {
        return {
            keyword: ''
        }
    },
    props: {},
    methods: {
        onLinkClick() {
            this.$root.loading = true;
        },
        getSearchResults() {
            return this.$server.get('/users/search', {
                params: {
                    keyword: this.keyword
                }
            }).then(response => response.data.records);
        },
        onSearchResultSelect(record) {
            if (record === null) {
                return;
            }
            this.$router.push({
                name: 'user-view',
                params: {
                    uid: record.uid
                }
            });
        }
    },
    template: template.render()
}
