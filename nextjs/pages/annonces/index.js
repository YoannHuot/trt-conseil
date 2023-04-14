import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AnnoncesForms from "../../components/forms/annonces-forms";

const Annonces = () => {
	return (
		<div className="flex flex-col min-h-screen h-full  w-full">
			<Header />
			<div className=" flex-1 flex justify-center items-center flex-col w-full px-8 ">
				<div
					className="w-full"
					style={{
						boxShadow:
							"0px 1px 2px rgba(0, 0, 0, 0.07), 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 4px 8px rgba(0, 0, 0, 0.07), 0px 8px 16px rgba(0, 0, 0, 0.07), 0px 16px 32px rgba(0, 0, 0, 0.07), 0px 32px 64px rgba(0, 0, 0, 0.07)",
					}}
				>
					<div className="relative flex flex-col justify-center w-full h-full pb-8 rounded-lg overflow-hidden">
						<h2 className="uppercase font-semibold text-center w-full bg-app-blue py-4 text-white">
							Fiche de poste
						</h2>
						<div className="flex flex-col px-24 pt-4 w-full">
							<AnnoncesForms header method={"POST"} />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Annonces;
