import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function PdfHistory({ data }) {

    const {
        porcentajeInicial,
        plazoMensual,
        montoTotal,
        montoInicial,
        montoRestante,
        montoMensual
    } = data

    const objectDate = new Date()

    let items = []

    const currencyFormat = (ammount) => {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(ammount)
    }

    for (let i = 0; i < plazoMensual + 1; i++) {
        if (i == 0) {

            let currentDate = objectDate.getDate() + "-" + (objectDate.getMonth() + 1) + "-" + objectDate.getFullYear()

            items.push({
                pago: i,
                fecha: currentDate,
                montoRestante: currencyFormat(montoRestante),
                montoAbonado: currencyFormat(montoInicial),
                acumuladoMensual: 0,
                montoMensual: 0
            })

        } else {

            objectDate.setMonth(objectDate.getMonth() + 1)
            let currentDate = objectDate.getDate() + "-" + (objectDate.getMonth() + 1) + "-" + objectDate.getFullYear()

            items.push({
                pago: i,
                fecha: currentDate,
                montoRestante: currencyFormat(montoRestante - (montoMensual * i)),
                montoAbonado: currencyFormat(montoInicial + (montoMensual * i)),
                acumuladoMensual: currencyFormat(montoMensual + (montoMensual * (i - 1))),
                montoMensual: currencyFormat(montoMensual)
            })

        }
    }

    const exportPdf = () => {

        var element = document.getElementById('content')

        const doc = new jsPDF()
        doc.autoTable({ html: element })

        //let finalY = doc.previousAutoTable.finalY
        //doc.text("Text to be shown relative to the table", 12, finalY + 10)

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
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Monto mensual</th>
                            <th className="mdf-px-md mdf-py-sm mdf-font-nowrap">Monto acumulado</th>
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