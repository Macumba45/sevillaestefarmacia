import { getTalleres } from '@/services/talleres'
import { useState } from 'react'
import { Talleres } from '../../../types/types'

export const useLogicTaller = () => {
    const [talleres, setTalleres] = useState<Talleres[] | undefined>([])

    const fetchTalleres = async () => {
        const talleres = await getTalleres()
        setTalleres(talleres)
        return talleres
    }

    return {
        fetchTalleres,
        talleres,
    }
}
