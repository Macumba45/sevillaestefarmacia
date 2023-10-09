import * as React from 'react'
import { FC } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

interface Props {
    user: string
    serviceType?: string
    date: string
    phone?: string
}

const AlignItemsList: FC<Props> = ({ user, serviceType, date, phone }) => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={user} />
                </ListItemAvatar>
                <ListItemText
                    primary={'Motivo de la cita: ' + serviceType}
                    primaryTypographyProps={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                    }}
                    secondaryTypographyProps={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                marginTop={1}
                            >
                                Cliente:{' '}
                                <span style={{ fontWeight: 700 }}>{user}</span>
                            </Typography>
                            <Typography
                                component="span"
                                color="text.primary"
                                variant="body2"
                                marginTop={1}
                            >
                                Fecha:{' '}
                                <span
                                    style={{
                                        color: '#008232',
                                        fontWeight: 600,
                                    }}
                                >
                                    {date}
                                </span>
                            </Typography>
                        </React.Fragment>
                    }
                />
                <div style={{ display: 'flex' }}>
                    <Button
                        variant="contained"
                        {...(phone && {
                            onClick: () => {
                                window.open(`tel:${phone}`)
                            },
                        })}
                        sx={{
                            p: 0.5,
                            mt: 2,
                            backgroundColor: 'green',
                        }}
                    >
                        Llamar al cliente
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            p: 0.5,
                            mt: 2,
                            ml: 2,
                            backgroundColor: 'blue',
                        }}
                    >
                        Editar cita
                    </Button>
                </div>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )
}

export default AlignItemsList
