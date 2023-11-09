import UserStore from "../store/user"

import {
    STATUS_RESPONSE_SUCCESS,
    STATUS_RESPONSE_FAILED,
    STATUS_RESPONSE_FORBIDDEN,
    STATUS_RESPONSE_UNAUTHORIZED
} from "../helper/constants"

import md5 from "md5"

const UserService = {

    get: async () => {
        try {

            const result = await UserStore.get()

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

    login: async (username, password) => {
        try {

            const result = await UserStore.get_by_username(username)

            if (!result) {
                return {
                    status: STATUS_RESPONSE_UNAUTHORIZED,
                    message: "Error: No existe el registro",
                    data: null
                }
            }

            if (result.password !== md5(password)) {
                return {
                    status: STATUS_RESPONSE_FORBIDDEN,
                    message: "Error: Las credenciales no coinciden",
                    data: null
                }
            }

            return {
                status: STATUS_RESPONSE_SUCCESS,
                message: "Exito: Se ha aprobado el acceso",
                data: {
                    id: result.id,
                    email: result.email,
                    username: result.username
                }
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

}

export default UserService