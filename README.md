#
<div align="center">
<a href="https://twitter.com/randysetiawn"><img src="https://img.shields.io/twitter/follow/randysetiawn.svg?style=social"/></a>
<a href="https://github.com/randysetiawanh"><img src="https://img.shields.io/github/followers/randysetiawanh?label=Follow%20randysetiawanh&style=social"/></a>
<br>

<a href="https://github.com/randysetiawanh/edukita-test/stargazers"><img src="https://img.shields.io/github/stars/randysetiawanh/edukita-test" alt="Stars Badge"/></a>
<a href="https://github.com/randysetiawanh/edukita-test/network/members"><img src="https://img.shields.io/github/forks/randysetiawanh/edukita-test" alt="Forks Badge"/></a>
<a href="https://github.com/randysetiawanh/edukita-test/pulls"><img src="https://img.shields.io/github/issues-pr/randysetiawanh/edukita-test" alt="Pull Requests Badge"/></a>
<a href="https://github.com/randysetiawanh/edukita-test/issues"><img src="https://img.shields.io/github/issues/randysetiawanh/edukita-test" alt="Issues Badge"/></a>
<a href="https://github.com/randysetiawanh/edukita-test/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/randysetiawanh/edukita-test?color=2b9348"></a>

<i>Loved the project? Please consider <a href="https://paypal.me/randysetiawanh">donating</a> to help it improve!</i>
#
</div>

# Edukita – Fullstack Assignment

A comprehensive fullstack application for teachers and students to:
- Submit assignments
- Grade assignments
- View feedback and scores

Built using:
- **Frontend:** React.js, Tailwind CSS, shadcn/ui, Zustand, MDEditor
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL, Prisma ORM
- **Authentication:** JWT
- **Logging:** Winston
- **AI Feedback:** OpenRouter.ai integration

---

## 📁 Project Structure

```
edukita-test/
├── backend/    # Express.js + TypeScript backend
├── frontend/   # React.js + TypeScript frontend
├── postman/    # Postman Collection for API
├── README.md   # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/randysetiawanh/edukita-test.git
cd edukita-test
```

### 2. Setup Environment Variables

- Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/edukita_test"
JWT_SECRET="your_secret_here"
JWT_EXPIRES_IN="1d"
AUTH_INTERNAL_PASSWORD="your_internal_password"
```

- Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL="backend api url base, ex : http://localhost:10101/api"
VITE_OPENROUTER_API_KEY="generate api key from https://openrouter.ai/keys"
VITE_OPENROUTER_MODEL=openai/gpt-3.5-turbo-0613 # Module in OpenRouter.ai
```

---

## 📦 Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

The backend will run at: `http://localhost:10101`

### ✅ Backend Features Implemented
- User creation, assignment submission, and grading endpoints
- Role-based access control (student/teacher)
- JWT-based authentication
- Internal & frontend login support
- Logging with Winston
- AI Feedback logic (rule-based + OpenRouter.ai-ready)

---

## 🖥️ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run at: `http://localhost:3000`

### ✅ Frontend Features Implemented
- Student Pages: Login, Submit Assignments, View Grades
- Teacher Pages: View Assignments, Give Grades & Feedback (AI-assisted)
- Markdown editor integration for submissions
- Zustand for state persistence + role-based route protection
- Visual feedback (status colors, loading states, etc.)

---

## 🔐 Authentication Flow

1. Register via `POST /api/users/store` to get token.
2. Login with either:
   - Internal login (`POST /api/auth/login`) with `userId` + internal password
   - Frontend login (`POST /api/auth/frontend-login`) with email + password
3. Include JWT token in headers for further requests:

```http
Authorization: Bearer <token>
```

---

## 🛠 Key API Endpoints

### 🧑 Users
- `POST /api/users/store` – Register user
- `POST /api/auth/login` – Login via internal ID
- `POST /api/auth/frontend-login` – Login via email & password

### 📝 Assignments
- `POST /api/assignment/store` – Submit assignment
- `GET /api/assignment/list?id=...` – Filter by assignment ID
- `GET /api/assignment/list?studentId=...` – Filter by student ID
- `GET /api/assignment/list?subject=...` – Filter by subject

### 🏁 Grades
- `POST /api/grades/store` – Submit grade + feedback
- `GET /api/grades/list/:studentId` – View student grades

---

## 🤖 Bonus Features
- AI Feedback using OpenRouter.ai
- Sticky & clean Navbar
- Alert/toast with basic `alert()`
- Zustand session persistence with auto redirect
- Markdown support with MDEditor
- Color-coded grade status

---

## 📬 Postman Collection

To test the API easily:
- [Download Collection](./postman/Edukita.postman_collection.json)
- [Download Environment](./postman/Edukita%20Local.postman_environment.json)

### Steps:
1. Import collection & environment to Postman
2. Set environment to "Edukita Local"
3. Use API endpoints with correct tokens

---

## ✅ Tech Requirements
- Node.js v18+
- PostgreSQL (local or remote)
- Git

---

## 👨‍💻 Author
**Randy Setiawan Hoesin**  
GitHub: [https://github.com/randysetiawanh](https://github.com/randysetiawanh)

