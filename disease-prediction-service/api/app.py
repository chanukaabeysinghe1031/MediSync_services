from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from utils import predictDiseaseUsingSymptoms, recommendDocotr

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class symptoms(BaseModel):
    symptoms: str


class disease(BaseModel):
    disease: str


@app.post("/predictDiseaseFromSymptoms")
def predictDiseaseFromSymptoms(symptomsList: symptoms):
    try:
        predictions = predictDiseaseUsingSymptoms(symptomsList.symptoms)
        return {"predicted_disease": predictions["final_prediction"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/recommendDoctor/disease")
def recommendDrWithDisease(disease: disease):
    try:
        doctor = recommendDocotr(disease.disease)
        return {"doctor": doctor}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/recommendDoctor/symptoms")
def recommendDrWithSymptoms(symptoms: symptoms):
    try:
        predictions = predictDiseaseUsingSymptoms(symptoms.symptoms)
        doctor = recommendDocotr(predictions["final_prediction"])
        return {"doctor": doctor}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
