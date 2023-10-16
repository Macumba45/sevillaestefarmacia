import styled from 'styled-components'

export const Container = styled.div``

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
    margin-top: 8rem;
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
    padding: 0.5rem 3.5rem;
    border-radius: 30px;
    font-size: 1.5rem;
    max-width: 500px;
    min-width: 200px;
    text-align: center;
    margin: 0 auto;
    color: white;
    background-color: black;
    margin-top: 3rem;
    margin-bottom: 3rem;
    line-height: 2rem;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 2rem;
    }
`
