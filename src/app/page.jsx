import PublicTemplate from "@/template/public"

import Image from "next/image"
import Link from "next/link"

export const metadata = {
    title: 'Kia Cholula, adquiere un nuevo auto',
    description: 'Venta de autos usados en cholula por Kia Cholula',
}

const get_items = async () => {
    const result = await fetch('http://localhost:3000/api/item', {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    })
    return await result.json()
}

export default async function HomePage() {

    const { data: items } = await get_items()

    const main = (items.length > 0) ? (items.shift()) : undefined

    return (
        <PublicTemplate>

            <h1 className="mdf-font-300 mdf-mt-0 mdf-pt-xx mdf-mb-0"><b>ADQUIERE</b> TU AUTO YA !</h1>
            <p className="mdf-mt-sm mdf-pb-md">Encuentra y compra tu auto en menos de 5 minutos.</p>

            {(main) ?
                <div className="mdf-my-xx">
                    <Link href={`/item/${main.id}`}>
                        <div className="mdf-grid-md mdf-gap-xx mdf-p-lg mdf-bg-screen" style={{ width: '90%', margin: 'auto' }}>
                            <Image src={`/${main.img_path}`} style={{ width: '100%', height: 'auto' }} alt={`Vehiculo modelo ${main.model}`} width={875} height={656} />
                            <div>
                                <div className="mdf-flex mdf-justify-between mdf-mb-md mdf-p-lg mdf-bg-primary">
                                    <h3 className="mdf-m-0 mdf-color-primary-dark mdf-font-400">{main.version}</h3>
                                    <h3 className="mdf-m-0 mdf-color-primary-dark mdf-font-400">{main.year}</h3>
                                </div>
                                <div className="mdf-px-lg">
                                    <h2 className="mdf-mt-sm mdf-mb-0 mdf-font-500">{main.model}</h2>
                                    <p className="mdf-mt-md mdf-mb-0"><i className="pi pi-money-bill mdf-mr-md"></i> $ {main.selling_price}</p>
                                    <p className="mdf-mt-sm mdf-mb-0"><i className="pi pi-verified mdf-mr-md"></i> {main.warranty} años de garantía</p>
                                    <p className="mdf-mt-sm mdf-mb-0"><i className="pi pi-tag mdf-mr-md"></i> {main.color}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                : <></>}

            <div className="mdf-grid-md mdf-gap-xx mdf-pt-xl mdf-pb-xx">
                {items.map(item => (
                    <Link href={`/item/${item.id}`} key={item.model}>
                        <div className="mdf-p-md">
                            <div className="mdf-flex mdf-justify-between mdf-mb-md mdf-font-500">
                                <p className="mdf-m-0">{item.version}</p>
                                <p className="mdf-m-0">{item.year}</p>
                            </div>
                            <Image src={`/${item.img_path}`} style={{ width: '100%', height: 'auto' }} alt={`Vehiculo modelo ${item.model}`} width={875} height={656} />
                            <p className="mdf-mt-sm mdf-mb-0 mdf-font-500">{item.model}</p>
                            <p className="mdf-mt-md mdf-mb-0"><i className="pi pi-money-bill mdf-mr-md"></i> $ {item.selling_price}</p>
                            <p className="mdf-mt-sm mdf-mb-0"><i className="pi pi-verified mdf-mr-md"></i> {item.warranty} años de garantía</p>
                            <p className="mdf-mt-sm mdf-mb-0"><i className="pi pi-tag mdf-mr-md"></i> {item.color}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </PublicTemplate>
    )

}