export default {
    render() {
        return `
            <div class="v-game-type">
                <div class="row">
                    <div class="col-lg-12 col-xl-8">
                        <div class="panel">
                            <div class="panel-body">
                                <form @submit.prevent="onSubmit" name="game-type-form">
                                    <div class="form-row m-b-5">
                                        <div class="col-md-12">
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-name'">Name</label>
                                                <input v-model.trim="form.name" class="form-control" type="text" :id="prefix + '-name'" name="name" required
                                                    maxlength="50"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row m-b-5">
                                        <div class="col-md-2">
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-opta-competition-id'">OPTA Competition Id</label>
                                                <input v-model.trim="form.opta_competition_id" class="form-control" type="number" min="1" step="1" :id="prefix + '-opta-competition-id'" name="opta_competition_id" required
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-10 align-self-end">
                                            <p>
                                                Check <a target="_blank" href="http://praxis.optasports.com/documentation/football-feed-specifications.aspx">praxis.optasports.com</a> API to obtain proper Competition Identifier.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="form-row m-b-5">
                                        <div class="alert alert-info w-100 m-l-5 m-r-5">
                                            <strong>Competition Identifier</strong> is a part of opta feed filename. It is necessery to proper read and parse game data.
                                        </div>
                                    </div>
                                    <div class="form-row p-l-5">
                                        <div class="col-md-5 p-l-10">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-active'" v-model="form.active" @change="onInputChange">
                                                <label :for="prefix + '-active'">Active <i class="fas fa-info-circle" v-tooltip.top="'Deactivated game type cannot be assigned to new game'"/></label>
                                            </div>                                            
                                        </div>
                                    </div>
                                    <div class="form-row m-t-10">
                                        <div class="col-md-12 panel-footer text-right">
                                            <button type="submit" class="btn btn-primary btn-large" :aria-disabled="isWorking" :disabled="isWorking">
                                                <i class="fas fa-save" aria-hidden="true" v-show="!isWorking"></i>
                                                <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
                                                Update
                                            </button>
                                            <button type="button" class="btn btn-default btn-large m-l-5" :aria-disabled="isWorking" :disabled="isWorking" @click="onCancel">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
