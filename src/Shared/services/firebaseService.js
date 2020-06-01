import * as firebase from 'firebase'
import 'firebase/firestore';
import firebaseConfig from '../configuration/firebaseConfig';

class firebaseService {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
    };
    saveData = async (collection, data) => {
        let response = await this.db.collection(collection).add(data);
        response.docs.map(doc => doc.data());
    };
    getData = async (collection, atributte, operator, value) => {
        let collectionRef = this.db.collection(collection);
        if (atributte) {
           collectionRef = collectionRef.where(atributte, operator , value);
        }
        let data = await collectionRef.get();
        return data.docs.map(doc => doc.data());
    };

    createVersusGame = async (idDoc, data) => {
        const game = await this.db.collection('games').doc(idDoc);
        game.set(data);
        return game
    }
    getGame = async (idGame) => {
        return await this.db.collection('games').doc(idGame);
    }
    subscribe = async (collection, filters, dispatchAdded, DispatchModified, DispatchRemoved) => {
        let collectionRef = this.db.collection(collection);
        if (filters && Array.isArray(filters)) {
            filters.forEach(filter => {
                collectionRef = collectionRef.where(filter.atributte, filter.operator, filter.value);
            });
        }
        collectionRef.onSnapshot(function(snapshot) {
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
    };
}
const singletonFirebaseServices = new firebaseService();
Object.freeze(singletonFirebaseServices);
export default singletonFirebaseServices;
