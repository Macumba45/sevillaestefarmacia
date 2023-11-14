import Page from './services'
import { Services } from '../../../../types/types'
import { FC } from 'react'
import { getServices } from '@/services/service'

export async function generateStaticPaths() {
    const services = (await getServices()) as Services[]
    const paths = services!.map(service => ({
        params: { service: service!.id },
    }))
    return paths
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
