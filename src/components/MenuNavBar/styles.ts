import styled from 'styled-components'

export const LogoImg = styled.img`
    width: 10rem;
    cursor: pointer;
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
export const stylesNavBar = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    backgroundColor: 'black',
    color: 'white',
}
