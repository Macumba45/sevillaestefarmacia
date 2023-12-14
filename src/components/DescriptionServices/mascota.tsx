import { FC, memo } from 'react'
import { Container, ParrafoServices, SpanBold, Title } from './styles'

interface Props {
    price: string
}

const Mascota: FC<Props> = ({ price }) => {
    return (
        <Container>
            <ParrafoServices>
                Disponemos de productos veterinarios para tus mascotas, perros,
                gatos, y animales como caballos, cerdos, aves, vacas, etc.
            </ParrafoServices>
            <ParrafoServices>
                <SpanBold>
                    Suministramos todo tipo de medicamentos con un amplio stock
                    y bajo encargo.
                </SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                También{' '}
                <SpanBold>
                    realizamos formulaciones magistrales de medicación
                    veterinaria{' '}
                </SpanBold>
                en nuestro laboratorio de formulación magistral.
            </ParrafoServices>
            <ParrafoServices>
                Contacta con nosotros si tienes alguna duda sobre la medicación
                que estés suministrándole a tu mascota o animal de granja.
            </ParrafoServices>
            <ParrafoServices>
                <SpanBold>¿Quieres hacer un encargo?</SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                Si necesitas hacer un encargo o pedido para ayudar a tu mascota,
                no dudes en escribirnos a través del chat directo de la farmacia
                haciendo click más abajo en “¿Te asesoramos?”. Sandra Mora,
                técnico en veterinaria y farmacia estará disponible para
                ayudarte en todo lo relacionado con tu mascota.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Mascota)
