import React, { useEffect, useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useAuth from "../../store/auth/hooks";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Validation from "../../components/validation-admins";
import _ from "underscore";

const Listes = () => {
	const auth = useAuth();
	const [adminRole, setAdminRole] = useState();
	const [usersRoles, setUsersRoles] = useState();
	const [validation, setValidation] = useState(false);
	const [hasUser, setHasUser] = useState(false);

	/*
    / Check if admin
    */
	useEffect(() => {
		if (
			auth.authStore.role === "administrateurs" ||
			auth.authStore.role === "consultants"
		) {
			setAdminRole(auth.authStore.role);
		}
	}, [auth.authStore.role]);

	/*
    /  Check users unvalidate
    */
	useEffect(() => {
		if (adminRole) {
			const payload = { token: Cookies.get("jwt") };
			axios
				.get("http://localhost:8000/pages/validation.php", {
					params: payload,
				})
				.then((response) => {
					setUsersRoles(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [adminRole, validation]);

	useEffect(() => {
		let allEmpty = true;
		for (let key in usersRoles) {
			if (usersRoles[key].length !== 0) {
				allEmpty = false;
				break;
			}
		}
		setHasUser(allEmpty);
	}, [usersRoles]);

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
		<div className="flex flex-col min-h-screen h-full w-full">
			<Header />
			<div className="validation-admins flex-1">
				<div>
					<div className="flex-1 grid grid-cols-2 justify-items-center ">
						{usersRoles ? (
							_.map(usersRoles, (role, key) => {
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
															className="flex flex-center w-full flex-col bg-app-gray shadow-xl border-2 mb-4 "
															key={index}
														>
															<span className="mr-2 pt-2 px-4">
																{user.nom}
															</span>
															<span className="mr-2 pt-2 px-4">
																{user.prenom}
															</span>
															<span className="py-2 px-4">
																{user.email}
															</span>
															<button
																className="bg-app-blue text-white uppercase font-semibold"
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
			<Footer />
		</div>
	);
};

export default Listes;
