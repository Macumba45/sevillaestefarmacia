import { Payment } from '../../../types/types'

export type Props = {
    onDelete?: () => void
    onEdit?: () => void
    payments?: Payment
}
