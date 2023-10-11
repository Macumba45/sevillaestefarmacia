import styled from 'styled-components'

export const NavContainer = styled.nav`
    display: flex;
    align-items: center;
    height: 5rem;
    background-color: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

export const LogoImg = styled.img`
    width: 10rem;
`

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    @media screen and (max-width: 899px) {
        // Se agregó un espacio entre "and" y "(max-width: 768px)"
        display: none;
    }
`

export const ButtonLoginContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    @media screen and (max-width: 899px) {
        // Se agregó un espacio entre "and" y "(max-width: 768px)"
        display: none;
    }
`

export const InstagramContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    @media screen and (max-width: 899px) {
        // Se agregó un espacio entre "and" y "(max-width: 768px)"
        display: none;
    }
`
