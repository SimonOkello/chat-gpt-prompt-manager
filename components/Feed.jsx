'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{Array.isArray(data) ? (
				data.map((prompt) => (
					<PromptCard
						key={prompt?._id}
						prompt={prompt}
						handleTagClick={handleTagClick}
					/>
				))
			) : (
				<p>No prompts available.</p>
			)}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [prompts, setPrompts] = useState([]);

	const fetchPrompts = async () => {
		const response = await fetch('/api/prompt');
		console.log(response);
		const data = await response.json();
		setPrompts(data);
	};
	const handleSearchChange = (e) => {};

	useEffect(() => {
		fetchPrompts();
	}, []);
	return (
		<section className="feed">
			<form className="relative flex-center w-full">
				<input
					type="text"
					placeholder="Search tag or username"
					value={searchText}
					onChange={handleSearchChange}
					className="search_input peer"
				/>
			</form>
			<PromptCardList data={prompts} handleTagClick={() => {}} />
		</section>
	);
};

export default Feed;
