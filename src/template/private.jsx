'use client'

import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PrivateTemplate({ children }) {

    const router = useRouter()

    async function handle_logout() {
        const response = await fetch("/api/auth/logout")

        if (response.ok) {
            router.push("/login")
        }
    }

    return (
        <>
            <nav className="cpm-navbar mdf-bg-secondary">
                <div className="document-content mdf-flex mdf-flex-justify-between mdf-flex-align-center">
                    <h3><Link href="/dashboard" className="mdf-color-primary-dark mdf-font-normal">KiaAlmost</Link></h3>
                    <button type="submit" onClick={() => handle_logout()} className="mdf-px-md mdf-py-sm mdf-rounded-sm mdf-bg-content">Cerrar sesión</button>
                </div>
            </nav>
            <main className="document-wrapper mdf-bg-content mdf-m-sm">
                <div className="document-content mdf-pt-xx">
                    {children}
                </div>
            </main>
        </>
    )

}