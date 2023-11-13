import ContentPage from "./content"

export const metadata = {
    title: 'Detalle de vehículo',
    description: 'Sitio de venta de vehículos KIA en Cholula Puebla'
}

export default function ItemPage({ params }) {
    return <ContentPage slug={params.slug} />
}