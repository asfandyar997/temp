export default {
    render() {
        return `
            <div class="v-game-teams modal fade" :id="prefix + '-modal'" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-internal-mask" v-if="isWorking"></div>
                        <div class="modal-header">
                            <h4 class="modal-title">Pick Used 🠒 Teams</h4>
                            <button type="button" @click="onClose" class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close" :disabled="isWorking" :aria-disabled="isWorking">×</button>
                        </div>
                        <div class="modal-body">
                            <table class="teams-table" v-if="records.length">
                                <colgroup>
                                    <col width="15%"/>
                                    <col width="70%"/>
                                    <col width="15%"/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th class="text-center">Logo</th>
                                        <th>Team Name</th>
                                        <th class="text-right">Total Picks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(record, index) in records" :key="index">
                                        <td class="text-center">
                                            <img :src="logoUrl(record.logo)" class="logo img-fluid"/>
                                        </td>
                                        <td>{{ record.name }}</td>
                                        <td class="text-right pick-value">
                                            <router-link :to="{name: 'users', query: { keyword: record.filter }}" title="Users">
                                                {{ record.total }}
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p v-else class="alert alert-info m-0 text-center font-weight-bold">No records to show</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-white" data-dismiss="modal" @click="onClose" :aria-disabled="isWorking" :disabled="isWorking">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
    }
}
