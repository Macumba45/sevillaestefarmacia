import { FC, memo } from 'react'
import {
    ConocenosText,
    Container,
    ContainerLogos,
    CopyRight,
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
    return (
        <Container>
            <ConocenosText>Contacto</ConocenosText>
            <EmailFooter href="mailto:hola@sevillaestefarmacia.com">
                hola@sevillaestefarmacia.com
            </EmailFooter>
            <PhoneNumer>682 734 237</PhoneNumer>
            <LogosSocialMedia>
                <InstagramIcon sx={{ color: 'white', cursor: 'pointer' }} />
                <LocationOnIcon sx={{ color: 'white', cursor: 'pointer' }} />
            </LogosSocialMedia>
            <PolicyLinksContainer>
                <PolicyLinks>Términos y Condiciones</PolicyLinks>
                <PolicyLinks>Política de Privacidad</PolicyLinks>
                <PolicyLinks>Aviso Legal</PolicyLinks>
            </PolicyLinksContainer>
            <ContainerLogos>
                <PicturesLogos src={junta.src} />
                <PicturesLogos src={españa.src} />
                <PicturesLogos src={recuperacion.src} />
                <PicturesLogos src={unionEuropea.src} />
            </ContainerLogos>
            <CopyRight>Copyright © 2023 Farmacia Sta Bárbara</CopyRight>
        </Container>
    )
}

export default memo(Footer)
