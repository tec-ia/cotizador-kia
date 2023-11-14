import Image from "next/image"
import Link from "next/link"

export default function PublicTemplate({ children }) {

    return (
        <>
            <nav className="cpm-navbar mdf-bg-content mdf-bb-sm mdf-b-content">

                <div className="document-content mdf-flex mdf-align-center mdf-justify-between">
                    <div className="mdf-pt-md">
                        <Link href="/">
                            <Image src="/main-logo-kia.png" alt="Logo principal de Kia Cholula" style={{ maxWidth: '100%', height: 'auto' }} width={200} height={40} priority />
                        </Link>
                    </div>
                    <div className="mdf-pt-md">
                        <a className="cpm-wp-button" href="https://wa.me/522227010942?text=Hola!%20Requeiro%20hablar%20con%20un%20asesor" target="_blank"><i className="pi pi-whatsapp" style={{ color: 'white' }}></i> WhatsApp</a>
                    </div>
                </div>

            </nav>
            <main className="document-wrapper mdf-bg-content">
                <div className="document-content">
                    {children}
                </div>
            </main>
        </>
    )

}