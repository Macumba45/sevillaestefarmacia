export const isBookedHour = async () => {
    try {
        const response = await fetch('/api/hours/isBooked', {
            method: 'GET',
        })
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            console.error('Error al obtener los servicios')
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error)
    }
}
