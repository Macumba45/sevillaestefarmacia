'use client'

import { FC, memo, useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import LayoutNavFooter from '@/layout/layout'
import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material'
import {
    BuyItemsContainer,
    MainContainer,
    ProfileDataContainer,
} from './styles'

const Perfil: FC = () => {
    const { user } = useContext(UserContext)

    function formatDateString(fechaStr: string) {
        fechaStr = fechaStr.replace('[', '').replace(']', '')
        const partes = fechaStr.split('/') // Dividir la cadena en día, mes y año

        if (partes.length === 3) {
            const dia = parseInt(partes[0], 10)
            const mes = parseInt(partes[1], 10) - 1 // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
            const año = parseInt(partes[2], 10)

            const fecha = new Date(año, mes, dia) // Constructor: new Date(año, mes, dia)

            // Mapea los nombres de los días de la semana
            const nombresDiasSemana = [
                'Domingo',
                'Lunes',
                'Martes',
                'Miércoles',
                'Jueves',
                'Viernes',
                'Sábado',
            ]
            const nombreDiaSemana = nombresDiasSemana[fecha.getDay()]

            // Mapea los nombres de los meses
            const nombresMeses = [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre',
            ]

            // Construye la fecha en el formato deseado
            const fechaFormateada = `${nombreDiaSemana}, ${dia} de ${nombresMeses[mes]}`
            return fechaFormateada
        } else {
            console.error('Formato de fecha no válido:', fechaStr)
            return 'Fecha inválida'
        }
    }

    useEffect(() => {
        document.title = `Mi perfil - ${user.name}`
    }, [])

    const titleSpd = 'SISTEMA PERSONALIZADO DE DOSIFICACIÓN'

    return (
        <LayoutNavFooter>
            <MainContainer>
                <ProfileDataContainer>
                    <Typography
                        sx={{
                            color: '#fff',
                        }}
                        variant="h5"
                        component="h1"
                    >
                        {user.name}
                    </Typography>
                    <Typography
                        sx={{
                            color: '#fff',
                        }}
                        marginTop={2}
                        component="p"
                    >
                        {user.email}
                    </Typography>
                </ProfileDataContainer>
                {user.payments?.length !== 0 && (
                    <Typography
                        sx={{
                            color: 'black',
                        }}
                        variant="h6"
                        textAlign={'center'}
                        marginTop={3}
                        marginBottom={3}
                        fontWeight={300}
                    >
                        Tus compras
                    </Typography>
                )}
                <BuyItemsContainer>
                    {user.payments?.length === 0 ? (
                        <Typography
                            sx={{
                                color: 'black',
                            }}
                            variant="h6"
                            textAlign={'center'}
                            marginTop={3}
                            marginBottom={3}
                            fontWeight={300}
                        >
                            No tienes compras
                        </Typography>
                    ) : (
                        user.payments?.map((item, index) => (
                            <>
                                <ListItem
                                    key={index}
                                    sx={{
                                        marginTop: 0,
                                        backgroundColor: '#fff',
                                        borderRadius: '10px',
                                        boxShadow:
                                            '0px 0px 10px 0px rgba(221, 221, 221, 0.75)',
                                        margin: '0.5rem',
                                        width: '90%',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.3s',
                                        },
                                    }}
                                >
                                    <Divider
                                        orientation="horizontal"
                                        flexItem
                                    />

                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                backgroundColor: '#000000',
                                            }}
                                        >
                                            <ShoppingBagIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            color: 'black',
                                            fontWeight: 200,
                                            fontFamily: 'Cormorant Garamond',
                                        }}
                                        secondaryTypographyProps={{
                                            fontWeight: 600,
                                            fontFamily: 'Cormorant Garamond',
                                            fontSize: '1rem',
                                        }}
                                        primary={item.title as any}
                                        secondary={
                                            item.title === titleSpd
                                                ? 'Pago confirmado'
                                                : `${formatDateString(
                                                    item.date &&
                                                    (item.date[0] as any)
                                                )} a las ${item.hour}h`
                                        }
                                    />
                                </ListItem>
                            </>
                        ))
                    )}
                </BuyItemsContainer>
            </MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Perfil)
