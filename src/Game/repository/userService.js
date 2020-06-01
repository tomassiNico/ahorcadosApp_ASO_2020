import firebaseService from "../../Shared/services/firebaseService";

const fetchUser = async (filterCurrentUser) => {
    let dataUser = await firebaseService.getData('users');
    return dataUser.filter(({username}) => username !== filterCurrentUser);
};

export default {
    fetchUser,
}
