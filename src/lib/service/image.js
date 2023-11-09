import ImageStore from "../store/image"

import {
    STATUS_RESPONSE_SUCCESS,
    STATUS_RESPONSE_FAILED
} from "../helper/constants"

const ImageService = {

    write: (file_name, buffer) => {
        try {

            const result = ImageStore.write(file_name, buffer)

            return {
                status: STATUS_RESPONSE_SUCCESS,
                message: "Exito: Se ha creado el archivo",
                data: result
            }

        } catch (error) {

            console.log(error.message)

            return {
                status: STATUS_RESPONSE_FAILED,
                message: "Error: No se ha creado el archivo",
                data: null
            }

        }
    }

}

export default ImageService