from model_loader import model, vectorizer, label_encoder

def predict_disease(symptoms):
    # Clean input
    symptoms = symptoms.lower().strip()

    X = vectorizer.transform([symptoms])

    prediction = model.predict(X)
    probabilities = model.predict_proba(X)[0]

    disease = label_encoder.inverse_transform(prediction)[0]

    return disease, probabilities