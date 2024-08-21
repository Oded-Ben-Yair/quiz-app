import mongoose from 'mongoose';
import { config } from 'dotenv';
import Question from './models/questionModel.js';
import quizQuestions from './quizQuestions.json' assert { type: 'json' };

config(); // This will load the .env file variables

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const importData = async () => {
    try {
        console.log('Starting data import...');
        await Question.deleteMany();
        console.log('Existing questions deleted.');
        
        const inserted = await Question.insertMany(quizQuestions);
        console.log(`Data Imported! Inserted ${inserted.length} questions.`);
        process.exit();
    } catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};

importData();
