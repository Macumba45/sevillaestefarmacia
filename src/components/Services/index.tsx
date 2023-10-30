import { FC, memo } from 'react'
import { Button } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import HoverMotion from '@/animations/hover'
import { useRouter } from 'next/navigation'
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

interface Props {
    id?: string
    title: string
    subtitle: string
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
    alt: string
    objectposition?: string
}

const Services: FC<Props> = ({
    id,
    title,
    subtitle,
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
    alt,
    objectposition,
}) => {
    const router = useRouter()

    const handleClickSubtitle = () => {
        router.push(`/services/${id}`)
    }
    return (
        <div
            style={{
                backgroundColor: backGrodunColor,
            }}
        >
            <ContainerDesktopServices flexdirection={flexDirection}>
                {imagePosition === 'top' && ( // Renderiza la imagen arriba si imagePosition es 'top'
                    <ContainerImgServices>
                        <ImgServices alt={alt} src={picture} />
                    </ContainerImgServices>
                )}
                <ContainerServices>
                    <TitleServices
                        widthtitledesktop={widthTitleDesktop}
                        widthtitle={widthTitle}
                    >
                        {title}
                    </TitleServices>
                    <SubtitleServices onClick={handleClickSubtitle}>
                        {subtitle}
                    </SubtitleServices>
                    <ContainerDescriptionServices>
                        <DescriptionServices
                            widthmobile={widthMobile}
                            widthdesktop={widthDesktop}
                        >
                            {description}
                        </DescriptionServices>
                    </ContainerDescriptionServices>
                    <ButtonContainerServices>
                        <Link
                            style={{
                                textDecoration: 'none',
                            }}
                            href={`/services/${id}`}
                        >
                            <HoverMotion>
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
                            </HoverMotion>
                        </Link>
                    </ButtonContainerServices>
                </ContainerServices>
                {imagePosition === 'bottom' && ( // Renderiza la imagen abajo si imagePosition es 'bottom'
                    <ContainerImgServices>
                        <ImgServices
                            objectposition={objectposition}
                            src={picture}
                        />
                    </ContainerImgServices>
                )}
            </ContainerDesktopServices>
        </div>
    )
}

export default memo(Services)
