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

}
const singletonFirebaseServices = new firebaseService();
Object.freeze(singletonFirebaseServices);
export default singletonFirebaseServices;
