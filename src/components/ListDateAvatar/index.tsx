import * as React from 'react'
import { FC } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { ButtonContainer } from './styles'
import CallRoundedIcon from '@mui/icons-material/CallRounded'

interface Props {
    user?: string
    serviceType?: string
    date?: string
    phone?: string
    hour?: string
    openEditModalDateAndHour?: () => void
    unBookDate?: () => void
}

const AlignItemsList: FC<Props> = ({
    user,
    serviceType,
    date,
    phone,
    hour,
    openEditModalDateAndHour,
}) => {
    function formatDateString(inputDate: any) {
        // Parsea la fecha en formato "dd/mm/yyyy" a un objeto Date
        const parts = inputDate.split('/')
        const day = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10) - 1 // Resta 1 al mes porque los meses en JavaScript son 0-indexados
        const year = parseInt(parts[2], 10)
        const dateObject = new Date(year, month, day)

        // Define los nombres de los días de la semana y de los meses
        const daysOfWeek = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
        ]
        const months = [
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

        // Obtiene el día de la semana, el día del mes y el mes en formato deseado
        const dayOfWeek = daysOfWeek[dateObject.getDay()]
        const dayOfMonth = dateObject.getDate()
        const monthName = months[dateObject.getMonth()]

        // Combina los valores en el formato deseado
        const formattedDate = `${dayOfWeek}, ${dayOfMonth} de ${monthName}`

        return formattedDate
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '@media screen and (max-width: 600px)': {
                        flexDirection: 'column',
                    },
                }}
            >
                <div>
                    <ListItemText
                        primary={'Cita: ' + serviceType}
                        primaryTypographyProps={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                        }}
                        secondaryTypographyProps={{
                            fontSize: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            fontWeight: 600,
                        }}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    marginTop={1}
                                    fontWeight={600}
                                    fontSize={'1.2rem'}
                                >
                                    Cliente:{' '}
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            fontFamily: 'Roboto',
                                        }}
                                    >
                                        {user}
                                    </span>
                                </Typography>
                                <Typography
                                    component="span"
                                    color="text.primary"
                                    variant="body2"
                                    marginTop={1}
                                    fontWeight={600}
                                    fontSize={'1.2rem'}
                                >
                                    Fecha:{' '}
                                    <span
                                        style={{
                                            color: '#008232',
                                            fontWeight: 600,
                                            fontFamily: 'Roboto',
                                        }}
                                    >
                                        {formatDateString(date)} a las {hour}
                                    </span>
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </div>
                <ButtonContainer>
                    <Button
                        variant="contained"
                        sx={{
                            p: 0.5,
                            mt: 2,
                            backgroundColor: 'green',
                            width: '140px',
                        }}
                    >
                        <CallRoundedIcon sx={{ mr: 1 }} />
                        {phone}
                    </Button>

                    <Button
                        onClick={openEditModalDateAndHour}
                        variant="contained"
                        sx={{
                            p: 0.5,
                            mt: 2,
                            width: '140px',
                            backgroundColor: 'blue',
                        }}
                    >
                        Editar cita
                    </Button>
                    {/* <Button
                        onClick={unBookDate}
                        variant="contained"
                        sx={{
                            p: 0.5,
                            mt: 2,
                            width: '140px',
                            backgroundColor: 'red',
                        }}
                    >
                        Liberar cita
                    </Button> */}
                </ButtonContainer>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )
}

export default AlignItemsList
