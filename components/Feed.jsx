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
	const [prompts, setPrompts] = useState([
		{
			_id: '66b993b356e8cddcee65a6e2',
			creator: {
				_id: '66b992cc56e8cddcee65a6de',
				email: 'simonokello.dev@gmail.com',
				username: 'simonokello',
				image:
					'https://gravatar.com/avatar/9ac90bb8d25aaa676e354b7690fa0e6e?s=400&d=robohash&r=x',
			},
			prompt:
				'You are a web developer, I am going to give you a piece of code. I want your advice on how to make it cleaner,more readable and efficient.',
			tag: '#webdevelopment',
		},
		{
			_id: '66b99688a341081e64068ff0',
			creator: {
				_id: '66b992cc56e8cddcee65a6de',
				email: 'simonokello.dev@gmail.com',
				username: 'simonokello',
				image:
					'https://gravatar.com/avatar/9ac90bb8d25aaa676e354b7690fa0e6e?s=400&d=robohash&r=x',
			},
			prompt: 'Testing new prompt',
			tag: '#ideas',
			__v: 0,
		},
	]);

	const handleSearchChange = (e) => {};

	// useEffect(() => {
	// 	const fetchPrompts = async () => {
	// 		const response = await fetch('/api/prompt');
	// 		console.log(response);
	// 		const data = response.json();
	// 		setPrompts(data);
	// 	};
	// 	console.log(prompts);
	// 	fetchPrompts();
	// }, []);
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
