import C from './../config/constants';

export default {
    render() {
        return `
            <div class="v-settings">
                <div class="row" v-show="$route.name === 'settings'">
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
                                            class="grid settings-table"
                                            api-url="/settings"
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
                                            
                                            <div slot="type" slot-scope="props" class="value-col">
                                                <span :class="['type', props.rowData.type]">{{props.rowData.type}}</span> 
                                                <span class="value">{{props.rowData.type !== "HTML" ? props.rowData.value : "(HTML content)"}}</span>
                                            </div>
                                            <div slot="actions" slot-scope="props" class="actions">
                                                <a href="#" class="btn btn-primary btn-icon btn-circle" v-tooltip.top="'Edit'" @click.prevent="onActionClick('edit', props.rowData)" v-if="props.rowData.editable">
                                                    <i class="fas fa-user-edit"></i>
                                                </a>
                                                <a href="#" class="btn btn-primary btn-icon btn-circle" v-tooltip.top="'View'" @click.prevent="onActionClick('edit', props.rowData)" v-if="!props.rowData.editable">
                                                    <i class="fas fa-eye"></i>
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
