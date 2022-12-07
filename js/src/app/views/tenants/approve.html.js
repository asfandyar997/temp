export default {
    render() {
        return `
            <div class="v-tenant-approve modal fade" :id="prefix + '-modal'" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-internal-mask" v-if="isWorking"></div>
                        <div class="modal-header">
                            <h4 class="modal-title">Tenant - approvement</h4>
                            <button type="button" @click="onClose" class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close" :disabled="isWorking" :aria-disabled="isWorking">×</button>
                        </div>
                        <form @submit.prevent="onSubmit">
                            <div class="modal-body">
                                <div class="form-row p-l-5">
                                    <div class="col-md-6">
                                        <label :for="prefix + '-payment-frequency'" class="m-t-10">Payment frequency</label>
                                        <model-select
                                            :id="prefix + '-payment-frequency'"
                                            :options="paymentFrequencies"
                                            v-model="form.payment_frequency"
                                            class="form-control thread-status"
                                            required>
                                        </model-select>
                                    </div>
                                    <div class="col-md-6">
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
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success" :aria-disabled="isWorking" :disabled="isWorking">
                                    <i class="fas fa-save" aria-hidden="true" v-show="!isWorking"></i>
                                    <i class="fas fa-cog fa-spin" aria-hidden="true" v-show="isWorking"></i>
                                    Approve tenant
                                </button>
                                <button type="button" class="btn btn-white" data-dismiss="modal" @click="onClose" :aria-disabled="isWorking" :disabled="isWorking">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            `;
    }
}
