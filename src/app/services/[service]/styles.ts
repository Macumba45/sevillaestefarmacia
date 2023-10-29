import styled from 'styled-components'

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const Container = styled.div<{ backgroundcolor?: string }>`
    background-color: ${props => props.backgroundcolor};
    width: 100%;
    display: flex;
    flex-direction: column;
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

export const TitleServices = styled.h1<{
    widthtitle?: string
    widthtitledesktop?: string
}>`
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 10rem;
    color: black;
    text-align: left;
    padding-left: 2rem;
    line-height: 2.5rem;
    font-weight: 500;
    width: ${props => props.widthtitle};
    @media screen and (min-width: 899px) {
        width: ${props => props.widthtitledesktop};
        font-size: 3rem;
        line-height: 3rem;
        margin-left: 2rem;
    }
`

export const SubtitleServices = styled.h2`
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-size: 1.5rem;
    width: 250px;
    text-align: center;
    margin: 3rem auto;
    color: white;
    background-color: black;
    line-height: 2rem;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 2rem;
        padding: 0.5rem 3rem;

        width: 300px;
    }
`

export const DescriptionServices = styled.p<{
    widthmobile?: string
    widthdesktop?: string
}>`
    font-size: 1.2rem;
    color: black;
    text-align: left;
    line-height: 2rem;
    font-weight: 300;
    margin: 0 auto;
    margin-left: 2rem;
    @media screen and (min-width: 899px) {
        font-size: 1.5rem;
        text-align: center;
        line-height: 2.5rem;
        margin-left: 0rem;

        width: ${props => props.widthdesktop};
    }
`

export const ButtonContainerServices = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    margin-bottom: 3rem;
`

export const FloatButtonContainer = styled.div`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
`
export const FloatButtonLoginContainer = styled.div`
    position: fixed;
    bottom: 6rem;
    right: 2rem;
    z-index: 9999;
`

export const VideoYoutubeContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    margin-bottom: 8rem;
`

export const VideoYoutube = styled.iframe`
    width: 90%;
    @media screen and (min-width: 899px) {
        width: 800px;
        height: 500px;
    }
`
export const PictureContainer = styled.div`
    display: none;
    margin-right: 4rem;
    margin-left: 2rem;
    object-fit: cover;
    background-position: left;
    @media screen and (min-width: 899px) {
        display: flex;
    }
`
export const Picture = styled.img`
    width: 400px;
    height: 90%;
    display: none;
    object-fit: cover;
    border-radius: 10px;
    @media screen and (min-width: 899px) {
        display: flex;
    }
`
