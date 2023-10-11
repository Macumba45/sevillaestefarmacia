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
    z-index: 9999;
`
export const ContainerConocenos = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    width: 100%;
    height: 90vh;
    background-color: #eaeaea;
`
export const ContainerImgHome = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`

export const ContainerDermo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    background-color: #c2e0ff;
    @media screen and (min-width: 899px) {
        height: 110vh;
    }
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

export const TitleDermo = styled.h1`
    font-size: 2rem;
    margin-top: 5rem;
    margin-bottom: 1rem;
    color: black;
    margin-left: 1rem;
    text-align: left;
    font-family: Roboto, sans-serif;
    line-height: 3rem;
    font-weight: 500;
    @media screen and (min-width: 899px) {
        font-size: 4rem;
        line-height: 5rem;
        margin-left: 2rem;
        margin-top: 5rem;
    }
`
export const SubtitleDermo = styled.h2`
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
    font-family: Roboto, sans-serif;
    @media screen and (min-width: 899px) {
        font-size: 2.5rem;
        line-height: 4rem;
        min-width: 300px;
    }
`

export const DescriptionDermo = styled.p`
    display: flex;
    font-size: 1.5rem;
    color: black;
    text-align: center;
    line-height: 2.5rem;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    text-align: center;
    margin: 0 auto;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 4rem;
    }
`

export const ButtonContainerDermo = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`

export const ContainerNutricion = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: #fffccf;
    @media screen and (min-width: 899px) {
        height: 110vh;
    }
`

export const DescriptionNutricion = styled.p`
    display: flex;
    font-size: 1.5rem;
    color: black;
    text-align: center;
    line-height: 2.5rem;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    text-align: center;
    margin: 0 auto;
    @media screen and (min-width: 899px) {
        font-size: 2rem;
        line-height: 4rem;
        width: 70%;
    }
`
