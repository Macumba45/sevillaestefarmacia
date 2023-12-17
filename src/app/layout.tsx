import React from 'react'
import Head from 'next/head'
import './reset.css'
import './global.css'
import StyledComponentsRegistryAntd from '@/lib/AntdRegistry'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import { UserProvider } from '@/context/UserContext'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
    title: 'Farmacia Sta Bárbara -  Sevilla Este',
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/images/darkIcon.png',
                href: '/images/darkIcon.png',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/images/iconlight.png',
                href: '/images/iconlight.png',
            },
        ],
    },
    description: 'Ven a visitarnos a nuestra farmacia en Sevilla Este',
    applicationName: 'Farmacia Sta Bárbara -  Sevilla Este',
    keywords:
        'Farmacia, Sevilla Este, Sta Bárbara, Sevilla, Este, Farmacia Sta Bárbara, Farmacia Sevilla Este, Farmacia Sta Bárbara Sevilla Este',
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://sevillaestefarmacia.com/',
        title: 'Farmacia Sta Bárbara -  Sevilla Este',
        description: 'Ven a visitarnos a nuestra farmacia en Sevilla Este',
    },
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <>
        <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta name="keywords" content={metadata.keywords} />
            <meta property="og:type" content={metadata.openGraph.type} />
            <meta property="og:locale" content={metadata.openGraph.locale} />
            <meta property="og:url" content={metadata.openGraph.url} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
                property="og:description"
                content={metadata.openGraph.description}
            />
        </Head>
        <html lang="es">
            <body>
                <StyledComponentsRegistryAntd>
                    <StyledComponentsRegistry>
                        <UserProvider>
                            <SpeedInsights />
                            {children}
                        </UserProvider>
                    </StyledComponentsRegistry>
                </StyledComponentsRegistryAntd>
            </body>
        </html>
    </>
)

export default RootLayout
