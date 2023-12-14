import { FC, memo } from 'react'
import { Container, ParrafoServices, SpanBold, Title } from './styles'

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
            <ParrafoServices>
                <SpanBold>
                    ¿Cómo solicito presupuesto? ¿Cuáles son los plazos de
                    entrega?
                </SpanBold>
            </ParrafoServices>
            <ParrafoServices>
                Más abajo encontrarás un botón “Solicitar presupuesto” para
                mandarnos la receta del médico y así poder calcularte el
                presupuesto del medicamento. Además del precio te diremos para
                cuando estaría disponible. Una vez aceptado el presupuesto y los
                plazos de entrega te mandaremos un enlace para que puedas
                realizar el pago del importe.
            </ParrafoServices>
            <ParrafoServices>
                *Las fórmulas magistrales y preparados oficinales no admiten
                devolución una vez iniciada la producción del medicamento.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Laboratorio)
