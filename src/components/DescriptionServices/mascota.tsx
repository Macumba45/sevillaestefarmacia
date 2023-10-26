import { FC, memo } from 'react'
import { Container, ParrafoServices, Title } from './styles'

interface Props {
    price: string
}

const Mascota: FC<Props> = ({ price }) => {
    return (
        <Container>
            <Title>TU MASCOTA EN BUENAS MANOS</Title>
            <ParrafoServices>Farmacia Veterinaria</ParrafoServices>
            <ParrafoServices>
                En Farmacia Sta. Bárbara (Sevilla Este) Disponemos de productos
                veterinarios para tus mascotas, perros, gatos, y animales como
                caballos, cerdos, aves, vacas, etc.
            </ParrafoServices>
            <ParrafoServices>
                Suministramos todo tipo de medicamentos con un amplio stock y
                bajo encargo.
            </ParrafoServices>
            <ParrafoServices>
                También realizamos formulaciones magistrales de medicación
                veterinaria en nuestro laboratorio de formulación magistral.
            </ParrafoServices>
            <ParrafoServices>
                Contacta con nosotros si tienes alguna duda sobre la medicación
                que estés suministrándole a tu mascota o animal de granja.
            </ParrafoServices>
            <ParrafoServices>
                Consultas, encargos o pedidos, no dudes en escribirnos a través
                del chat directo de la farmacia.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Mascota)
