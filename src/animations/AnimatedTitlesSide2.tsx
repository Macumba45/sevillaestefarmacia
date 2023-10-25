import { MotionProps, motion } from 'framer-motion'
import { ElementType, FC, ReactNode, memo } from 'react'

type AnimatedComponentChild = {
    element?: ElementType
}

type AnimatedComponentProps = MotionProps & {
    children: ReactNode & AnimatedComponentChild
    element?: ElementType
}

const AnimatedSideTitle2: FC<AnimatedComponentProps> = ({ children }) => {
    return (
        <motion.div
            animate={{
                opacity: 1,
                x: [1000, 0, -100, 0],
            }}
            transition={{
                duration: 1,
                delay: 1,
                ease: 'easeOut',
            }}
        >
            {children}
        </motion.div>
    )
}

export default memo(AnimatedSideTitle2)
