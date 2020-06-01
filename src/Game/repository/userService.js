import firebaseService from "../../Shared/services/firebaseService";

const fetchUser = async () => {
    let dataUser = await firebaseService.getData('users');
    return dataUser;
};

export default {
    fetchUser,
}
