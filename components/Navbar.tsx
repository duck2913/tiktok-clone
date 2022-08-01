import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/router";
// import { BiSearch } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

import Logo from "../utils/tiktik-logo.png";

const Navbar = () => {
	// const userProfile = null;
	// function addUser(alo: any) { }

	const { userProfile, addUser, removeUser } = useAuthStore();

	function handleLogout() {
		googleLogout();
		removeUser();
	}

	return (
		<div className="w-full flex items-center justify-between border-b border-gray-300 py-2 px-4">
			<Link href={"/"}>
				<div className="w-[100px]">
					<Image src={Logo} layout="responsive" alt="logo" className="cursor-pointer " />
				</div>
			</Link>
			<div>Search</div>
			{!userProfile ? (
				<GoogleLogin
					onSuccess={(credentialResponse) => {
						createOrGetUser(credentialResponse, addUser);
					}}
					onError={() => {
						console.log("Login Failed");
					}}
				/>
			) : (
				<div className="flex items-center gap-10">
					<button className="flex gap-2 items-center border-2 rounded-md border-gray-300 p-3 py-1 hover:text-pink-700 hover:border-pink-600 transition duration-500">
						<IoMdAdd />
						Upload
					</button>
					<Link href={"/profile"}>
						<div className="cursor-pointer flex items-center">
							<Image
								src={userProfile.image}
								alt="profile"
								width={30}
								height={30}
								className="rounded-full"
							></Image>
						</div>
					</Link>
					<button onClick={handleLogout}>
						<AiOutlineLogout className="text-red-400 font-bold text-[25px] hover:scale-125 transition-all hover:text-pink-600" />
					</button>
				</div>
			)}
		</div>
	);
};
export default Navbar;
