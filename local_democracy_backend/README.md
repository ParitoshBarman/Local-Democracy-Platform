# Local Democracy Platform – Backend

This is the backend server for the **Local Democracy Platform**, a community-driven application designed to facilitate local governance, feedback, impact stories, law proposals, initiatives, and real-time notifications using REST APIs and WebSockets.

## 🚀 Features

- User Authentication (Register/Login/Logout/Refresh Token)
- Role-Based Access Control (RBAC)
- Real-time Notifications via Socket.io
- CRUD APIs for:
  - Laws
  - Votes (Upvote/Downvote)
  - Impacts
  - Initiatives
  - Stories
  - Feedbacks
- File Uploads for profile images
- Admin-only routes for managing feedbacks
- MongoDB integration

---

## 📁 Project Structure

```
├── app.js                  # Main Express application setup
├── index.js                # Entry point and Socket.io setup
├── config/
│   └── db.js               # MongoDB connection config
├── routes/
│   └── *.js                # Route files (auth, law, vote, etc.)
├── controllers/
│   └── *.js                # Controller logic
├── middlewares/
│   └── *.js                # Auth, role-based, upload middlewares
├── models/
│   └── *.js                # Mongoose schemas/models
├── sockets/
│   └── notificationSocket.js
└── uploads/                # Uploaded files (profile images)
```

---

## 📦 Installation

```bash
git clone https://github.com/ParitoshBarman/Local-Democracy-Platform.git
cd backend local_democracy_backend
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root with the following:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

---

## 🧪 Running the Server

```bash
# Development
npm run dev

# Production
node index.js
```

---

## 🌐 API Endpoints

Base URL: `http://localhost:3001/api`

| Resource     | Endpoint                        | Method     | Auth Required |
|--------------|----------------------------------|------------|----------------|
| Auth         | `/auth/register`                | `POST`     | ❌             |
|              | `/auth/login`                   | `POST`     | ❌             |
|              | `/auth/logout`                  | `POST`     | ✅             |
|              | `/auth/refresh-token`           | `POST`     | ❌             |
|              | `/auth/me`                      | `GET`      | ✅             |
| Laws         | `/laws`                         | `GET/POST/PATCH/DELETE` | 🔒(write)      |
| Votes        | `/votes`                        | `GET/POST/PATCH/DELETE` | 🔒(write)      |
| Impacts      | `/impacts`                      | `GET/POST/PATCH/DELETE` | 🔒(write)      |
| Initiatives  | `/initiatives`                  | `GET/POST/PATCH/DELETE` | 🔒(write)      |
| Feedbacks    | `/feedbacks`                    | `GET/POST/PATCH/DELETE` | 🔒(read)       |
| Stories      | `/stories`                      | `GET/POST/PATCH/DELETE` | 🔒(write)      |
| Notifications| `/notifications`                | `GET/POST/PATCH/DELETE` | 🔒(write)      |

---

## 🔐 Authentication

Use the `Authorization: Bearer <token>` header to access protected routes. Access tokens are JWTs, and refresh tokens should be stored securely on the client side.

---

## ⚡ Socket.IO Setup

Frontend should connect using:

```javascript
const socket = io("http://localhost:3001", {
  transports: ["websocket"],
});
```

---

## 📤 File Upload

Profile photo uploads are handled using `Multer`. Images are stored in the `uploads/` directory and served statically via:

```
http://localhost:3001/uploads/<filename>
```

---

## ✨ Author
Paritosh Barman

