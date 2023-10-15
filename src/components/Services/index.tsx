import { FC, memo } from 'react'
import {
    ContainerDesktopServices,
    ContainerDermo,
    TitleDermo,
    SubtitleDermo,
    DescriptionDermo,
    ButtonContainerConocenos,
    ContainerImgHome,
    ImgConocenos,
} from './styles'
import { Button } from '@mui/material'
import React from 'react'

interface Props {
    title: string
    subTitle: string
    description: string
    buttonName: string
    backGrodunColor: string
    picture: string
    widthMobile?: string
    widthDesktop?: string
    widthTitle?: string
    flexDirection?: string
    imagePosition?: 'top' | 'bottom' // Prop para controlar la posición de la imagen
}

const Services: FC<Props> = ({
    title,
    subTitle,
    description,
    buttonName,
    backGrodunColor,
    picture,
    widthMobile,
    widthDesktop,
    widthTitle,
    flexDirection,
    imagePosition = 'bottom', // Valor predeterminado para imagePosition
}) => {
    return (
        <div
            style={{
                backgroundColor: backGrodunColor,
            }}
        >
            <ContainerDesktopServices flexDirection={flexDirection}>
                {imagePosition === 'top' && ( // Renderiza la imagen arriba si imagePosition es 'top'
                    <ContainerImgHome>
                        <ImgConocenos src={picture} />
                    </ContainerImgHome>
                )}
                <ContainerDermo>
                    <TitleDermo widthTitle={widthTitle}>{title}</TitleDermo>
                    <SubtitleDermo>{subTitle}</SubtitleDermo>
                    <DescriptionDermo
                        widthMobile={widthMobile}
                        widthDesktop={widthDesktop}
                    >
                        {description}
                    </DescriptionDermo>
                    <ButtonContainerConocenos>
                        <Button
                            variant="outlined"
                            sx={{
                                color: 'black',
                                borderColor: 'black',
                                width: '200px',
                                borderRadius: '130px',
                                backgroundColor: 'white',
                                ':hover': {
                                    backgroundColor: 'black',
                                    color: 'white',
                                    borderColor: 'transparent',
                                },
                                fontFamily: 'Cormorant Garamond',
                            }}
                        >
                            {buttonName}
                        </Button>
                    </ButtonContainerConocenos>
                </ContainerDermo>
                {imagePosition === 'bottom' && ( // Renderiza la imagen abajo si imagePosition es 'bottom'
                    <ContainerImgHome>
                        <ImgConocenos src={picture} />
                    </ContainerImgHome>
                )}
            </ContainerDesktopServices>
        </div>
    )
}

export default memo(Services)
