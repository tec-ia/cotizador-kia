import DB from "@/lib/util/sqlite"

const query_get = "SELECT * FROM user"
const query_get_by_username = "SELECT * FROM user WHERE username = ?"
const query_create = "INSERT INTO user (img_path, warranty, year, model, version, cost_price, selling_price, mileage, color, transmission, fuel_type, fuel_consumption, engine_power, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
const query_delete = "DELETE FROM user WHERE id = ?"
const query_update = "UPDATE FROM user SET img_path = ?, warranty = ?, year = ?, model = ?, version = ?, cost_price = ?, selling_price = ?, mileage = ?, color = ?, transmission = ?, fuel_type = ?, fuel_consumption = ?, engine_power = ?, description = ? WHERE id = ?) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

const UserStore = {

    async get() {
        const db = await DB.open()
        const result = await db.all(query_get)
        return result
    },

    async get_by_username(username) {
        const db = await DB.open()
        const result = await db.get(query_get_by_username, username)
        return result
    },

    async create(newValues) {
        const db = await DB.open()
        const result = await db.run(query_create, newValues)
        return result
    },

    async delete(filter) {
        const db = await DB.open()
        const result = await db.run(query_delete, filter)
        return result
    },

    async update(filter, newValues) {
        const params = [...newValues, filter]
        const db = await DB.open()
        const result = await db.run(query_update, params)
        return result
    },

}

export default UserStore