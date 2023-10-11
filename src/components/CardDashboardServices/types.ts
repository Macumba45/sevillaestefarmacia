import { Services } from '../../../types/types'

export type Props = {
    onDelete: () => void // Debe estar definida de esta manera
    onEdit?: () => void
    service: Services
}
