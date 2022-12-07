import C from './../config/constants';

/**
 * Game model
 */
export default Object.freeze({
    id: null,
    uid: null,
    game_type_id: null,
    season_id: '',
    name: '',
    price: 0,
    value: 0,
    round_count: 0,
    player_count: 0,
    status: C.GAME_STATUS.PENDING,
    active: false,
    game_type: null,
    rounds: [],
    current_round: null
});
