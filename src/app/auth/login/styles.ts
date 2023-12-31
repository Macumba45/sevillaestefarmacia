import styled from 'styled-components'

export const SpanError = styled.span`
    font-family: 'Roboto', sans-serif;
    font-size: 0.8rem;
    color: #ff0000;
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
`

export const stylesTypography = {
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black',
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
    },
}
