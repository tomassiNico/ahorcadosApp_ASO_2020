import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("Ahorcados.db");

class WordServiceSQLite {
    constructor() {
        this.initialize();
    };
    initialize() {
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists words (id integer primary key not null,  word text, level text);"
            );
        });
    };

    getWord(level) {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    let sql = "";
                    let args = [];
                    if (level) {
                        sql = "SELECT * FROM words ORDER BY RANDOM() WHERE level = (?) LIMIT 1";
                        args.push(level);

                    } else {
                        sql = "SELECT * FROM words ORDER BY RANDOM() LIMIT 1"
                    }
                    tx.executeSql(sql, args, (_, { rows }) => {
                        resolve(rows.item(0).word);
                    });
                },
                null,
            );
        })
    };

    insertData(arrayWords) {
        db.transaction(
            tx => {
                arrayWords.forEach(wordData => {
                    const sql = "insert into words (word, level) values (?,?)";
                    const args = [wordData.word, wordData.level];
                    tx.executeSql(sql, args, (_, { rows }) => {
                        return JSON.stringify(rows);
                    }, (t, error) => {
                        console.log(error);
                    });
                });
            },
            null,
        );
    }

    getWords() {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql("select * from words", [], (_, { rows }) => {
                        resolve(rows);
                    });
                },
                null,
            );
        });
    };

    getLevels() {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql("select distinct level from words", [], (_, { rows }) => {
                        resolve(rows._array.map(row => row.level));
                    });
                },
                null,
            );
        });
    }
    setDatabase(arrayWords) {
        db.transaction(
            tx => {
                tx.executeSql("select * from words", [], (_, { rows }) => {
                    if ( rows.length === 0) {
                        arrayWords.forEach(wordData => {
                            const sql = "insert into words (word, level) values (?,?)";
                            const args = [wordData.word, wordData.level]
                            tx.executeSql(sql, args, (_, { rows }) => {
                                return JSON.stringify(rows);
                            }, (t, error) => {
                                console.log(error);
                            });
                        });
                    }
                });
            },
            null,
        );
    };
    dropTable() {
        db.transaction(
            tx => {
                tx.executeSql("drop table words", [], (_, { rows }) => {
                    return JSON.stringify(rows);
                });
            },
            null,
        );
    }
}
const singletonWordServices = new WordServiceSQLite();
Object.freeze(singletonWordServices);
export default singletonWordServices;
