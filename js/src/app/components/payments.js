import Grid from './../mixins/grid';
import Formatters from './../utils/formatters';
import Toolbar from './payments/toolbar';
import Loader from './loader';
import template from './../views/payments.html';
import DateTime from './../utils/date';

const DATETIME_FORMAT = DateTime.FORMATS.ukDateTime;

export default {
    mixins: [
        Grid
    ],
    components: {
        Toolbar,
        Loader
    },
    data() {
        return {
            perPage: 10,
            sortOrder: [{
                field: 'Payments.created',
                direction: 'desc'
            }],
            columns: [
                {
                    title: 'ID',
                    name: 'id',
                    sortField: 'Payments.id',
                    visible: false
                }, {
                    title: 'Reference',
                    name: 'reference',
                    sortField: 'Payments.reference'
                }, {
                    title: 'Amount',
                    name: 'amount',
                    sortField: 'Payments.amount',
                    formatter: (value) => Formatters.price(value)
                }, {
                    title: 'User Email',
                    name: 'user.email',
                    sortField: 'Users.email'
                }, {
                    title: 'User Name',
                    name: 'user.full_name',
                    sortField: 'Users.full_name'
                }, {
                    title: 'Description',
                    name: 'description',
                    sortField: 'Payments.description'
                }, {
                    title: 'Checkout UID',
                    name: 'checkout_uid',
                    sortField: 'Payments.checkout_uid'
                }, {
                    title: 'Status',
                    name: 'status',
                    sortField: 'Payments.status',
                    formatter: (value) => {
                        return value ? "Paid" : "Pending";
                    }
                }, {
                    name: 'created',
                    sortField: 'Payments.created',
                    title: 'Created Date',
                    formatter: (value) => Formatters.dateTime(value, '--', DATETIME_FORMAT)
                }, {
                    name: 'modified',
                    sortField: 'Payments.modified',
                    title: 'Modified Date',
                    formatter: (value) => Formatters.dateTime(value, 'Not modified yet', DATETIME_FORMAT)
                }
            ]
        }
    },
    props: {
        user: Object,
        settings: Object
    },
    methods: {},
    watch: {
        '$route': function (to) {
            if (to.name === 'payments') {
                if (to.query.user) {
                    this.params.filters = {
                        user: to.query.user,
                        keyword: ''
                    };
                }
                this.onRouteChange(to);
            }
        }
    },
    template: template.render()
}
