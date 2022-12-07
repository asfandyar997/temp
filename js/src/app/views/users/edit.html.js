import C from './../../config/constants';

export default {
    render() {
        return `
            <div class="v-user">
                <form @submit.prevent="onSubmit" name="user-form">
                    <div class="row">
                        <div class="col-lg-12 col-xl-8">
                            <div class="panel">
                                <div class="panel-body">
                                    <legend>
                                        Login details
                                        <button v-if="!isNew" type="button" class="btn btn-aqua btn-sm pull-right" :aria-disabled="isWorking" :disabled="isWorking" @click="onPayments">Show Payments</button>
                                    </legend>
                                    <hr>
                                    <div class="form-row m-b-10">
                                        <div class="col-md-6">
                                            <div class="form-group m-b-10 p-t-5">
                                                <label :for="prefix + '-first-name'">First Name</label>
                                                <input v-model.trim="form.first_name" class="form-control" type="text" :id="prefix + '-first-name'" name="first_name" required
                                                    maxlength="100"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
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
                                                <label :for="prefix + '-email'" class="w-100">Email <small class="pull-right">Login to the app</small></label>
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
                                                    @invalid.prevent="onInputInvalid"
                                                    :required="isNew">
                                                <div class="invalid-feedback">Min. ${C.PASSWORD.MIN_LENGTH} chars required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-password-retype'">Confirm Password</label>
                                                <input v-model.trim="form.confirm_password" class="form-control" type="password" :id="prefix + '-password-retype'" name="confirm_password"
                                                    @change="onInputChange($event, 'confirm_password')" :required="isNew">
                                                <div class="invalid-feedback">Password and confirm password does not match</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row p-l-5">
                                        <div class="col-md-6" v-if="isRoot">
                                            <label :for="prefix + '-type'">User type</label>
                                            <model-select
                                                :id="prefix + '-type'"
                                                :options="types"
                                                v-model="form.type"
                                                placeholder="Select user type"
                                                class="form-control"
                                                required>
                                            </model-select>
                                            <div class="invalid-feedback">This field is required</div>
                                        </div>
                                        <div class="col-md-3" :class="{'m-t-30 p-l-20': isRoot}">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-active'" v-model="form.active" @change="onInputChange">
                                                <label :for="prefix + '-active'">Active <i class="fas fa-info-circle" v-tooltip.top="'Deactivated user cannot sign-in to the system'"/> </label>
                                            </div>
                                        </div>
                                        <div class="col-md-3" :class="{'m-t-30': isRoot}">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-approved'" v-model="form.approved" @change="onInputChange">
                                                <label :for="prefix + '-approved'">W2 Approved <i class="fas fa-info-circle" v-tooltip.top="'Approve user only on positive check results in W2. Not approved users cannot sign-in and play'"/> </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-12 col-xl-8" v-if="isFormTypePlayer">
                            <div class="panel">
                                <div class="panel-body">
                                    <legend>Player details</legend>
                                    <hr>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-username'" class="w-100">Username <small class="pull-right">Has to be unique</small></label>
                                                <input v-model.trim="form.username" class="form-control" type="text" :id="prefix + '-username'" name="username" required
                                                    maxlength="255"
                                                    minlength="5"
                                                    pattern="[a-zA-Z0-9]+"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid"
                                                    @input="onInputUsername">
                                                <i class="fas fa-cog fa-spin input-loader" aria-hidden="true" v-show="isUsernameChecking"></i>
                                                <div class="invalid-feedback">{{usernameFeedback}}</div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-dob'">Date of birth</label>
                                                <date-picker 
                                                    :id="prefix + '-dob'"
                                                    v-model="dob" 
                                                    valueType="date" 
                                                    lang="en"
                                                    type="date"
                                                    :notBefore="now"
                                                    format="D/MM/YYYY"
                                                    :inputClass="[dobNotValid ? 'form-control date-input is-invalid' : 'form-control date-input']"
                                                    @change="onInputChange($event, 'date-input')"
                                                    name="dob">
                                                </date-picker>
                                                <div class="invalid-feedback" :class="[dobNotValid ? 'd-block' : '']">This field is required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-4">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-postcode'">Postcode</label>
                                                <input v-model.trim="form.postcode" class="form-control text-uppercase" type="text" :id="prefix + '-postcode'" name="postcode"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid" required>
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-address'">Address</label>
                                                <input v-model.trim="form.address" class="form-control text-uppercase" type="text" :id="prefix + '-address'" name="address"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid" required>
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-street'">Street</label>
                                                <input v-model.trim="form.street" class="form-control text-uppercase" type="text" :id="prefix + '-street'" name="street"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid" required>
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-4">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-city'">City</label>
                                                <input v-model.trim="form.city" class="form-control text-uppercase" type="text" :id="prefix + '-city'" name="city"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid" required>
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-county'">County</label>
                                                <input v-model.trim="form.county" class="form-control text-uppercase" type="text" :id="prefix + '-county'" name="county"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid" required>
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group m-b-10">
                                                <label :for="prefix + '-country'">Country:</label>
                                                <model-list-select
                                                    :id="prefix + '-country'"
                                                    :list="countries"
                                                    option-value="v"
                                                    option-text="n"
                                                    v-model="form.country"
                                                    placeholder="Select country"
                                                    class="vue-search-select">
                                                </model-list-select>
                                                <div class="invalid-feedback">This field is required</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                    
                       <div class="col-lg-12 col-xl-8" v-if="isFormTypePlayer">
                            <div class="panel">
                                <div class="panel-body">
                                    <legend>Approvals</legend>
                                    <hr>
                                    <div class="form-row">
                                        <div class="col-md-3">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-approval-marketing'" v-model="form.approval_marketing" @change="onInputChange">
                                                <label :for="prefix + '-approval-marketing'">Marketing Preferences</label>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-approval-tac'" v-model="form.approval_tac" @change="onInputChange">
                                                <label :for="prefix + '-approval-tac'">Terms & Conditions</label>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-approval-cookie'" v-model="form.approval_cookie" @change="onInputChange">
                                                <label :for="prefix + '-approval-cookie'">Cookie Policy</label>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-approval-privacy'" v-model="form.approval_privacy" @change="onInputChange">
                                                <label :for="prefix + '-approval-privacy'">Privacy Policy</label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="form-row m-t-10">
                                        <div class="col-md-12">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-allow-products-services'" v-model="form.allow_products_services" @change="onInputChange">
                                                <label :for="prefix + '-allow-products-services'">Allow to send information about products and services</label>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div class="form-row m-t-10">
                                        <div class="col-md-12">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-allow-newsletter'" v-model="form.allow_newsletter" @change="onInputChange">
                                                <label :for="prefix + '-allow-newsletter'">Agree to receive newsletter</label>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div class="form-row m-t-10">
                                        <div class="col-md-12">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-allow-3rd-parties'" v-model="form.allow_3rd_parties" @change="onInputChange">
                                                <label :for="prefix + '-allow-3rd-parties'">Agree to contacted by third parties</label>
                                            </div>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                       </div>
                       
                       <div class="col-lg-12 col-xl-8" v-if="isFormTypePlayer">
                            <div class="panel">
                                <div class="panel-body">
                                    <legend>Preferred method of communications</legend>
                                    <hr>
                                    <div class="form-row">
                                        <div class="col-md-3">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-pmoc-email'" v-model="form.pmoc_email" @change="onInputChange">
                                                <label :for="prefix + '-pmoc-email'">Email</label>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-pmoc-sms'" v-model="form.pmoc_sms" @change="onInputChange">
                                                <label :for="prefix + '-pmoc-sms'">SMS</label>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-pmoc-notification'" v-model="form.pmoc_notification" @change="onInputChange">
                                                <label :for="prefix + '-pmoc-notification'">Push Notifications</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </div>
                                                            
                    </div>
                    <div class="row m-t-10">
                        <div class="col-lg-12 col-xl-8 panel-footer text-right">
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
        `;
    }
}
