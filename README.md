# 🪄 PrepGenie - AI Interview Preparation Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Active-brightgreen)](https://prep-genie-nine.vercel.app/)


An intelligent interview preparation platform that generates personalized questions using Gemini AI.

## ✨ Key Features

### 🧠 AI-Powered Question Generation
- **Role/Experience-Based Questions**: Input job role (Frontend/Backend/Fullstack), experience level, and topics
- **Gemini AI Integration**: Context-aware question generation with follow-up capabilities
- **Technical Depth Detection**: Adapts question difficulty based on user responses

### 🔒 Secure Authentication
- JWT Authentication with HTTP-only cookies
- Protected routes with role-based access control
- Password encryption using bcrypt

### 📊 Interactive Dashboard

🛠 Tech Stack
Category	Technologies Used
Frontend:	React, Framer Motion, Tailwind CSS, Axios
Backend:	Node.js, Express, MongoDB (Mongoose)
AI	Google Gemini API
Auth	JWT, bcrypt, cookie-parser
State	Context API, localStorage
Deployment	Vercel (Frontend), Render (Backend)
🚀 Getting Started
Prerequisites
Node.js v18+

MongoDB Atlas cluster

Google Gemini API key

Installation
bash
# Clone the repository
git clone https://github.com/yourusername/prepgenie.git

# Install dependencies
cd prepgenie && npm install
cd client && npm install

# Set up environment variables
cp .env.example .env
# Add your MongoDB URI and Gemini API key

🖥️ Running the App
bash
# Start backend (from root)
npm run dev

# Start frontend (from /client)
npm start

