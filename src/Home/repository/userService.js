import firebaseService from "../../Shared/services/firebaseService";

const fetchUser = async (username) => {
    let dataUser = await firebaseService.getData('users', 'username', '==', username);
    if (!dataUser.empty) {
        return dataUser.docs[0].data();
    }
    dataUser = await firebaseService.saveData('users', {username});
    return dataUser.docs[0].data();
    fetchUsers = async () => {
        return (await this.db.collection('users').get()).docs.map(doc => doc.data());
    }
};

export default {
    login,
}
