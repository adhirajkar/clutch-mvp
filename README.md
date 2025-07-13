# ⚙️ ClutchMVP – Full Stack Boilerplate

ClutchMVP is a production-ready, scalable **full-stack boilerplate** designed to help developers rapidly launch MVPs. It features clean and reusable backend architecture, RBAC-based auth with Google login, Razorpay payments, an admin CRM dashboard, and a modern React frontend.

---

## ✅ Features Implemented

- 🔑 JWT + Google OAuth Login
- 👮 Role-based middleware with full control per route
- ⚙️ CRUD API generator with search, sort, filter, pagination
- 📊 Admin CRM Dashboard built with React
- 💳 Razorpay payment gateway
- 🧱 Modular and scalable folder structure

---

## 🛠 Tech Stack

### 🌐 Frontend
- ⚛️ React (with **TypeScript** + **Vite**)
- 🎨 Tailwind CSS + **shadcn/ui** for beautiful UI components
- 🧠 Modular component structure
- 🔐 Frontend **RBAC support** using role-based UI control & protected routes
- 📋 CRM-style **Admin Dashboard** with full CRUD integration
- 💳 Razorpay payment integration

### 🧰 Backend
- 🔧 Node.js + Express
- 🛢 MongoDB + Mongoose
- 🔐 JWT-based Authentication
- 🌍 Google OAuth2 Login
- 🧱 Role-Based Access Control (RBAC)
- 📦 **Reusable CRUD Controller Generator** with:
  - Filters, Search, Sort, Pagination
  - Per-route middleware (e.g., RBAC, auth, logging)
  - Easy plug-and-play for any model
- 💰 Razorpay API support for secure payments

---

## 🧩 Upcoming Plugin Roadmap

- 💬 **Socket.io** for real-time chat
- 🎥 **WebRTC** integration for video calling
- ☁️ **S3 image/file uploads** with Multer
- 🧪 **Jest + Supertest** test suite setup
- 📚 **Swagger/OpenAPI Docs** auto-generated from routes

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/adhirajkar/clutch-mvp.git
cd clutch-mvp
```

---

### 2. Setup Environment Variables

#### 🛠 Backend – `server/.env`

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

#### 🎨 Frontend – `client/.env`

```env
VITE_GOOGLE_CLIENT_ID=
```

> ✅ Replace credentials with your own MongoDB URI, Razorpay keys, and secure secrets before deploying.

---

### 3. Install Dependencies & Run Dev Servers

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🤝 Contributing

Want to help add plugins like WebRTC, file uploads, or Swagger docs? PRs and ideas are always welcome!

---

> Built to ship fast ⚡ | Designed to scale 🚀 | Made with ❤️ by Adhiraj
