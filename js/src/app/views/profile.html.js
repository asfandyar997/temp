import C from './../config/constants';

export default {
    render() {
        return `
            <div class="v-profile">
                <div class="row">
                    <div class="col-lg-12 col-xl-8">
                        <div class="panel">
                            <div class="panel-body">
                                <form @submit.prevent="onSubmit" name="profile-form">
                                    <div class="form-row m-b-10">
                                        <div class="col-md-6">
                                            <input-image-upload
                                                v-model="form.avatar"
                                                default-image-path="${C.DEFAULTS.PROFILE}"
                                                image-url="${C.PATH.FILES}"
                                                upload-url="/upload/avatar"
                                                :id="prefix + '-image'"
                                                name="avatar"
                                                label="Profile Image"
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
                                                <label :for="prefix + '-first-name'">First Name</label>
                                                <input v-model.trim="form.first_name" class="form-control" type="text" :id="prefix + '-first-name'" name="first_name" required
                                                    maxlength="100"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-last-name'">Last Name</label>
                                                <input v-model.trim="form.last_name" class="form-control" type="text" :id="prefix + '-last-name'" name="last_name" required
                                                    maxlength="100"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-email'">Email</label>
                                                <input v-model.trim="form.email" class="form-control" type="email" :id="prefix + '-email'" name="email" required
                                                    maxlength="100"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-phone'">Phone Number</label>
                                                <input v-model.trim="form.phone" class="form-control" type="text" :id="prefix + '-phone'" name="phone"
                                                    maxlength="50"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-password'" class="w-100">Password <small class="pull-right">Leave blank if you don't want to change it</small></label>
                                                <input v-model.trim="form.password" class="form-control" type="password" :id="prefix + '-password'" name="password" autocomplete="new-password"
                                                    minlength="${C.PASSWORD.MIN_LENGTH}"
                                                    @change="onInputChange($event, 'password')"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">Min. ${C.PASSWORD.MIN_LENGTH} chars required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-password-retype'">Confirm Password</label>
                                                <input v-model.trim="form.confirm_password" class="form-control" type="password" :id="prefix + '-password-retype'" name="confirm_password"
                                                    @change="onInputChange($event, 'confirm_password')">
                                                <div class="invalid-feedback">Password and confirm password does not match</div>
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
