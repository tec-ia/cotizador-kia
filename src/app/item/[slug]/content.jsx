'use client'

import PublicTemplate from "@/template/public"

import { useState, useEffect } from "react"
import { InputNumber } from 'primereact/inputnumber'

import Link from "next/link"
import Image from "next/image"
import parse from 'html-react-parser'

export default function ItemContent({ slug }) {

    const [item, setItem] = useState({})
    const [show, setShow] = useState(false)

    const [plazo, setPlazo] = useState(12)
    const [enganche, setEnganche] = useState(25)

    useEffect(() => {
        try {
            fetch('/api/item/id', {
                method: "POST",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify({
                    filter: slug,
                })
            }).then((response) => response.json()).then((result) => {
                setItem(result.data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleFile = (event) => {
        event.preventDefault()
        console.log("se ha enviado el form !")
        console.log(enganche)
        console.log(plazo)
        console.log(item.selling_price)
    }

    return (
        <PublicTemplate>
            <div className="mdf-py-xx">

                <Link href="/" className="mdf-flex mdf-align-center mdf-p-lg">
                    <i className="pi pi-chevron-left mdf-mr-lg"></i> <span className="mdf-font-500">REGRESAR AL LISTADO</span>
                </Link>

                <div className="mdf-mt-xx mdf-grid-xl mdf-gap-xx mdf-pb-xx" >
                    <div>
                        <div className="mdf-flex mdf-justify-between mdf-p-lg mdf-mb-xl mdf-bg-primary">
                            <h3 className="mdf-p-0 mdf-m-0 mdf-font-400 mdf-color-primary-dark">{item.version}</h3>
                            <h3 className="mdf-p-0 mdf-m-0 mdf-font-400 mdf-color-primary-dark">{item.year}</h3>
                        </div>

                        <div className="mdf-px-lg">
                            <h2 className="mdf-my-sm mdf-font-600 mdf-mb-xl">{item.model}</h2>
                            <p className="mdf-my-md"><i className="pi pi-money-bill mdf-mr-md"></i> $ {item.selling_price}</p>
                            <p className="mdf-my-md"><i className="pi pi-verified mdf-mr-md"></i> {item.warranty} años de garantía</p>
                            <p className="mdf-mt-md mdf-mb-xx"><i className="pi pi-tag mdf-mr-md"></i> {item.color}</p>
                        </div>

                        <div onClick={() => setShow(!show)} className="mdf-p-lg mdf-mb-md mdf-bg-screen mdf-mb-xx">
                            <h3 className="mdf-p-0 mdf-m-0 mdf-font-400 mdf-flex mdf-align-center">Cotizar Auto<i className="pi pi-chevron-down mdf-ml-md"></i></h3>
                        </div>


                        <form className="mdf-px-lg mdf-my-xl" onSubmit={handleFile} style={{ display: (show) ? 'block' : 'none' }}>
                            <div className="mdf-flex mdf-align-center mdf-gap-lg">
                                <label className="mdf-font-nowrap">Plazo en meses</label>
                                <InputNumber value={plazo} onValueChange={(e) => setPlazo(e.value)} min={12} max={120} suffix=" meses" placeholder="Cantidad de meses" className="mdf-b-content mdf-b-md mdf-px-lg mdf-rounded-lg" style={{ width: '100%' }} />
                            </div>
                            <div className="mdf-flex mdf-align-center mdf-gap-lg mdf-mt-lg">
                                <label className="mdf-font-nowrap">Enganche inicial</label>
                                <InputNumber value={enganche} onValueChange={(e) => setEnganche(e.value)} min={25} max={70} suffix=" porciento" placeholder="Porcentaje inicial" className="mdf-b-content mdf-b-md mdf-px-lg mdf-rounded-lg" style={{ width: '100%' }} />
                            </div>
                            <div className="mdf-flex mdf-justify-end mdf-mt-xl">
                                <button type="submit" className="mdf-px-md mdf-py-sm mdf-rounded-sm mdf-bg-secondary mdf-color-secondary-dark">Descargar cotización</button>
                            </div>
                        </form>

                        <div className="mdf-p-lg mdf-mb-md mdf-bg-screen mdf-my-xx">
                            <h3 className="mdf-p-0 mdf-m-0 mdf-font-400 mdf-flex mdf-align-center">Descripción <i className="pi pi-chevron-down mdf-ml-md"></i></h3>
                        </div>

                        <div className="mdf-px-lg">{parse(item.description ? item.description : '[No hay descripción]')}</div>
                    </div>
                    <div>
                        {(item.img_path) ? <Image src={`/${item.img_path}`} style={{ width: '100%', height: 'auto', position: 'sticky', top: '100px' }} alt={`Vehiculo modelo ${item.model}`} width={875} height={656} priority /> : ''}
                    </div>
                </div>
            </div>
        </PublicTemplate>
    )
}