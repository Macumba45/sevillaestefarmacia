import styled from 'styled-components'

export const Container = styled.div`
    background-color: black;
    width: 100%;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (min-width: 899px) {
        height: 450px;
    }
`

export const ConocenosText = styled.h2`
    color: white;
    font-size: 2rem;
    text-align: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
`

export const EmailFooter = styled.a`
    color: white;
    text-align: center;
    text-decoration: none;
`

export const PhoneNumer = styled.p`
    color: white;
    text-align: center;
    margin-top: 1rem;
    cursor: pointer;
    text-decoration: none;
`

export const LogosSocialMedia = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
`

export const PolicyLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 899px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
`

export const PolicyLinks = styled.a`
    color: white;
    text-align: center;
    margin: 0.5rem;
    cursor: pointer;
`

export const ContainerLogos = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
    @media screen and (min-width: 899px) {
        width: 100%;
        margin: 0 auto;
    }
`

export const PicturesLogos = styled.img`
    width: 100px;
    margin: 1rem;
    cursor: pointer;
    object-fit: cover;
    object-position: center;
    @media screen and (min-width: 899px) {
        width: 170px;
    }
`

export const CopyRight = styled.p`
    color: white;
    text-align: center;
    margin-bottom: 2rem;
`

export const DesignedBy = styled.a`
    color: white;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.8rem;
`
