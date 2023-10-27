import { FC, memo } from 'react'
import { Container, ParrafoServices, Title } from './styles'

interface Props {
    price: string
}

const Laboratorio: FC<Props> = ({ price }) => {
    return (
        <Container>
            <ParrafoServices>
                En Farmacia Sta. Bárbara (Sevilla Este) somos especialistas en
                formulación magistral creando fórmulas y preparados oficiales
                con más de 30 años de experiencia.
            </ParrafoServices>
            <ParrafoServices>
                Disponemos de laboratorio propio integrado en nuestra farmacia
                para poder ofrecerte un servicio rápido, seguro y de calidad.
                Formulamos todo tipo de medicamentos, tanto de uso humano como
                veterinario.
            </ParrafoServices>
            <ParrafoServices>
                Rosario Acuña García,farmacéutica adjunta,formulista y
                responsable de este servicio farmacéutico, estará a tu
                disposición para cualquier duda que tengas con tu prescripción
                del médico y/o para cualquier encargo de formulación.
            </ParrafoServices>
            <Title>
                ¿Cuál es el coste y tiempos del servicio? ¿Cómo subo la receta?
            </Title>
            <ParrafoServices>
                Es importante dejar subida la receta a realizar donde podrás
                incluir además comentarios adicionales. Nos pondremos en
                contacto contigo una vez recibamos el pago e información de la
                formula para concretar el coste final y plazos de entrega.
            </ParrafoServices>
            <ParrafoServices>
                El precio de la reserva del servicio es de {price}€.
            </ParrafoServices>
            <ParrafoServices>
                **El coste final de la formula y los tiempos de entrega
                dependerá de la formula a preparar.
            </ParrafoServices>
            <ParrafoServices>
                **En caso de disconformidad procederemos a la devolución del
                coste de la reserva sin compromiso y al momento.
            </ParrafoServices>
            <ParrafoServices>
                Si te surgen preguntas puedes ponerte en contacto con nosotros a
                través de nuestro chat directo o llamando al 682 73 42 37.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Laboratorio)
