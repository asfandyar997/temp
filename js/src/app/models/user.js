import C from './../config/constants';

/**
 * User model
 */
export default Object.freeze({
    id: null,
    uid: null,
    email: '',
    password: '',
    type: C.USER_TYPE.USER,
    first_name: '',
    last_name: '',
    avatar: null,
    dob: null,
    phone: null,
    postcode: null,
    address: null,
    street: null,
    city: null,
    country: null,
    county: null,
    active: false
});
