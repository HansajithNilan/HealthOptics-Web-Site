# HealthOptics Web Application

## Overview
HealthOptics is a comprehensive web application for optical healthcare services, built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features
- User Authentication & Authorization
- Doctor Appointment Management
- Spectacle Reservation System
- User Feedback System
- Admin Dashboard
- Responsive Design

## Tech Stack
### Frontend
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- React Icons
- JSPdf

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt
- Nodemailer

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
bash
git clone https://github.com/yourusername/HealthOptics-Web-Site.git
cd HealthOptics-Web-Site


2. Install Backend Dependencies
bash
npm install


3. Install Frontend Dependencies
bash
cd Frontend
npm install


4. Create .env file in root directory and add:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


### Running the Application

1. Start Backend Server
bash
npm run dev


2. Start Frontend Development Server
bash
cd Frontend
npm run dev


## Project Structure

HealthOptics-Web-Site/
├── Backend/
│   ├── config/
│   ├── Controllers/
│   ├── middlewares/
│   ├── models/
│   ├── Routes/
│   └── server.js
├── Frontend/
│   ├── src/
│   ├── public/
│   └── index.html
└── README.md


## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the ISC License.

## Authors
- [Your Name]
- [Team Members]

