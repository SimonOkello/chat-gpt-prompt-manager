import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('MongoDB is already connected');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'prompter_db',
			serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
		});
		isConnected = true;
		console.log('MongoDB connected');
	} catch (error) {
		console.log(error);
	}
};
