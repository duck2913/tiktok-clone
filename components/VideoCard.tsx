import React, { useEffect, useRef } from "react";
import { Video } from "../types";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

interface Props {
	post: Video;
}

const VideoCard = ({ post }: Props) => {
	const videoRef = useRef(null);
	console.log("🚀 -> videoRef", videoRef);

	useEffect(() => {
		console.log("what happened");
		if (videoRef.current.videoHeight < videoRef.current.videoWidth) {
			videoRef.current.className = "object-cover aspect-auto mx-auto w-full";
		}
	}, []);

	return (
		<div className="pb-10 border-b-2">
			<Link href={"/"} passHref>
				<div className="inline-flex gap-4 items-center cursor-pointer w-max">
					<Image
						alt="profile"
						src={post.postedBy.image}
						width={60}
						height={60}
						className="rounded-full "
					/>
					<div>
						<p className="font-bold flex items-center gap-3">
							{post.postedBy.userName}
							<GoVerified className="text-blue-400" />
						</p>
						<p className="text-sm text-gray-400">{post.postedBy.userName}</p>
					</div>
				</div>
			</Link>
			<div className="mb-4">{post.caption}</div>
			<div className="w-full bg-gray-300  rounded-lg overflow-hidden ">
				<video
					ref={videoRef}
					src={post.video.asset.url}
					controls
					width={400}
					className={`object-cover aspect-auto mx-auto`}
				></video>
			</div>
		</div>
	);
};

export default VideoCard;
