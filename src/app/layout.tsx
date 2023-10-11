import React from 'react'
import './reset.css'
import StyledComponentsRegistry from '@/lib/AntdRegistry'
require('dotenv').config()

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
    </html>
)

export default RootLayout
