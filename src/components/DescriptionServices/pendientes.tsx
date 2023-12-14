import { FC, memo } from 'react'
import { Container, ParrafoServices, SpanBold, Title } from './styles'

interface Props {
    price: string
}

const Pendientes: FC<Props> = ({ price }) => {
    return (
        <Container>
            <ParrafoServices>
                Nuestro servicio de pendientes para bebés y también para
                adultos, cuenta con un equipo sanitario de profesionales
                farmacéuticos cualificado.
            </ParrafoServices>
            <ParrafoServices>
                Utilizamos un sistema de perforación del lóbulo totalmente
                aséptico. El pendiente utilizado para la perforación viene
                encapsulado y totalmente esterilizado por lo que la perforación
                será completamente inocua y aséptica.
            </ParrafoServices>

            <ParrafoServices>
                {' '}
                <SpanBold>
                    ¿Cuál es el coste del servicio? ¿Cómo pido cita?
                </SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                El coste del servicio de perforación de orejas y la pareja de
                pendientes es de {price} euros (el modelo lo puedes elegir una
                vez estés en la farmacia). Es necesario pedir cita para ponerle
                pendientes a los bebés, nos gusta tomarnos nuestro tiempo y
                hacer este momento algo especial. Sin prisas.
            </ParrafoServices>
            <ParrafoServices>
                <SpanBold>
                    {' '}
                    Hay una gran variedad de pendientes para poder elegir a tu
                    gusto.
                </SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                *Pendientes para adultos (mayor de 18 años) no es necesario
                solicitar cita previa ni realizar el pago previo. Si eres menor
                de 18 años tendrás que venir acompañado de tu padre/madre/tutor
                o con un formulario de autorización que te daremos en la
                farmacia
            </ParrafoServices>
        </Container>
    )
}

export default memo(Pendientes)
