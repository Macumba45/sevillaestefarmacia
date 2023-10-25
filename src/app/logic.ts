import { useState } from 'react'
import { Services, User } from '../../types/types'
import { useRouter } from 'next/navigation'
import { getServiceDetails } from '@/services/service'

export const useLogicHome = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [serviceData, setServiceData] = useState<Services>()
    const router = useRouter()

    const fetchServiceDetails = async (id: string) => {
        setIsLoading(true)
        const serviceDetails = await getServiceDetails(id)
        setServiceData(serviceDetails)
        setIsLoading(false)
    }

    return {
        isLoading,
        setIsLoading,
        serviceData,
        router,
        fetchServiceDetails,
    }
}
