import { FC, memo } from 'react'
import {
    ConocenosText,
    Container,
    ContainerLogos,
    CopyRight,
    DesignedBy,
    EmailFooter,
    LogosSocialMedia,
    PhoneNumer,
    PicturesLogos,
    PolicyLinks,
    PolicyLinksContainer,
} from './styles'
import junta from '../../assets/LOGOSUBVENCION/andalucia.png'
import españa from '../../assets/LOGOSUBVENCION/españa.png'
import recuperacion from '../../assets/LOGOSUBVENCION/recuperacion.png'
import unionEuropea from '../../assets/LOGOSUBVENCION/europa.png'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const Footer: FC = () => {
    const callNumber = () => {
        window.open('tel:682734237')
    }
    return (
        <Container>
            <ConocenosText>Contacto</ConocenosText>
            <EmailFooter href="mailto:hola@sevillaestefarmacia.com">
                hola@sevillaestefarmacia.com
            </EmailFooter>
            <PhoneNumer onClick={callNumber}>682 734 237</PhoneNumer>
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
                            'https://www.google.com/maps/search/?api=1&query=Calle Periodista Juan Tribuna, 8 (Local 2) 41019 Sevilla',
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
                <PolicyLinks>Términos y Condiciones</PolicyLinks>
                <PolicyLinks>Política de Privacidad</PolicyLinks>
                <PolicyLinks>Aviso Legal</PolicyLinks>
            </PolicyLinksContainer>
            <ContainerLogos>
                <PicturesLogos
                    alt="Junta de Andalucía"
                    style={{ width: '250px' }}
                    rel="preload"
                    loading="lazy"
                    src={junta.src}
                />
                <PicturesLogos
                    alt="Bandera de españa"
                    rel="preload"
                    loading="lazy"
                    src={españa.src}
                />
                <PicturesLogos
                    alt="Recuperacion UE"
                    rel="preload"
                    loading="lazy"
                    src={recuperacion.src}
                />
                <PicturesLogos
                    alt="Union Europea"
                    rel="preload"
                    loading="lazy"
                    src={unionEuropea.src}
                />
            </ContainerLogos>
            <CopyRight>Copyright © 2023 Farmacia Sta. Bárbara</CopyRight>
            <DesignedBy
                target="_blank"
                href="https://gonzalolobocv.vercel.app/"
            >
                Developed by Macumba45
            </DesignedBy>
        </Container>
    )
}

export default memo(Footer)
