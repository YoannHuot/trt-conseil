import React, { useEffect, useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Job from "../../components/cards/job";
import Popup from "../../components/popup/popup";
import AnnoncesForms from "../../components/forms/annonces-forms";

import axios from "axios";
import Cookies from "js-cookie";

import _ from "underscore";

import { XCircleIcon } from "@heroicons/react/24/solid";

const Index = () => {
	const [unvalidatedList, setUnvalidatedList] = useState();
	const [validatedList, setValidatedList] = useState();
	const [openPopup, setOpenPopup] = useState(false);
	const [popupRecord, setPopupRecord] = useState();
	const [openPopupForm, setOpenPopupForm] = useState(false);
	const [popupRecordForm, setPopupRecordForm] = useState();
	const [refresh, setRefresh] = useState(false);

	/*
	 *
	 */
	useEffect(() => {
		const payload = { token: Cookies.get("jwt") };
		axios
			.get("http://localhost:8000/pages/annonces.php", {
				params: payload,
			})
			.then((response) => {
				setUnvalidatedList(response.data.notValidated);
				setValidatedList(response.data.validated);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [refresh]);

	const handleOpenPopup = (condition, record) => {
		setOpenPopup(condition);
		if (record) {
			setPopupRecord(record);
		}
	};

	const handleOpenPopupForm = (condition, record) => {
		setOpenPopupForm(condition);
		if (record) {
			setPopupRecordForm(record);
		}
	};

	const deleteAnnonce = (e) => {
		const payload = { token: Cookies.get("jwt") };
		if (popupRecord) {
			axios
				.delete("http://localhost:8000/pages/annonces.php", {
					payload,
					popupRecord,
				})
				.then((response) => {
					console.log(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const handleRefresh = () => {
		setRefresh(!refresh);
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex flex-col min-h-screen h-full  w-full">
				<Header />
				<div className="flex-1 flex flex-row w-full px-4 pt-8 justify-evenly">
					{unvalidatedList && (
						<div className="unvalidated-section w-2/5">
							<span className="font-black text-red-400">
								Vos annonces en attente de validation
							</span>

							{_.map(unvalidatedList, (list, index) => {
								return (
									<Job
										list={list}
										index={index}
										openPopup={handleOpenPopup}
										openPopupForm={handleOpenPopupForm}
										modify={true}
									/>
								);
							})}
						</div>
					)}
					{validatedList && (
						<div className="unvalidated-section w-2/5">
							<span className="font-black text-green-400">
								Vos annonces validées
							</span>
							{_.map(validatedList, (list, index) => {
								return (
									<Job
										list={list}
										index={index}
										openPopup={handleOpenPopup}
										modify={false}
									/>
								);
							})}
						</div>
					)}
				</div>
			</div>
			<Footer />

			<Popup isOpen={openPopup} onClose={handleOpenPopupForm}>
				<h2 className="text-xl font-bold mb-4">Attention</h2>
				<div className="delete-card-text">
					<span>Voulez vous vraiment supprimer l'annonce </span>
					<span className="uppercase font-medium text-app-blue">
						"{popupRecordForm && popupRecordForm.poste}"
					</span>
					<span> ?</span>
				</div>

				<div className="w-full flex flex-row justify-evenly">
					<button
						className="mt-4 px-4 py-2 bg-app-blue  text-white rounded-md"
						onClick={() => {
							handleOpenPopup(false);
						}}
					>
						Annuler
					</button>
					<button
						className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
						onClick={() => {
							deleteAnnonce();
						}}
					>
						Supprimer
					</button>
				</div>
			</Popup>

			<Popup
				isOpen={openPopupForm}
				onClose={handleOpenPopupForm}
				width={"w-3/4"}
			>
				<button
					className="absolute top-4 right-4"
					onClick={() => {
						handleOpenPopupForm(false);
					}}
				>
					<XCircleIcon className="text-app-blue w-9 h-9" />
				</button>

				<h2 className="text-xl font-bold mb-4">Modifier votre annonce</h2>
				<div className="modify-card-text">
					<AnnoncesForms
						record={popupRecordForm}
						method={"PUT"}
						refreshing={handleRefresh}
						onClose={handleOpenPopupForm}
					/>
				</div>
			</Popup>
		</div>
	);
};

export default Index;
