import axios from "axios";
import type { NextPage } from "next";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";

interface HomePageProps {
	videos: Video[];
}

const Home: NextPage = ({ videos }: HomePageProps) => {
	return (
		<div className="h-full">
			{videos.length > 0 ? (
				<div className="flex flex-col gap-10 p-5">
					{videos.map((video) => (
						<VideoCard key={video._id} post={video} />
					))}
				</div>
			) : (
				<div>There are current no videos to show 🥺</div>
			)}
		</div>
	);
};

export default Home;

export async function getStaticProps() {
	const { data } = await axios("http://localhost:3000/api/post");

	return {
		props: {
			videos: data,
		},
	};
}
