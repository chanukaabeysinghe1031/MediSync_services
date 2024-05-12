from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from drugsData import get_interaction_level

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class drugs(BaseModel):
    drugA: str
    drugB: str


@app.post("/ddi_checker")
def ddi_checker(drugs: drugs):
    try:
        interaction_level = get_interaction_level(
            drugs.drugA, drugs.drugB)
        return {"interaction_level": interaction_level}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
