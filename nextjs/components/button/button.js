import React, { useState } from "react";
import _ from "underscore";

const SubmitUnvalid = () => {
	return (
		<div
			className="px-2 py-2 mt-6 rounded-xl bg-gray-300 w-40 flex justify-center  items-center text-center drop-shadow-lg"
			style={{ cursor: "default" }}
		>
			Valider
		</div>
	);
};

const SubmitValid = ({ handleSubmit }) => {
	return (
		<button
			className="px-2 py-2 mt-6 rounded-xl w-40 flex justify-center  items-center text-center bg-green-300 cursor-pointer drop-shadow-lg"
			type="submit"
			onClick={handleSubmit}
		>
			Valider
		</button>
	);
};
export { SubmitValid, SubmitUnvalid };
