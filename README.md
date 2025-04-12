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
- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL + Prisma
- **Authentication:** JWT
- **Logging:** Winston

---

## 📁 Project Structure

```
edukita-test/
├── backend/    # Express.js + TypeScript backend
├── frontend/   # React.js frontend
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

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/edukita_test"
JWT_SECRET="your_secret_here"
JWT_EXPIRES_IN="1d"
AUTH_INTERNAL_PASSWORD="your_internal_password"
```

- Replace `your_password` with your PostgreSQL password.
- Replace `JWT_SECRET` with your randomly password.
- Replace `AUTH_INTERNAL_PASSWORD` with your password.

---

## 📦 Backend Setup

Navigate to the `backend/` directory:

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Run Database Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Seed Dummy Data (Optional)

```bash
npm run seed
```

This will generate:
- 1 teacher, 2 students
- 2 assignments
- 1 graded assignment

### Start the Backend Server

```bash
npm run dev
```

The server will run at: `http://localhost:10101`

---

<!--## 🖥️ Frontend Setup-->

<!--Navigate to the `frontend/` directory:-->

<!--```bash-->
<!--cd ../frontend-->
<!--```-->

<!--### Install Dependencies-->

<!--```bash-->
<!--npm install-->
<!--```-->

<!--### Start the Frontend Server-->

<!--```bash-->
<!--npm start-->
<!--```-->

<!--The application will run at: `http://localhost:3000`-->

<!------->

## 🔐 Authentication Flow

1. Register a user via `POST /api/users/store`, copy token after created.
2. Login internally using `POST /api/auth/login`, if you need generate new token with:
   ```json
   {
     "userId": "<uuid>",
     "password": "<AUTH_INTERNAL_PASSWORD>"
   }
   ```
3. Store the JWT token and include it in the header:
   ```
   Authorization: Bearer <token>
   ```

---

## 🛠 Key Endpoints

### 🧑 User
- `POST /api/users/store` – Create a new user (student/teacher)
- `POST /api/auth/login` – Internal login using userId + internal password

### 📝 Assignments
- `POST /api/assignment/store` – Submit an assignment (student)
- `GET /api/assignment/list?subject=ENGLISH` – View assignment list

### 🏁 Grades
- `POST /api/grades/store` – Submit grade and feedback (teacher)
- `GET /api/grades/list/:studentId` – View grades (student)

---

## 📬 Postman Collection

To try the API directly:

- [Download Collection](./postman/Edukita.postman_collection.json)
- [Download Environment](./postman/Edukita%20Local.postman_environment.json)

**Quick steps:**
1. Open Postman
2. Import both files
3. Select the Edukita Local environment
4. Execute each request as needed

---

## ✅ Requirements
- Node.js 18+
- PostgreSQL (local or cloud)
- Git

---

## 🤖 Optional Features
- Auto-logging via Winston (to `logs/`)
- Role-based middleware (`authenticate`, `requireRole`)
<!--- Dummy AI feedback ready for frontend integration-->

---

## 👨‍💻 Author
**Randy Setiawan Hoesin**  
GitHub: [https://github.com/randysetiawanh](https://github.com/randysetiawanh)
