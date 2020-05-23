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


}
const singletonFirebaseServices = new firebaseService();
Object.freeze(singletonFirebaseServices);
export default singletonFirebaseServices;
