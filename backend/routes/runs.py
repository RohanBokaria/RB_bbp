from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db, RunClient

router = APIRouter()

@router.get("/runs/")
def get_runs(db: Session = Depends(get_db)):
    runs = db.query(RunClient).all()
    return [{
        "run_id": run.run_id,
        "client_name": run.client_name,
        "pump1_choice": run.pump1_choice,
        "pump2_choice": run.pump2_choice
    } for run in runs]