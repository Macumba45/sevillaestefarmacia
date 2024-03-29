import InstagramIcon from '@mui/icons-material/Instagram'

export const pages = [
    {
        name: 'Farmacia',
        route: '/conocenos',
    },
    {
        name: 'Servicios',
        subpages: [
            {
                name: 'Organiza medicación',
                route: '/services/clo0e17d30004xy04cjklg2px',
            },
            {
                name: 'Pendientes bebé',
                route: '/services/clo0e1e3p0005xy04izx8uzqa',
            },
            {
                name: 'Formulación magistral',
                route: '/services/clo0e0mn50003xy040gwqse36',
            },
            {
                name: 'Análisis piel',
                route: '/services/clo0dzomz0001xy04kzkxay49',
            },
            {
                name: 'Nutrición',
                route: '/services/clo0e0a200002xy04bwqml93h',
            },
            {
                name: 'Veterinaria',
                route: '/services/clo0e1q180006xy04pu96nyml',
            },
        ],

        route: '/',
    },

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
        route: 'https://www.puntosonline.com',
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
        name: 'Home',
        route: '/',
    },
    {
        name: 'Farmacia',

        route: '/conocenos',
    },
    {
        name: 'Servicios',
        subpages: [
            {
                name: 'Organiza medicación',
                route: '/services/clo0e17d30004xy04cjklg2px',
            },
            {
                name: 'Pendientes bebé',
                route: '/services/clo0e1e3p0005xy04izx8uzqa',
            },
            {
                name: 'Formulación magistral',
                route: '/services/clo0e0mn50003xy040gwqse36',
            },
            {
                name: 'Análisis piel',
                route: '/services/clo0dzomz0001xy04kzkxay49',
            },
            {
                name: 'Nutrición',
                route: '/services/clo0e0a200002xy04bwqml93h',
            },
            {
                name: 'Veterinaria',
                route: '/services/clo0e1q180006xy04pu96nyml',
            },
        ],

        route: '/',
    },
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

        route: 'https://www.puntosonline.com',
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
