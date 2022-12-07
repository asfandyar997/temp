import C from './../../config/constants';

export default {
    render() {
        return `
            <div class="v-team">
                <div class="row">
                    <div class="col-lg-12 col-xl-8">
                        <div class="panel">
                            <div class="panel-body">
                                <form @submit.prevent="onSubmit" name="team-form">
                                    <div class="form-row m-b-10">
                                        <div class="col-md-6">
                                            <input-image-upload
                                                v-model="form.logo"
                                                default-image-path="${C.DEFAULTS.PROFILE}"
                                                image-url="${C.PATH.FILES}"
                                                upload-url="/upload/team"
                                                :id="prefix + '-image'"
                                                name="team"
                                                label="Team Logo"
                                                v-on:success="onImageSuccess"
                                                v-on:fail="onImageFail">
                                            </input-image-upload>
                                            <div
                                                class="input-feedback text-center"
                                                :class="{ 'invalid-feedback': !isImageSuccess, 'valid-feedback': isImageSuccess}"
                                                v-show="imageMsg !== ''">{{imageMsg}}</div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-name'">Team Name</label>
                                                <input v-model.trim="form.name" class="form-control" type="text" :id="prefix + '-name'" name="name" required
                                                    maxlength="100"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-opta-uid'">Opta UID</label>
                                                <input v-model.trim="form.opta_uid" class="form-control" type="text" :id="prefix + '-opta-uid'" name="opta_uid"
                                                    maxlength="100"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row m-t-10">
                                        <div class="col-md-12 panel-footer text-right">
                                            <button type="submit" class="btn btn-primary btn-large" :aria-disabled="isWorking" :disabled="isWorking">
                                                <i class="fas fa-save" aria-hidden="true" v-show="!isWorking"></i>
                                                <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
                                                Save
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
