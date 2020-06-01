import firebaseService from "../../Shared/services/firebaseService";
import Filter from "../../Shared/entities/filter";

const subscribeInvitations = (username, dispatch) => {
    let filters = [];
    filters.push(new Filter('username2', '==', username));
    firebaseService.subscribe(
        'games',
        filters,
        (data) => {
            dispatch({type: 'SAVE_GAME', data})
        },
        (data) =>
            dispatch({type: 'UPDATE_GAME', data})
    )
};

const subscribeGames = (username, dispatch) => {
    let filters = [];
    filters.push(new Filter('username1', '==', username));
    firebaseService.subscribe(
        'games',
        filters,
        (data) => {
            dispatch({type: 'SAVE_GAME', data})
        },
        (data) =>
            dispatch({type: 'UPDATE_GAME', data})
    )
};

export default {
    subscribeInvitations,
    subscribeGames,
}
