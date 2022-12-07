import C from './../../config/constants';

export default {
    render() {
        return `
            <div class="v-user">
                <div class="row">
                    <div class="col-lg-12 col-xl-8">
                        <div class="panel">
                            <div class="panel-body">
                                <form @submit.prevent="onSubmit" name="user-form">
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
                                    <div class="form-row p-l-5">
                                        <div class="col-md-4">
                                            <label :for="prefix + '-tenant_no'">Tenant No</label>
                                                <input v-model.trim="form.tenant_no" class="form-control text-uppercase" type="text" :id="prefix + '-tenant_no'" name="tenant_no"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid">
                                        </div>
                                        <div class="col-md-3">
                                            <label :for="prefix + '-postcode'">Postcode</label>
                                                <input v-model.trim="form.postcode" class="form-control text-uppercase" type="text" :id="prefix + '-postcode'" name="postcode"
                                                    @change="onInputChange"
                                                    @invalid.prevent="onInputInvalid" required>
                                            <div class="invalid-feedback">This field is required</div>
                                        </div>
                                        <div class="col-md-5 m-t-30 p-l-20">
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-active'" v-model="form.active" @change="onInputChange">
                                                <label :for="prefix + '-active'">Active <i class="fas fa-info-circle" v-tooltip.top="'Deactivated user cannot sign-in to the system'"/> </label>
                                            </div>
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-newsletter'" v-model="form.newsletter" @change="onInputChange">
                                                <label :for="prefix + '-newsletter'">Newsletter <i class="fas fa-info-circle" v-tooltip.top="'Newsletter and monthly emails'"/> </label>
                                            </div>
                                            <div class="checkbox checkbox-css checkbox-inline">
                                                <input type="checkbox" :id="prefix + '-property-notification'" v-model="form.property_notification" @change="onInputChange">
                                                <label :for="prefix + '-property-notification'">Property notification</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row p-l-5">
                                        <div class="col-md-4">
                                            <label :for="prefix + '-payment-frequency'" class="m-t-10">Payment frequency</label>
                                            <model-select
                                                :id="prefix + '-payment-frequency'"
                                                :options="paymentFrequencies"
                                                v-model="form.payment_frequency"
                                                class="form-control thread-status"
                                                required>
                                            </model-select>
                                        </div>
                                        <div class="col-md-4">
                                            <label :for="prefix + '-payment-next-due'" class="m-t-10">Next Payment Due</label>
                                            <br/>
                                            <date-picker 
                                                :id="prefix + '-payment-next-due'"
                                                v-model="paymentNextDue" 
                                                valueType="date" 
                                                lang="en"
                                                :type="paymentPickerType"
                                                :disabled="paymentPickerDisabled"
                                                :editable="paymentPickerDisabled"
                                                :notBefore="now"
                                                format="D/MM/YYYY"
                                                inputClass="form-control date-input"
                                                name="payment_next_due">
                                            </date-picker>
                                            <div class="invalid-feedback" :class="[paymentNextDueNotValid ? 'd-block' : '']">This field is required</div>
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
