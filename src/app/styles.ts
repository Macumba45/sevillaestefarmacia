import styled from 'styled-components'

export const NavContainer = styled.nav`
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    align-items: center;
    height: 5rem;
    background-color: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`
export const ContainerConocenos = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90vh;
    background-color: #eaeaea;
`

export const ContainerImgConocenos = styled.div`
    display: flex;
    background-size: cover;
    justify-content: center;
    align-items: center;
    object-fit: fill;
`

export const ImgConocenos = styled.img`
    width: 100%;
`

export const TitleConocenos = styled.h1`
    font-size: 2rem;
    color: black;
    margin-top: 2rem;
    text-align: center;
    font-family: Roboto, sans-serif;
    @media screen and (min-width: 899px) {
        font-size: 4rem;
    }
`

export const SubtitleConocenos = styled.h2`
    font-size: 1.5rem;
    color: black;
    margin-top: 2rem;
    text-align: center;
    line-height: 2rem;
    font-family: Roboto, sans-serif;
    @media screen and (min-width: 899px) {
        font-size: 2.5rem;
        line-height: 4rem;
    }
`

export const ButtonContainerConocenos = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`
