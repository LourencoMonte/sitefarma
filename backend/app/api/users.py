from fastapi import APIRouter, HTTPException, Depends
from app.core.config import supabase
from app.schemas.user_schema import UserCreate, ProfileUpdate
from app.core.security import get_current_user, require_admin

router = APIRouter(prefix="/users", tags=["Usuários"])

@router.post("/signup", status_code=201)
def signup(payload: UserCreate):
    """Cria um novo usuário - Acesso público"""
    try:
        auth_res = supabase.auth.admin.create_user({
            "email": payload.email,
            "password": payload.password,
            "user_metadata": {"name": payload.name},
            "email_confirm": True
        })
        
        # Se for admin, atualizamos o perfil (que por padrão o trigger cria como 'user')
        if payload.perfil == 'admin':
            supabase.table("profiles").update({"perfil": "admin"}).eq("id", auth_res.user.id).execute()
            
        return {"id": auth_res.user.id, "message": "Usuário criado com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Erro ao criar usuário")

@router.get("/")
def list_profiles(user = Depends(require_admin)):
    """Lista todos os perfis - Requer Admin"""
    response = supabase.table("profiles").select("*").execute()
    return response.data

@router.get("/me")
def get_my_profile(user = Depends(get_current_user)):
    """Retorna o perfil do usuário autenticado"""
    response = supabase.table("profiles").select("*").eq("id", user.id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Perfil não encontrado")
    return response.data

@router.get("/{user_id}")
def get_profile(user_id: str, user = Depends(get_current_user)):
    """Busca um perfil por ID - Requer autenticação"""
    response = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return response.data

@router.delete("/{user_id}")
def delete_user(user_id: str, user = Depends(require_admin)):
    """Deleta um usuário - Requer Admin"""
    try:
        supabase.auth.admin.delete_user(user_id)
        return {"message": "Usuário deletado com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Erro ao deletar usuário")