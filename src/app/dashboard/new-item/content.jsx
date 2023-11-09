'use client'

import PrivateTemplate from "@/template/private"

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { InputText } from 'primereact/inputtext'
import { Editor } from 'primereact/editor'

export default function ContentPage() {

    const router = useRouter()

    const [description, setDescription] = useState('')
    const [file, setFile] = useState()

    const create_item = async (event) => {
        event.preventDefault()

        if (!file) return alert("Selecciona una imagen")

        const formData = new FormData(event.target)

        formData.set('file', file)

        const response = await fetch('/api/item', {
            method: 'POST',
            body: formData,
        })

        if (response.ok) {
            router.push("/dashboard")
        }

    }

    return (
        <PrivateTemplate>
            <div className="mdf-flex mdf-flex-justify-between mdf-flex-align-start mdf-mb-lg">
                <div>
                    <h1 className="mdf-mb-xm mdf-mt-xm">Hola !</h1>
                    <p className="mdf-mt-xm">Ingresa los datos del vehículo...</p>
                </div>
                <Link href="/manage" className="mdf-px-md mdf-py-sm mdf-rounded-sm mdf-bg-secondary mdf-color-secondary-dark">Ver listado</Link>
            </div>

            <form onSubmit={create_item} autoComplete="off" method="POST" style={{ maxWidth: '800px' }} className="mdf-px-lg mdf-pb-xx" >

                <div className="mdf-flex mdf-flex-justify-between mdf-flex-align-center mdf-mb-xl">
                    <label htmlFor="input_password" className="mdf-font-nowrap mdf-mr-lg">Tiempo de garantía</label>
                    <InputText name="warranty" className="mdf-rounded-lg mdf-px-lg mdf-bg-screen" placeholder="[Cantidad de años]" keyfilter="pint" minLength={1} maxLength={2} required />
                </div>

                <div className="mdf-flex mdf-flex-justify-between mdf-flex-align-center mdf-mb-xl">
                    <label htmlFor="input_password" className="mdf-font-nowrap mdf-mr-lg">Año fabricación</label>
                    <InputText name="year" className="mdf-rounded-lg mdf-px-lg mdf-bg-screen" placeholder="[Ingrese el año vehicular]" keyfilter="pint" minLength={4} maxLength={4} required />
                </div>

                <div className="mdf-flex mdf-flex-justify-between mdf-flex-align-center mdf-mb-xl">
                    <label htmlFor="input_password" className="mdf-font-nowrap mdf-mr-lg">Modelo vehicular</label>
                    <InputText name="model" className="mdf-rounded-lg mdf-px-lg mdf-bg-screen" placeholder="[Modelo completo]" minLength={5} maxLength={20} required />
                </div>

                <div className="mdf-flex mdf-flex-justify-between mdf-flex-align-center mdf-mb-xl">
                    <label htmlFor="input_password" className="mdf-font-nowrap mdf-mr-lg">Versión de diseño</label>
                    <select name="version" className="mdf-rounded-lg mdf-px-lg mdf-bg-screen" required>
                        <option value="">[Seleccciona una versión]</option>
                        <option value="CE: Edición clásica">CE: Edición clásica</option>
                        <option value="D/DL/DX: Deluxe">D/DL/DX: Deluxe</option>
                        <option value="EX/X: Extra">EX/X: Extra</option>
                        <option value="GL: Nivel de grado">GL: Nivel de grado</option>
                        <option value="GLE: Nivel grado extra">GLE: Nivel grado extra</option>
                        <option value="GT: Grand Touring">GT: Grand Touring</option>
                        <option value="LE/LX: Lujo">LE/LX: Lujo</option>
                        <option value="LTD: Limitado">LTD: Limitado</option>
                        <option value="S: Especial/Estándar">S: Especial/Estándar</option>
                        <option value="SE: Edición deportiva">SE: Edición deportiva</option>
                        <option value="SL: Nivel estándar">SL: Nivel estándar</option>
                        <option value="T: Edición Touring">T: Edición Touring</option>
                    </select>
                </div>

                <div className="mdf-flex mdf-flex-justify-between mdf-flex-align-center mdf-mb-xl">
                    <label htmlFor="input_password" className="mdf-font-nowrap mdf-mr-lg">Precio costo</label>
                    <InputText name="cost_price" className="mdf-rounded-lg mdf-px-lg mdf-bg-screen" placeholder="[Ingrese el monto]" keyfilter="money" minLength={4} maxLength={15} required />
                </div>

                <div className="mdf-flex mdf-flex-justify-between mdf-flex-align-center mdf-mb-xl">
                    <label htmlFor="input_password" className="mdf-font-nowrap mdf-mr-lg">Precio venta</label>
                    <InputText name="selling_price" className="mdf-rounded-lg mdf-px-lg mdf-bg-screen" placeholder="[Ingrese el monto]" keyfilter="money" minLength={4} maxLength={15} required />
                </div>

                <div className="mdf-flex mdf-flex-justify-between mdf-flex-align-center mdf-mb-xl">
                    <label htmlFor="input_password" className="mdf-font-nowrap mdf-mr-lg">Color principal</label>
                    <InputText name="color" className="mdf-rounded-lg mdf-px-lg mdf-bg-screen" placeholder="[Ingrese el color]" minLength={3} maxLength={15} required />
                </div>

                <input type="file" onChange={(event) => setFile(event.target.files[0])} accept="image/png,image/jpeg" required />

                <p>Detalle otras características:</p>
                <input type="hidden" name="description" value={description} />
                <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} headerTemplate={renderHeader()} style={{ height: '150px' }} />

                <button type="submit" className="mdf-mt-xl mdf-pb-sm mdf-px-md mdf-py-sm mdf-rounded-sm mdf-bg-primary mdf-color-primary-dark">Guardar información</button>

            </form>
        </PrivateTemplate>
    )
}

// Edior header config
const renderHeader = () => {
    return (
        <span className="ql-formats">
            <button className="ql-list" value="ordered" aria-label="Ordered List" data-pc-section="list"></button>
            <button className="ql-list" value="bullet" aria-label="Unordered List" data-pc-section="list"></button>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
        </span>
    )
}