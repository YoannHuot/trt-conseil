import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Popup = ({ isOpen, onClose, width, ...props }) => {
	const backdropVariants = {
		open: { opacity: 0.5 },
		closed: { opacity: 0 },
	};

	const popupVariants = {
		open: { opacity: 1, y: "-50%", x: "-50%" },
		closed: { opacity: 0, x: "-50%" },
	};

	return (
		<AnimatePresence wait>
			{isOpen && (
				<>
					<motion.div
						className="fixed inset-0 bg-black z-40"
						initial="closed"
						animate="open"
						exit="closed"
						variants={backdropVariants}
						transition={{ duration: 0.3 }}
						onClick={onClose}
					/>
					<motion.div
						className={` ${
							width ? width : "w-1/2"
						} fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-8 rounded-md shadow-lg `}
						initial="closed"
						animate="open"
						exit="closed"
						variants={popupVariants}
						transition={{ duration: 0.3 }}
					>
						{/* <button
							className="absolute top-4 right-4"
							onClick={() => {
								console.log("ok");
								onClose(false);
							}}
						>
						</button> */}
						{props.children}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Popup;
