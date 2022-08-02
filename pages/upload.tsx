import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { HashLoader } from "react-spinners";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { topics } from "../utils/constants";

const Upload = () => {
	const router = useRouter();
	const { userProfile } = useAuthStore();

	const [video, setVideo] = useState(null);
	const [wrongFormat, setWrongFormat] = useState(false);
	const [loading, setLoading] = useState(false);
	const [caption, setCaption] = useState("");
	const [category, setCategory] = useState(topics[0].name);

	function handleDiscard() {
		setCategory(topics[0].name);
		setLoading(false);
		setCaption("");
		setWrongFormat(false);
		setVideo(null);
	}

	async function handlePostVideo() {
		if (!video || !caption) return;
		const doc = {
			_type: "post",
			caption,
			video: {
				_type: "file",
				asset: {
					_type: "reference",
					_ref: video?._id,
				},
			},
			userId: userProfile?._id,
			postedBy: {
				_type: "postedBy",
				_ref: userProfile?._id,
			},
			topic: category,
		};

		await axios.post(`http://localhost:3000/api/post`, doc);

		router.push("/");
	}

	async function handleUploadVideo(e: any) {
		const selectedVideo = e.target.files[0];
		const allowedTypes = ["video/mp4", "video/webm"];

		if (!allowedTypes.includes(selectedVideo.type)) {
			setWrongFormat(true);
			return;
		}
		setLoading(true);
		client.assets
			.upload("file", selectedVideo, {
				contentType: selectedVideo.type,
				filename: selectedVideo.name,
			})
			.then((data) => {
				console.log("🚀 -> data", data);
				setVideo(data);
				setLoading(false);
			});
	}

	return (
		<div className="w-full h-full p-10">
			<p className="font-bold text-2xl">Upload video</p>
			<p className="text-sm mt-1 text-gray-500">Post a video to your account</p>
			{loading && (
				<p className="mt-4 text-rose-300 flex items-center gap-3">
					<HashLoader size={30} color="#EF3E77" />
					<p>Please wait till we fully upload the video...</p>
				</p>
			)}
			{wrongFormat && (
				<div className="text-red-400 capitalize mt-3">Please choose only video!</div>
			)}
			<div className="flex w-full mt-4 overflow-hidden gap-10">
				<div className="input basis-2/5 bg-white border-dashed border-[2px] border-pink-300 rounded-lg flex flex-col justify-center items-center p-10 py-20 relative">
					<BsFillCloudUploadFill className="text-gray-500 font-bold text-2xl" />
					<p className="font-semibold text-lg">Upload Video</p>
					<div className="mt-2 text-center text-gray-400 leading-normal text-sm">
						<p>MP4 or WEBm format </p>
						<p>Up to 1920*1080 resolution</p>
						<p>Duration max 10 mins</p>
					</div>
					<div className="mt-7">
						<label
							className="cursor-pointer px-4 py-1 bg-rose-400 text-white font-bold rounded-lg"
							htmlFor="video"
						>
							Upload File
						</label>
						<input
							type="file"
							name="video"
							className="hidden"
							id="video"
							onChange={handleUploadVideo}
						/>
					</div>
					{video && (
						<video
							src={video.url}
							className="absolute inset-0 w-full h-full"
							controls
						></video>
					)}
				</div>
				<div className="form basis-3/5">
					<p className="font-semibold mb-2  text-sm">Caption</p>
					<input
						type="text"
						name=""
						id=""
						className="border-2 rounded-md mb-5 w-[80%] p-1"
						onChange={(e) => setCaption(e.target.value)}
						value={caption}
						required
					/>
					<p className="font-semibold mb-2 text-sm">Category</p>
					<select
						className="w-[80%] border-2 rounded-md p-2"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						{topics.map((topic) => (
							<option value={topic.name} key={topic.name}>
								{topic.name}
							</option>
						))}
					</select>
					<div className="mt-10 flex gap-3">
						<button
							className="bg-rose-200 font-extrabold text-rose-600 capitalize px-4 py-1 rounded-2xl text-[15px] w-[5rem]"
							onClick={handleDiscard}
						>
							Discard
						</button>
						<button
							className="bg-rose-500 font-extrabold capitalize px-4 py-1 rounded-2xl text-[15px] text-white w-[5rem]"
							onClick={handlePostVideo}
						>
							Post
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Upload;
