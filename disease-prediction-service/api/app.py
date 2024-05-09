from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from utils import predictDiseaseUsingSymptoms

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class symptoms(BaseModel):
    symptomsList: str


@app.post("/predictDiseaseFromSymptoms")
def predictDiseaseFromSymptoms(symptomsList: symptoms):
    try:
        predictions = predictDiseaseUsingSymptoms(symptomsList.symptoms)
        return {"predicted_disease": predictions["final_prediction"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# uvicorn app:app --reload
