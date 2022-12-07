import C from "./../config/constants";

/**
 * Round model
 */
export default Object.freeze({
    id: null,
    no: '',
    uid: '',
    game_id: null,
    entry_open: '',
    entry_close: '',
    status: C.ROUND_STATUS.PENDING,
    fixture_count: 0,
    fixtures: [],
    dirty: false
});
