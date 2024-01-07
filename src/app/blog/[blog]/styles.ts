import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: #ebf0f6;
`

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 5rem;
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
export const Title = styled.h1<{
    widthtitle?: string
    widthtitledesktop?: string
}>`
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 10rem;
    color: black;
    text-align: left;
    padding-left: 2rem;
    font-weight: 400;
    width: ${props => props.widthtitle};
    @media screen and (min-width: 899px) {
        width: ${props => props.widthtitledesktop};
        font-size: 3rem;
        line-height: 3rem;
        margin-left: 2rem;
    }
`

export const Subtitle = styled.h2`
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-size: 1.5rem;
    width: 250px;
    margin: 1rem 1rem;
    color: black;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 2rem;
        padding: 0.5rem 3rem;
        width: 100%;
        max-width: 320px;
        margin: 1rem 1rem;
    }
`
export const PictureContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    width: 100%;
`

export const Picture = styled.img`
    width: 100%;
    object-fit: cover;
    height: 100px;
    margin-left: 2rem;
    margin-right: 2rem;
    border-radius: 10px;
    @media screen and (min-width: 899px) {
        width: 100%;
        margin-left: 4rem;
        margin-right: 4rem;
        height: 400px;
    }
`

export const TitleDetails = styled.h1`
    font-size: 2rem;
    margin-top: 2rem;
    margin-left: 2rem;
    margin-bottom: 1rem;
    margin-right: 1rem;
    color: black;
    text-align: left;
    line-height: 2.5rem;
    font-weight: 400;
    @media screen and (min-width: 899px) {
        font-size: 2.5rem;
        line-height: 3rem;
        margin-left: 4rem;
    }
`

export const SubtitleDetails = styled.h2`
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-left: 2rem;
    margin-right: 1rem;
    color: black;
    text-align: left;
    line-height: 2.5rem;
    font-weight: 400;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 3rem;
        margin-left: 4rem;
    }
`

export const ParrafoServices = styled.p`
    font-size: 1.2rem;
    color: black;
    text-align: left;
    line-height: 2rem;
    margin-right: 2rem;
    font-weight: 300;
    margin-left: 2rem;
    margin-top: 2rem;
    margin-bottom: 4rem;
    @media screen and (min-width: 899px) {
        width: 70%;
        font-size: 1.2rem;
        text-align: left;
        line-height: 2rem;
        margin-left: 4rem;
        margin-bottom: 4rem;
        margin-top: 2rem;
    }
`

export const ButtonContainerServices = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
    @media screen and (min-width: 899px) {
        margin-bottom: 4rem;
    }
`
