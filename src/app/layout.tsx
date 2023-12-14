import React from 'react'
import './reset.css'
import './global.css'
import StyledComponentsRegistryAntd from '@/lib/AntdRegistry'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import { UserProvider } from '@/context/UserContext'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Farmacia Sta Bárbara -  Sevilla Este',
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
    classification: 'Farmacia Sta Bárbara -  Sevilla Este',
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <head>
            {/* <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Roboto+Condensed:wght@300;400;700&display=swap"
            /> */}
        </head>

        <body>
            <SpeedInsights />
            <StyledComponentsRegistryAntd>
                <StyledComponentsRegistry>
                    <UserProvider>{children}</UserProvider>
                </StyledComponentsRegistry>
            </StyledComponentsRegistryAntd>
        </body>
    </html>
)

export default RootLayout
