import C from "./../config/constants";

/**
 * Fixture model
 */
export default Object.freeze({
    id: null,
    away_team_id: null,
    away_team_score: null,
    away_team: null,
    home_team_id: null,
    home_team_score: null,
    home_team: null,
    match_date: '',
    match_winner: null,
    opta_uid: null,
    round_id: null,
    state: C.FIXTURE_STATE.PREMATCH,
    dirty: false
});
