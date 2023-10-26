import { FC, memo } from 'react'
import { Container, ParrafoServices, Title } from './styles'

interface Props {
    price: string
}

const Sistema: FC<Props> = ({ price }) => {
    return (
        <Container>
            <Title>SISTEMA PERSONALIZADO DE DOSIFICACIÓN</Title>
            <Title>SPD</Title>
            <ParrafoServices>
                El Sistema Personalizado de Dosificación es un servicio que
                tenemos disponible en Farmacia Sta. Bárbara (Sevilla Este) para
                ayudar especialmente a nuestros familiares mayores que son
                polimedicados o pacientes que tienen dificultad para seguir su
                medicación.
            </ParrafoServices>
            <ParrafoServices>
                Seguramente tengas en la familia o personas cercanas que se
                quejan de &apos;tomo muchas pastillas y me hago un lío...&apos;.
                Si es tu caso, te animamos a que sigas leyendo.
            </ParrafoServices>
            <Title>¿Qué ventajas tiene este servicio?</Title>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Mejora el control del paciente.
                </ParrafoServices>
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Facilita el cumplimiento del tratamiento.
                </ParrafoServices>
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Reduce los errores en la toma de medicamentos.
                </ParrafoServices>
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    -Evita problemas de manipulación y conservación.
                </ParrafoServices>
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Evita los problemas de confusión e intoxicación
                    involuntaria.
                </ParrafoServices>
            </div>
            <Title>¿ Para quién está indicado?</Title>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Pacientes con pautas de medicación complejas.
                </ParrafoServices>
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Personas mayores polimedicadas que necesitan asesoramiento
                    y/o viven solas.
                </ParrafoServices>
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Pacientes en residencias de mayores.
                </ParrafoServices>
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Pacientes que dependen de uno o varios cuidadores.
                </ParrafoServices>
            </div>
            <Title>¿Qué encontrarás en este servicio?</Title>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Organización de la medicación en pastilleros desechables
                    semanales (los pastilleros son de usar y tirar, no da lugar
                    a equivocación, nos aseguramos que las dosis sean tomadas en
                    el momento idóneo y de la forma correcta)
                </ParrafoServices>
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Seguimiento de la medicación y comunicación con su
                    médico/a de cabecera ante posibles cambios relacionados con
                    su medicación.
                </ParrafoServices>
                <ParrafoServices
                    style={{
                        marginBottom: '0px',
                        marginTop: '0px',
                    }}
                >
                    - Realización del servicio bajo control farmacéutico y
                    estrictos protocolos de seguridad.
                </ParrafoServices>
            </div>
            <Title>¿Cuál es el coste del servicio?</Title>
            <ParrafoServices>
                El precio del servicio de SPD consiste en: una entrevista
                personalizada + pack de 4 pastilleros a {price}€.
            </ParrafoServices>
            <Title>¿Necesitas más información?</Title>
            <ParrafoServices>
                Puedes ponerte en contacto con Ana Lobo,farmacéutica adjunta
                responsable del servicio, llamando al 682 73 42 37 o a través
                del chat directo de la farmacia.
            </ParrafoServices>
        </Container>
    )
}

export default memo(Sistema)
