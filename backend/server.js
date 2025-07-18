import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connectToDb } from './config/db.js';
import authRoutes from "./routes/authRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"
import questionRoutes from "./routes/questionRoutes.js"
import { protect } from './middlewares/authMiddleware.js';
import {generateInterviewQuestions} from "./controllers/aiController.js"
import { generateConceptExplanation } from './controllers/aiController.js';
// Load environment variables
dotenv.config();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Middleware to handle CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

connectToDb();
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/questions",questionRoutes);
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation",protect, generateConceptExplanation);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
