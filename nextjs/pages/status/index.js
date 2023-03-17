import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import Cookies from "js-cookie";
import _ from "underscore";

const Index = () => {
	const [unvalidatedList, setUnvalidatedList] = useState();
	const [validatedList, setValidatedList] = useState();
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
	}, []);

	useEffect(() => {
		console.log(validatedList);
		console.log(unvalidatedList);
	}, [validatedList, unvalidatedList]);

	return (
		<div>
			<div className="flex flex-col min-h-screen h-full  w-full">
				<Header />
				<div className="flex-1 flex flex-row w-full px-4 pt-8 justify-evenly">
					{unvalidatedList && (
						<div className="unvalidated-section w-2/5">
							<span className="font-black">
								Vos annonces en attente de validation
							</span>

							{_.map(unvalidatedList, (list, index) => {
								return (
									<div
										className="hover:opacity-75 relative mt-4 mb-4 px-4 py-4 flex w-full flex-center flex-col bg-app-gray shadow-xl border-2 "
										key={index}
									>
										<span className="text-black font-black pt-2 uppercase">
											{list.poste}
										</span>
										<span className="text-black pt-4">
											{list.lieu}
										</span>
										<span className="text-black py-2">
											{list.salaire}€
										</span>
										<button className="flex absolute bottom-5 right-3 cursor-pointer">
											<img
												className="w-7 h-7"
												src="/assets/see-more.png"
											/>
										</button>
									</div>
								);
							})}
						</div>
					)}
					{validatedList && (
						<div className="unvalidated-section w-2/5">
							<span className="font-black">Vos annonces validées</span>
							{_.map(validatedList, (list, index) => {
								return (
									<div
										className="hover:opacity-75 relative mt-4 mb-4 px-4 py-4 flex w-full flex-center flex-col bg-app-gray shadow-xl border-2 "
										key={index}
									>
										<span className="text-black font-black pt-2 uppercase">
											{list.poste}
										</span>
										<span className="text-black pt-4">
											{list.lieu}
										</span>
										<span className="text-black py-2">
											{list.salaire}€
										</span>
										<button className="flex absolute bottom-5 right-3 cursor-pointer*">
											<img
												className="w-7 h-7"
												src="/assets/see-more.png"
											/>
										</button>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Index;
