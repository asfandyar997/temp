import C from '../config/constants';
import _ from '../utils/utilities';
import DateTime from '../utils/date';

/**
 * Payment Frequency mixin.
 */
export default {
    data() {
        return {
            paymentFrequencies: [
                {text: 'Monthly', value: C.PAYMENT_FREQUENCY.MONTHLY},
                {text: 'Weekly', value: C.PAYMENT_FREQUENCY.WEEKLY},
                {text: 'Not Applicable', value: C.PAYMENT_FREQUENCY.NOT_APPLICABLE}
            ],
            now: new Date()
        }
    },
    computed: {
        paymentPickerType() {
            return this.form.payment_frequency === C.PAYMENT_FREQUENCY.WEEKLY ? 'week' : 'date';
        },
        paymentPickerDisabled() {
            return this.form.payment_frequency === C.PAYMENT_FREQUENCY.NOT_APPLICABLE;
        },
        paymentNextDue: {
            get() {
                if (_.empty(this.form.payment_next_due)) {
                    return '';
                }
                return this.form.payment_next_due instanceof Date ? this.form.payment_next_due : new Date(this.form.payment_next_due);
            },
            set(value) {
                this.form.payment_next_due = _.empty(value) ? null : DateTime.format(value, DateTime.FORMATS.isoDate);
            }
        },
        paymentNextDueNotValid() {
            return this.form.payment_frequency !== C.PAYMENT_FREQUENCY.NOT_APPLICABLE && _.empty(this.form.payment_next_due);
        }
    },
    watch: {
        'form.payment_frequency'() {
            this.onPaymentChange();
        }
    },
    methods: {
        onPaymentChange() {
            if (this.form.payment_frequency === C.PAYMENT_FREQUENCY.WEEKLY) {
                this.paymentNextDue = DateTime.startOfWeek(this.paymentNextDue || new Date());
            } else if (this.form.payment_frequency === C.PAYMENT_FREQUENCY.NOT_APPLICABLE) {
                this.paymentNextDue = '';
            }
        }
    }
}
