from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, runs, data

app = FastAPI()

# Add CORS middleware
origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(upload.router)
app.include_router(runs.router)
app.include_router(data.router)