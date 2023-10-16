import { FC, memo } from 'react'
import {
    ButtonContainerServices,
    ContainerDescriptionServices,
    ContainerDesktopServices,
    ContainerImgServices,
    ContainerServices,
    DescriptionServices,
    ImgServices,
    SubtitleServices,
    TitleServices,
} from './styles'
import { Button } from '@mui/material'
import React from 'react'
import Link from 'next/link'

interface Props {
    id?: string
    title: string
    subTitle: string
    description: string
    buttonName: string
    backGrodunColor: string
    picture: string
    widthMobile?: string
    widthDesktop?: string
    widthTitle?: string
    widthTitleDesktop?: string
    flexDirection?: string
    imagePosition?: 'top' | 'bottom' // Prop para controlar la posición de la imagen
    onClick?: () => void
}

const Services: FC<Props> = ({
    id,
    title,
    subTitle,
    description,
    buttonName,
    backGrodunColor,
    picture,
    widthMobile,
    widthDesktop,
    widthTitle,
    widthTitleDesktop,
    flexDirection,
    imagePosition = 'bottom', // Valor predeterminado para imagePosition
    onClick,
}) => {
    return (
        <div
            style={{
                backgroundColor: backGrodunColor,
            }}
        >
            <ContainerDesktopServices flexdirection={flexDirection}>
                {imagePosition === 'top' && ( // Renderiza la imagen arriba si imagePosition es 'top'
                    <ContainerImgServices>
                        <ImgServices src={picture} />
                    </ContainerImgServices>
                )}
                <ContainerServices>
                    <TitleServices
                        widthtitledesktop={widthTitleDesktop}
                        widthtitle={widthTitle}
                    >
                        {title}
                    </TitleServices>
                    <SubtitleServices>{subTitle}</SubtitleServices>
                    <ContainerDescriptionServices>
                        <DescriptionServices
                            widthmobile={widthMobile}
                            widthdesktop={widthDesktop}
                        >
                            {description}
                        </DescriptionServices>
                    </ContainerDescriptionServices>
                    <ButtonContainerServices>
                        <Link href={`/services/${id}`}>
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
                        </Link>
                    </ButtonContainerServices>
                </ContainerServices>
                {imagePosition === 'bottom' && ( // Renderiza la imagen abajo si imagePosition es 'bottom'
                    <ContainerImgServices>
                        <ImgServices src={picture} />
                    </ContainerImgServices>
                )}
            </ContainerDesktopServices>
        </div>
    )
}

export default memo(Services)
