import InstagramIcon from '@mui/icons-material/Instagram'

export const pages = [
    {
        name: 'Farmacia',
        route: '/conocenos',
    },
    ,
    {
        name: 'Talleres',
        route: '/talleres',
    },
    {
        name: 'Blog',
        route: '/blog',
    },
    {
        name: 'Tarjeta CLUB',
        route: '/tarjetaClub',
    },
    {
        name: '',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: 'https://www.instagram.com/sevillaestefarmacia/',
    },
]

export const pagesMobile = [
    {
        name: 'Farmacia',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: '/conocenos',
    },
    {
        name: 'Talleres',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: '/talleres',
    },
    {
        name: 'Blog',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: '/blog',
    },
    {
        name: 'Tarjeta CLUB',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: '/tarjetaClub',
    },
    {
        name: 'Síguenos',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: 'https://www.instagram.com/sevillaestefarmacia/',
    },
]

export const settings = (userRole: string) => [
    {
        name: userRole, // Usar el parámetro aquí
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
    },
    {
        name: 'Cerrar sesión',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
    },
]
