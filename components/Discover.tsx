import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

const Discover = () => {
	const router = useRouter();
	const {
		query: { topic: currentTopic },
	} = router;

	const topicStyles = "border rounded-full px-2 py-1 border-gray-400 cursor-pointer";
	const activeTopicStyles =
		"border rounded-full px-2 py-1 border-pink-600 cursor-pointer text-pink-600";

	return (
		<div className="mt-4">
			<p>Popular topics:</p>
			<div className="flex flex-wrap gap-3 gap-y-2 my-1 p-1">
				{topics.map((topic) => (
					<Link key={topic.name} href={`/?topic=${topic.name}`}>
						<div
							className={`flex gap-2 items-center ${
								currentTopic === topic.name ? activeTopicStyles : topicStyles
							}`}
						>
							{topic.icon}
							<p>{topic.name}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Discover;
