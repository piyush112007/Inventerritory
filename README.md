# Inventerritory

<div align="center">

<img src="./public/logo.png" width="140"/>

### Smart Inventory Management Platform

Modern inventory management system built with **React + Firebase** featuring real-time database integration, authentication, multi-register architecture, advanced filtering, dark/light mode, and responsive SaaS-style UI.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Backend-orange?logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

# ✨ Features

## 🔐 Authentication
- Google Authentication using Firebase Auth
- Persistent login sessions
- Secure user-specific data storage

## 📦 Inventory Management
- Add Products
- Edit Products
- Delete Products
- Real-time Firestore updates

## 🗂️ Multi Register System
Users can create multiple inventory registers.

Example:
- Electronics Register
- Grocery Register
- Mobile Register
- Furniture Register

Each register maintains:
- Separate products
- Separate inventory
- Separate filters

---

# 🎨 UI Features

- Dark / Light Mode
- Responsive SaaS Design
- Toast Notifications
- Loading States
- Animated UI
- Modern Dashboard
- Advanced Filtering

---

# 🔎 Advanced Filters

Users can filter products by:

- Category
- Product Name
- Min Price
- Max Price
- Stock Status

### Combined Filters Supported

Example:
```txt
Category = Mobile
Status = In Stock
Price < ₹20000
```

---

# 🧠 Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend Framework |
| Firebase Auth | Authentication |
| Firestore Database | Real-time Database |
| Tailwind CSS | Styling |
| React Router DOM | Routing |
| React Hot Toast | Notifications |
| Lucide React | Icons |
| Vercel | Deployment |

---

# 🏗️ System Architecture

```txt
┌────────────────────┐
│      USER          │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   React Frontend   │
│  (Vite + React)    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Firebase Auth      │
│ Google Sign-In     │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Cloud Firestore    │
│ Real-time Database │
└────────────────────┘
```

---

# 🗃️ Firestore Database Structure

```txt
users
 └── userId
      ├── name
      ├── email
      ├── photoURL
      │
      └── registers
            └── registerId
                  ├── name
                  │
                  └── products
                        └── productId
                              ├── name
                              ├── category
                              ├── quantity
                              ├── price
                              └── createdAt
```

---

# 🔄 Data Flow

## Authentication Flow

```txt
User
  ↓
Google Login
  ↓
Firebase Authentication
  ↓
User Data Stored
  ↓
Dashboard Access
```

---

## Product Creation Flow

```txt
User Adds Product
        ↓
Form Validation
        ↓
Firestore addDoc()
        ↓
Database Updated
        ↓
UI Re-rendered
        ↓
Toast Notification
```

---

# 📂 Project Structure

```txt
src/
│
├── components/
│   └── LoginScreen.jsx
│
├── firebase/
│   └── config.js
│
├── pages/
│   ├── Dashboard.jsx
│   └── RegisterPage.jsx
│
├── services/
│   ├── authService.js
│   ├── productService.js
│   └── registerService.js
│
├── App.jsx
└── main.jsx
```

---

# 🔐 Firebase Security Rules

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth != null
      && request.auth.uid == userId;

      match /registers/{registerId} {
        allow read, write: if request.auth != null
        && request.auth.uid == userId;

        match /products/{productId} {
          allow read, write: if request.auth != null
          && request.auth.uid == userId;
        }
      }
    }
  }
}
```

---

# 📊 Inventory Status Logic

| Quantity | Status |
|---|---|
| 0 | Out of Stock |
| 1 - 4 | Low Stock |
| 5+ | In Stock |

---

# 🌙 Dark Mode System

Theme switching is managed using:
```js
useState()
```

The UI dynamically updates using Tailwind conditional classes.

Example:
```js
darkMode
  ? "bg-slate-900 text-white"
  : "bg-white text-black"
```

---

# 🚀 Deployment

## Frontend
Deployed on:
### Vercel 
```bash
https://inventerritory.vercel.app/        
```

## Backend
Powered by:
### Firebase

---

# ⚡ Installation

## Clone Repository

```bash
https://github.com/piyush112007/Inventerritory
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

# 🔑 Firebase Setup

Create:
```txt
src/firebase/config.js
```

Add:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
```
---
# 🔮 Future Improvements

- Analytics Dashboard
- Export to Excel/PDF
- Register PIN Protection
- Product Images
- AI Inventory Prediction
- Barcode Scanner
- Team Collaboration
- Sales Management

---

# 👨‍💻 Developer

### Piyush Singh

Computer Engineering Student  
Frontend & Full Stack Developer

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Final Note

Inventerritory was built as a modern SaaS-style inventory platform focusing on:

- Performance
- Scalability
- Clean UI/UX
- Real-time data handling
- Secure architecture

The project demonstrates strong understanding of:
- React Architecture
- Firebase Ecosystem
- State Management
- Component Design
- Database Structuring
- Frontend Engineering
