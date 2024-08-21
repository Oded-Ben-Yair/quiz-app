## Project Overview

This is a **Trivia Quiz App** built using React for the frontend and Node.js with Express for the backend. The app dynamically fetches quiz questions from a MongoDB database, allowing users to participate in a timed quiz, submit their scores, and view a leaderboard of top scores.

## Features

- **Randomized Questions**: Each game presents 10 random questions of varying difficulty levels.
- **Timed Quiz**: Users have a limited amount of time to answer each question.
- **Score Submission**: At the end of the quiz, users can submit their scores to a leaderboard.
- **Leaderboard**: The app displays a scoreboard with the top scores.

## Prerequisites

Before you can run the project locally, you need to have the following software installed on your machine:

- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **MongoDB** (You can run it locally or use a cloud service like MongoDB Atlas)
- **Git** (for version control)

## Installation Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone git@github.com:Oded-Ben-Yair/quiz-app.git
cd quiz-app
```

### 2. Setting Up the Backend

Navigate to the `backend` directory and install the dependencies:

```bash
cd backend
npm install
```

#### Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
MONGO_URI=mongodb://localhost:27017/quizAppDB
PORT=3001
```

Make sure to replace `MONGO_URI` with your actual MongoDB connection string if you're using a remote database.

#### Seed the Database

Run the following command to seed the database with quiz questions:

```bash
node seedQuestions.js
```

This will insert sample quiz questions into your MongoDB database.

### 3. Setting Up the Frontend

Navigate to the `frontend` directory and install the dependencies:

```bash
cd ../frontend
npm install
```

### 4. Running the Application

#### Start the Backend Server

From the `backend` directory, start the server:

```bash
npm start
```

The backend will be running on `http://localhost:3001`.

#### Start the Frontend Server

From the `frontend` directory, start the React development server:

```bash
npm start
```

The frontend will be running on `http://localhost:3000`.

### 5. Usage

- Open your browser and navigate to `http://localhost:3000` to access the quiz app.
- Answer the questions within the given time.
- At the end of the quiz, enter your name and submit your score to see the leaderboard.

## Folder Structure



quiz-app/
│
├── backend/
│   ├── models/            # Mongoose models (e.g., questionModel.js, scoreModel.js)
│   ├── routes/            # Express routes (e.g., quizRoutes.js)
│   ├── controllers/       # Controllers for handling requests (e.g., quizController.js)
│   ├── seedQuestions.js   # Script for seeding the database with initial questions
│   └── index.js           # Main entry point for the backend server
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components (e.g., Quiz.js)
│   │   ├── App.js         # Main App component
│   │   ├── index.js       # Entry point for React
│   │   ├── App.css        # Styling for the app
│   └── public/
│       └── index.html     # Main HTML file
│
└── README.md              # Documentation file
```

## Contributing

Contributions are welcome! If you would like to contribute to the project, feel free to fork the repository and submit a pull request.

### Guidelines

- Ensure that your code adheres to the coding standards used throughout the project.
- Write clear, concise commit messages.
- Include comments and documentation where necessary.


