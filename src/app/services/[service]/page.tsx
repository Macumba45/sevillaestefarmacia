import Page from './services'
import { Services } from '../../../../types/types'
import { FC } from 'react'

export async function generateStaticParams() {
    try {
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = await fetch(
            `${process.env.CLIENT_URL}/api/services/getService`,
            {
                method: 'GET',
                headers,
            }
        )
        if (response.ok) {
            const data: Services[] = await response.json()
            return data
        } else {
            console.error('Error al obtener los servicios')
            throw new Error('Error al obtener los servicios')
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error)
        throw error
    }
}

async function getServiceDetails(id: string) {
    try {
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = await fetch(
            `${process.env.CLIENT_URL}/api/services/serviceDetails?id=${id}`,
            {
                method: 'GET',
                headers,
            }
        )
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            console.error('Error al obtener los detalles del servicio')
            throw new Error('Error al obtener los detalles del servicio')
        }
    } catch (error) {
        console.error('Error al obtener los detalles del servicio:', error)
        throw error
    }
}

interface Props {
    params: {
        service: string
    }
}

const ServicePage: FC<Props> = async ({ params }) => {
    try {
        const serviceDetails = await getServiceDetails(params.service)
        return <Page serviceData={serviceDetails} />
    } catch (error) {
        // Manejar el error, por ejemplo, redirigir a una página de error.
        console.error('Error al cargar la página del servicio:', error)
        // Podrías redirigir a una página de error, renderizar un mensaje de error, etc.
        return <div>Error al cargar la página del servicio.</div>
    }
}

export default ServicePage
