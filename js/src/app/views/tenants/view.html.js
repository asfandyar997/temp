export default {
    render() {
        return `
            <div class="v-tenant">
                <div class="row">
                    <div class="col-md-4">
                        <div class="panel">
                            <div class="panel-heading">
                                <h4 class="panel-title">Tenant Record</h4>
                                <div class="btn-group m-t-3 m-b-3">
                                    <router-link :to="{name: 'threads', params: {uid: uid }}" tag="button" class="btn btn-primary btn-sm">
                                        Messages
                                    </router-link>
                                </div>
                            </div>
                            <div class="panel-body">
                                <form>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Name</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="form.full_name">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Tenant No</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="tenantNo">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">E-mail Address</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="form.email">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Postcode</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="postcode">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Approved</label>
                                        <div class="col-sm-9">
                                            <div class="switcher switcher-success" v-if="form.approved_date || form.rejected_date">
                                                <input type="checkbox" name="approved" :id="prefix + 'approved-tenant'" v-model="form.approved" @click="onApproved($event, form)">
                                                <label :for="prefix + 'approved-tenant'"></label>
                                            </div>
                                            <div class="small-circle-buttons" v-else>
                                                <a href="#" class="btn btn-success" @click.prevent="onApprove(true, form)">
                                                    <i class="fas fa-check"></i> Approve
                                                </a>
                                                <a href="#" class="btn btn-danger" @click.prevent="onApprove(false, form)">
                                                    <i class="fas fa-times"></i> Reject
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Approved Date</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="dateTime(form.approved_date)">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Rejected Date</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="dateTime(form.rejected_date)">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Last login</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="dateTime(form.last_login)">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Created</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="dateTime(form.created)">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Modified</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="modified">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Payment Frequency</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="paymentFrequency">
                                        </div>
                                    </div>
                                    <div class="form-group row m-b-15 align-items-center">
                                        <label class="col-sm-3 col-form-label">Next Payment Due</label>
                                        <div class="col-sm-9">
                                            <input type="text" readonly class="form-control-plaintext" :value="date(form.payment_next_due)">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <comments :uid="uid"></comments>
                    </div>
                </div>
            </div>
            `;
    }
}
