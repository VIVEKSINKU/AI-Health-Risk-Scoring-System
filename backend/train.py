import os
import pickle
import warnings
import numpy as np
import pandas as pd
from scipy.sparse import hstack, csr_matrix
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

warnings.filterwarnings("ignore")

BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
DATASETS  = os.path.join(BASE_DIR, "..", "datasets")
MODEL_DIR = os.path.join(BASE_DIR, "model")
os.makedirs(MODEL_DIR, exist_ok=True)


def save(obj, name):
    path = os.path.join(MODEL_DIR, name)
    with open(path, "wb") as f:
        pickle.dump(obj, f)
    print(f"  [OK] Saved {name}")

print("\n[1/5] Loading dataset ...")

df = pd.read_csv(os.path.join(DATASETS, "symtoms_df.csv"))
sym_cols = [c for c in df.columns if c.lower().startswith("symptom")]
df["symptoms"] = df[sym_cols].apply(
    lambda r: ', '.join(r.dropna().astype(str).str.strip()), axis=1
)
df = df.rename(columns={"Disease": "disease"})
df = df[["symptoms", "disease"]].dropna()
print(f"  symtoms_df.csv: {len(df)} rows, {df['disease'].nunique()} diseases")

print("\n[2/5] Cleaning dataset ...")

df["disease"]  = df["disease"].str.strip()
df["symptoms"] = df["symptoms"].astype(str).str.lower().str.strip()
df["symptoms"] = df["symptoms"].str.replace("_", " ", regex=False)
df["symptoms"] = df["symptoms"].str.replace(r"\s+", " ", regex=True)

print(f"  Diseases: {df['disease'].nunique()}")
print(f"  Rows:     {len(df)}")
for disease, count in df["disease"].value_counts().head(10).items():
    print(f"    {disease:30s} : {count}")


print("\n[3/5] Building features ...")
vectorizer = TfidfVectorizer(
    ngram_range=(1, 2),       
    max_features=5000,
    sublinear_tf=True,
    min_df=2,
    strip_accents="unicode"
)
X_tfidf = vectorizer.fit_transform(df["symptoms"])
print(f"  TF-IDF shape: {X_tfidf.shape}")

np.random.seed(42)
n = len(df)
numeric_data = np.column_stack([
    np.random.normal(45, 15, n).clip(1, 100),     
    np.random.choice([0.0, 1.0], n),               
    np.random.normal(25, 4, n).clip(15, 45),       
    np.random.normal(7, 1.5, n).clip(2, 12),       
    np.random.uniform(0, 1, n),                     
])
numeric_cols = ["age_clean", "gender_enc", "bmi_clean", "sleep_clean", "diet_clean"]

scaler = StandardScaler()
X_numeric_scaled = scaler.fit_transform(numeric_data)
X_numeric_sparse = csr_matrix(X_numeric_scaled)

X_combined = hstack([X_tfidf, X_numeric_sparse])
print(f"  Combined feature shape: {X_combined.shape}")

le = LabelEncoder()
y = le.fit_transform(df["disease"])
print(f"  Number of classes: {len(le.classes_)}")

print("\n[4/5] Training unified model (LinearSVC + CalibratedCV) ...")

X_tr, X_te, y_tr, y_te = train_test_split(
    X_combined, y, test_size=0.2, random_state=42, stratify=y
)

base_svc = LinearSVC(max_iter=10000, C=1.0, class_weight="balanced")
model = CalibratedClassifierCV(base_svc, cv=3)
model.fit(X_tr, y_tr)

y_pred = model.predict(X_te)
acc = accuracy_score(y_te, y_pred)
print(f"  Test Accuracy: {acc*100:.2f}%")

print(f"\n  Classification Report:")
report = classification_report(y_te, y_pred, target_names=le.classes_, zero_division=0)
for line in report.split("\n"):
    print(f"    {line}")


print("\n[5/5] Saving model artifacts ...")

save(model,      "unified_model.pkl")
save(vectorizer, "vectorizer.pkl")
save(le,         "label_encoder.pkl")
save(scaler,     "scaler.pkl")

meta = {
    "numeric_features": numeric_cols,
    "num_diseases": len(le.classes_),
    "diseases": list(le.classes_),
    "test_accuracy": round(acc * 100, 2),
    "dataset_size": len(df),
    "tfidf_features": X_tfidf.shape[1],
    "model_type": "LinearSVC + CalibratedCV",
}
save(meta, "model_meta.pkl")

print(f"\nDone! Unified model trained on {len(df)} rows, {len(le.classes_)} diseases.")
print(f"Test accuracy: {acc*100:.2f}%")
print("All artifacts saved to backend/model/")
