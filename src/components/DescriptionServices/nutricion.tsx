import { FC, memo } from 'react'
import { Container, ParrafoServices, SpanBold, Title } from './styles'

interface Props {
    price: string
}

const Nutricion: FC<Props> = ({ price }) => {
    return (
        <Container>
            <ParrafoServices>
                Nos centraremos en la reeducación alimentaria a través de una
                alimentación equilibrada basada en la dieta mediterránea.
            </ParrafoServices>
            <ParrafoServices>
                De esta forma abordaremos la situación de cada paciente
                atendiendo a sus necesidades, ya sean la pérdida de peso, la
                ganancia de musculatura o llevar una alimentación saludable para
                la prevención de enfermedades y patologías.
            </ParrafoServices>
            <ParrafoServices>
                Cada persona es única de modo que el asesoramiento nutricional
                es <SpanBold>totalmente personalizado y adaptado.</SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                <SpanBold>¿Cómo lo hacemos?</SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                Elena Sanchez, nutricionista responsable del servicio en
                farmacia Sta. Bárbara, inicia el proceso con una primera
                consulta presencial donde se valorará y se tendrá en cuenta:
            </ParrafoServices>
            <ParrafoServices>
                - Patologías que presentes y/o medicación que estés tomando.
                <br />
                - Objetivos del paciente.
                <br />- Medición de parámetros corporales con{' '}
                <SpanBold>báscula de bioimpedancia.</SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                El proceso continúa con revisiones semanales o quincenales según
                necesidades de cada paciente, enfocadas a alcanzar mayor
                adherencia e implicación para así lograr el objetivo.
            </ParrafoServices>
            <ParrafoServices>
                Los planes de asesoramiento se enviarán a través de correo
                electrónico o a través de Whatsapp, según preferencias.
            </ParrafoServices>
            <ParrafoServices>
                <SpanBold>
                    {' '}
                    Las consultas pueden ser presenciales y/u online.
                </SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                <SpanBold>Primera consulta </SpanBold> 30 - 40 minutos{' '}
                <SpanBold>{price} euros.</SpanBold>
                <br />
                <SpanBold>Consultas de seguimiento</SpanBold> 15 - 20 minutos{' '}
                <SpanBold>15 euros</SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                *Para las consultas de seguimiento el abono de la cita se
                realizará en la farmacia.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Nutricion)
