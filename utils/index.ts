import axios from "axios";
import jwt_decode from "jwt-decode";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser?: any) => {
	const decoded: {
		name: string;
		picture: string;
		sub: string;
	} = jwt_decode(response.credential);
	console.log(decoded);
	const { name, picture, sub } = decoded;

	const user = {
		_id: sub,
		_type: "user",
		userName: name,
		image: picture,
	};

	addUser(user); // add user to store
	await axios.post(`/api/auth`, user); // create a user in sanity
};
