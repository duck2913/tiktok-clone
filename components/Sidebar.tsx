import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { GoogleLogin } from "react-google-login";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";

const Sidebar: NextPage = () => {
	const { pathname } = useRouter();

	const activeLink =
		"flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";

	const normalLink =
		"flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";

	return (
		<div className="w-[28vw]">
			<div className="flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
				<div className="xl:border-b-2 border-gray-200 xl:pb-4">
					<Link href="/">
						<div className={pathname === "/" ? activeLink : normalLink}>
							<p className="text-2xl">
								<AiFillHome />
							</p>
							<span className="capitalize text-md hidden xl:block">For You</span>
						</div>
					</Link>
				</div>
				<p className="text-gray-400 text-md mt-4">Login to like and comment on videos</p>
				<GoogleLogin
					onSuccess={() => {}}
					onFailure={() => {}}
					clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
					buttonText="Login"
					cookiePolicy={"single_host_origin"}
					render={(renderProps) => (
						<button
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							className="w-full border border-pink-600 mt-3 py-1 rounded cursor-pointer hover:bg-pink-600 hover:text-white text-pink-600 transition-all font-semibold"
						>
							Login
						</button>
					)}
				/>
				<Discover />
				<SuggestedAccounts />
			</div>
		</div>
	);
};

export default Sidebar;
