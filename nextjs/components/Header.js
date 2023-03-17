import React from "react";
import { useRouter } from "next/router";

const Header = () => {
	const router = useRouter();

	return (
		<button
			className="w-full h-24 bg-app-blue"
			onClick={() => {
				router.push("/homepage");
			}}
		>
			<img className="cover h-full" src="/assets/logo-trt.svg" />
		</button>
	);
};

export default Header;
