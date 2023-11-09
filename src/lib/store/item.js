import DB from "@/lib/util/sqlite"

const query_get = "SELECT * FROM item"
const query_one = "SELECT * FROM item"
const query_create = "INSERT INTO item (img_path, warranty, year, model, version, cost_price, selling_price, color, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
const query_delete = "DELETE FROM item WHERE id = ?"
const query_update = "UPDATE item SET img_path = ?, warranty = ?, year = ?, model = ?, version = ?, cost_price = ?, selling_price = ?, color = ?, description = ? WHERE id = ?"

const ItemStore = {

    async get() {
        const db = await DB.open()
        const result = await db.all(query_get)
        return result
    },

    async one(filter) {
        const db = await DB.open()
        const result = await db.get(query_one, filter)
        return result
    },

    async create(newData) {
        const { img_path, warranty, year, model, version, cost_price, selling_price, color, description } = newData
        const params = [img_path, warranty, year, model, version, cost_price, selling_price, color, description]
        const db = await DB.open()
        const result = await db.run(query_create, params)
        return result.lastID
    },

    async delete(filter) {
        const db = await DB.open()
        const result = await db.run(query_delete, filter)
        return result.changes
    },

    async update(filter, newData) {
        const { img_path, warranty, year, model, version, cost_price, selling_price, color, description } = newData
        const params = [img_path, warranty, year, model, version, cost_price, selling_price, color, description, filter]
        const db = await DB.open()
        const result = await db.run(query_update, params)
        return result.changes
    },

}

export default ItemStore