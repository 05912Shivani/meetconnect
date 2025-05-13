# MeetConnect

MeetConnect is a full-stack web application that enables users to schedule, manage, and participate in mock interviews. It is designed to improve interview preparation by connecting
candidates with interviewers for practice sessions.

## 🚀 Features

### Frontend
- User registration and login
- Dashboard with upcoming/completed interviews
- Feedback system after each session
- Profile management (name, contact, DOB)

### Backend
- Authentication using session-based middleware
- Interview scheduling APIs
- Feedback collection and retrieval
- User management

## 🛠 Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Axios for API calls

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- Express-session for authentication


## 🧪 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/05912Shivani/meetconnect.git
cd meetconnect

cd meetconnect-backend
npm install
npm run dev

cd meetconnect-frontend
npm install
npm start

Frontend Link : https://meetconnect-owf4.onrender.com/
Backend Links :
GET Profile:https://meet-connect-backend.onrender.com/api/auth/profile
Get Interviews:https://meet-connect-backend.onrender.com/api/interviews
Get Feedback by Interview:https://meet-connect-backend.onrender.com/api/feedback/fetch/:interviewId
Get All Blogs:https://meet-connect-backend.onrender.com/api/blogs
Get Blogs by category :https://meet-connect-backend.onrender.com/api/blogs?category=Frontend
Get All Questions:https://meet-connect-backend.onrender.com/api/practice/practice-questions
Get Practice Questions By Category:https://meet-connect-backend.onrender.com/api/practice/practice-questions?category=Frontend

This is POSTMAN API Testing Link:
https://documenter.getpostman.com/view/41681098/2sB2j99A3y
