import { FC, memo } from 'react'
import { Container, ParrafoServices, SpanBold, Title } from './styles'

interface Props {
    price: string
}

const Dermo: FC<Props> = ({ price }) => {
    return (
        <>
            <Container>
                <ParrafoServices>
                    Conocer el estado de tu piel, crear nuevas rutinas de
                    cuidados faciales y/o capilares y resolver dudas.{' '}
                    <SpanBold>
                        {' '}
                        Esa es nuestra misión, sacarle el máximo partido a tu
                        salud facial y capilar.
                    </SpanBold>
                </ParrafoServices>
                <ParrafoServices>
                    Busca tu momento para empezar con tu ‘skin care’ y empieza a
                    cuidarte. Nuestra farmacia cuenta con un gabinete privado y
                    tranquilo donde te realizaremos una breve entrevista para
                    conocer tus hábitos de cuidados además de medicación si
                    estás tomando, tan importante en muchísimas ocasiones del
                    estado de tu piel y/o problemas de caída capilar.
                </ParrafoServices>
                <ParrafoServices>
                    Además,{' '}
                    <SpanBold>
                        utilizando tecnología de los equipos Courage + Khazaka,{' '}
                    </SpanBold>
                    conseguiremos ofrecerte una rutina mucho más específica. Las
                    profesionales sanitarias{' '}
                    <SpanBold>
                        Celia Guerrero en análisis facial y Ana Lobo en análisis
                        capilar,{' '}
                    </SpanBold>
                    estarán para ofrecerte uno de los servicios más demandados
                    de nuestra farmacia.
                </ParrafoServices>
                <ParrafoServices>
                    Para poder disfrutar del servicio, simplemente tienes que
                    registrarte, reservar tu cita y abonar el importe. Nos
                    pondremos en contacto contigo y te recordaremos la cita los
                    días previos. ¡Ah! Una vez generada la reserva, dejaremos un
                    bono preparado para ti, para utilizarlo el día de tu cita, y
                    así puedas canjearlo en la compra de tus productos
                    recomendados en la rutina ‘skin care’.
                </ParrafoServices>
                <ParrafoServices>
                    *El coste del servicio es de {price}€. El bono descuento por
                    valor de 20 euros no es transferible a otra persona y se
                    canjea el mismo día de la cita.
                </ParrafoServices>
            </Container>
        </>
    )
}

export default memo(Dermo)
