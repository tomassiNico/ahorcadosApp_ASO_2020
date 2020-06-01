import firebaseService from "../../Shared/services/firebaseService";

const createVersusGame = async (idGame, gameData) => {
    return await firebaseService.saveDataWithId('games', idGame, gameData);
};

const getVersusGame = async (idGame) => {
    return firebaseService.getDataById('games', idGame);
};

const updateVersusGame = async (idGame, gameData) => {
    return await firebaseService.updateData('games', idGame, gameData);
};

export default {
    createVersusGame,
    getVersusGame,
    updateVersusGame
}
