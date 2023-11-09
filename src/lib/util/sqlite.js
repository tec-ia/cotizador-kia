import sqlite3 from "sqlite3"
import { open } from "sqlite"

class DB {

    static #db

    static async open() {

        if (!this.#db) {

            this.#db = await open({
                filename: "./cotizador.db",
                driver: sqlite3.Database,
            })

        }

        return this.#db

    }

    static close() {

        if (this.#db != undefined) {
            this.#db.close()
            this.#db = undefined
        }

    }

}

module.exports = DB
