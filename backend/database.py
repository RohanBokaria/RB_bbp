from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class RunClient(Base):
    __tablename__ = "run_client"
    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(String, unique=True, index=True)
    client_name = Column(String)
    pump1_choice = Column(String)
    pump2_choice = Column(String)

class RunTimeSeriesData(Base):
    __tablename__ = "run_time_series_data"
    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(String, ForeignKey("run_client.run_id"))
    time = Column(Float)
    pH = Column(Float)
    Pump1 = Column(String)
    Pump2 = Column(String)
    Temperature = Column(Float)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()