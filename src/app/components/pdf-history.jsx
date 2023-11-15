import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function PdfHistory({ data }) {

    const {
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

    for (let i = 0; i < plazoMensual + 1; i++) {
        if (i == 0) {

            items.push({
                pago: i,
                fecha: dateFormat(objectDate),
                montoSeguro: currencyFormat(montoTotalSeguro),
                montoUnidad: currencyFormat(montoTotalUnidad),
                montoMensual: currencyFormat(montoMensualUnidad + (seguroDiferido ? montoMensualSeguro : 0)),
                acumuladoMensual: currencyFormat(0),
                montoRestante: currencyFormat(montoRestanteUnidad + (seguroDiferido ? montoTotalSeguro : 0)),
                montoAbonado: currencyFormat(montoInicialUnidad + (!seguroDiferido ? montoTotalSeguro : 0)),
            })

        } else {

            objectDate.setMonth(objectDate.getMonth() + 1)

            items.push({
                pago: i,
                fecha: dateFormat(objectDate),
                montoSeguro: currencyFormat(seguroDiferido || i >= 12 ? montoMensualSeguro : 0),
                montoUnidad: currencyFormat(montoMensualUnidad),
                montoMensual: currencyFormat(montoMensualUnidad + (seguroDiferido || i >= 12 ? montoMensualSeguro : 0)),
                acumuladoMensual: currencyFormat((montoMensualUnidad * i) + ((seguroDiferido || i >= 12 ? montoMensualSeguro : 0) * i)),
                montoRestante: currencyFormat(montoRestanteUnidad + (seguroDiferido ? montoTotalSeguro : 0)),
                montoAbonado: currencyFormat(montoRestanteUnidad + (!seguroDiferido ? montoTotalSeguro : 0)),
            })

        }
    }

    const exportPdf = () => {

        var element = document.getElementById('content')

        const doc = new jsPDF()
        doc.autoTable({ html: element })

        doc.save('table.pdf')

    }

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
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Acumulado mensual{/*Abono a capital*/}</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Monto restante</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Total abonado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.pago} className="mdf-font-center mdf-bb-sm mdf-b-content">
                                <td className="mdf-py-sm mdf-font-nowrap">{item.pago}</td>
                                <td className="mdf-py-sm mdf-font-nowrap">{item.fecha}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoMensual}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoSeguro}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.acumuladoMensual}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoAbonado}</td>
                                <td className="mdf-py-sm mdf-font-right mdf-pr-md mdf-font-nowrap">{item.montoRestante}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}