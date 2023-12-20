import React from 'react'
import Head from 'next/head'
import './reset.css'
import './global.css'
import StyledComponentsRegistryAntd from '@/lib/AntdRegistry'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import { UserProvider } from '@/context/UserContext'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

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
        url: 'https://www.sevillaestefarmacia.com',
        title: 'Farmacia Sta Bárbara -  Sevilla Este',
        description: 'Ven a visitarnos a nuestra farmacia en Sevilla Este',
    },
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <>
        <head>
            <Script
                id="gtag"
                dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-6KW0X4B236');
            `,
                }}
            ></Script>
        </head>
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
