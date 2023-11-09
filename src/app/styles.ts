import styled from 'styled-components'

export const HeaderServices = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f6f6eb;
    width: 100%;
    height: 320px;
`

export const IconHeaderTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const TitleHeaderServices = styled.h1`
    font-size: 1.2rem;
    color: black;
    text-align: center;
    font-weight: 700;
    padding: 1rem;
    border: 2px solid black; /* Personaliza el ancho y el color del borde */
    border-radius: 30px;
    width: 250px;

    @media screen and (min-width: 899px) {
        font-size: 1.5rem;
    }
`

export const ContainerDesktop = styled.div`
    margin-top: 5rem;
    @media screen and (min-width: 899px) {
        display: flex;
    }
`

export const ContainerDesktopServices = styled.div`
    @media screen and (min-width: 899px) {
        display: flex;
    }
`

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const NavContainer = styled.nav`
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    align-items: center;
    height: 5rem;
    background-color: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 9;
`
export const ContainerConocenos = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 320px;
    margin-top: 5rem;
    /* background-image: url('https://res.cloudinary.com/dinasxwdf/image/upload/v1699541517/farmacia/kjct7lmkzhts60xnyzhj.webp'); */
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 11111;
`
export const ContainerImgHome = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 899px) {
    }
`

export const ContainerDermo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 600px;
    background-color: #ebf0f6;
    @media screen and (min-width: 899px) {
        height: 100vh;
    }
`

export const ContainerNutricion = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 600px;
    background-color: #f6f6eb;
    @media screen and (min-width: 899px) {
        height: 100vh;
    }
`

export const ImgConocenos = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center; /* Ajusta la posición de la imagen al centro */
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`

export const TitleConocenos = styled.h1`
    font-size: 1.8rem;
    color: black;
    margin-top: 2rem;
    text-align: center;
    font-family: 'Cormorant Garamond', serif;
    @media screen and (min-width: 899px) {
        font-size: 3rem;
    }
`

export const SubtitleConocenos = styled.h2`
    font-size: 1.5rem;
    color: black;
    margin-top: 1rem;
    text-align: center;
    line-height: 2rem;
    width: 250px;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 4rem;
        width: 100%;
    }
`

export const ButtonContainerConocenos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
`

export const TitleDermo = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
    text-align: left;
    padding-left: 2rem;
    line-height: 2.5rem;
    font-weight: 400;
    @media screen and (min-width: 899px) {
        font-size: 3rem;
        line-height: 3rem;
        margin-left: 2rem;
    }
`
export const SubtitleDermo = styled.h2`
    padding: 0.5rem 3.5rem;
    border-radius: 30px;
    font-size: 1.5rem;
    max-width: 500px;
    min-width: 200px;
    text-align: center;
    margin: 0 auto;
    color: white;
    background-color: black;
    margin-top: 3rem;
    margin-bottom: 3rem;
    line-height: 2rem;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 2rem;
    }
`

export const DescriptionDermo = styled.p`
    display: flex;
    font-size: 1.5rem;
    color: black;
    text-align: center;
    line-height: 2rem;
    font-weight: 300;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;

    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 2.5rem;
    }
`

export const ButtonContainerDermo = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`

export const DescriptionNutricion = styled.p`
    display: flex;
    font-size: 1.5rem;
    color: black;
    text-align: center;
    line-height: 2.5rem;
    font-weight: 300;
    text-align: center;
    margin: 0 auto;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 4rem;
        width: 70%;
    }
`

export const FloatButtonContainer = styled.div`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
`
