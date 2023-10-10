import { Services } from '../../../types/types'

export type Props = {
    onClick?: () => void
    onDelete: () => void // Debe estar definida de esta manera
    onEdit?: () => void
    service: Services
}
