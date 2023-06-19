import './globals.css'
import { Inter } from 'next/font/google'
import { RecoilRoot } from 'recoil';



const inter = Inter({ subsets: ['latin'] })





export const metadata = {
    title: 'Thomas Gonzalez Resume',
    description: 'A web developer portfolio and resume website made by Thomas Gonzalez.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <RecoilRoot>
            <body className={inter.className}>{children}</body>
            </RecoilRoot>
        </html>
    )
}
