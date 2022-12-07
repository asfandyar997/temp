export default {
    render() {
        return `
            <div class="v-season">
                <div class="row">
                    <div class="col-lg-12 col-xl-9">
                        <div class="panel">
                            <div class="panel-body">
                                <form @submit.prevent="onSubmit" name="seasons-form">
                                    <div class="form-row">
                                        <div class="col-md-2">
                                            <label class="col-form-label" :for="prefix + '-sid'">Season Year</label>                                        
                                        </div>  
                                        <div class="col-md-2">  
                                            <input type="number" step="1" :min="min" max="2100" v-model="form.sid" class="form-control" :id="prefix + '-sid'" required @change="onInputChange" @invalid.prevent="onInputInvalid">
                                        </div>                                        
                                        <div class="col-md-8 d-flex">  
                                            <span class="align-self-center"><sup>*</sup> unique value per season</span>
                                        </div>                                        
                                    </div>
                                    <div class="form-row m-t-10">
                                        <div class="col-md-2">
                                            <label class="col-form-label" :for="prefix + '-name'">Season Name</label>                                        
                                        </div>  
                                        <div class="col-md-10">  
                                            <input type="text" v-model="form.name" class="form-control" :id="prefix + '-name'" required @change="onInputChange" @invalid.prevent="onInputInvalid">
                                        </div>                                        
                                    </div>
                                    <div class="form-row m-t-10">
                                        <div class="col-md-12 panel-footer text-right">
                                            <button type="submit" class="btn btn-primary btn-large" :aria-disabled="isWorking" :disabled="isWorking">
                                                <i class="fas fa-save" aria-hidden="true" v-show="!isWorking"></i>
                                                <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
                                                {{this.isNew ? 'Save' : 'Update'}}
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
