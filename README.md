# 🍽️ Restaurant Management System

A full-stack restaurant management application built with **React (Vite)**, **Redux Toolkit**, **Express.js**, and **MongoDB**.  
It supports **dine-in** and **takeaway** workflows, dynamic menu browsing, cart management, and real-time order tracking.

---

## 🚀 Features

- 🧭 Category-based menu with infinite scroll and search  
- 🛒 Cart with quantity controls and global Redux state  
- 🧾 Order creation for dine-in (with table) or takeaway  
- ⏱️ Real-time order status updates (auto-mark as done)  
- 📱 Responsive UI with mobile-first design  
- 🌐 Deployed on **Render** (frontend + backend)

---

## 🧑‍💻 Tech Stack

| Layer | Technology Used |
|-------|-----------------|
| **Frontend** | React (Vite), Redux Toolkit |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Deployment** | Render |

---

## 📁 Folder Structure

![Folder Structure](image.png)
- app Folder is for mobile Frontend from where users can place orders
- Backend folder is a complete nodejs and express application with logics and mvc architecture
- Frontend folder is for restaurant staff that can be accessed on big screens for restaurant stats


## 🧭 How to Run Locally

### 1. Clone the Repo

- git clone https://github.com/Mihiryadav1/Restaurant_Management.git
- cd Restaurant-Management

### 2. Install Necessary Dependancies for each Folder
- cd Backend
- npm install
- Create .env file in Backend folder with env variables as follows
- PORT=5000
- MONGO_URL=your_mongodb_connection_string
- Start the backend with command - nodemon server.js

### 3.Commands
## Frontend
- cd Frontend
- npm install
- npm run dev
- Create .env in Frontend folder  with env variables as follows
- VITE_LOCAL_URL= your backend URL

## app
- cd app
- npm install
- Create .env in app folder 
- VITE_LOCAL_URL= your backend URL
- Start the project with the command npm run dev





