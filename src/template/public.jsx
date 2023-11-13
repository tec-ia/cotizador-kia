import Image from "next/image"

export default function PublicTemplate({ children }) {

    return (
        <>
            <nav className="cpm-navbar mdf-bg-content mdf-bb-sm mdf-b-content mdf-flex mdf-flex-align-center">
                <div className="document-content mdf-pt-md">
                    <Image src="/main-logo-kia.png" alt="Logo principal de Kia Cholula" width={407} height={50} priority />
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