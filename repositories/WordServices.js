import * as SQLite from 'expo-sqlite';
import words from "../helper/words";
const db = SQLite.openDatabase("Ahorcados.db");

class WordServices {
    constructor() {
        this.initialize();
    };
    initialize() {
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists words (id integer primary key not null,  word text);"
            );
            tx.executeSql("select * from words", [], (_, { rows }) => {
                if ( rows.length === 0) {
                    this.insertData();
                }
            });
        });
    };

    getWord() {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql("SELECT * FROM words ORDER BY RANDOM() LIMIT 1", [], (_, { rows }) => {
                          resolve(rows.item(0).word);
                    });
                },
                null,
            );
        })
    };

    insertData() {
        db.transaction(
            tx => {
                words.forEach(data => {
                    tx.executeSql("insert into words (word) values (?)", [data.word]);
                })
            },
            null,
        );
    }

    getWords() {
        db.transaction(
            tx => {
                tx.executeSql("select * from words", [], (_, { rows }) => {
                        return JSON.stringify(rows);
                });
            },
            null,
        );
    };

    deleteWords() {
        db.transaction(
            tx => {
                tx.executeSql("delete from words");
            },
            null,
        );
    };
}
const singletonWordServices = new WordServices();
Object.freeze(singletonWordServices);
export default singletonWordServices;