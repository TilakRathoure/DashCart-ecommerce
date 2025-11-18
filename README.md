# DashCart

**DashCart** is a fast, type-safe e‑commerce platform built with the MERN stack and TypeScript. It includes a polished admin dashboard for managing products, orders, users and transactions — complete with real‑time analytics (Chart.js), secure Firebase authentication, Cloudinary image storage, and Stripe payment integration.

> A scalable CRUD admin dashboard and an intuitive user storefront built with React, Redux Toolkit and a robust Node/Express + MongoDB backend.

---

## Demo & Repository

* **Live Frontend (Netlify):** `https://dashcartmern.netlify.app/`
* **Live Backend (Render):** `https://shophere-tmxm.onrender.com/`
* **Repository:** `https://github.com/TilakRathoure/DashCart-ecommerce`

---

## Key Features

* TypeScript across frontend and backend for safer, predictable code.
* Admin dashboard with full CRUD for products, orders and users.
* Real-time analytics and visualizations using Chart.js.
* Authentication with Firebase (email/password, secure sessions).
* Image upload & management with Cloudinary.
* Stripe integration for checkout and payments (test & live modes).
* Responsive UI built with React, Redux Toolkit and Tailwind-compatible styles.
* Clean API design with Node.js + Express and MongoDB for persistence.

---

## Tech Stack

* Frontend: React, TypeScript, Vite, Redux Toolkit
* Backend: Node.js, Express, TypeScript (optional), MongoDB
* Auth: Firebase Authentication
* Storage: Cloudinary
* Payments: Stripe
* Charts: Chart.js
* Deployment: Netlify (frontend), Render (backend)

---

## Screenshots

![Dashboard 1](https://github.com/user-attachments/assets/5a60f07b-ffe2-4d3e-a698-331b8d6e8238)

![Dashboard 2](https://github.com/user-attachments/assets/fbc62095-875d-4e32-8c17-ee6890c4bf90)

![Dashboard 3](https://github.com/user-attachments/assets/530234db-874f-4a31-8d80-4064cabde195)

![Dashboard 4](https://github.com/user-attachments/assets/ba564ffa-966c-46a3-aeab-34b5a301e206)

---

## Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* A MongoDB instance (MongoDB Atlas recommended in production)
* Firebase project for Authentication
* Cloudinary account for image storage
* Stripe account (test and live keys)

---

## Environment Variables

> **Important:** Do **not** commit `.env` files or keys to version control. The `.env` examples below use placeholder names and values — replace them with your actual credentials.

### Frontend (`.env` used by Vite)

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_PROJECT_ID=your_firebase_project_id
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
VITE_SERVER=https://your-backend.example.com   # backend base URL (no trailing slash)
VITE_STRIPE_KEY=pk_test_your_stripe_publishable_key
```

### Backend (`.env`)

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
STRIPE_KEY=sk_test_your_stripe_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret           # if you use JWTs for session/auth
```

---

## Local Development

### Backend

```bash
# from backend folder
npm install
npm run build
# create .env using the variables above
node dist/app.j
```

### Frontend

```bash
# from frontend folder
npm install
# create .env (Vite variables) in the frontend root
npm run dev
```
