from collections import Counter
import numpy as np
from joblib import load

from model_helper_indexes import symptom_index, predictions_classes

disease_prediction_rf_model = load(
    "../models/disease_prediction_rf_model.joblib")
disease_prediction_nb_model = load(
    "../models/disease_prediction_nb_model.joblib")
disease_prediction_svm_model = load(
    "../models/disease_prediction_svm_model.joblib")


def predictDiseaseUsingSymptoms(symptoms):
    symptoms = symptoms.split(",")

    input_data = [0]*len(symptom_index)
    for symptom in symptoms:
        symptom = symptom.strip()
        if symptom in symptom_index:
            index = symptom_index[symptom]
            input_data[index] = 1
        else:
            print(f"Warning: Symptom '{symptom}' not recognized.")

    input_data = np.array(input_data).reshape(1, -1)

    rf_prediction_index = disease_prediction_rf_model.predict(input_data)[0]
    nb_prediction_index = disease_prediction_nb_model.predict(input_data)[0]
    svm_prediction_index = disease_prediction_svm_model.predict(input_data)[0]

    rf_prediction = predictions_classes[rf_prediction_index]
    nb_prediction = predictions_classes[nb_prediction_index]
    svm_prediction = predictions_classes[svm_prediction_index]

    preiction_list = [rf_prediction, nb_prediction, svm_prediction]

    final_prediction = Counter(preiction_list).most_common(1)[0][0]

    predictions = {
        "rf_model_prediction": rf_prediction,
        "naive_bayes_prediction": nb_prediction,
        "svm_model_prediction": svm_prediction,
        "final_prediction": final_prediction
    }
    print("predictions: ", predictions)
    return predictions


predictDiseaseUsingSymptoms("Itching,Skin Rash,Nodal Skin Eruptions")
