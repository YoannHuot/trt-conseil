import React, { useEffect, useState } from "react";
import useAuth from "../../store/auth/hooks";
import axios from "axios";
import _ from "underscore";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Recruteurs = ({ firstname, name }) => {
	const auth = useAuth();
	const router = useRouter();

	const features = {
		create: {
			title: "Créer une annonce",
			text: "Soyez explicite et attractif pour attirer un maximum de talents",
			action: () => router.push("/annonces"),
		},
		liste: {
			title: "Listes des candidats",
			text: "Consultez les candidats retenus pour répondre à votre offre",
			action: () => router.push("/listes"),
		},
		status: {
			title: "Statut des annonces",
			text: "Consultez l'état de vos annonces et ses différents status, vous y trouverez des informations des administrateurs TFT",
			action: () => router.push("/status"),
		},
		profil: {
			title: "Voir votre profil",
			text: "Mettez à jour votre profil pour rassurer les candidats sur la pertinence de vos annonces",
			action: () => router.push("/profil"),
		},
	};

	const handleClick = (action) => {
		const payload = { token: Cookies.get("jwt") };
		axios
			.get("http://localhost:8000/users/check-jwt.php", { params: payload })
			.then((response) => {
				if (response.data) {
					action();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			{auth.authStore.certified ? (
				<div className="grid grid-cols-2 gap-2 place-items-center px-8">
					{_.map(features, (feature, key) => {
						return (
							<button
								key={key}
								onClick={() => handleClick(feature.action)}
								className="bg-white cursor-pointer h-60 w-full flex flex-col rounded-xl justify-center px-4 text-left"
								style={{
									boxShadow:
										"0px 1px 2px rgba(0, 0, 0, 0.07), 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 4px 8px rgba(0, 0, 0, 0.07), 0px 8px 16px rgba(0, 0, 0, 0.07), 0px 16px 32px rgba(0, 0, 0, 0.07), 0px 32px 64px rgba(0, 0, 0, 0.07)",
								}}
							>
								<span className="py-4 font-semibold text-app-blue pt-12">
									{feature.title}
								</span>
								<div className="bg-app-red w-10 h-1 rounded-r-2xl" />
								<span className="py-4 flex-1">{feature.text}</span>
							</button>
						);
					})}
				</div>
			) : (
				<div className="text-center">
					Votre compte est en cours de validation, un administrateur se
					charge de l'examiner. Un mail vous sera envoyé une fois votre
					compte actif
				</div>
			)}
		</div>
	);
};

export default Recruteurs;
