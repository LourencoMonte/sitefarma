from pydantic import BaseModel, EmailStr
from typing import Optional, Literal

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    perfil: Literal['admin', 'user'] = 'user'

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    perfil: Optional[Literal['admin', 'user']] = None