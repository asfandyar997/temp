import C from './../config/constants';

/**
 * User model
 */
export default Object.freeze({
    id: null,
    uid: null,
    tenant_no: '',
    email: '',
    password: '',
    type: C.USER_TYPE.TENANT,
    first_name: '',
    last_name: '',
    avatar: null,
    postcode: null,
    active: false,
    payment_frequency: C.PAYMENT_FREQUENCY.NOT_APPLICABLE
});
