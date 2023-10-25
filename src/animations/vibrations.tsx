import { motion, useAnimation } from 'framer-motion'

interface Props {
    children: React.ReactNode
    onClick: () => void
    onMouseEnter: () => void
}

const VibrationMotion = ({ children, onClick, onMouseEnter }: Props) => {
    const controls = useAnimation()

    const startVibration = () => {
        controls.start({
            x: [0, -10, 10, -8, 8, -6, 6, -4, 4, -2, 2, 0],
            transition: {
                duration: 0.3,
                type: 'spring',
                bounce: 0.2,
            },
        })
    }

    return (
        <motion.div
            animate={controls}
            onMouseEnter={startVibration}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.div>
    )
}

export default VibrationMotion
