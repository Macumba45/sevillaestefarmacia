import React from 'react'
import './reset.css'
import './global.css'
import StyledComponentsRegistryAntd from '@/lib/AntdRegistry'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import { UserProvider } from '@/context/UserContext'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

export const metadata = {
    title: 'Farmacia Sta Bárbara - Sevilla Este',
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
    applicationName: 'Farmacia Sta Bárbara - Sevilla Este',
    keywords:
        'Farmacia, Sevilla Este, Sta Bárbara, Sevilla, Este, Farmacia Sta Bárbara, Farmacia Sevilla Este, Farmacia Sta Bárbara Sevilla Este',
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://www.sevillaestefarmacia.com',
        title: 'Farmacia Sta Bárbara - Sevilla Este',
        description: 'Ven a visitarnos a nuestra farmacia en Sevilla Este',
    },
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="es">
        <body>
            {/* Scripts de Cookiebot */}
            <Script
                id="Cookiebot"
                src="https://consent.cookiebot.com/uc.js"
                data-cbid="474b9dbc-ff07-442b-ad04-7a48bc7b6750"
                data-blockingmode="auto"
                strategy="afterInteractive"
            />
            {/* <Script
                id="CookieDeclaration"
                src="https://consent.cookiebot.com/474b9dbc-ff07-442b-ad04-7a48bc7b6750/cd.js"
                strategy="afterInteractive"
            /> */}

            {/* Scripts de Google Analytics */}
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-6KW0X4B236"
                strategy="afterInteractive"
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    
                    (function() {
                        gtag('consent', 'default', {
                            'ad_storage': 'denied',
                            'analytics_storage': 'denied'
                        });

                        gtag('js', new Date());

                        gtag('config', 'G-6KW0X4B236');
                    })();
                `
                }}
            />

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
)

export default RootLayout