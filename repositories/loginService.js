import firebaseService from "./firebaseService";

const login = async (username) => {
    let dataUser = await firebaseService.getData('users', 'username', '==', username);
    if (!dataUser.empty) {
        return dataUser.docs[0].data();
    }
    dataUser = await firebaseService.saveData('users', {username});
    return dataUser.docs[0].data();
};

export default {
    login,
}
