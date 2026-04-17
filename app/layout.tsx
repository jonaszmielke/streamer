import '@mantine/core/styles.css'

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core'
import QueryProvider from '@/app/_providers/QueryProvider'
import { theme } from '@/shared/theme'
import { theme as mantineTheme } from '../theme'

const RootLayout = ({ children }: { children: any }) => {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body style={{ backgroundColor: theme.gray[0] }}>
                <MantineProvider theme={mantineTheme} forceColorScheme="dark">
                    <QueryProvider>{children}</QueryProvider>
                </MantineProvider>
            </body>
        </html>
    )
}
export default RootLayout
