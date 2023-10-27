import { FC, memo } from 'react'
import { Container, ParrafoServices, Title } from './styles'

interface Props {
    price: string
}

const Nutricion: FC<Props> = ({ price }) => {
    return (
        <Container>
            <ParrafoServices>
                Elena Sánchez Ortiz responsable del Servicio de Nutrición
                Clínica y Deportiva en Farmacia Sta. Bárbara (Sevilla Este),
                define una filosofía de nutrición en dos conceptos:
            </ParrafoServices>
            <ParrafoServices>
                El sufrimiento y sacrificio terminará con la reeducación en
                nuestra alimentación.
            </ParrafoServices>
            <ParrafoServices>
                Aprenderás nuevas y sencillas recetas. Podrás conocer nuevos
                alimentos e introducirlos en tu alimentación, y por supuesto te
                ayudaremos a planificarte la semana.
            </ParrafoServices>
            <Title>¡No tener tiempo no es excusa para no cuidarte!</Title>
            <ParrafoServices>
                Nuestro propósito no es llegar lo antes posible, sino darte las
                herramientas para llegar al objetivo dando siempre prioridad a
                tu salud. Disfrutarás del camino con unos hábitos sencillos que
                perdurarán en ti como rutina diaria y forma de vida.
            </ParrafoServices>
            <Title>¿Dónde tienen lugar las consultas?</Title>
            <ParrafoServices>
                Puedes elegir modalidad presencial en nuestra farmacia o formato
                online para recibir el asesoramiento desde donde quieras.
            </ParrafoServices>
            <Title>¿Cuál es el coste del servicio? ¿Cómo pido cita?</Title>
            <ParrafoServices>
                Puedes pedir tu cita directamente en nuestra farmacia de manera
                presencial, llamando al 682 73 42 37 o desde nuestra web previo
                pago seleccionando día y hora de la cita.
            </ParrafoServices>
            <Title>
                El precio de la primera consulta es: {price}€ <br />Y la
                consulta de seguimiento (quincenal): 15€
            </Title>
            <ParrafoServices>
                *Las consultas de seguimiento se abonarán directamente en la
                farmacia.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Nutricion)
