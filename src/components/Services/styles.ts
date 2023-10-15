import styled from 'styled-components'

export const ContainerDesktopServices = styled.div<{ flexDirection?: string }>`
    @media screen and (min-width: 899px) {
        display: flex;
        flex-direction: ${props => props.flexDirection};
    }
`

export const ContainerImgHome = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    object-position: center; /* Ajusta la posición de la imagen al centro */

    @media screen and (min-width: 899px) {
    }
`

export const ContainerDermo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 600px;
    @media screen and (min-width: 899px) {
        height: 100vh;
    }
`

export const ImgConocenos = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: center; /* Ajusta la posición de la imagen al centro */
`

export const ButtonContainerConocenos = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`

export const TitleDermo = styled.h1<{ widthTitle?: string }>`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
    text-align: left;
    padding-left: 2rem;
    line-height: 2.5rem;
    font-weight: 500;
    width: ${props => props.widthTitle};
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

export const DescriptionDermo = styled.p<{
    widthMobile?: string
    widthDesktop?: string
}>`
    display: flex;
    font-size: 1.5rem;
    color: black;
    text-align: center;
    line-height: 2rem;
    font-weight: 300;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
    width: ${props => props.widthMobile};
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 2.5rem;
        width: ${props => props.widthDesktop};
    }
`
