# 🛍️ Bagnest — Backend API

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Storage-3448C5?logo=cloudinary&logoColor=white)
![YouTube API](https://img.shields.io/badge/YouTube%20API-Video%20Storage-FF0000?logo=youtube&logoColor=white)
![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

> REST API powering the Bagnest product showcase platform — handles product management, admin authentication, image uploads via Cloudinary, and video uploads via YouTube Data API.

---

## 🔗 Related Repository

This is the **backend** for the Bagnest project. The frontend lives here:
👉 [bagnest-frontend](https://github.com/yourusername/bagnest)

---

## 📖 Overview

Bagnest Backend is a Node.js + Express REST API that:

- Manages the product catalog (add, update, delete, fetch products)
- Authenticates the admin using **JWT**
- Uploads **product images** to **Cloudinary** and stores the URLs in the database
- Uploads **product videos** to **YouTube** via the Google API and stores the video links in MongoDB
- Serves data to the Bagnest frontend deployed separately

---

## 🌟 Key Features

- 🔐 **JWT-based Admin Authentication** — secure login with token stored in HTTP-only cookies
- 🖼️ **Image Upload via Cloudinary** — images are uploaded and CDN-hosted, URLs saved in DB
- 🎥 **Video Upload via YouTube Data API** — videos are uploaded to YouTube; only the link is stored in MongoDB (saves storage costs)
- 📦 **Product CRUD** — full create, read, update, delete for bag products
- 🗜️ **Response Compression** — `compression` middleware for faster API responses
- 🌐 **CORS configured** — to accept requests only from the frontend origin

---

## 🛠️ Tech Stack

| Layer              | Technology                        |
|--------------------|-----------------------------------|
| Runtime            | Node.js 20.x                      |
| Framework          | Express v5                        |
| Database           | MongoDB (via Mongoose v9)         |
| Image Storage      | Cloudinary v2                     |
| Video Storage      | YouTube Data API v3 (googleapis)  |
| Authentication     | JSON Web Tokens (jsonwebtoken)    |
| File Handling      | Multer v2                         |
| Cookie Handling    | cookie-parser                     |
| Compression        | compression                       |
| Environment Config | dotenv                            |
| Dev Server         | Nodemon                           |
| Deployment         | Render                            |

---

## 📦 Getting Started

### Prerequisites

- Node.js `>= 20.x`
- npm `>= 9.x`
- A MongoDB database (MongoDB Atlas recommended)
- A Cloudinary account
- A Google Cloud project with YouTube Data API v3 enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/bagnest-backend.git

# 2. Navigate into the project
cd bagnest-backend

# 3. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=production

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bagnest

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Admin Credentials
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google / YouTube
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://developers.google.com/oauthplayground
GOOGLE_REFRESH_TOKEN=your_refresh_token
YOUTUBE_CHANNEL_ID=your_channel_id
```

> ⚠️ Never commit your `.env` file. Refer to `.env.example` for all required keys.

### Run Locally

```bash
# Development (with auto-restart via nodemon)
npm run dev

# Production
npm start
```

API will be running at [http://localhost:5000](http://localhost:5000)

---

## 🧰 Available Scripts

| Command         | Description                            |
|-----------------|----------------------------------------|
| `npm run dev`   | Start dev server with nodemon          |
| `npm start`     | Start production server                |

---

## 📁 Project Structure

```
bagnest-backend/
├── config/
│   ├── db.js                # MongoDB connection
│   ├── cloudinary.js        # Cloudinary setup
│   └── youtube.js           # Google OAuth & YouTube client setup
├── controllers/
│   ├── authController.js    # Admin login / logout
│   └── productController.js # CRUD operations for products
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   └── upload.js            # Multer config for image & video handling
├── models/
│   └── Product.js           # Mongoose product schema
├── routes/
│   ├── authRoutes.js        # POST /api/auth/login, /logout
│   └── productRoutes.js     # GET/POST/PUT/DELETE /api/products
├── .env.example             # Environment variable template
├── server.js                # Express app entry point
└── package.json
```

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint            | Description              | Auth Required |
|--------|---------------------|--------------------------|---------------|
| POST   | `/api/auth/login`   | Admin login, returns JWT | ❌            |
| POST   | `/api/auth/logout`  | Clears auth cookie       | ✅            |

### Products

| Method | Endpoint               | Description                           | Auth Required |
|--------|------------------------|---------------------------------------|---------------|
| GET    | `/api/products`        | Fetch all products                    | ❌            |
| GET    | `/api/products/:id`    | Fetch a single product by ID          | ❌            |
| POST   | `/api/products`        | Add a new product (with media upload) | ✅            |
| PUT    | `/api/products/:id`    | Update an existing product            | ✅            |
| DELETE | `/api/products/:id`    | Delete a product                      | ✅            |

---

## 🖼️ Image Upload Flow (Cloudinary)

1. Admin selects images in the admin panel
2. Frontend sends images as `multipart/form-data` to the backend
3. **Multer** handles the incoming files in memory
4. Files are uploaded to **Cloudinary** via the Cloudinary SDK
5. Cloudinary returns a secure URL
6. The URL is saved in the product document in **MongoDB**

---

## 🎥 Video Upload Flow (YouTube Data API)

1. Admin selects a video in the admin panel
2. Frontend sends the video as `multipart/form-data` to the backend
3. **Multer** buffers the file
4. Backend uploads the video to **YouTube** using the YouTube Data API v3 (via `googleapis`)
5. YouTube returns a video ID / URL
6. The YouTube video link is saved in the product document in **MongoDB**

> 💡 This approach avoids storing large video files on the server or in cloud storage, keeping hosting costs minimal.

---

## 🔐 Authentication Flow

1. Admin sends credentials to `POST /api/auth/login`
2. Backend verifies username and password
3. On success, a signed **JWT** is returned and stored in an **HTTP-only cookie**
4. All protected routes check for a valid JWT via the `authMiddleware`
5. Admin can log out via `POST /api/auth/logout` which clears the cookie

---

## 🚀 Deployment (Render)

This backend is deployed on **Render** as a Web Service.

### Steps to Deploy on Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repository
4. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Add all variables from `.env`
5. Deploy

> 💡 Render's free tier spins down after inactivity. Consider upgrading for production use or adding a cron ping to keep it alive.

---

## 🌐 CORS Configuration

The API is configured to accept requests only from the Bagnest frontend origin:

```js
cors({
  origin: process.env.FRONTEND_URL, // e.g. https://bagnest.vercel.app
  credentials: true,                // Required for cookie-based auth
})
```

Add `FRONTEND_URL` to your `.env`:

```env
FRONTEND_URL=https://bagnest.vercel.app
```

---

## 🗄️ Database Schema — Product

```js
{
  name: String,           // Product name
  height: String,         // Height dimension
  width: String,          // Width dimension
  description: String,    // Additional attributes
  images: [String],       // Array of Cloudinary image URLs
  videos: [String],       // Array of YouTube video links
  createdAt: Date,
  updatedAt: Date,
}
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/Soham553)
- Built with ❤️ to support my sister's bag business 👜

---

_Bagnest Backend — Quietly powering every bag showcase._
