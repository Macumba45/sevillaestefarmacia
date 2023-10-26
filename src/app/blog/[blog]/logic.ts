import { getTallerById } from '../../../services/talleres'

export const useLogicTallerDetail = () => {
    const getTallerDetailsData = async (id: string) => {
        const data = await getTallerById(id)
        return data
    }
    return {
        getTallerDetailsData,
    }
}
