import styled from 'styled-components'

export const Container = styled.div`
    margin-left: 0rem;
    @media screen and (min-width: 899px) {
        margin-left: 2rem;
    }
`
export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const Title = styled.h1<{
    withtitlemobile?: string
    withtitledesktop?: string
}>`
    font-size: 1.2rem;
    width: ${props => props.withtitlemobile};
    margin-bottom: 1rem;
    color: black;
    line-height: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
    font-weight: 900;
    margin-top: 1.5rem;
    @media screen and (min-width: 899px) {
        width: ${props => props.withtitledesktop};
        font-size: 1.2rem;
        line-height: 1.5rem;
        margin-left: 2rem;
        margin-bottom: 1.5rem;
        margin-top: 2rem;
    }
`

export const ParrafoServices = styled.p`
    font-size: 1.2rem;
    color: black;
    text-align: left;
    line-height: 2rem;
    font-weight: 300;
    margin: 1rem 1rem;
    margin-left: 2rem;
    @media screen and (min-width: 899px) {
        width: 70%;
        font-size: 1.2rem;
        text-align: left;
        line-height: 2rem;
        margin-left: 2rem;
        margin-bottom: 2rem;
    }
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
