import React from 'react'
import './reset.css'
import './global.css'
import StyledComponentsRegistryAntd from '@/lib/AntdRegistry'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import { UserProvider } from '@/context/UserContext'

export const metadata = {
    title: 'Farmacia Santa Bárbara -  Sevilla Este',
    description: 'Ven a visitarnos a nuestra farmacia en Sevilla Este',
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <head>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap"
            />
        </head>

        <body>
            <StyledComponentsRegistryAntd>
                <StyledComponentsRegistry>
                    <UserProvider>{children}</UserProvider>
                </StyledComponentsRegistry>
            </StyledComponentsRegistryAntd>
        </body>
    </html>
)

export default RootLayout
