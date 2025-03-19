# Boston Bioprocess Viewer

## Overview

This project is a single-page web application that allows users to upload fermentation run CSV files, select pump options, and visualize the data using an interactive graph. The backend is powered by **FastAPI**, while the frontend uses **React (with Tailwind CSS and Plotly.js for visualization).**

## Features
- ✅ Upload fermentation run CSV files  
- ✅ Select Pump1 and Pump2 options (e.g., Glycerol, Base)  
- ✅ Store and retrieve data from a database (**SQLite**)  
- ✅ Generate interactive time-series visualizations  
- ✅ Backend API built using **FastAPI**

---

## Dockerized Setup
Run the app using Docker for easy deployment and scalability:
```bash
docker-compose up --build
```
This will launch both backend and frontend services in Docker containers.

---

## Installation

### Clone Repository
```bash
git clone https://github.com/RohanBokaria/RB_bbp.git
cd BostonBioprocessTakehome
```

### Backend Setup (FastAPI)
#### Install dependencies
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Run backend
```bash
uvicorn main:app --reload
```
Backend API accessible at **`http://127.0.0.1:8000`**  
API docs: `http://127.0.0.1:8000/docs`

---

### Frontend Setup (React + Tailwind)
#### Install dependencies
```bash
cd frontend
npm install
```

#### Run frontend
```bash
npm start
```
Frontend accessible at **`http://localhost:3000`**

---

## Usage Guide
1. **Upload a CSV file** containing fermentation run data.  
2. **Choose Pump1 and Pump2 options** from the dropdown.  
3. Click **Upload** to store the data in the database.  
4. **Select a Run ID** to generate interactive visualizations.

---

## Project Structure
```bash
BostonBioprocessTakehome
├── backend/
│   ├── main.py (FastAPI entry point)
│   ├── database.py (Database config)
│   ├── routes/ (API route definitions)
│   ├── services/ (Business logic and file processing)
│   ├── tests/ (Unit tests)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── test.db (SQLite database)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js (Main React component)
│   │   ├── api.js (API request handler)
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
├── docker-compose.yml
├── README.md

---