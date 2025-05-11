# MERN Stack Application (Frontend + Backend)

## 1. Prerequisites

- Ensure Node.js and npm are installed.
- Ensure MongoDB is installed and running locally.
- Set up `.env` files for both frontend and backend.

## 2. Backend Setup

- Navigate to the backend directory.
- Install all backend dependencies.
- Ensure the `.env` file contains your MongoDB connection string and any required environment variables.
- Start the backend development server.

## 3. Frontend Setup

- Navigate to the frontend directory.
- Install all frontend dependencies.
- Ensure the `.env` file contains the backend API base URL.
- Start the frontend development server.

## 4. Project Structure

- The `backend` folder contains Express server code, including configuration, routes, controllers, and models.
- The `frontend` folder contains the React application with its own environment variables and Vite setup.
- MongoDB is used as the database and should be running locally.

## 5. Running the Full Stack Application

- Start your MongoDB server if not already running.
- Run the backend server.
- Run the frontend development server.
- Open the frontend application in your browser using the development URL provided (usually `localhost` with port 5173).

## 6. Environment Files

- The backend `.env` file should include variables such as MongoDB URI and server port.
- The frontend `.env` file should include the backend API base URL for making HTTP requests.

## 7. Notes

- The backend typically runs on port 5000, and the frontend on port 5173.
- Ensure that both frontend and backend ports match the configuration in the `.env` files.
- Use tools like `nodemon` during backend development for automatic restarts.
- Confirm CORS configuration if there are issues with API calls from frontend to backend.

