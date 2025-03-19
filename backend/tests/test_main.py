import os
import pytest
from fastapi.testclient import TestClient
from main import app  # Import the FastAPI app
from database import get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base  # Your SQLAlchemy models

# Create a test database
TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the database dependency in FastAPI to use the test DB
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Create test tables
Base.metadata.create_all(bind=engine)

client = TestClient(app)

@pytest.fixture(scope="module")
def test_client():
    return client

def test_upload_file(test_client):
    """Test uploading a CSV file."""
    file_path = "tests/sample_data.csv"  # Add a sample CSV file in tests/
    with open(file_path, "rb") as f:
        files = {"file": f}
        response = test_client.post("/upload/", files=files, data={"pump1_choice": "Glucose", "pump2_choice": "Base"})
    assert response.status_code == 200
    assert "File uploaded successfully" in response.json()["message"]

def test_get_runs(test_client):
    """Test fetching available run IDs."""
    response = test_client.get("/runs/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_run_data(test_client):
    """Test fetching run data by Run ID."""
    run_id = "R001002"  # Ensure this exists in the test DB after upload
    response = test_client.get(f"/data/{run_id}")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_invalid_run_data(test_client):
    """Test fetching data for an invalid Run ID."""
    response = test_client.get("/data/INVALID_ID")
    assert response.status_code == 404
    assert "Run ID not found" in response.json()["detail"]