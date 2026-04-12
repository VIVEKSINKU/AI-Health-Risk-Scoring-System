
import os
import pickle
import warnings
import numpy as np
import pandas as pd
from scipy.sparse import hstack, csr_matrix
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

warnings.filterwarnings("ignore")

BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
DATASETS  = os.path.join(BASE_DIR, "..", "datasets")
MODEL_DIR = os.path.join(BASE_DIR, "model")


def load_pkl(name):
    with open(os.path.join(MODEL_DIR, name), "rb") as f:
        return pickle.load(f)

print("Loading unified model artifacts...")
model      = load_pkl("unified_model.pkl")
vectorizer = load_pkl("vectorizer.pkl")
le         = load_pkl("label_encoder.pkl")
scaler     = load_pkl("scaler.pkl")
meta       = load_pkl("model_meta.pkl")

print("=" * 70)
print("       UNIFIED MODEL ACCURACY EVALUATION REPORT")
print("=" * 70)
print(f"  Model type       : {meta['model_type']}")
print(f"  Diseases          : {meta['num_diseases']}")
print(f"  Dataset size      : {meta['dataset_size']} rows")
print(f"  TF-IDF features   : {meta['tfidf_features']}")
print(f"  Numeric features  : {len(meta['numeric_features'])} ({', '.join(meta['numeric_features'])})")


print("\n[1/2] Rebuilding dataset and features ...")

df = pd.read_csv(os.path.join(DATASETS, "symtoms_df.csv"))
sym_cols = [c for c in df.columns if c.lower().startswith("symptom")]
df["symptoms"] = df[sym_cols].apply(
    lambda r: ', '.join(r.dropna().astype(str).str.strip()), axis=1
)
df = df.rename(columns={"Disease": "disease"})
df = df[["symptoms", "disease"]].dropna()
df["disease"]  = df["disease"].str.strip()
df["symptoms"] = df["symptoms"].astype(str).str.lower().str.strip()
df["symptoms"] = df["symptoms"].str.replace("_", " ", regex=False)
df["symptoms"] = df["symptoms"].str.replace(r"\s+", " ", regex=True)

X_tfidf = vectorizer.transform(df["symptoms"])

np.random.seed(42)
n = len(df)
numeric_data = np.column_stack([
    np.random.normal(45, 15, n).clip(1, 100),
    np.random.choice([0.0, 1.0], n),
    np.random.normal(25, 4, n).clip(15, 45),
    np.random.normal(7, 1.5, n).clip(2, 12),
    np.random.uniform(0, 1, n),
])
X_numeric_scaled = scaler.transform(numeric_data)
X_numeric_sparse = csr_matrix(X_numeric_scaled)

X_combined = hstack([X_tfidf, X_numeric_sparse])
y = le.transform(df["disease"])


print("\n[2/2] Evaluating on test set ...")

X_tr, X_te, y_tr, y_te = train_test_split(
    X_combined, y, test_size=0.2, random_state=42, stratify=y
)

y_pred = model.predict(X_te)
acc = accuracy_score(y_te, y_pred)

print(f"\n  Test set size    : {len(y_te)}")
print(f"  [OK] Accuracy    : {acc*100:.2f}%")

print(f"\n  Classification Report (all {meta['num_diseases']} diseases):")
report = classification_report(y_te, y_pred, target_names=le.classes_, zero_division=0)
for line in report.split("\n"):
    print(f"    {line}")
print("\n" + "=" * 70)
print("       SUMMARY")
print("=" * 70)
print(f"  Model                : {meta['model_type']}")
print(f"  Diseases             : {meta['num_diseases']}")
print(f"  Dataset              : {meta['dataset_size']} rows (symtoms_df.csv)")
print(f"  Overall Accuracy     : {acc*100:.2f}%")
print("=" * 70)
