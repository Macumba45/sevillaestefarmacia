import { Services } from '../../../types/types'

export type Props = {
    onDelete: () => void
    onEdit?: () => void
    service: Services
}
