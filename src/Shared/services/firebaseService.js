import * as firebase from 'firebase'
import 'firebase/firestore';
import firebaseConfig from '../configuration/firebaseConfig';

class firebaseService {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
    };
    getData = async (collection, atributte, operator, value) => {
        //Metodo que devuelve un array con los documentos encontrados
        let collectionRef = this.db.collection(collection);
        if (atributte) {
           collectionRef = collectionRef.where(atributte, operator , value);
        }
        let data = await collectionRef.get();
        return data.docs.map(doc => doc.data());
    };

    getDataById = async (colleccion, id) => {
        //Metodo que devuelve el documento buscado
        let docRef = await this.db.collection(colleccion).doc(id).get();
        return docRef.data();
    };
    saveData = async (collection, data) => {
        //Metodo que permite crear un documento con id generico
        let response = await this.db.collection(collection).add(data);
        return response.docs.map(doc => doc.data());
    };
    saveDataWithId = async (collection, idDoc, data) => {
        //Metodo que permite crear un documento con id parametrizado
        return await this.db.collection('games').doc(idDoc).set(data);
    };
    updateData = async (collection, idDoc, data) => {
        //Metodo que permite actualizar algunas propiedades de un documento aprticular
        return await this.db.collection('games').doc(idDoc).update(data);
    };
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
                        return dispatchAdded(change.doc.data());
                    }
                    if (change.type === "modified") {
                        return DispatchModified(change.doc.data());
                    }
                    /*if (change.type === "removed") {
                        DispatchRemoved(change.doc.data());
                    }*/
                });
            });
    };
}
const singletonFirebaseServices = new firebaseService();
Object.freeze(singletonFirebaseServices);
export default singletonFirebaseServices;
