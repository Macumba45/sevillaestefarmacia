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
    margin-top: 8rem;
    margin-bottom: 1rem;
    color: black;
    text-align: left;
    padding-left: 2rem;
    line-height: 2.5rem;
    font-weight: 500;
    width: ${props => props.widthtitle};
    @media screen and (min-width: 899px) {
        width: ${props => props.widthtitledesktop};
        font-size: 2.5rem;
        line-height: 3rem;
        margin-left: 2rem;
    }
`

export const Subtitle = styled.h2`
    margin-left: 2rem;
    padding: 0.5rem 3.5rem;
    border-radius: 30px;
    font-size: 1.5rem;
    width: 100px;
    text-align: center;
    color: white;
    background-color: black;
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 2rem;
    @media screen and (min-width: 899px) {
        font-size: 1.5rem;
        line-height: 2rem;
        margin-left: 4rem;
    }
`
