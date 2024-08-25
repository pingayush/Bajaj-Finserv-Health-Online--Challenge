from datetime import datetime
from fastapi import FastAPI, Request
from starlette.staticfiles import StaticFiles
from uvicorn import run
from starlette.middleware.cors import CORSMiddleware
from src.all_routes import router
from fastapi.templating import Jinja2Templates

app = FastAPI(
    title="Bajaj Finserv Challenge"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)
app.include_router(router)

if __name__ == "__main__" or __name__ == "__BajajFinservChallenge__":
    run("main:app", host="0.0.0.0", port=7878, reload=True)
