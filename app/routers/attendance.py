from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
import app.models, app.schemas

router = APIRouter(prefix="/attendance", tags=["Attendance"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def mark_attendance(att: app.schemas.AttendanceCreate, db: Session = Depends(get_db)):
    record = app.models.Attendance(**att.dict())
    db.add(record)
    db.commit()
    return record

@router.get("/{employee_id}")
def view_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(app.models.Attendance).filter_by(employee_id=employee_id).all()
