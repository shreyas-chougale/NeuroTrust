#!/bin/bash
set -e

echo "=== Building Frontend ==="
cd frontend
npm install
npm run build
cd ..

echo "=== Training ML Model ==="
python src/generate_dataset.py
python -m src.train
python -m src.evaluate

echo "=== Starting Flask App ==="
python app/app.py
