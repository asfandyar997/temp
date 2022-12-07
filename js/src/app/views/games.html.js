import C from './../config/constants';

export default {
    render() {
        return `
            <div class="v-games">
                <div class="row" v-show="$route.name === 'games'">
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
                                            api-url="/games"
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
                                            
                                            <span slot="current_round" slot-scope="props">
                                                {{ props.rowData.current_round ? 'W' + props.rowData.current_round.no + ' / ' + props.rowData.round_count : '--' }}
                                            </span>
                                            
                                            <span slot="status" slot-scope="props" class="type label" :class="['label-' + props.rowData.status]">
                                                {{props.rowData.status.replace('_', ' ')}}
                                            </span>
                                            
                                            <div slot="active" slot-scope="props" class="text-center">
                                                <div class="switcher switcher-success">
                                                    <input type="checkbox" name="active" :id="props.rowData.uid + '-users'" v-model="props.rowData.active" @change="onActionClick('active', props.rowData)">
                                                    <label :for="props.rowData.uid + '-users'"></label>
                                                </div>
                                            </div>
                                            
                                            <div slot="actions" slot-scope="props" class="actions">
                                                <a href="#" class="btn btn-primary btn-icon btn-circle" v-tooltip.top="'Edit'" @click.prevent="onActionClick('edit', props.rowData)">
                                                    <i class="fas fa-user-edit"></i>
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
