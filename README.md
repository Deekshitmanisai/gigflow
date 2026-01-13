# 🚀 GigFlow - Freelance Marketplace Platform

GigFlow is a full-stack freelance marketplace where clients can post jobs (Gigs) and freelancers can bid on them. It features a secure authentication system, real-time bidding logic, and a premium user interface.

![GigFlow Hero](https://via.placeholder.com/1200x600?text=GigFlow+Platform)

## ✨ Features

### 🔐 Authentication & Security
*   **Secure Sign-up/Login**: Powered by JWT (JSON Web Tokens) and `bcryptjs`.
*   **HttpOnly Cookies**: Tokens are stored securely in cookies to prevent XSS attacks.
*   **Role-Based Access**: Fluid roles allow any user to both post gigs and apply for them.

### 💼 Gig Management
*   **Post a Job**: Clients can easily create new gigs with a title, description, and budget.
*   **Browse & Search**: Advanced search functionality to find relevant gigs by title.
*   **Real-time Status**: Gigs are marked as "Open" or "Assigned".

### 🤝 Bidding & Hiring System
*   **Place Bids**: Freelancers can submit proposals with a price and message.
*   **Review Proposals**: Clients can view all bids received for their gigs.
*   **Atomic Hiring Logic**:
    *   When a client hires a freelancer, the gig status updates to `Assigned`.
    *   The selected bid is marked `Hired`.
    *   **Auto-Rejection**: All other bids are automatically marked `Rejected`.

### 👤 User Profiles (Bonus)
*   **Profile Management**: Users can update their Bio, Skills, and Avatar.
*   **Visual Identity**: Custom avatars and skill tags displayed on profiles.

## 🛠️ Tech Stack

*   **Frontend**: React.js (Vite), Tailwind CSS, React Router v6
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB (Mongoose)
*   **State Management**: React Context API
*   **Authentication**: JWT, Cookie-Parser

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
*   Node.js (v14 or higher)
*   MongoDB (Local or Atlas URL)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/gigflow.git
cd gigflow
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create a .env file in the backend folder
echo "PORT=5000" > .env
echo "MONGO_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET=your_super_secret_key" >> .env

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start the React app
npm run dev
```

The app should now be running at `http://localhost:5173` (or 5174).

## 📚 API Documentation

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login user | Public |
| `GET` | `/api/gigs` | Get all gigs (supports `?search=`) | Public |
| `POST` | `/api/gigs` | Create a new gig | Protected |
| `POST` | `/api/bids` | Place a bid on a gig | Protected |
| `GET` | `/api/bids/gig/:id` | Get bids for a specific gig | Owner Only |
| `PATCH` | `/api/bids/:id/hire` | Hire a freelancer | Owner Only |
| `GET` | `/api/users/me` | Get current user profile | Protected |

## 🧪 Running Tests
We have included a manual testing guide in `testing_guide.md` to verify all workflows, including the complex hiring and rejection logic.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
