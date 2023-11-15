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

interface Props {
    params: {
        service: string
    }
}

const ServicePage: FC<Props> = ({ params }) => {
    return <Page params={params} />
}

export default ServicePage