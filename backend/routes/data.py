from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db, RunTimeSeriesData

router = APIRouter()

@router.get("/data/{run_id}")
def get_run_data(run_id: str, db: Session = Depends(get_db)):
    data = db.query(RunTimeSeriesData).filter(RunTimeSeriesData.run_id == run_id).all()
    return [{
        "time": d.time,
        "pH": d.pH,
        "Pump1": d.Pump1,
        "Pump2": d.Pump2,
        "Temperature": d.Temperature
    } for d in data]