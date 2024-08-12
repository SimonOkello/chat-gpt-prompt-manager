'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return <div className="mt-16 prompt_layout"></div>;
};

const Feed = () => {
	const [searchText, setSearchText] = useState('');

	const handleSearchChange = (e) => {};

	useEffect(() => {
		const fetchPrompts = async () => {
			const response = await fetch('/api/prompt');
			const data = response.json();
      
		};
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
			<PromptCardList data={[]} handleTagClick={() => {}} />
		</section>
	);
};

export default Feed;
