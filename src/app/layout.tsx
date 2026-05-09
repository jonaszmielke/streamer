import type { Metadata } from 'next'
import { Inter_Tight, JetBrains_Mono, Manrope, Spectral } from 'next/font/google'
import './globals.css'

const interTight = Inter_Tight({
    subsets: ['latin'],
    variable: '--font-inter-tight',
    weight: ['400', '500', '600'],
})

const spectral = Spectral({
    subsets: ['latin'],
    variable: '--font-spectral',
    weight: ['300', '400', '500'],
    style: ['normal', 'italic'],
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    weight: ['400', '500', '600'],
})

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: 'Streamer',
    description: 'Streamer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${interTight.variable} ${spectral.variable} ${jetbrainsMono.variable} ${manrope.variable}`}
        >
            <body>{children}</body>
        </html>
    )
}
