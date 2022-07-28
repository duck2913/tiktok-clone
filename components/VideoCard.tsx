import React, { useRef } from "react";
import { Video } from "../types";

interface Props {
	post: Video;
}

const VideoCard = ({ post }: Props) => {
	const videoRef = useRef(null);
	console.log("🚀 -> videoRef", videoRef.current.videoWidth);
	console.log("🚀 -> videoRef", videoRef.current.videoHeight);
	return (
		<div className="w-full bg-red-300  rounded-lg overflow-hidden">
			<video
				ref={videoRef}
				src={post.video.asset.url}
				controls
				className={`${
					videoRef.current.videoWidth < videoRef.current.videoHeight
						? "w-[400px]"
						: "w-full"
				} object-cover aspect-auto mx-auto`}
			></video>
		</div>
	);
};

export default VideoCard;
