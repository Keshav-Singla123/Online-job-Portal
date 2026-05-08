# JobSphere - Full-Stack Job Portal

A production-style MERN job platform where candidates discover opportunities and recruiters manage hiring workflows from a modern dashboard.

This project demonstrates end-to-end product thinking: authentication, role-based access, admin workflows, API design, state management, and deployment-ready architecture.

## Why This Project Stands Out

- Real business use-case: complete hiring pipeline from job posting to application tracking.
- Recruiter + candidate journeys implemented with role-based UI and API security.
- Clean modular structure for scalability and maintenance.
- Deployment-ready setup for Vercel (frontend + backend).
- Includes database seeding for instant demo.

## Core Features

### Candidate Experience

- Register/login with role support.
- Browse and search jobs.
- View complete job details.
- Apply to jobs and track applied jobs.
- Manage profile details and skills.

### Recruiter Experience

- Register/login as recruiter.
- Create and manage companies.
- Post jobs with requirements and metadata.
- View applicants for each posted job.
- Update applicant status.

### Platform Features

- JWT-based authentication with cookie sessions.
- Rate limiting for auth and protected routes.
- Role-specific workflows.
- Responsive React UI with reusable components.
- MongoDB persistence with Mongoose models.

## Tech Stack

### Frontend

- React 18 + Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- Radix UI primitives

### Backend

- Node.js
- Express.js
- Mongoose
- JWT + bcrypt
- Multer + Cloudinary integrations (for media workflows)

### Database

- MongoDB Atlas

## Project Structure

<details>
<summary>Click to expand full folder structure</summary>

```text
.
|- README.md
|- backend/
|  |- .env.example
|  |- app.js
|  |- index.js
|  |- package.json
|  |- package-lock.json
|  |- seed.js
|  |- server.js
|  |- vercel.json
|  |- api/
|  |  |- index.js
|  |- controllers/
|  |  |- application.controller.js
|  |  |- company.controller.js
|  |  |- job.controller.js
|  |  |- user.controller.js
|  |- middlewares/
|  |  |- isAuthenticated.js
|  |  |- mutler.js
|  |  |- rateLimit.js
|  |- models/
|  |  |- application.model.js
|  |  |- company.model.js
|  |  |- job.model.js
|  |  |- user.model.js
|  |- routes/
|  |  |- application.route.js
|  |  |- company.route.js
|  |  |- job.route.js
|  |  |- user.route.js
|  |- utils/
|     |- db.js
|- frontend/
|  |- .env.example
|  |- components.json
|  |- index.html
|  |- jsconfig.json
|  |- package.json
|  |- package-lock.json
|  |- postcss.config.js
|  |- tailwind.config.js
|  |- vite.config.js
|  |- vercel.json
|  |- public/
|  |- src/
|     |- App.css
|     |- App.jsx
|     |- index.css
|     |- main.jsx
|     |- components/
|     |  |- AppliedJobTable.jsx
|     |  |- Browse.jsx
|     |  |- CategoryCarousel.jsx
|     |  |- ErrorBoundary.jsx
|     |  |- FilterCard.jsx
|     |  |- HeroSection.jsx
|     |  |- Home.jsx
|     |  |- Job.jsx
|     |  |- JobDescription.jsx
|     |  |- Jobs.jsx
|     |  |- LatestJobCards.jsx
|     |  |- LatestJobs.jsx
|     |  |- Profile.jsx
|     |  |- UpdateProfileDialog.jsx
|     |  |- admin/
|     |  |  |- AdminJobs.jsx
|     |  |  |- AdminJobsTable.jsx
|     |  |  |- Applicants.jsx
|     |  |  |- ApplicantsTable.jsx
|     |  |  |- Companies.jsx
|     |  |  |- CompaniesTable.jsx
|     |  |  |- CompanyCreate.jsx
|     |  |  |- CompanySetup.jsx
|     |  |  |- PostJob.jsx
|     |  |  |- ProtectedRoute.jsx
|     |  |- auth/
|     |  |  |- Login.jsx
|     |  |  |- Signup.jsx
|     |  |- shared/
|     |  |  |- Footer.jsx
|     |  |  |- Navbar.jsx
|     |  |- ui/
|     |     |- avatar.jsx
|     |     |- badge.jsx
|     |     |- button.jsx
|     |     |- carousel.jsx
|     |     |- dialog.jsx
|     |     |- input.jsx
|     |     |- label.jsx
|     |     |- popover.jsx
|     |     |- radio-group.jsx
|     |     |- select.jsx
|     |     |- sonner.jsx
|     |     |- table.jsx
|     |- hooks/
|     |  |- useGetAllAdminJobs.jsx
|     |  |- useGetAllCompanies.jsx
|     |  |- useGetAllJobs.jsx
|     |  |- useGetAppliedJobs.jsx
|     |  |- useGetCompanyById.jsx
|     |- lib/
|     |  |- utils.js
|     |- redux/
|     |  |- applicationSlice.js
|     |  |- authSlice.js
|     |  |- companySlice.js
|     |  |- jobSlice.js
|     |  |- store.js
|     |- utils/
|        |- constant.js
```

</details>

## Local Setup

### 1) Clone and install

```bash
git clone https://github.com/Keshav-Singla123/Online-job-Portal.git
cd Online-job-Portal

cd backend
npm install

cd ../frontend
npm install
```

### 2) Configure environment variables

Backend file: `backend/.env`

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
NODE_ENV=development
SECRET_KEY=your_long_random_secret
FRONTEND_URL=http://localhost:5173
```

Frontend file: `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 3) Seed sample data (optional but recommended)

```bash
cd backend
node seed.js
```

This inserts sample recruiter, companies, and jobs so your UI looks complete immediately.

### 4) Run the app

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Open: `http://localhost:5173`

## Demo Credentials (After Seeding)

Recruiter account (seeded):

- Email: `recruiter@test.com`
- Password: `password123`

## Recruiter Review Notes

If you are evaluating this repository for hiring:

- The codebase shows practical full-stack architecture and role-based product design.
- API boundaries and UI concerns are separated cleanly.
- Project includes deploy-ready configuration and realistic user flows.

## Future Improvements

- Add automated tests (unit + integration).
- Add CI/CD with lint/test checks.
- Add analytics dashboard for recruiter KPIs.
- Introduce notifications and email workflows.

## Author

Keshav Singla


