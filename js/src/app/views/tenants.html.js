import C from './../config/constants';

export default {
    render() {
        return `
            <div class="v-tenants">
                <div class="row" v-show="['tenants', 'tenant-approve'].indexOf($route.name) !== -1">
                    <div class="col">
                        <div class="panel">
                            <div class="panel-body">
                                <loader :active=loading></loader>
                                <toolbar
                                    v-model="params.filters"
                                    ref="Toolbar"
                                    v-on:${C.EVENT.REFRESH}="refresh">
                                </toolbar>
                                <div class="row m-t-5">
                                    <div class="col-md-12">
                                        <vuetable ref="datagrid"
                                            class="grid"
                                            api-url="/tenants"
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
                                            <span slot="tenant_no" slot-scope="props" class="type label" :class="{'label-indigo': props.rowData.tenant_no, 'label-red': !props.rowData.tenant_no }">{{props.rowData.tenant_no || 'unknown'}}</span>
                                            <div slot="approved" slot-scope="props" class="approved text-center">
                                                <div
                                                    class="switcher switcher-success"
                                                    v-if="props.rowData.approved_date || props.rowData.rejected_date">
                                                    <input type="checkbox" name="approved" :id="props.rowData.uid + '-tenants'" v-model="props.rowData.approved" @click="onApproved($event, props.rowData)">
                                                    <label :for="props.rowData.uid + '-tenants'"></label>
                                                </div>
                                                <div class="small-circle-buttons" v-else>
                                                    <a href="#" class="btn btn-success btn-icon btn-circle btn-sm" v-tooltip.top="'Approve account'" @click.prevent="onApprove(true, props.rowData)">
                                                        <i class="fas fa-check"></i>
                                                    </a>
                                                    <a href="#" class="btn btn-danger btn-icon btn-circle btn-sm" v-tooltip.top="'Reject account'" @click.prevent="onApprove(false, props.rowData)">
                                                        <i class="fas fa-times"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div slot="actions" slot-scope="props" class="actions">
                                                <a href="#" class="btn btn-primary btn-icon btn-circle" v-tooltip.top="'View details'" @click.prevent="onActionClick('view', props.rowData)">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                                <a href="#" class="btn btn-primary btn-icon btn-circle" v-tooltip.top="'Edit'" @click.prevent="onActionClick('edit', props.rowData)">
                                                    <i class="fas fa-user-edit"></i>
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
