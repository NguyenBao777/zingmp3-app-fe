import { motion } from "framer-motion";

const Alert = ({ alert }) => {
	return (
		<motion.div
			className={`fixed top-16 right-2 z-40 rounded-md w-300 px-4 py-2 text-white border-2 
        ${alert?.type === "success" ? "border-green-800 bg-green-300" : "border-red-800 bg-red-300"}`}
			initial={{ opacity: 0.5, y: -200 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0.5, y: -200 }}
		>
			{alert?.message}
		</motion.div>
	);
};

export default Alert;
