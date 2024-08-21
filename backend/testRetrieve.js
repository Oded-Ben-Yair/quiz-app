import mongoose from 'mongoose';
import QuestionModel from './models/questionModel.js';  // Correctly imported

mongoose.connect('mongodb://localhost:27017/quizAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected for retrieval');
    QuestionModel.find({})  // Corrected variable name
        .then(questions => {
            console.log('Retrieved Questions:', questions);
            process.exit();
        })
        .catch(err => {
            console.error('Error retrieving questions:', err);
            process.exit();
        });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit();
});
