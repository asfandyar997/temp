import C from './../config/constants';

export default {
    render() {
        return `
            <div class="v-fixtures-table">
                <div class="row" v-show="$route.name === 'fixtures'">
                    <div class="col">
                        <div class="panel">
                            <div class="panel-body">
                                <loader :active=loading></loader>
                                <toolbar
                                    v-model="params.filters"
                                    v-on:${C.EVENT.REFRESH}="refresh">
                                </toolbar>
                                <div class="row m-t-5">
                                    <div class="col-md-12">
                                        <vuetable ref="datagrid"
                                            class="grid"
                                            api-url="/fixtures"
                                            :reactive-api-url=false
                                            :sort-order="sortOrder"
                                            :fields="columns"
                                            :per-page="perPage"
                                            :append-params="params"
                                            data-path="records"
                                            pagination-path="pagination"
                                            :css="tableCls"
                                            @vuetable:pagination-data="onPaginationData"
                                            @vuetable:loading="onLoading"
                                            @vuetable:loaded="onLoaded">
                                            
                                            <span slot="results" slot-scope="props">
                                                {{ props.rowData.home_team_score }} : {{ props.rowData.away_team_score }}
                                            </span>
                                            
                                            <span slot="api_driven" slot-scope="props" class="api-driven-slot">
                                                <i v-tooltip.top="props.rowData.opta_uid || 'Manual'" :class="['fas fa-circle api-driven', props.rowData.opta_uid ? 'active' : '']"/>
                                            </span>
                                            
                                            <div slot="actions" slot-scope="props" class="actions">
                                                <a href="#" class="btn btn-primary btn-icon btn-circle" v-tooltip.top="'Edit'" @click.prevent="onActionClick('edit', props.rowData)">
                                                    <i class="fas fa-pencil-alt"></i>
                                                </a>
                                                <a href="#" class="btn btn-danger btn-icon btn-circle" v-tooltip.top="'Delete'" @click.prevent="onActionClick('delete', props.rowData)">
                                                    <i class="fas fa-trash-alt"></i>
                                                </a>
                                            </div>
                                        </vuetable>
                                    </div>
                                </div>
                                <div class="row m-t-10">
                                    <div class="col-md-12">
                                        <vuetable-pagination ref="pagination"
                                            @vuetable-pagination:change-page="onChangePage"
                                            :css="paginationCls">
                                        </vuetable-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <router-view></router-view>
            </div>
        `;
    }
}
