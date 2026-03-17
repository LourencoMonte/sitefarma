from pydantic import BaseModel, EmailStr
from typing import Optional

class MedicationCreate(BaseModel):
    name: str
    laboratory: str
    dosage: str
    quantity: int
    price: float
    description: Optional[str] = None
    available: bool = True

class MedicationUpdate(BaseModel):
    name: Optional[str] = None
    laboratory: Optional[str] = None
    dosage: Optional[str] = None
    quantity: Optional[int] = None
    price: Optional[float] = None
    description: Optional[str] = None
    available: Optional[bool] = None
