# Task Manager App

A simple MERN stack application for managing tasks with user authentication.  
Users can register, log in, create tasks, update them, mark them as completed or pending, filter tasks by status, and delete them.

---

## Features
- **User Authentication**: Register and log in with email and password.
- **Task Management**:
  - Add, edit, and delete tasks.
  - Set due dates.
  - Mark tasks as completed or pending.
  - Filter tasks (All, Completed, Pending).
- **Protected Routes**: Only logged-in users can manage tasks.
- **Persistent Login**: Token stored in local storage.
- **Logout** option available after login.

---

## Tech Stack
**Frontend**
- React.js
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcrypt.js

---

Deployed link : https://task-manager-five-gilt-15.vercel.app/login

---

## Folder Structure
```
task-manager/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create a `.env` file inside the backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret
```
Run the backend:
```bash
npm start
```

### 3. Frontend setup
```bash
cd ../client
npm install
npm start
```

---

## Usage
1. Register a new account.
2. Log in to your account.
3. Create, update, delete, and filter tasks.
4. Mark tasks as completed or pending.
5. Logout when finished.

---

## API Routes

**Auth**
- `POST /api/auth/register` – Create account
- `POST /api/auth/login` – Log in

**Tasks (Protected)**
- `GET /api/tasks` – Get tasks
- `POST /api/tasks` – Add new task
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task
