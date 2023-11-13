'use client'

import PrivateTemplate from "@/template/private"

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from "react"
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { Dialog } from 'primereact/dialog'
import { Editor } from 'primereact/editor'

import Swal from 'sweetalert2'

export default function ContentPage() {

    // Filtered results
    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, })
    const [globalFilterValue, setGlobalFilterValue] = useState('')

    const onGlobalFilterChange = (e) => {
        const value = e.target.value
        let _filters = { ...filters }

        _filters['global'].value = value

        setFilters(_filters)
        setGlobalFilterValue(value)
    }

    // Details item config
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState({})

    const item_details = (rowData) => {
        setText(rowData.description)
        setCurrent(rowData)
        setVisible(true)
    }

    // CRUD item actions
    const [items, setItems] = useState([])

    useEffect(() => {
        get_items()
    }, [])

    const get_items = async () => {
        const response = await fetch("/api/item")
        const result = await response.json()
        setItems(result.data)
    }

    const edit_item = async (e) => {

        let { rowData, newValue, field, originalEvent: event } = e;

        const response = await fetch("/api/item", {
            method: "PUT",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify({
                filter: rowData.id,
                newData: rowData
            })
        })

        if (!response.ok) {
            event.preventDefault()
        }

        get_items()

    }

    const delete_item = async (rowData) => {

        const result = await Swal.fire({ title: 'Estás seguro?', text: "Una vez eliminado no podrá recuperarlo !", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Sí, borrar !' })

        if (!result.isConfirmed) return

        let { id } = rowData

        await fetch("/api/item", {
            method: "DELETE",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify({
                filter: id,
            })
        })

        get_items()

    }

    return (
        <PrivateTemplate>
            <div className="mdf-flex mdf-justify-between mdf-align-start mdf-mb-xx">
                <div className="mdf-flex mdf-align-center mdf-bg-screen mdf-rounded-md mdf-pl-md" style={{ width: '400px' }}>
                    <i className="pi pi-search" />
                    <input type="text" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Ingrese su búsqueda..." className="cmp-input mdf-pl-md mdf-rounded-md mdf-bg-screen" />
                </div>
                <Link href="/dashboard/new-item" className="mdf-px-md mdf-py-sm mdf-rounded-sm mdf-bg-secondary mdf-color-secondary-dark">Registrar</Link>
            </div>

            <DataTable value={items} filters={filters} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} emptyMessage="No hay registros" removableSort >
                <Column field="year" header="Año" editor={(options) => textEditor(options)} onCellEditComplete={edit_item} style={{ width: '7%' }} sortable></Column>
                <Column field="version" header="Versión" editor={(options) => selectEditor(options)} onCellEditComplete={edit_item} style={{ width: '9%', minWidth: '200px' }} sortable></Column>
                <Column field="model" header="Modelo" editor={(options) => textEditor(options)} onCellEditComplete={edit_item} style={{ width: '18%' }} sortable></Column>
                <Column field="warranty" header="Garantía" editor={(options) => textEditor(options)} onCellEditComplete={edit_item} style={{ width: '10%' }} body={data => <span>{(data.warranty > 1) ? data.warranty + ' años' : data.warranty + ' año'}</span>} sortable></Column>
                <Column field="color" header="Color" editor={(options) => textEditor(options)} onCellEditComplete={edit_item} style={{ width: '10%' }} sortable></Column>
                <Column field="cost_price" header="Precio costo" editor={(options) => textEditor(options)} onCellEditComplete={edit_item} style={{ width: '10%' }} sortable></Column>
                <Column field="selling_price" header="Precio venta" editor={(options) => textEditor(options)} onCellEditComplete={edit_item} style={{ width: '10%', }} sortable></Column>
                <Column header="Detalles" body={rowData => <button onClick={() => { item_details(rowData) }}><i className="pi pi-exclamation-circle"></i></button>} style={{ width: '5%', textAlign: 'center', cursor: 'pointer' }} ></Column>
                <Column header="Eliminar" body={rowData => <button onClick={() => delete_item(rowData)}><i className="pi pi-trash"></i></button>} style={{ width: '5%', textAlign: 'center', cursor: 'pointer' }} ></Column>
            </DataTable>

            <Dialog header={current.model} visible={visible} position="top" onHide={() => setVisible(false)} style={{ width: '90%', maxWidth: '500px' }} draggable={false} resizable={false} >
                <p className="mdf-mt-xm">Editar detalles:</p>
                <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} headerTemplate={renderHeader()} style={{ height: '150px' }} />

                {current.img_path}

                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr' }}>
                    <Image src={`/${current.img_path}`} alt={current.model} style={{ width: '100%', height: 'auto' }} width={600} height={600} />
                </div>
            </Dialog>
        </PrivateTemplate>
    )
}

// TextEditor config
const selectEditor = (options) => {
    return (
        <select name="version" className="mdf-b-md mdf-b-content mdf-rounded-sm mdf-px-md" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} >
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
    )
}

// TextEditor config
const textEditor = (options) => {
    return <InputText type="text" className="mdf-b-md mdf-b-content mdf-rounded-sm mdf-px-md" autoFocus={true} value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
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