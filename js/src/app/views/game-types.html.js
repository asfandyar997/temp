import C from './../config/constants';

export default {
    render() {
        return `
            <div class="v-game-types">
                <div class="row" v-show="$route.name === 'game-types'">
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
                                            class="grid game-types-table"
                                            api-url="/game-types"
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
                                            
                                            <div slot="opta_competition_id" slot-scope="props" class="value-col">
                                                <span class="value">{{props.rowData.opta_competition_id}}</span>
                                            </div>
                                            <div slot="active" slot-scope="props">
                                                <div class="switcher switcher-success">
                                                    <input type="checkbox" name="active" :id="props.rowData.id + '-game-types'" v-model="props.rowData.active" @change="onActionClick('active', props.rowData)">
                                                    <label :for="props.rowData.id + '-game-types'"></label>
                                                </div>
                                            </div>
                                            <div slot="actions" slot-scope="props" class="actions">
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
