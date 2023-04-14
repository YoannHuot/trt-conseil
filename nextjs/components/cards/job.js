import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowsPointingOutIcon,
	ArrowsPointingInIcon,
	TrashIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";

const Job = ({ list, index, openPopup, openPopupForm, modify }) => {
	const [showMore, setShowMore] = useState(false);

	const variants = {
		open: { height: "auto" },
		closed: { height: 0 },
	};

	const handleOpenPopUp = () => {
		openPopup(true, list);
	};

	const handleOpenPopUpForm = () => {
		openPopupForm(true, list);
	};

	return (
		<div
			className="relative mt-4 mb-4 px-4 py-4 flex w-full rounded-lg flex-center flex-col bg-app-gray shadow-md border "
			key={index}
		>
			<span className="text-black font-black pt-2 uppercase">
				{list.poste}
			</span>
			<span className="text-black pt-4">{list.lieu}</span>
			<span className="text-black py-2">{list.salaire}€</span>
			<button
				className="flex absolute flex-col top-5 right-3 cursor-pointer hover:opacity-75"
				onClick={() => {
					setShowMore(!showMore);
				}}
			>
				{showMore ? (
					<ArrowsPointingInIcon className="w-5 h-5 text-app-blue " />
				) : (
					<ArrowsPointingOutIcon className="w-5 h-5 text-app-blue " />
				)}
			</button>

			<AnimatePresence initial={false}>
				{showMore && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={variants}
						transition={{ duration: 0.3 }}
						className="overflow-hidden flex flex-col"
					>
						<span className="pt-4">{list.description}</span>
						<span className="pt-4">{list.competences}</span>
						<span className="py-4">{list.entreprise}</span>
					</motion.div>
				)}
			</AnimatePresence>

			{modify && (
				<div className="w-full border-t flex flex-row justify-evenly pt-3">
					<button onClick={handleOpenPopUp}>
						<TrashIcon className="w-6 h-6 text-app-blue cursor-pointer hover:opacity-75" />
					</button>
					<button onClick={handleOpenPopUpForm}>
						<PencilSquareIcon className="w-6 h-6 text-app-blue cursor-pointer hover:opacity-75" />
					</button>
				</div>
			)}
		</div>
	);
};

export default Job;
