# Deco Voice Dashboard - Setup & Run Guide

## Project Structure
```
Dashboard/
├── server/              # Express + PostgreSQL backend
│   ├── src/
│   │   ├── index.js        # Entry point
│   │   ├── db.js           # Prisma client
│   │   ├── middleware/     # Auth middleware
│   │   └── routes/         # API endpoints
│   ├── prisma/
│   │   └── schema.prisma   # DB schema
│   ├── package.json
│   └── .env.example
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── main.jsx        # Entry point
│   │   ├── App.jsx         # Router & layout
│   │   ├── App.css         # Styles
│   │   ├── api/            # API calls
│   │   └── pages/          # Page components
│   ├── index.html
│   └── package.json
└── README.md

## ✅ Installation Status
- ✓ Backend dependencies installed
- ✓ Frontend dependencies installed
- ⏳ Next: Configure PostgreSQL & environment variables

## 🔧 Configuration Steps

### 1. Set up PostgreSQL Database
Install PostgreSQL or use a cloud provider (e.g., Railway, Heroku)

### 2. Create `.env` file in `server/` directory
```
DATABASE_URL="postgresql://username:password@localhost:5432/decovoicedb?schema=public"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=4000
```

### 3. Run Prisma Migrations
```bash
cd server
npx prisma migrate dev --name init
```

## 🚀 Running the Project

### Terminal 1 - Start Backend Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:4000`

### Terminal 2 - Start Frontend Dev Server
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📋 User Flow

1. **Login Page** (`/login`)
   - Email/password login
   - Redirects to dashboard if already onboarded

2. **Signup Page** (`/signup`)
   - Create new account
   - After signup → Onboarding

3. **Onboarding Page** (`/onboarding`)
   - Collect user name
   - After onboarding → Dashboard

4. **Dashboard** (`/dashboard`)
   - Protected route (requires auth token)
   - Displays user profile
   - Logout button

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/login` | Login user |
| GET | `/api/user/profile` | Fetch user profile (protected) |
| POST | `/api/user/onboard` | Complete onboarding (protected) |

## 🛠 Available Scripts

**Backend:**
- `npm run dev` - Start server with hot reload (nodemon)
- `npm start` - Start server production mode
- `npx prisma migrate dev --name init` - Create DB migrations
- `npx prisma studio` - Open Prisma data viewer

**Frontend:**
- `npm run dev` - Start dev server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Tech Stack

**Backend:**
- Express.js - REST API framework
- Prisma - ORM for PostgreSQL
- PostgreSQL - Database
- jsonwebtoken - JWT auth
- bcryptjs - Password hashing
- Nodemon - Hot reload

**Frontend:**
- React - UI library
- React Router - Client-side routing
- Vite - Build tool & dev server
- CSS - Styling

## ⚠️ Important Notes

- Change `JWT_SECRET` to a strong random string in production
- Update `CORS_ORIGIN` in `server/src/index.js` for production domains
- Keep `.env` files in `.gitignore` - never commit secrets
- Before deploying, set `NODE_ENV=production`

## 🎨 Customization

Ready to integrate with your Figma design! Share the Figma link or screenshots, and I can:
- Update page layouts and styling
- Add new components
- Implement additional features
- Connect voice/audio features
- Add more API endpoints as needed
