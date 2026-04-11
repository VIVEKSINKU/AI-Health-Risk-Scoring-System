import os
import pandas as pd

# Get current file directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Go to project root
ROOT_DIR = os.path.dirname(BASE_DIR)

# Build clean path
data_path = os.path.join(ROOT_DIR, "data", "Healthcare.csv")

# Load dataset
data = pd.read_csv(data_path)