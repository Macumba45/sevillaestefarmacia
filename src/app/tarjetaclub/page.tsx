'use client'

import { FC, memo, useEffect } from 'react'
import { Container, Iframe } from './styles'

const TarjetaClub: FC = () => {
    useEffect(() => {
        document.title = 'TarjetaClub'
    }, [])

    return (
        <Container>
            <Iframe src="https://www.puntosonline.com/"></Iframe>
        </Container>
    )
}

export default memo(TarjetaClub)
