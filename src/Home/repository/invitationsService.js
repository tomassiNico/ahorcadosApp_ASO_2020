import firebaseService from "../../Shared/services/firebaseService";
import Filter from "../../Shared/entities/filter";

const subscribeInvitations = (username, dispatch) => {
    let filters = [];
    filters.push(new Filter('username2', '==', username));
    filters.push(new Filter('winner', '==', ''));
    firebaseService.subscribe(
        'games',
        filters,
        (data) => {
            if (data.winner === '') {
                dispatch({type: 'SAVE_INVITATION', data});
            }
        },
    )
};

export default {
    subscribeInvitations,
}
