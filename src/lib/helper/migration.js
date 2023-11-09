const sqlite3 = require("sqlite3").verbose()
var md5 = require('md5')

const db = new sqlite3.Database(
    "./cotizador.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message)
        }
        console.log("Connected to the SQlite database.")
    }
)

db.serialize(() => {

    var sql_USER = 'INSERT INTO user (email, username, password) VALUES(?, ?, ?)'

    db.run('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, email VARCHAR(20), username VARCHAR(20), password VARCHAR(100))', (err) => {
        if (err) {
            return console.log(err.message)
        }

        console.log("Created USER table.")

        db.run(sql_USER, ['admin.app@gmail.com', 'user_admin', md5('123123')], function (err) {
            if (err) {
                return console.error(err.message)
            }

            const id = this.lastID // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`)
        })
    })

    var sql = 'INSERT INTO item (img_path, warranty, year, model, version, cost_price, selling_price, color, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'

    db.run('CREATE TABLE IF NOT EXISTS item (id INTEGER PRIMARY KEY, img_path VARCHAR(100), warranty VARCHAR(10), year VARCHAR(10), model VARCHAR(20), version VARCHAR(20), cost_price VARCHAR(20), selling_price VARCHAR(20), color VARCHAR(20), description TEXT)', (err) => {
        if (err) {
            return console.log(err.message)
        }

        console.log("Created ITEM table.")

        db.run(sql, ['img_file_path', '1', '2022', 'Kia Forte 90BD332K-LWE', 'Deportivo', '200,000.00', '250,000.00', 'Rojo', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi pariatur a magni vitae recusandae.'], function (err) {
            if (err) {
                return console.error(err.message)
            }

            const id = this.lastID // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`)
        })

        db.run(sql, ['img_file_path', '4', '2000', 'Kia Forte 9ERGER3453-L', 'Ostero', '220,000.00', '280,000.00', 'Rojo', '<p>Esta es la descripcion de uno de los productos, se supone que es el que tiene el id: <b>2</b></p>.'], function (err) {
            if (err) {
                return console.error(err.message)
            }

            const id = this.lastID // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`)
        })
    })
})