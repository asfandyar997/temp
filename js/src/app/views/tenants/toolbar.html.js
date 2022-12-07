export default {
    render() {
        return `
            <form class="v-toolbar v-tenants-toolbar" @submit.prevent="onChange">
                <div class="row">
                    <div class="col p-l-0">
                        <div class="input-group">
                            <div class="col-3">
                                <input type="search" class="form-control" placeholder="Search by keyword..." v-model.trim="params.keyword" @change="onChange">
                            </div>
                            <div class="col-auto"><span class="separator"></span></div>
                            <label class="col-auto col-form-label">Approved:</label>
                            <div class="col-auto radios">
                                <div class="radio radio-css radio-inline">
                                    <input v-model="params.approved" type="radio" name="approved" :id="prefix + '-approved-yes'" value="1" @change="onChange">
                                    <label :for="prefix + '-approved-yes'">Yes</label>
                                </div>
                                <div class="radio radio-css radio-inline">
                                    <input v-model="params.approved"  type="radio" name="approved" :id="prefix + '-approved-no'" value="0" @change="onChange">
                                    <label :for="prefix + '-approved-no'">No</label>
                                </div>
                                <div class="radio radio-css radio-inline">
                                    <input v-model="params.approved"  type="radio" name="approved" :id="prefix + '-approved-rejected'" value="-1" @change="onChange">
                                    <label :for="prefix + '-approved-rejected'">Rejected</label>
                                </div>
                                <div class="radio radio-css radio-inline">
                                    <input v-model="params.approved" type="radio" name="approved" :id="prefix + '-approved-all'" value="" checked  @change="onChange">
                                    <label :for="prefix + '-approved-all'">All</label>
                                </div>
                            </div>
                            <div class="col-auto"><span class="separator"></span></div>
                            <div class="col-3">
                                <div class="form-group row">
                                    <label :for="prefix + '-postcode'" class="col-sm-3 col-form-label">Postcode:</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="" v-model.trim="params.postcode" @change="onChange">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto text-right">
                        <button type="button" class="btn btn-blue-grey m-r-10" @click="onExport">
                            <i class="fa fa-file-export"/> Export data
                        </button>
                        <button type="button" class="btn btn-primary m-r-10" @click="onChange">
                            <i class="fas fa-search"/> Search
                        </button>
                        <button type="button" class="btn btn-aqua" @click="onRefresh">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                    </div>
                </div>
            </form>
        `;
    }
}
