import * as firebase from 'firebase'
import 'firebase/firestore';
import firebaseConfig from '../configuration/firebaseConfig';

class firebaseService {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
    };
    saveData = async (collection, data) => {
         return await this.db.collection(collection).add(data);
    };
    getData = async (collection, atributte, operator, value) => {
        return await this.db.collection(collection).where(atributte, operator , value).get();
    }
    fetchUsers = async () => {
        return (await this.db.collection('users').get()).docs.map(doc => doc.data());
    }
    createVersusGame = async (idDoc, data) => { 
        const game = await this.db.collection('games').doc(idDoc);
        game.set(data);
        return game
    }
    getGame = async (idGame) => {
        return await this.db.collection('games').doc(idGame);
    }
    subscribe = async (collection, atributte, operator, value, dispatchAdded, DispatchModified, DispatchRemoved) => {
        this.db.collection(collection).where(atributte, operator, value)
            .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        dispatchAdded(change.doc.data());
                    }
                    //No contemplado aun
                    /*if (change.type === "modified") {
                        DispatchModified(change.doc.data());
                    }
                    if (change.type === "removed") {
                        DispatchRemoved(change.doc.data());
                    }*/
                });
            });
    }
    subscribeWithTwoConditions = async (collection, atributte1, operator1, value1,atributte2, operator2, value2, dispatchAdded, DispatchModified, DispatchRemoved) => {
        this.db.collection(collection).where(atributte1, operator1, value1).where(atributte2, operator2,value2)
            .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        dispatchAdded(change.doc.data());
                    }
                    //No contemplado aun
                    /*if (change.type === "modified") {
                        DispatchModified(change.doc.data());
                    }
                    if (change.type === "removed") {
                        DispatchRemoved(change.doc.data());
                    }*/
                });
            });
    }

}
const singletonFirebaseServices = new firebaseService();
Object.freeze(singletonFirebaseServices);
export default singletonFirebaseServices;
