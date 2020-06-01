import firebaseService from "../../Shared/services/firebaseService";
import wordServiceSQLite from "../../Shared/services/wordServiceSQLite";

const updateWords = async () => {
    let wordsFirebase = await firebaseService.getData(
        'words',
    );
    //Seteo la base de datos en caso de que el usuario entre por primera vez
    await wordServiceSQLite.setDatabase();
    //Busco los niveles que estan en la base de datos
    let levels = await wordServiceSQLite.getLevels();
    //Quito todas las palabras de niveles que ya estaban en la base de datos
    let newLevel = wordsFirebase.filter((wordFirebaseData) => !levels.includes(wordFirebaseData.level));
    //Guardo las palabras del nuevo nivel en la base de datos
    await wordServiceSQLite.insertData(newLevel);
};

export default {
    updateWords,
}
