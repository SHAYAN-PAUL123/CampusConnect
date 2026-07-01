# CampusConnect 🎓

A MERN stack platform that helps college students connect, collaborate, and build teams for projects and hackathons.

---

## 🚀 Features

### 🔐 Authentication
- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Logout

### 👤 Profile Management
- View Profile
- Edit Profile
- Add Bio
- Add Skills
- Add Resume Link

### 📝 Social Feed
- Create Posts
- View All Posts
- Like/Unlike Posts
- Comment on Posts

### 🔍 Student Search
- Search students by skills
- View profiles and resumes

### 👥 Team Finder
- Create Teams
- View Available Teams
- Apply to Join Teams

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js

### Database
- MongoDB Atlas

---

## 📂 Project Structure

```bash
CampusConnect
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/CampusConnect.git
cd CampusConnect
```

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /api/auth/signup | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/me | Get Current User |
| PUT | /api/auth/profile | Update Profile |

---

### Posts

| Method | Endpoint |
|--------|-----------|
| POST | /api/posts |
| GET | /api/posts |
| POST | /api/posts/:id/like |
| POST | /api/posts/:id/comment |

---

### Users

| Method | Endpoint |
|--------|-----------|
| GET | /api/users |
| GET | /api/users/:id |
| GET | /api/users/search?skill=React |

---

### Teams

| Method | Endpoint |
|--------|-----------|
| POST | /api/team |
| GET | /api/team |
| GET | /api/team/:id |
| POST | /api/team/:id/apply |

---

## 📸 Screenshots

Add screenshots here after finalizing the UI.

### Login Page
```
screenshot here
```

### Feed Page
```
screenshot here
```

### Profile Page
```
screenshot here
```

### Search Page
```
screenshot here
```

### Team Finder
```
screenshot here
```

---

## 🎯 Future Improvements

- Follow/Unfollow System
- Real-time Chat
- Notifications
- Resume Upload using Cloudinary
- Project Recommendation System
- AI-powered Team Suggestions

---

## 💡 Motivation

CampusConnect was built to help students:

- Find teammates for projects and hackathons.
- Showcase their skills and resumes.
- Connect with like-minded students.
- Build a collaborative campus community.

---

## 👨‍💻 Author

**Shayan Paul**

- GitHub: https://github.com/SHAYAN-PAUL123
- LinkedIn: Add your LinkedIn profile link here.

---

## ⭐ If you like this project, give it a star!