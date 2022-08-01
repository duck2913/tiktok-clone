import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>Tik Tok project</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Navbar />
			<div className="flex gap-3 md:gap-20">
				<div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
					<Sidebar />
				</div>
				<div className="h-[88vh] mt-4 flex-1">{children}</div>
			</div>
		</>
	);
};

export default Layout;
