from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
import app.models, app.schemas

router = APIRouter(prefix="/employees", tags=["Employees"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_employee(emp: app.schemas.EmployeeCreate, db: Session = Depends(get_db)):
    if db.query(app.models.Employee).filter(app.models.Employee.employee_id == emp.employee_id).first():
        raise HTTPException(status_code=400, detail="Employee already exists")

    employee = app.models.Employee(**emp.dict())
    db.add(employee)
    db.commit()
    return employee

@router.get("/")
def list_employees(db: Session = Depends(get_db)):
    return db.query(app.models.Employee).all()

@router.delete("/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = db.query(app.models.Employee).filter_by(employee_id=employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted"}
