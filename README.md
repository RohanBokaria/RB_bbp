

# **Boston Bioprocess Viewer**  
#  
# ## **Overview**  
# This project is a single-page web application that allows users to upload fermentation run CSV files, select pump options, and visualize the data using an interactive graph. The backend is powered by **FastAPI**, while the frontend uses **React (with Tailwind CSS and Plotly.js for visualization).**  
#  
# ## **Features**  
# ✅ Upload fermentation run CSV files  
# ✅ Select Pump1 and Pump2 options (e.g., Glycerol, Base)  
# ✅ Store and retrieve data from a database (**SQLite**)  
# ✅ Generate interactive time-series visualizations  
# ✅ Backend API built using **FastAPI**  
# ✅ Frontend built using **React + TailwindCSS + Plotly.js**  
# ✅ **Dockerized** for deployment and scalability  
#  
# ---  
#  
# ## **Installation & Setup**  
#  
# ### **1. Clone the Repository**
# ```bash
# git clone https://github.com/RohanBokaria/RB_bbp.git
# cd BostonBioprocessTakehome
# ```
#  
# ### **2. Backend Setup (FastAPI)**
# #### Install dependencies  
# ```bash
# cd backend
# python3 -m venv venv
# source venv/bin/activate  # MacOS/Linux
# venv\Scripts\activate  # Windows
# pip install -r requirements.txt
# ```
# #### Run the backend server  
# ```bash
# uvicorn main:app --reload
# ```
# By default, the API runs at: **`http://127.0.0.1:8000`**  
# To test, open `http://127.0.0.1:8000/docs` in your browser.
#  
# ---  
#  
# ### **3. Frontend Setup (React + Tailwind)**
# #### Install dependencies  
# ```bash
# cd frontend
# npm install
# ```
# #### Run the frontend  
# ```bash
# npm start
# ```
# The app should now be accessible at **`http://localhost:3000`**  
#  
# ---  
#  
# ## **Usage Guide**  
# 1. **Upload a CSV file** containing fermentation run data.  
# 2. **Choose Pump1 and Pump2 options** from the dropdown.  
# 3. Click **Upload** to store the data in the database.  
# 4. **Select a Run ID** from the dropdown to visualize the data.  
#  
# ---  
#  
# ## **Testing**  
# To run backend tests:  
# ```bash
# cd backend
# pytest tests/
# ```
#  
# ---  
#  
# ## **Docker Deployment**  
# To build and run the application using Docker:  
# ```bash
# docker-compose up --build
# ```
# This will launch both the backend (FastAPI) and frontend (React) in a containerized environment.
#  
# ---  
#  
# ## **File Structure**  
# ```
# BostonBioprocessTakehome
# │── backend/
# │   ├── routes/ (API endpoints)
# │   ├── services/ (File processing logic)
# │   ├── tests/ (Unit tests)
# │   ├── database.py (DB connection)
# │   ├── main.py (FastAPI app entry point)
# │   ├── file_processor.py (CSV processing)
# │── frontend/
# │   ├── src/
# │   │   ├── App.js (Main React component)
# │   │   ├── api.js (Handles API requests)
# │   │   ├── index.js (Entry point for React)
# │   │   ├── index.css (Styling with Tailwind)
# │── docker/ (Docker configuration)
# │── test.db (SQLite database)
# │── README.md (Project documentation)
# ```