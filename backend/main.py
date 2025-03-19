from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, runs, data

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(upload.router)
app.include_router(runs.router)
app.include_router(data.router)