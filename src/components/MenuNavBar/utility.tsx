import InstagramIcon from '@mui/icons-material/Instagram'

export const pages = [
    {
        name: 'Servicios',
        route: '/servicios',
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
        route: 'https://www.instagram.com/farmaciasantabarbara/',
    },
]

export const pagesMobile = [
    {
        name: 'Servicios',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: '/servicios',
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
        route: 'https://www.instagram.com/farmaciasantabarbara/',
    },
]

export const settings = [
    {
        name: 'Mi perfil',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: '/perfil',
    },
    {
        name: 'Cerrar sesión',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: '/auth/login',
    },
]
