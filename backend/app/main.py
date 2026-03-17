from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api import medications, users
from app.core.config import settings

app = FastAPI(
    title="API Farmácia",
    description="Sistema de gerenciamento de medicamentos",
    version=settings.VERSION,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Handler global de exceções
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Captura exceções não tratadas e retorna resposta padronizada"""
    if settings.DEBUG:
        return JSONResponse(
            status_code=500,
            content={"detail": str(exc), "type": type(exc).__name__}
        )
    return JSONResponse(
        status_code=500,
        content={"detail": "Erro interno do servidor"}
    )

# Inclui as rotas organizadas por arquivo
app.include_router(medications.router)
app.include_router(users.router)


@app.get("/")
def health_check():
    """Health check endpoint"""
    return {
        "status": "online",
        "environment": settings.ENVIRONMENT,
        "version": settings.VERSION
    }