/**
 * Grid mixin - common part of every grid table
 */
export default {
    data() {
        return {
            loading: false,
            columns: [],
            sortOrder: [{
                field: 'created',
                direction: 'desc'
            }],
            perPage: 10,
            params: {
                filters: {}
            },
            tableCls: {
                tableWrapper: '',
                tableHeaderClass: 'fixed',
                tableBodyClass: 'vuetable-semantic-no-top fixed',
                tableClass: 'ui blue selectable unstackable celled table',
                loadingClass: 'loading',
                ascendingIcon: 'fas fa-chevron-up',
                descendingIcon: 'fas fa-chevron-down',
                ascendingClass: 'sorted-asc',
                descendingClass: 'sorted-desc',
                sortableIcon: 'grey sort icon',
                handleIcon: 'grey sidebar icon'
            },
            paginationCls: {
                wrapperClass: 'pagination pull-right vuetable-pagination',
                activeClass: 'active',
                disabledClass: 'disabled',
                pageClass: 'page-link',
                linkClass: 'page-link',
                icons: {
                    first: 'fas fa-angle-double-left',
                    prev: 'fas fa-angle-left',
                    next: 'fas fa-angle-right',
                    last: 'fas fa-angle-double-right',
                }
            }
        }
    },
    watch: {
        params: {
            handler() {
                this.$nextTick(() => this.refresh());
            },
            deep: true
        }
    },
    methods: {
        refresh() {
            return this.$refs.datagrid ? this.$refs.datagrid.refresh() : false;
        },
        getApiParams() {
            return this.$refs.datagrid ? this.$refs.datagrid.httpOptions.params : {};
        },
        getApiUrl() {
            return this.$refs.datagrid ? this.$refs.datagrid.apiUrl : '';
        },
        onLoading() {
            this.loading = true;
        },
        onLoaded() {
            (() => this.loading = false).delay(this, 500);
        },
        onPaginationData(paginationData) {
            if (this.$refs.pagination) {
                this.$refs.pagination.setPaginationData(paginationData);
            }
        },
        onChangePage(page) {
            if (this.$refs.datagrid) {
                this.$refs.datagrid.changePage(page);
            }
        },
        onRouteChange(to) {
            if (to.query.reload) {
                if (this.$refs.Toolbar) {
                    this.$refs.Toolbar.reset();
                }
            } else if (to.query.refresh) {
                this.refresh();
            }
        }
    }
}
