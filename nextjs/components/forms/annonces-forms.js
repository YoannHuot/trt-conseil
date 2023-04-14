import React, { useState, useEffect } from "react";
import { SubmitValid } from "../../components/button/button";
import axios from "axios";
import Cookies from "js-cookie";

const AnnoncesForms = ({ record, method, refreshing, onClose }) => {
	const [refresh, setRefresh] = useState();

	const [poste, setPoste] = useState(record ? record.poste : "Serveur McDo");
	const [lieu, setLieu] = useState(record ? record.lieu : "Charpennes");
	const [description, setDescription] = useState(
		record
			? record.description
			: "Un poste intéressant qui saura promouvoir votre CV bien vide et vous donner des perspectives d'avenir telles que Smicard ou autre galérien. Venez régaler la classe moyenne avec de la bouffe industrielle exquise qui saura ravire les grands mais surtout les petits, car c'est eux la cible de l'obésité de demain. "
	);
	const [horaires, setHoraires] = useState(record ? record.horaires : "35h");
	const [salaire, setSalaire] = useState(record ? record.salaire : "25000");
	const [competences, setCompetences] = useState(
		record
			? record.competences
			: "Service : Vous êtes à l'aise en service. Clientèle : Vous savez vous exprimer correctement à l'oral."
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = Cookies.get("jwt");

		if (method === "POST") {
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
		} else if (method === "PUT") {
			const data = {
				poste,
				lieu,
				description,
				horaires,
				salaire,
				competences,
				id: record.annonce_id,
			};
			axios
				.put("http://localhost:8000/pages/annonces.php", {
					payload,
					data,
				})
				.then((response) => {
					refreshing();
					onClose(false);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<>
			<div className="flex flex-col">
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
			<div className="w-full flex justify-center items-center">
				<SubmitValid handleSubmit={handleSubmit} />
			</div>
		</>
	);
};

export default AnnoncesForms;
