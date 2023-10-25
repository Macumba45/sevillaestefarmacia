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
                Para lograrlo, disponemos de los conocimientos en constante
                evolución, la experiencia y la cualificación necesaria para
                analizar y valorar de forma personalizada todas las afecciones y
                alteraciones de tu piel.
            </ParrafoServices>
            <ParrafoServices>
                Profesionales expertos en medicamentos. Farmacéuticos por
                vocación y profesión, cosechamos con nuestros conocimientos la
                mejora de la salud basándonos en la utilización medicamentos
                como tratamiento y prevención en la localidad de Sevilla desde
                1960.
            </ParrafoServices>
            <Title>Si tu piel está sana, tu piel lucirá bella.</Title>
            <Title>¿Cómo lo hacemos?</Title>
            <ParrafoServices>
                Las consultas se desarrollan en nuestro tranquilo y agradable
                gabinete, además contamos con un equipo de dermoanálisis y
                diversos materiales para valorar mejor los resultados obtenidos
                y poder realizar una recomendación de una manera
                individualizada.
            </ParrafoServices>
            <Title>¿Con qué marcas trabajamos?</Title>
            <ParrafoServices>
                En Farmacia Sta. Bárbara trabajamos con las mejores marcas en
                dermocosmética para el cuidado de la piel. Disponemos una amplia
                variedad de productos para ofrecerte el que mejor se ajuste a
                tus necesidades y presupuesto.
            </ParrafoServices>
            <ParrafoServices>
                Entre ellas se encuentran: Caudalie, Gema Herrerias, Bioderma,
                Eucerin...
            </ParrafoServices>
            <ParrafoServices>
                Además, con la tarjeta ‘CLUB’, conseguirás un 3% de descuento
                acumulable en tus compras en parafarmacia.
            </ParrafoServices>
            <Title>¿Cuál es el coste del servicio? ¿Cómo pido cita?</Title>
            <ParrafoServices>
                Puedes pedir tu cita directamente en nuestra farmacia de manera
                presencial, llamando al 682 73 42 37 o desde nuestra web previo
                pago seleccionando día y hora de la cita.
            </ParrafoServices>
            <ParrafoServices>
                El coste del servicio es de {price}€.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Pendientes)
