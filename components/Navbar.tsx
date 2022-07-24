import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Logo from "../utils/tiktik-logo.png";

const Navbar = () => {
	return (
		<div className="w-full flex items-center justify-between border-b border-gray-300 py-2 px-4">
			<Link href={"/"}>
				<div className="w-[100px]">
					<Image src={Logo} layout="responsive" alt="logo" className="cursor-pointer " />
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
