import '@/styles/main.css'
import '@/styles/modifiers.css'
import '@/styles/components.css'
import '@/styles/styles.css'

import 'primeicons/primeicons.css'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}
