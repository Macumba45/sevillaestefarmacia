import { getTalleres } from '@/services/talleres'
import { useState } from 'react'
import { Talleres } from '../../../types/types'

export const useLogicTaller = () => {
    const [talleres, setTalleres] = useState<Talleres[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchTalleres = async () => {
        setIsLoading(true)
        const talleres = await getTalleres()
        setTalleres(talleres)
        setIsLoading(false)
        return talleres
    }

    return {
        fetchTalleres,
        talleres,
        isLoading,
    }
}
