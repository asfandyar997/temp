import C from "../config/constants";

export default {
    methods: {
        onApproved(e, data) {
            e.preventDefault();
            if (!data.approved) {
                this.onApprove(true, data);
            } else {
                this.onApprove(false, data);
            }
        },
        onApprove(status, data) {
            if (status) {
                let name = '';
                switch (this.$route.name) {
                    case 'tenant-view':
                        name = 'tenant-approve-view';
                        break;
                    case 'home':
                        name = 'tenant-approve-recent';
                        break;
                    case 'tenants':
                    default:
                        name = 'tenant-approve';
                        break;
                }
                this.$router.push({
                    name: name,
                    params: {
                        uid: data.uid
                    }
                });
            } else {
                this.$snotify.confirm(
                    `Are you sure you want to REJECT ${data.full_name}? The rejected application email will be sent to the user's address.`,
                    'Rejection',
                    {
                        type: 'error',
                        timeout: 5000,
                        showProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        position: 'centerCenter',
                        buttons: [{
                            text: 'Cancel',
                            action: (toast) => {
                                this.$snotify.remove(toast.id);
                            }
                        }, {
                            text: 'Confirm',
                            action: (toast) => {
                                this.$snotify.remove(toast.id);
                                data.approved = status;
                                data.rejected_date = new Date();
                                this.$bus.$emit(C.EVENT.TENANTS.APPROVE, data);
                            },
                            bold: true
                        }]
                    });
            }
        }
    }
}
