import firebaseService from "../../Shared/services/firebaseService";

const login = async (username) => {
    let dataUser = await firebaseService.getData('users', 'username', '==', username);
    if (dataUser.length !== 0) {
        return dataUser[0];
    }
    dataUser = await firebaseService.saveData('users', {username});
    return dataUser[0];
};

export default {
    login,
}
