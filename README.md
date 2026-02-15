# 🚀 CareerPilot

### AI-Powered Career Roadmap Generator

CareerPilot is an intelligent web application that generates structured,
personalized career roadmaps using AI. Users can enter their target
career, experience level, and goals --- and receive a step-by-step
learning path instantly.

---

## 🌟 Features

- 🤖 AI-generated structured career roadmaps\
- 📊 Phase-based learning plan (Beginner → Advanced)\
- 📚 Recommended tools & resources\
- 🔐 JWT Authentication\
- 📱 Fully responsive UI

---

## 🛠 Tech Stack

### Frontend

- Next.js
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB

### AI Integration

- Gemini API

---

## 🧠 How It Works

1.  User selects:
    - Career goal (e.g., MERN Developer)
    - Experience level (Beginner / Intermediate / Advanced)
    - Time commitment

2.  Backend sends structured prompt to Gemini LLM.

3.  AI generates:
    - Learning Phases
    - Technologies
    - Projects
    - Resources
    - Milestones

4.  Roadmap is displayed in structured UI format.

---

## 📂 Project Structure

careerpilot/ │ ├── client/ \# React frontend ├── server/ \# Express
backend └── README.md

---

## ⚙️ Installation

### 1️⃣ Clone Repository

git clone https://github.com/alvy00/eg-careerpilot-asyncawait
cd eg-careerpilot-asyncawait

### 2️⃣ Install Dependencies

cd eg-careerpilot-asyncawait
npm install

---

## 🔑 Environment Variables

Create a `.env` file inside the server directory:

PORT=3000\
MONGO_URI=your_mongodb_connection\
JWT_SECRET=your_secret_key\
GEMINI_API_KEY=your_gemini_api_key

---

## ▶️ Run the Application

npm run dev

App runs on: http://localhost:3000

---

## 🔮 Future Enhancements

- 🔎 RAG-based resource injection
- 📈 Skill gap analysis
- 📊 Progress tracking dashboard
- 🎯 Resume builder integration
- 🤝 Mentor chat mode
- 🏆 Gamification system

---

## 🛡 Security Features

- Password hashing (bcrypt)
- JWT authentication
- API validation & sanitization
- Rate limiting
