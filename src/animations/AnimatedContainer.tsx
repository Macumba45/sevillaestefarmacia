import { MotionProps, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ElementType, FC, ReactNode, memo, useEffect, useState } from 'react'

type AnimatedComponentChild = {
    element?: ElementType
}

type AnimatedComponentProps = MotionProps & {
    children: ReactNode & AnimatedComponentChild
    element?: ElementType
}

const AnimatedView: FC<AnimatedComponentProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false)
    const threshold = isMobile ? 0.1 : 0.3
    const triggerOnce = true

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize() // inicializa el estado en función del ancho actual
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const { ref, inView } = useInView({
        threshold,
        triggerOnce,
    })

    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.2,
                ease: 'easeInOut',
            },
        },
        exit: {
            opacity: 0,
            y: 50,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            exit="exit"
            variants={containerVariants}
            ref={ref}
        >
            {children}
        </motion.div>
    )
}

export default memo(AnimatedView)
