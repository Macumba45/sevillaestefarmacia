import { Talleres } from '../../../types/types'

export type Props = {
    onDelete: () => void
    onEdit?: () => void
    talleres: Talleres | undefined
}
