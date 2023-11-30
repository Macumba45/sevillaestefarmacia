import { useState, useEffect } from 'react'

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(true)

    useEffect(() => {
        // Verificar si se ha aceptado el uso de cookies
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            setShowBanner(false)
        }
    }, [])

    const acceptCookies = () => {
        // Ocultar el banner
        setShowBanner(false)

        // Almacenar la aceptación en localStorage
        localStorage.setItem('cookieConsent', 'accepted')
    }

    return (
        showBanner && (
            <div
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: '#000000',
                    padding: '10px',
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <p style={{ margin: '1rem', display: 'inline' }}>
                    Este sitio web utiliza cookies. Al continuar navegando,
                    aceptas el uso de cookies.
                </p>
                <button
                    style={{
                        backgroundColor: '#ffffff',
                        color: 'black',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginLeft: '10px',
                    }}
                    onClick={acceptCookies}
                >
                    Aceptar
                </button>
            </div>
        )
    )
}

export default CookieBanner
