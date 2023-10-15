import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface Props {
    width?: React.CSSProperties['width']
    label?: string // Agrega una prop "label" de tipo string
}

const LinearIndeterminate: FC<Props> = ({ width, label }) => {
    return (
        <Box sx={{ width: width }}>
            <Typography
                textAlign={'center'}
                variant="subtitle1"
                marginBottom={1}
            >
                {label}
            </Typography>
            <LinearProgress />
        </Box>
    )
}

export default LinearIndeterminate
