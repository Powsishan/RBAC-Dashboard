 RBAC-Dashboard

RBAC-Dashboard is a full-stack web application that provides role-based access control (RBAC) for managing tasks and users. It consists of two main components: a **backend** built with **Node.js** and **MongoDB**, and a **frontend** built with **React.js**.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Project Structure

The project consists of two main directories:

- **backend/**: Contains the backend API built with Node.js and MongoDB.
- **frontend/**: Contains the frontend built with React.js.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14.x or higher) - [Install Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) or **yarn**
- **MongoDB** - Make sure you have MongoDB installed locally or use a cloud provider like MongoDB Atlas.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Powsishan/RBAC-Dashboard.git
cd RBAC-Dashboard
2. Backend Setup
Navigate to the backend directory and install dependencies:

bash

cd backend
npm install
3. Frontend Setup
Navigate to the frontend directory and install dependencies:

bash

cd ../frontend
npm install
Running the Application
1. Start the Backend
In the backend/ directory, run the backend server:

bash

npm run dev
The backend will run on http://localhost:4000.

2. Start the Frontend
In the frontend/ directory, run the frontend development server:

bash

npm start
The frontend will be available at http://localhost:3000. It is configured to proxy requests to the backend API running on port 4000.

Environment Variables
To run the application, you need to set up environment variables for both the backend and frontend.

Backend (backend/.env)
plaintext

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWTPRIVATEKEY=mysecretkey123
Frontend (frontend/.env)
plaintext

REACT_APP_API_URL=http://localhost:4000/api
Scripts
The following scripts are available:

Backend
npm start: Starts the backend server.
npm run dev: Starts the backend server in development mode using nodemon.
Frontend
npm start: Runs the frontend in development mode.
npm run build: Builds the frontend for production.
npm test: Runs tests in the frontend.
Dependencies
Backend
bcrypt: For password hashing.
cors: For handling Cross-Origin Resource Sharing.
dotenv: For managing environment variables.
express: For building the web server.
joi: For validation.
jsonwebtoken: For authentication with JWT.
mongodb: MongoDB driver for connecting to the database.
mongoose: MongoDB ODM for managing data schemas.
nodemon: For automatically restarting the backend during development.
Frontend
axios: For making HTTP requests to the backend API.
jwt-decode: For decoding JSON Web Tokens.
react: JavaScript library for building user interfaces.
react-dom: DOM-specific methods for React.
react-router-dom: For client-side routing.
react-toastify: For notifications and alerts.
tailwindcss: Utility-first CSS framework for styling components.
License
This project is licensed under the ISC License.

ruby


### Steps to Install Necessary Packages

Before running the application, ensure you install the required dependencies by running the following commands:

- For the **backend**:
  ```bash
  cd backend
  npm install
For the frontend:
bash

cd ../frontend
npm install
