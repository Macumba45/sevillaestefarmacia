import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
`

export const ProfileDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    background-color: black;
    margin-top: 5rem;
`
export const BuyItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    width: 100%;
    margin-bottom: 2rem;
    @media screen and (min-width: 899px) {
        width: 600px;
        margin: 0 auto;
        margin-bottom: 5rem;
    }
`
