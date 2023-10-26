import { FC, memo } from 'react'
import { Container, ParrafoServices, Title } from './styles'

interface Props {
    price: string
}

const Pendientes: FC<Props> = ({ price }) => {
    return (
        <Container>
            <Title>SUS PRIMEROS PENDIENTES</Title>
            <ParrafoServices>Pendientes bebé</ParrafoServices>
            <ParrafoServices>
                ¿Nuestro servicio de pendientes para bebés y también para
                adultos, cuenta con un equipo sanitario de profesionales
                farmacéuticos cualificado.
            </ParrafoServices>
            <ParrafoServices>
                Utilizamos un sistema de perforación del lóbulo totalmente
                aséptico. El pendiente utilizado para la perforación viene
                encapsulado y totalmente esterilizado por lo que la perforación
                será completamente inocua y aséptica.
            </ParrafoServices>
            <Title>
                Hay una gran variedad de pendientes para poder elegir a tu
                gusto.
            </Title>
            <Title>¿Cuál es el coste del servicio?</Title>
            <Title>¿Cómo pido cita?</Title>

            <ParrafoServices>
                El servicio de perforación de oreja es completamente gratuito.
                Solo tendrás que elegir entre los dos tipos de materiales de
                pendientes que tenemos disponibles.
            </ParrafoServices>
            <ParrafoServices>
                Puedes pedir tu cita directamente en nuestra farmacia de manera
                presencial, llamando al 682 73 42 37 o desde nuestra web previo
                pago seleccionando día y hora de la cita.
            </ParrafoServices>
            <Title>¿Tienes dudas?</Title>
            <ParrafoServices>
                Puedes pedir cita o preguntarnos cualquier duda directamente en
                nuestra farmacia de manera presencial, llamando al 682 73 42 37
                o a través del chat directo con la farmacia.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Pendientes)
