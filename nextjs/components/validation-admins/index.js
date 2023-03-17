import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import _ from "underscore";

const Validation = ({ role }) => {
	const [roles, setRoles] = useState();
	const [validation, setValidation] = useState(false);
	const [openValidation, setOpenValidation] = useState(false);
	const [hasUser, setHasUser] = useState(false);

	/*
    /  Check users unvalidate
    */
	useEffect(() => {
		if (role) {
			const payload = { token: Cookies.get("jwt") };
			axios
				.get("http://localhost:8000/pages/validation.php", {
					params: payload,
				})
				.then((response) => {
					console.log(response);
					setRoles(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [role, validation]);

	useEffect(() => {
		let allEmpty = true;
		for (let key in roles) {
			if (roles[key].length !== 0) {
				allEmpty = false;
				break;
			}
		}
		setHasUser(allEmpty);
	}, [roles]);

	const handleValidation = (user, role) => {
		const payload = Cookies.get("jwt");
		axios
			.post("http://localhost:8000/pages/validation.php", {
				payload,
				user,
				role,
			})
			.then((response) => {
				setValidation(!validation);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="validation-admins">
			<div>
				<div className=" grid grid-cols-2 justify-center place-items-center ">
					{roles ? (
						_.map(roles, (role, key) => {
							return (
								<>
									{role && role.length > 0 && (
										<div className="pt-4 w-3/4">
											<span className="font-lg font-semibold uppercase">
												{key}
											</span>
											{_.map(role, (user, index) => {
												return (
													<div
														className="flex flex-center w-full flex-col bg-amber-500 mb-4 "
														key={index}
													>
														<span className="mr-2">
															{user.nom}
														</span>
														<span className="mr-2">
															{user.prenom}
														</span>
														<span>{user.email}</span>
														<button
															className="bg-blue-400"
															onClick={() => {
																handleValidation(user, key);
															}}
														>
															Valider
														</button>
													</div>
												);
											})}
										</div>
									)}
								</>
							);
						})
					) : (
						<>Aucun nouvel utilisateur a validé</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Validation;
