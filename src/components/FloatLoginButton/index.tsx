import { FC, memo } from 'react'
import { Fab } from '@mui/material'

interface Props {
    onClick?: () => void
    disabled?: boolean
    title: string
    style: React.CSSProperties
}

const FloatLoginButton: FC<Props> = ({ onClick, disabled, title, style }) => {
    return (
        <Fab
            className="login"
            sx={{
                ...style,
                color: 'white',
                borderColor: 'black',
                width: '160px',
                borderRadius: '130px',
                backgroundColor: 'black',
                ':hover': {
                    backgroundColor: 'white',
                    color: 'black',
                    borderColor: 'black',
                },
                fontFamily: 'Cormorant Garamond',
            }}
            onClick={onClick}
            disabled={disabled}
            variant="extended"
        >
            {/* <LoginIcon sx={{ mr: 1 }}
            /> */}
            {title}
        </Fab>
    )
}

export default memo(FloatLoginButton)
