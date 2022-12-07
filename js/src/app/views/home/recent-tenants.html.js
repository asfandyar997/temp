export default {
    render() {
        return `
            <div class="v-tenants v-recent-tenants">
                <div class="panel">
                    <div class="panel-body">
                        <vuetable ref="datagrid"
                            class="grid"
                            api-url="/tenants/recent"
                            :reactive-api-url=false
                            :sort-order="sortOrder"
                            :fields="columns"
                            data-path="records"
                            pagination-path=""
                            :css="tableCls"
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
                            </div>
                        </vuetable>
                    </div>
                </div>
            </div>
        `;
    }
}
