import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function PdfHistory({ data }) {

    const {
        unidad,
        cantidadPagos,
        porcentajeInicial,
        seguroDiferido,
        montoTotalSeguro,
        montoTotalUnidad,
        montoInicialUnidad,
        montoMensualUnidad,
        montoMensualSeguro,
        montoRestanteUnidad
    } = data

    let items = []
    const objectDate = new Date()

    const currencyFormat = (ammount) => {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(ammount)
    }

    const dateFormat = (objectDate) => {
        return objectDate.getDate() + "-" + (objectDate.getMonth() + 1) + "-" + objectDate.getFullYear()
    }

    for (let i = 0; i < cantidadPagos + 1; i++) {
        if (i == 0) {

            items.push({
                pago: i,
                fecha: dateFormat(objectDate),
                montoSeguro: currencyFormat(montoTotalSeguro),
                montoUnidad: currencyFormat(montoTotalUnidad),
                montoMensual: currencyFormat(montoMensualUnidad + (seguroDiferido ? montoMensualSeguro : 0)),
                acumuladoMensual: currencyFormat(0),
                montoRestante: currencyFormat(montoRestanteUnidad + (seguroDiferido ? montoMensualSeguro * cantidadPagos : montoMensualSeguro * (cantidadPagos - 12))),
                montoAbonado: currencyFormat(montoInicialUnidad + (!seguroDiferido ? montoTotalSeguro : 0)),
            })

        } else {

            objectDate.setMonth(objectDate.getMonth() + 1)

            items.push({
                pago: i,
                fecha: dateFormat(objectDate),
                montoSeguro: currencyFormat(seguroDiferido || i > 12 ? montoMensualSeguro : 0),
                montoUnidad: currencyFormat(montoMensualUnidad),
                montoMensual: currencyFormat(montoMensualUnidad + (seguroDiferido || i > 12 ? montoMensualSeguro : 0)),
                acumuladoMensual: currencyFormat((montoMensualUnidad * i) + ((seguroDiferido || i > 12 ? montoMensualSeguro : 0) * (seguroDiferido ? i : i - 12))),
                montoRestante: currencyFormat((montoRestanteUnidad + (seguroDiferido ? montoMensualSeguro * cantidadPagos : montoMensualSeguro * (cantidadPagos - 12))) - ((montoMensualUnidad * i) + ((seguroDiferido || i > 12 ? montoMensualSeguro : 0) * (seguroDiferido ? i : i - 12)))),
                montoAbonado: currencyFormat((montoInicialUnidad + (!seguroDiferido ? montoTotalSeguro : 0)) + ((montoMensualUnidad * i) + ((seguroDiferido || i > 12 ? montoMensualSeguro : 0) * (seguroDiferido ? i : i - 12)))),
            })

        }
    }

    const exportPdf = () => {

        var element = document.getElementById('content')

        const doc = new jsPDF()
        doc.autoTable({ html: element })

        doc.save('table.pdf')

    }

    const exportPDF = async () => {
        const component = document.getElementById('content')
        const pdf = new jsPDF("portrait", "pt", "a4")

        const data = await html2canvas(component, { scale: 2 })

        alert("Se está generando el PDF...")

        const img = data.toDataURL("image/png")
        const imgProperties = pdf.getImageProperties(img)

        alert("Generando documento, espere...")

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

        pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight)

        pdf.save(objectDate.getTime() + "-PRESUPUESTO.pdf")
    }

    return (
        <>
            <div className="mdf-flex mdf-justify-center">
                <button onClick={() => exportPDF()} className="mdf-px-md mdf-py-sm mdf-rounded-sm mdf-bg-secondary mdf-color-secondary-dark">Descargar cotización</button>
            </div>
            <div className="cpm-pdf" id="content">
                <div className="mdf-flex mdf-justify-between mdf-align-start mdf-bb-sm mdf-b-content mdf-mb-md">
                    <h1 className="mdf-m-0">Detalle de cotización</h1>
                    <img className="mdf-m-0" src="/main-logo-kia.png" width={200} height={40} />
                </div>
                <div className="mdf-mb-lg">
                    <h3 className="mdf-m-0 mdf-mb-md">Datos del vehículo:</h3>
                    <div className="mdf-grid-sm mdf-gap-sm">
                        <h3 className="mdf-font-300 mdf-m-0">Modelo: {unidad.model}</h3>
                        <h3 className="mdf-font-300 mdf-m-0">Versión: {unidad.version}</h3>
                        <h3 className="mdf-font-300 mdf-m-0">Precio: ${unidad.selling_price}</h3>
                        <h3 className="mdf-font-300 mdf-m-0">Año fabricación: {unidad.year}</h3>
                        <h3 className="mdf-font-300 mdf-m-0">Garantía: {unidad.warranty} meses</h3>
                        <h3 className="mdf-font-300 mdf-m-0">Color: {unidad.color}</h3>
                    </div>
                </div>
                <table style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr className="mdf-font-center mdf-by-sm mdf-b-content">
                            <th className="mdf-px-sm mdf-py-sm mdf-font-nowrap">Pago</th>
                            <th className="mdf-px-sm mdf-py-sm mdf-font-nowrap">Fecha pago</th>
                            <th className="mdf-px-sm mdf-py-sm mdf-font-nowrap">Monto Seguro</th>
                            <th className="mdf-px-sm mdf-py-sm mdf-font-nowrap">Monto neto</th>
                            <th className="mdf-px-sm mdf-py-sm mdf-font-nowrap">Mensualidad</th>
                            <th className="mdf-px-sm mdf-py-sm mdf-font-nowrap">Abono a capital</th>
                            <th className="mdf-px-sm mdf-py-sm mdf-font-nowrap">Monto restante</th>
                            <th className="mdf-px-sm mdf-py-sm mdf-font-nowrap">Total abonado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.pago} className="mdf-font-center mdf-bb-sm mdf-b-content">
                                <td className="mdf-py-sm mdf-font-nowrap">{item.pago}</td>
                                <td className="mdf-py-sm mdf-font-nowrap">{item.fecha}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoSeguro}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoUnidad}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoMensual}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.acumuladoMensual}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoRestante}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoAbonado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )

    return (
        <>
            <div className="mdf-flex mdf-justify-center">
                <button onClick={() => exportPdf()} className="mdf-px-md mdf-py-sm mdf-rounded-sm mdf-bg-secondary mdf-color-secondary-dark">Descargar cotización</button>
            </div>

            <div style={{ width: '100%', overflowX: 'auto' }} className="mdf-my-xl">
                <table style={{ borderCollapse: 'collapse' }} id="content">
                    <thead>
                        <tr className="mdf-font-center mdf-by-sm mdf-b-content">
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">No. Pago</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Fecha pago</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Monto seguro</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Monto unidad</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Mensualidad</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Abono a capital</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Monto restante</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Total abonado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.pago} className="mdf-font-center mdf-bb-sm mdf-b-content">
                                <td className="mdf-py-sm mdf-font-nowrap">{item.pago}</td>
                                <td className="mdf-py-sm mdf-font-nowrap">{item.fecha}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoSeguro}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoUnidad}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoMensual}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.acumuladoMensual}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoRestante}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoAbonado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}