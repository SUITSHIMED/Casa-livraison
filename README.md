# CasaLivraison 🍔📦

Full-stack mobile food delivery application built using React Native (Expo) and Node.js (Express).  
The app allows users to browse restaurants, view menus, and place orders securely.

---

## 📱 Screens

- Register screen
- Login Screen
- Restaurants List Screen
- Menu Screen
- Orders Screen
- myOrders

---


## 🎥 Presentation

A full explanation of the project architecture, backend, frontend, database, and data flow is available here:

👉 **Canva Presentation:**  
*(Link )*

## 🚀 Features

- 🔐 User Authentication (JWT)
- 🍽 View Restaurants
- 📋 View Menu Items
- 🛒 Create Orders
- 📦 Backend API with database
- ⚡ Fast mobile UI using React Native Expo
- 🔄 Frontend connected to backend API using Axios

---

## 🛠 Tech Stack

### Frontend
- React Native (Expo)
- Axios
- Expo Router
- AsyncStorage

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcrypt (password hashing)

---

## 🧠 Architecture Overview

```
Mobile App (React Native)
        │
        │ HTTP Requests (Axios)
        ▼
Backend API (Express)
        │
        │ Sequelize ORM
        ▼
PostgreSQL Database
```

---

## 📂 Project Structure

```
CasaLivraison/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── MenuItem.js
│   │   └── Order.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── restaurantController.js
│   │   ├── menuController.js
│   │   └── orderController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── menuRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── app/
│   │   ├── login.jsx
│   │   ├── restaurants.jsx
│   │   ├── menu.jsx
│   │   └── orders.jsx
│   │
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   └── constants/
│   │
│   └── assets/
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User logs in
2. Backend validates credentials
3. Backend sends JWT token
4. Token stored in AsyncStorage
5. Token used for protected requests

---

## 📡 Example API Endpoints

### Auth

```
POST /auth/register
POST /auth/login
```

### Restaurants

```
GET /restaurants
```

### Menu

```
GET /menu/:restaurantId
```

### Orders

```
POST /orders
GET /orders/my
```

---
---

## 📊 Architecture Overview

This diagram represents the database structure and relationships between entities.

![CasaLivraison UML Diagram]

---

## 🗄 Database Models

### User
- id
- name
- email
- password

### Restaurant
- id
- name
- image

### MenuItem
- id
- name
- price
- restaurantId

### Order
- id
- userId
- totalPrice

---

## ⚙ Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npx expo start
```

---

## 🎯 Learning Objectives

This project demonstrates:

- Full-stack mobile app development
- REST API development
- Database design
- Authentication using JWT
- Connecting frontend to backend
- State management and API calls

---

