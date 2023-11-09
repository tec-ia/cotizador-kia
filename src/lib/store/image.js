import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs';
import path from 'path'

const root_directory = 'uploads/images'

const ImageStore = {

    write: (fileName, buffer) => {

        fileName = fileName.toLowerCase()
        fileName = fileName.replaceAll(" ", "-")

        const newFileName = new Date().getTime() + '-' + fileName
        const fullPath = path.join(process.cwd(), 'public', root_directory)
        const finalPath = path.join(fullPath, newFileName)

        if (!existsSync(fullPath)) {
            mkdir(fullPath, { recursive: true })
        }

        writeFile(finalPath, buffer)

        return path.join(root_directory, newFileName)

    }

}

export default ImageStore