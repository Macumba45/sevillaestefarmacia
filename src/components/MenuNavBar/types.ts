import { User } from '../../../types/types'

export type Props = {
    onLogOut: () => void
    handleOpenNavMenu: () => void
    handleCloseNavMenu: () => void
    handleButtonClick: () => void
    closeDrawer: () => void
    isDrawerOpen: boolean
    isDrawerOpenButton: boolean
    closeDrawerButton: () => void
    buttonName: string
    userRole: User | null
    isLoading: boolean
}
