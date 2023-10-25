import { Blogs } from '../../../types/types'

export type Props = {
    onDelete: () => void
    onEdit?: () => void
    blogs: Blogs | undefined
}
