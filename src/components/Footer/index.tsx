import { FC, memo } from 'react'
import {
    BannerSubvencion,
    ConocenosText,
    Container,
    ContainerLogos,
    ContainerSubvencion,
    CopyRight,
    DesignedBy,
    EmailFooter,
    LogosSocialMedia,
    PhoneNumer,
    PicturesLogos,
    PolicyLinks,
    PolicyLinksContainer,
    TextSubvencion,
} from './styles'
import junta from '../../assets/LOGOSUBVENCION/andalucia.png'
import españa from '../../assets/LOGOSUBVENCION/financiado.png'
import recuperacion from '../../assets/LOGOSUBVENCION/autonomo.svg'
import unionEuropea from '../../assets/LOGOSUBVENCION/digitial.png'
import empleaT from '../../assets/LOGOSUBVENCION/emplea-t.jpeg'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const Footer: FC = () => {
    const callNumber = () => {
        window.open('tel:682296561')
    }
    return (
        <Container>
            <ConocenosText>Contacto</ConocenosText>
            <EmailFooter href="mailto:hola@sevillaestefarmacia.com">
                hola@sevillaestefarmacia.com
            </EmailFooter>
            <PhoneNumer onClick={callNumber}>682 296 561</PhoneNumer>
            <LogosSocialMedia>
                <InstagramIcon
                    onClick={() =>
                        window.open(
                            'https://www.instagram.com/sevillaestefarmacia/',
                            '_blank'
                        )
                    }
                    sx={{
                        color: 'white',
                        cursor: 'pointer',
                        marginRight: '0.5rem',
                    }}
                />
                <LocationOnIcon
                    onClick={() =>
                        window.open(
                            'https://www.google.com/maps/place/Farmacia+Sta.+B%C3%A1rbara.+Sevilla+Este/@37.4041118,-5.9139216,18.68z/data=!4m6!3m5!1s0xd126f4c90bf07e7:0xfb6e4b26534ae22a!8m2!3d37.4040896!4d-5.9138217!16s%2Fg%2F11gd3bskf2?entry=ttu',
                            '_blank'
                        )
                    }
                    sx={{
                        color: 'white',
                        cursor: 'pointer',
                        marginLeft: '0.5rem',
                    }}
                />
            </LogosSocialMedia>
            <PolicyLinksContainer>
                <PolicyLinks
                    href="/pdf/cookies.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Política de Cookies
                </PolicyLinks>
                <PolicyLinks
                    href="/pdf/privacidad.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Política de Privacidad
                </PolicyLinks>
                <PolicyLinks
                    href="/pdf/legal.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Aviso Legal
                </PolicyLinks>
            </PolicyLinksContainer>
            <ContainerLogos>
                <PicturesLogos
                    alt="Junta de Andalucía"
                    style={{ width: '100px' }}
                    rel="preload"
                    loading="lazy"
                    src={junta.src}
                />
                <PicturesLogos
                    style={{ width: '160px' }}
                    alt="Bandera de españa"
                    rel="preload"
                    loading="lazy"
                    src={españa.src}
                />
                <PicturesLogos
                    style={{ width: '160px' }}
                    alt="Recuperacion UE"
                    rel="preload"
                    loading="lazy"
                    src={recuperacion.src}
                />
                <PicturesLogos
                    style={{ width: '320px' }}
                    alt="Union Europea"
                    rel="preload"
                    loading="lazy"
                    src={unionEuropea.src}
                />
            </ContainerLogos>
            <ContainerSubvencion>
                <TextSubvencion>
                    FARMACIA STA. BÁRBARA (Sevilla Este), ha sido beneficiaria
                    de una subvención concedida por la Consejería de Empleo,
                    Empresa y Trabajo Autónomo de la Junta de Andalucía,
                    Dirección General de Comercio, destinada a actualizar e
                    impulsar el sector comercial en Andalucía mediante la
                    implementación de nuevas tecnologías, dentro del Programa de
                    modernización del comercio: Fondo Tecnológico, en el marco
                    del Plan de Recuperación, Transformación y Resiliencia -
                    financiado por la Unión Europea - NextGenerationEU, en su
                    convocatoria para el año 2022.
                </TextSubvencion>
            </ContainerSubvencion>
            <BannerSubvencion
                alt="Cofinanciado por la Unión Europea, Ministerio de Trabajo y Economía Social, Fondos Europeos y Junta de Andalucía"
                loading="lazy"
                src={empleaT.src}
            />
            <ContainerSubvencion>
                <TextSubvencion>
                    Farmacia Santa Bárbara C.B beneficiaria, ha recibido una
                    subvención de la Consejería de Empleo, Empresa y Trabajo
                    Autónomo de la Junta de Andalucía, financiada por la Unión
                    Europea con cargo al Programa FSE+ Andalucía 2021-2027,
                    enmarcada en el Programa Emplea-T, para la inserción laboral
                    y el fomento de la contratación en el ámbito de la Comunidad
                    Autónoma de Andalucía. Línea 2. Incentivo a la segunda o
                    sucesivas contrataciones indefinidas ordinarias por parte de
                    personas trabajadoras autónomas, y a cualquier contratación
                    indefinida ordinaria por parte de pymes.
                </TextSubvencion>
            </ContainerSubvencion>

            <CopyRight>Copyright © 2023 Farmacia Sta. Bárbara</CopyRight>
            <DesignedBy target="_blank" href="https://portalcreativo.es/">
                Portal Creativo S.L
            </DesignedBy>
        </Container>
    )
}

export default memo(Footer)
