export default function PublicTemplate({ children }) {

    return (
        <>
            <main className="document-wrapper document-content">
                {children}
            </main>
            <footer>
                hello from footer
            </footer>
        </>
    )

}