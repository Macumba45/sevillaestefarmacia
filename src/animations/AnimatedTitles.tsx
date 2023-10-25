import { MotionProps, motion } from 'framer-motion'
import { ElementType, FC, ReactNode, memo } from 'react'

type AnimatedComponentChild = {
    element?: ElementType
}

type AnimatedComponentProps = MotionProps & {
    children: ReactNode & AnimatedComponentChild
    element?: ElementType
}

const AnimatedTitle: FC<AnimatedComponentProps> = ({ children }) => {
    return (
        <motion.div
            className="titleHeader"
            initial={{ x: 0, opacity: 0 }}
            animate={{
                opacity: 1,
                x: [
                    0, 5, 0, -5, 0, 0, 5, 0, -5, 0, 0, 5, 0, -5, 0, 0, 5, 0, -5,
                    0, 0, 5, 0, -5, 0, 0, 5, 0, -5, 0, 0, 5, 0, -5, 0, 0, 5, 0,
                    -5, 0,
                ],
            }}
            transition={{ duration: 1, delay: 1, easing: 'easeOut' }}
        >
            {children}
        </motion.div>
    )
}

export default memo(AnimatedTitle)
