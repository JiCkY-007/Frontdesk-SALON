import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import requestRoutes from './routes/routes.js';

import fs from "fs";
import yaml from "js-yaml";
const YAML_FILE = "C:\Users\jicky\OneDrive\Desktop\AI_FrontDesk\AI-livekit";

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

// Route files

import items from './routes/routes.js';

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers


app.use('/api/requests', requestRoutes);



const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});