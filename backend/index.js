import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import quizRoutes from './routes/quizRoutes.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use the quiz routes
app.use('/api/quiz', quizRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  
  // Start the server only after successful DB connection
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
