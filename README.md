# DocSpot - Modern Medical Appointment Platform

DocSpot is a comprehensive, full-stack MERN (MongoDB, Express, React, Node.js) web application designed to seamlessly connect patients with healthcare providers. The platform supports dedicated role-based portals for Patients, Doctors, and System Administrators, ensuring a secure and efficient healthcare management process.

## 🚀 Features

### For Patients
* **Find Specialists:** Browse a directory of verified, active medical professionals.
* **Book Appointments:** Securely book appointments selecting preferred dates and times.
* **Upload Medical Records:** Upload critical medical documents (PDF/PNG/JPG) directly to the doctor during the booking process.
* **Manage Appointments:** View upcoming schedules and easily cancel pending appointments.
* **Notifications (Upcoming):** Get alerted on status changes.

### For Doctors
* **Provider Dashboard:** A dedicated portal to view and manage all patient appointment requests.
* **Appointment Approvals:** Review patient details and uploaded medical documents to Approve, Reject, or Mark as Complete.
* **Profile Management:** Set medical specialization, experience, and consultancy fees.

### For Administrators
* **Verification System:** Review and approve pending doctor registrations before they appear in the public directory.
* **Platform Analytics:** Real-time metrics on total registered patients, approved doctors, and total platform appointments.

## 🛠️ Technology Stack

* **Frontend:** React.js, React Router DOM, Tailwind CSS, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JSON Web Tokens (JWT), bcryptjs for password hashing
* **File Processing:** Multer (for handling medical document uploads)

## 📦 Installation & Setup

### Prerequisites
* Node.js (v18 or higher recommended)
* MongoDB (Local instance or MongoDB Atlas cluster)

### 1. Clone & Setup
```bash
git clone <repository_url>
cd DocSpot
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following configuration:
```env
PORT=5000
DATABASE_URL=mongodb://127.0.0.1:27017/docspot
JWT_SECRET=your_super_secret_jwt_key
```
Finally, run the database seed script to generate demo users and run the server:
```bash
node seed.js
node index.js
```
*The backend server will run on `http://localhost:5000`.*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The React application will run on `http://localhost:5174` (or whatever port Vite assigns).*

## 🔐 Demo Credentials

The `seed.js` script automatically provisions the following accounts so you can immediately test the platform's role-based access controls:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | admin@docspot.com | `adminpassword` |
| **Doctor** | doctor@docspot.com | `doctorpassword` |
| **Patient** | patient@docspot.com | `patientpassword` |

## 📁 Directory Structure
```
DocSpot/
├── backend/                  # Node.js + Express API
│   ├── config/               # DB connection logic
│   ├── controllers/          # Route callback functions
│   ├── routes/               # API endpoints
│   ├── schemas/              # Mongoose Data Models
│   ├── uploads/              # Local storage for patient medical documents
│   ├── index.js              # Server Entrypoint
│   └── seed.js               # Database population script
└── frontend/                 # React Application
    ├── src/
    │   ├── components/
    │   │   ├── admin/        # Admin Dashboard Views
    │   │   ├── common/       # Login, Register, Landing Page
    │   │   ├── doctor/       # Doctor Provider Portal
    │   │   └── user/         # Patient Booking & Flow
    │   ├── App.jsx           # React Router mappings
    │   └── main.jsx          # React Entrypoint
    ├── index.html
    └── tailwind.config.js
```

## 🔒 Security Measures
* Auto-redirects enforce role verification (Unapproved doctors cannot log in).
* Passwords are never stored in plain text (bcrypt).
* Protected routes through UI logic to prevent unauthorized dashboard access.
