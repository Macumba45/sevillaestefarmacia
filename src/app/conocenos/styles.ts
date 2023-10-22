import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    display: flex;
`

export const ContainerData = styled.div`
    background-color: #f6f6eb;
    width: 100%;
    display: flex;
    margin-top: 5rem;
    flex-direction: column;
`

export const ContainerServices = styled.div`
    width: 100%;
    background-color: #f6f6eb;
    display: none;
    flex-direction: column;
    margin-left: 8rem;
    @media screen and (min-width: 899px) {
        display: flex;
    }
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
    z-index: 9999;
`

export const Title = styled.h1`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: black;
    line-height: 2.5rem;
    margin-left: 2rem;
    margin-right: 2rem;
    font-weight: 500;
    margin-top: 2rem;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 3rem;
        margin-left: 4rem;
        margin-bottom: 2rem;
        margin-top: 3rem;
    }
`

export const ParrafoServices = styled.p`
    font-size: 1.2rem;
    color: black;
    text-align: left;
    line-height: 2rem;
    font-weight: 300;
    margin: 0.5rem 1rem;
    margin-left: 2rem;
    @media screen and (min-width: 899px) {
        font-size: 1.2rem;
        text-align: left;
        line-height: 2rem;
        margin-left: 4rem;
        margin-bottom: 2rem;
    }
`

export const ServiciosDesktop = styled.p`
    font-size: 1.2rem;
    color: black;
    text-align: left;
    font-weight: 300;
    margin: 0.5rem 1rem;
    @media screen and (min-width: 899px) {
        /* font-size: 1.2rem;
        text-align: left;
        line-height: 2.5rem;
        margin-left: 2rem;
        margin-bottom: 2rem; */
    }
`

export const MapContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
`

export const ImgMap = styled.img`
    width: 90%;

    @media screen and (min-width: 899px) {
        width: 800px;
    }
`

export const VideoYoutubeContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    margin-bottom: 3rem;
`

export const VideoYoutube = styled.iframe`
    width: 90%;
    height: 300px;
    @media screen and (min-width: 899px) {
        width: 800px;
        height: 500px;
    }
`
