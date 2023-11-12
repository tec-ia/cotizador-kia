import PublicTemplate from "@/template/public"

import Link from "next/link"
import Image from "next/image"
import parse from 'html-react-parser'

export default async function ItemPage({ params }) {

    const get_item = async () => {

        const response = await fetch('http://localhost:3000/api/item/id', {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify({
                filter: params.slug,
            })
        })

        return await response.json()

    }

    const { data: item } = await get_item()

    return (
        <PublicTemplate className="mdf-pb-x">
            <h1 className="mdf-font-normal mdf-mt-0 mdf-pt-xx mdf-mb-0"><b>ADQUIERE</b> TU AUTO YA !</h1>
            <p className="mdf-mt-sm mdf-mb-xx">Encuentra y compra tu auto en menos de 5 minutos.</p>

            <Link href="/" className="mdf-flex mdf-align-center mdf-p-lg mdf-bg-screen">
                <i className="pi pi-chevron-left mdf-mr-lg"></i> <span className="mdf-font-500">REGRESAR AL LISTADO</span>
            </Link>

            <div className="mdf-mt-xx mdf-grid-lg mdf-gap-xx mdf-pb-xx" >
                    <Image src={`/${item.img_path}`} style={{ width: '100%', height: 'auto' }} alt={`Vehiculo modelo ${item.model}`} width={875} height={656} />
                <div>
                    <div className="mdf-flex mdf-justify-between mdf-p-lg mdf-mb-xl mdf-bg-primary">
                        <h3 className="mdf-p-0 mdf-m-0 mdf-font-400 mdf-color-primary-dark">{item.version}</h3>
                        <h3 className="mdf-p-0 mdf-m-0 mdf-font-400 mdf-color-primary-dark">{item.year}</h3>
                    </div>

                    <h2 className="mdf-my-sm mdf-font-600 mdf-mb-xl">{item.model}</h2>

                    <p className="mdf-my-md"><i className="pi pi-money-bill mdf-mr-md"></i> $ {item.selling_price}</p>
                    <p className="mdf-my-md"><i className="pi pi-verified mdf-mr-md"></i> {item.warranty} años de garantía</p>
                    <p className="mdf-mt-md mdf-mb-xx"><i className="pi pi-tag mdf-mr-md"></i> {item.color}</p>

                    <div className="mdf-p-lg mdf-mb-md mdf-bg-screen mdf-my-xx">
                        <h3 className="mdf-p-0 mdf-m-0 mdf-font-400 mdf-flex mdf-align-center">Cotizar Auto<i className="pi pi-chevron-down mdf-ml-md"></i></h3>
                    </div>

                    <div className="mdf-p-lg mdf-mb-md mdf-bg-screen mdf-my-xx">
                        <h3 className="mdf-p-0 mdf-m-0 mdf-font-400 mdf-flex mdf-align-center">Descripción <i className="pi pi-chevron-down mdf-ml-md"></i></h3>
                    </div>

                    <div>{parse(item.description)}</div>
                </div>
            </div>
        </PublicTemplate>
    )
}