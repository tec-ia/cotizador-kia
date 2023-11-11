import ItemStore from "../store/item"

import {
    STATUS_RESPONSE_SUCCESS,
    STATUS_RESPONSE_FAILED,
    STATUS_RESPONSE_NOTFOUND
} from "../helper/constants"

const ItemService = {

    get: async () => {
        try {

            const result = await ItemStore.get()

            return {
                status: STATUS_RESPONSE_SUCCESS,
                message: "Exito: Se han obtenido los datos",
                data: result
            }

        } catch (error) {

            console.log(error.message)

            return {
                status: STATUS_RESPONSE_FAILED,
                message: "Error: No se obtuvieron los datos",
                data: null
            }

        }
    },

    one: async (filter) => {
        try {

            const result = await ItemStore.one(filter)

            if (result > 0) {
                return {
                    status: STATUS_RESPONSE_SUCCESS,
                    message: "Exito: Se han obtenido los datos",
                    data: result
                }
            }

            return {
                status: STATUS_RESPONSE_NOTFOUND,
                message: "Error: No se existe el registro",
                data: null
            }

        } catch (error) {

            console.log(error.message)

            return {
                status: STATUS_RESPONSE_FAILED,
                message: "Error: No se obtuvieron los datos",
                data: null
            }

        }
    },

    create: async (newData) => {
        try {

            const result = await ItemStore.create(newData)

            return {
                status: STATUS_RESPONSE_SUCCESS,
                message: "Exito: Se han insertado la información",
                data: result
            }

        } catch (error) {

            console.log(error)

            return {
                status: STATUS_RESPONSE_FAILED,
                message: "Error: No se insertó la información",
                data: null
            }

        }
    },

    delete: async (filter) => {
        try {

            const result = await ItemStore.delete(filter)

            return {
                status: STATUS_RESPONSE_SUCCESS,
                message: "Exito: Se ha eliminado correctamente",
                data: result
            }

        } catch (error) {

            console.log(error)

            return {
                status: STATUS_RESPONSE_FAILED,
                message: "Error: No se ha logrado eliminar",
                data: null
            }

        }
    },

    update: async (id, newData) => {
        try {

            const result = await ItemStore.update(id, newData)

            return {
                status: STATUS_RESPONSE_SUCCESS,
                message: "Exito: Se han actualizado los datos",
                data: result
            }

        } catch (error) {

            console.log(error)

            return {
                status: STATUS_RESPONSE_FAILED,
                message: "Error: No se actualizaron los datos",
                data: null
            }

        }
    }

}

export default ItemService