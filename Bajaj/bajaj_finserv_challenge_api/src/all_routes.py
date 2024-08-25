from fastapi import APIRouter

from src.routes.bfhl import router as bfhl

router = APIRouter()

router.include_router(bfhl)