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
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [filteredPrompts, setFilteredPrompts] = useState([]);

	const fetchPrompts = async () => {
		const response = await fetch('/api/prompt');
		console.log(response);
		const data = await response.json();
		setPrompts(data);
	};

	useEffect(() => {
		fetchPrompts();
	}, []);

	const filterPrompts = (searchText) => {
		const regex = new RegExp(searchText, 'i');
		return prompts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.prompt) ||
				regex.test(item.tag)
		);
	};
	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setFilteredPrompts(searchResult);
			}, 500)
		);
	};
	const handleTagClick = (tagName) => {
		setSearchText(tagName);
		const searchResult = filterPrompts(tagName);
		setFilteredPrompts(searchResult);
	};
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
			<PromptCardList
				data={(searchText && filteredPrompts) || prompts}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
};

export default Feed;
