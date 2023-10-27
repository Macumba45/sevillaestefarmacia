import styled from 'styled-components'
import Popover from '@mui/material/Popover'

export const MainContainer = styled.div`
    width: 100%;
    display: flex;
`

export const ContainerParrafosAndServices = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    flex-direction: column;

    @media screen and (min-width: 899px) {
        display: flex;
        flex-direction: row;
    }
`

export const ContainerData = styled.div`
    background-color: #f6f6eb;
    width: 100%;
    display: flex;
    margin-top: 5rem;
    flex-direction: column;
`

export const ContainerParrafos = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
    justify-content: center;
`

export const ContainerServices = styled.div`
    width: 100%;
    background-color: #f6f6eb;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    margin-top: 2rem;
    @media screen and (min-width: 899px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
        margin-top: 0rem;
    }
`

export const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: black;
    line-height: 2.5rem;
    margin-left: 2rem;
    margin-right: 2rem;
    font-weight: 500;
    margin-top: 5rem;
    @media screen and (min-width: 899px) {
        font-size: 3rem;
        line-height: 3rem;
        margin-left: 4rem;
        margin-bottom: 1rem;
        margin-top: 5rem;
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
        margin-bottom: 1rem;
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

export const SubtitleServices = styled.h2`
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-size: 1.5rem;
    width: 250px;
    text-align: center;
    margin-left: 2rem;
    margin-top: 2rem;
    color: white;
    background-color: black;
    line-height: 2rem;
    margin-bottom: 3rem;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        margin-left: 4rem;
        line-height: 2rem;
        padding: 0.5rem 3rem;
        margin-bottom: 3rem;
        width: 300px;
    }
`
