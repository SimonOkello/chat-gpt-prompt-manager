'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
	const { data: session } = useSession();
	const [prompts, setPrompts] = useState([]);
	const router = useRouter();
	const fetchPrompts = async () => {
		const response = await fetch(`/api/users/${session?.user?.id}/prompts`);

		const data = await response.json();
		setPrompts(data);
	};

	useEffect(() => {
		if (session?.user?.id) fetchPrompts();
	}, []);
	const handleEdit = (prompt) => {
		router.push(`/update-prompt?id=${prompt?._id}`);
	};
	const handleDelete = async (prompt) => {
		const hasConfirmed = confirm(
			'Are you sure you want to delete this prompt?'
		);
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${prompt?._id.toString()}`, {
					method: 'DELETE',
				});
				const newPrompts = prompts.filter((post) => post?._id != prompt?._id);
				setPrompts(newPrompts);
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Profile
			name="My "
			desc="Welcome to your personalized profile page"
			data={prompts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
