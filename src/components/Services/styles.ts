import styled from 'styled-components'

export const ContainerDesktopServices = styled.div<{ flexdirection?: string }>`
    @media screen and (min-width: 899px) {
        display: flex;
        flex-direction: ${props => props.flexdirection};
    }
`

export const ContainerImgServices = styled.div`
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

export const ContainerServices = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 600px;
    @media screen and (min-width: 899px) {
        height: 100vh;
    }
`

export const ImgServices = styled.img<{ objectposition?: string }>`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: ${props => props.objectposition};
`

export const ButtonContainerServices = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`

export const TitleServices = styled.h1<{
    widthtitle?: string
    widthtitledesktop?: string
}>`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
    text-align: left;
    padding-left: 2rem;
    line-height: 2.5rem;
    /* font-weight:600; */
    width: ${props => props.widthtitle};
    @media screen and (min-width: 899px) {
        width: ${props => props.widthtitledesktop};
        font-size: 2.5rem;
        line-height: 3rem;
        margin-left: 2rem;
    }
`
export const SubtitleServices = styled.h2`
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
    cursor: pointer;
    @media screen and (min-width: 899px) {
        font-size: 1.5rem;
        line-height: 2rem;
    }
`

export const ContainerDescriptionServices = styled.div`
    display: flex;
    justify-content: center;
`

export const DescriptionServices = styled.p<{
    widthmobile?: string
    widthdesktop?: string
}>`
    font-size: 1.2rem;
    color: black;
    text-align: center;
    line-height: 2rem;
    margin: 0 auto;
    margin-left: 2rem;
    margin-right: 2rem;
    width: ${props => props.widthmobile};
    @media screen and (min-width: 899px) {
        font-size: 1.6rem;
        line-height: 2.3rem;
        width: ${props => props.widthdesktop};
    }
`
