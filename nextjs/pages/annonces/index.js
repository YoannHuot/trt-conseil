import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SubmitValid } from "../../components/button/button";
import axios from "axios";
import Cookies from "js-cookie";

const Annonces = () => {
	const [poste, setPoste] = useState("Serveur McDo");
	const [lieu, setLieu] = useState("Charpennes");
	const [description, setDescription] = useState(
		"Un poste intéressant qui saura promouvoir votre CV bien vide et vous donner des perspectives d'avenir telles que Smicard ou autre galérien. Venez régaler la classe moyenne avec de la bouffe industrielle exquise qui saura ravire les grands mais surtout les petits, car c'est eux la cible de l'obésité de demain. "
	);
	const [horaires, setHoraires] = useState("35h");
	const [salaire, setSalaire] = useState("25000");
	const [competences, setCompetences] = useState(
		"Service : Vous êtes à l'aise en service. Clientèle : Vous savez vous exprimer correctement à l'oral."
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = Cookies.get("jwt");

		const data = {
			poste,
			lieu,
			description,
			horaires,
			salaire,
			competences,
		};
		axios
			.post("http://localhost:8000/pages/annonces.php", {
				payload,
				data,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col min-h-screen h-full  w-full">
			<Header />
			<div className=" flex-1 flex justify-center items-center flex-col w-full px-8 ">
				<div
					className="relative flex flex-col justify-center w-full h-full pb-8 rounded-lg overflow-hidden"
					style={{
						boxShadow:
							"0px 1px 2px rgba(0, 0, 0, 0.07), 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 4px 8px rgba(0, 0, 0, 0.07), 0px 8px 16px rgba(0, 0, 0, 0.07), 0px 16px 32px rgba(0, 0, 0, 0.07), 0px 32px 64px rgba(0, 0, 0, 0.07)",
					}}
				>
					<h2 className="uppercase font-semibold text-center w-full bg-app-blue py-4 text-white">
						Fiche de poste
					</h2>
					<div className="flex flex-col px-24 pt-4">
						<label className="mt-2 capitalize">poste</label>
						<input
							className="bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg "
							type={"text"}
							value={poste}
							onChange={(e) => setPoste(e.target.value)}
						/>

						<label className="mt-2 capitalize">Lieu</label>
						<input
							className="bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg "
							type={"text"}
							value={lieu}
							onChange={(e) => setLieu(e.target.value)}
						/>

						<label className="mt-2 capitalize">description</label>
						<textarea
							className="bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg h-40"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>

						<label className="mt-2 capitalize">horaires</label>
						<input
							className="bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg "
							type={"text"}
							value={horaires}
							onChange={(e) => setHoraires(e.target.value)}
						/>

						<label className="mt-2 capitalize">salaire</label>
						<input
							className="bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg "
							type={"text"}
							value={salaire}
							onChange={(e) => setSalaire(e.target.value)}
						/>

						<label className="mt-2 capitalize">compétences</label>
						<textarea
							className="bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg h-28"
							value={competences}
							onChange={(e) => setCompetences(e.target.value)}
						/>
					</div>
					<div className="px-32 md:px-48 w-full">
						<SubmitValid handleSubmit={handleSubmit} />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Annonces;
