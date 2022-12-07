export default {
    render() {
        return `
            <form class="v-toolbar v-fixtures-table-toolbar" @submit.prevent="onChange">
                <div class="row">
                    <div class="col-auto align-self-center">
                        <label>Match Date:</label>
                    </div>
                    <div class="col-auto">
                        <date-picker 
                            v-model="match_date"
                            :range="true" 
                            valueType="date" 
                            lang="en"
                            type="date"
                            range-separator=" - "
                            format="D/MM/YYYY"
                            @change="onChange"
                            name="match_date">
                        </date-picker>
                    </div>
                    <div class="col-auto">
                        <span class="separator"></span>
                    </div>                    
                    <div class="col">
                        <multi-select
                            :options="states"
                            :selectedOptions="params.states"
                            placeholder="Select fixture status(s)"
                            @select="onStateChange"
                            class="form-control">
                        </multi-select>
                    </div>
                    <div class="col-auto text-right">
                        <button type="button" class="btn btn-aqua" @click="onRefresh">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                    </div>
                </div>                
            </form>
        `;
    }
}
