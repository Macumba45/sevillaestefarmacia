import { motion } from 'framer-motion'

const HoverMotion = ({ children }: any) => {
    return <motion.div whileHover={{ scale: 1.08 }}>{children}</motion.div>
}

export default HoverMotion
