import { Services } from '../../../types/types'

export type Props = {
    onDelete: (id: string, hour: string) => void
    onEdit: (hour: string) => void
    service: Services
}
