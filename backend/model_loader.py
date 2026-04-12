import os
import pickle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")


def _load(name):
    return pickle.load(open(os.path.join(MODEL_DIR, name), "rb"))


unified_model = _load("unified_model.pkl")
vectorizer    = _load("vectorizer.pkl")
label_encoder = _load("label_encoder.pkl")
scaler        = _load("scaler.pkl")
model_meta    = _load("model_meta.pkl")