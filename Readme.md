# 🌌 Visionex

**Visionex** is a modern AI-powered social media platform where creativity meets artificial intelligence. Users can generate AI art, share posts, follow creators, and engage with a community built entirely around machine-generated visuals.

---

## 🚀 Overview

## 🚀 Key Features

- **AI Art Generation**: Create stunning visuals from text prompts using cutting-edge models.
- **Social Feed**: Discover and interact with creations from the global community.
- **Profile Customization**: Build your artistic identity and showcase your gallery.
- **Advanced Dashboard**: Manage your activities and interactions with ease.

Visionex combines the power of AI image generation with a full-featured social networking experience. The platform allows users to transform ideas into visuals using prompts, publish their creations, and interact with other creators through likes, follows, and feeds.

It is built using the **MERN stack** and integrates an **AI image generation API** to deliver real-time creative results.

---

## ✨ Features

- 🔐 Authentication & Authorization (JWT based)
- 👤 User Profiles
- 🎨 AI Image Generation from prompts
- 📰 Feed system (latest + following)
- ❤️ Like / Unlike posts
- ➕ Follow / Unfollow users
- 🖼 Post sharing system
- 🔎 Explore page
- 📱 Responsive UI
- ⚡ Real-time experience

---

## 🛠 Tech Stack

**Frontend**

- React.js
- Axios
- Tailwind / CSS
- Redux / Context API

**Backend**

- Node.js
- Express.js

**Database**

- MongoDB
- Mongoose ODM

**AI Integration**

- Image Generation API (Prompt → Image)

---

## 📂 Project Structure

```text
visionex/
├── client/                # Frontend application (React + Vite)
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images, icons, and global styles
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Redux slices and service logic
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Main application screens
│   │   ├── App.jsx        # Root component and routing
│   │   └── main.jsx       # Entry point for React
│   ├── index.html         # Main HTML file
│   └── vite.config.js     # Vite/build configuration
│
├── server/                # Backend API (Node.js + Express)
│   ├── config/            # Database and external service config
│   ├── controllers/       # Request handlers and business logic
│   ├── middleware/        # Auth, upload, and error middleware
│   ├── models/            # MongoDB/Mongoose data models
│   ├── routes/            # API endpoint definitions
│   └── server.js          # Entry point for the Express server
│
├── .env                   # Sensitive configuration (Keys, URI)
├── package.json           # Root project metadata and scripts
└── Readme.md              # Documentation
```
