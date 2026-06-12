# Neurotrust: AI-Driven Zero Trust Architecture

Neurotrust is a full-stack Machine Learning application designed to perform dynamic, risk-based authentication. By analyzing behavioral and contextual anomalies (such as device type, location, login time, and failed attempts), the system utilizes a Random Forest model to calculate a real-time risk score and enforce Zero Trust security policies (ALLOW, MFA_REQUIRED, BLOCK).

## 🚀 Features
- **Machine Learning Pipeline**: End-to-end scikit-learn pipeline featuring a Random Forest Classifier optimized via GridSearchCV.
- **Explainable AI**: Model Insights dashboard providing feature importance and weight distributions to security administrators.
- **Modern UI**: A sleek, cyberpunk-inspired React frontend built with Vite, TailwindCSS, and Recharts.
- **RESTful API**: A Flask backend that handles ML inference and serves the production-ready React application.

## 📂 Project Structure
```text
Neurotrust/
├── data/
│   └── dataset.csv                 # Synthetically generated dataset (10,000 samples)
├── src/
│   ├── generate_dataset.py         # Script to synthesize training data
│   ├── preprocess.py               # Data loaders & sklearn preprocessors (StandardScaler, OneHotEncoder)
│   ├── train.py                    # GridSearchCV Random Forest training script
│   ├── evaluate.py                 # Evaluation metrics & Confusion Matrix generator
│   └── predict.py                  # Single-row inference logic
├── models/
│   └── pipeline.pkl                # Trained model artifact
├── app/
│   ├── app.py                      # Flask API Backend
│   ├── static/                     # Built React assets (CSS/JS)
│   └── templates/                  # Built React index.html
├── frontend/                       # React Source Code (Vite setup)
├── notebooks/
│   └── eda.ipynb                   # Jupyter Notebook for Data Analysis
├── reports/figures/
│   └── confusion_matrix.png        # Generated evaluation plots
├── requirements.txt                # Python dependencies
└── run.sh                          # Build and run script
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Neurotrust.git
   cd Neurotrust
   ```

2. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Install Node Dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## 🧠 Running the ML Pipeline

To generate the dataset, train the model, and evaluate it from scratch:

```bash
python src/generate_dataset.py
python -m src.train
python -m src.evaluate
```
This will automatically generate a `dataset.csv`, output the `pipeline.pkl` to the `models/` folder, and generate a confusion matrix in `reports/figures/`.

## 🖥️ Running the Full Application

You can use the provided bash script to build the frontend, train the model, and start the server:
```bash
./run.sh
```

**Or manually:**
1. Build the React frontend:
   ```bash
   cd frontend
   npm run build
   cd ..
   ```
2. Start the Flask server:
   ```bash
   python app/app.py
   ```
3. Navigate to `http://127.0.0.1:5000` in your web browser!

## 🎓 Academic / Portfolio Note
This project was designed as a comprehensive demonstration of deploying Machine Learning models into fully functional, full-stack software applications. It highlights competencies in ML architecture, API development, and modern frontend engineering.