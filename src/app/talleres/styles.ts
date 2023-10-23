import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    margin-top: 6rem;
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
