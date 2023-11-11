export default async function CotizarPage({ params }) {

    const get_item = async () => {

        const response = await fetch("http://localhost:3000/api/item/id", {
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
        <>Que onda que onda: [{item?.model}]</>
    )
}