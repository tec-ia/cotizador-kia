'use client'

import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function ContentPage() {

    const router = useRouter()

    const [message, setMessage] = useState(null)

    const handle_login = async (event) => {
        event.preventDefault()

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value
            })
        })

        if (response.ok) {
            router.push("/dashboard")
        } else {
            setMessage("Verifica las credenciales")
        }

    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <form onSubmit={handle_login} className="cmp-form mdf-pt-xl" autoComplete="off">
                <h1 className="mdf-mb-xm mdf-pt-xl">Hola !</h1>
                <p className="mdf-mt-xm mdf-pb-xl">Ingrese los siguientes datos...</p>
                <div className="mdf-mt-xl mdf-pb-sm">
                    <div className="cpm-float-label">
                        <input type="text" name="username" id="input_name" className="mdf-rounded-lg mdf-px-lg mdf-bg-content" placeholder="Nombre de usuario" required />
                        <label htmlFor="input_password">Nombre de usuario</label>
                    </div>
                </div>
                <div className="mdf-mt-xl mdf-pb-sm">
                    <div className="cpm-float-label">
                        <input type="password" name="password" id="input_password" className="mdf-rounded-lg mdf-px-lg mdf-bg-content" placeholder="credencial" required />
                        <label htmlFor="input_password">Credencial secreta</label>
                    </div>
                </div>
                <div><small style={{ color: 'red' }}>{message}</small></div>
                <button type="submit" className="mdf-mt-xl mdf-pb-sm mdf-px-md mdf-py-sm mdf-rounded-sm mdf-bg-primary mdf-color-primary-dark">Acceder</button>
            </form>
        </div>
    )

}