import { FC, memo } from 'react'
import { Container, ParrafoServices, SpanBold, Title } from './styles'

interface Props {
    price: string
}

const Sistema: FC<Props> = ({ price }) => {
    return (
        <Container>
            <ParrafoServices>
                Este servicio está claramente orientado a ayudar especialmente a
                nuestros familiares mayores que son polimedicados o pacientes
                que tienen dificultad para seguir su medicación.{' '}
                <SpanBold>
                    {' '}
                    Contamos con un robot automático para la fabricación de los
                    blísteres semanales asegurándonos de una mayor calidad,
                    eficacia y seguridad
                </SpanBold>{' '}
                en el proceso de manipulación de la medicación.
            </ParrafoServices>
            <ParrafoServices>
                {' '}
                <SpanBold>¿Para quién está indicado?</SpanBold>{' '}
            </ParrafoServices>
            <ParrafoServices>
                - Pacientes con pautas de medicación complejas que necesitan
                asesoramiento y/o viven solas.
                <br /> - Pacientes en residencias de mayores o que dependen de
                uno o varios cuidadores.
            </ParrafoServices>

            <ParrafoServices>
                {' '}
                <SpanBold>¿Qué ventajas tiene este servicio?</SpanBold>{' '}
            </ParrafoServices>
            <ParrafoServices>
                - Facilita el cumplimiento del tratamiento y reduce los errores
                en la toma de la medicación. <br /> - Evita problemas de
                manipulación y conservación, confusión e intoxicación
                involuntaria.
            </ParrafoServices>
            <ParrafoServices>
                <SpanBold>¿Qué encontrarás en este servicio?</SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                - Organización de la medicación en{' '}
                <SpanBold>pastilleros desechables</SpanBold>
                semanales (los pastilleros son de usar y tirar, no da lugar a
                equivocación, nos aseguramos que las dosis sean tomadas en el
                momento idóneo y de la forma correcta) <br />
                <br /> - <SpanBold>Seguimiento de la medicación </SpanBold> y
                comunicación con su médico/a de cabecera ante posibles cambios
                relacionados con su medicación. <br />
                <br /> - Realización del servicio bajo
                <SpanBold>
                    {' '}
                    control farmacéutico y estrictos protocolos de seguridad.
                </SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                {' '}
                <SpanBold>¿Cuál es el coste del servicio?</SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                El precio del servicio de SPD consiste en: una entrevista
                personalizada + pack de 4 pastilleros a {price}€.
            </ParrafoServices>
            <ParrafoServices>
                ¿<SpanBold>Necesitas más información?</SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                Puedes ponerte en contacto con Ana Lobo, farmacéutica adjunta
                responsable del servicio, llamando al 682 73 42 37 o a través
                del chat directo de la farmacia.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Sistema)
