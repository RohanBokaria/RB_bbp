from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
from database import get_db, RunClient
from services.file_processor import process_csv

router = APIRouter()

@router.post("/upload/")
async def upload_file(
    file: UploadFile = File(...),
    pump1_choice: str = Form(...),
    pump2_choice: str = Form(...),
    db: Session = Depends(get_db)
):
    return await process_csv(file, pump1_choice, pump2_choice, db)