# 🧠 NeuroSpeech AI

**AI-Powered Dysarthria Detection and Speech Analysis Platform**

NeuroSpeech AI is a full-stack machine learning application that performs automatic dysarthria detection and severity classification from speech signals using **HuBERT embeddings** and **CatBoost classifiers**. The platform provides real-time audio analysis, advanced speech visualizations, and an interactive web dashboard.

---

## 🚀 Features

* 🎤 Real-time WAV audio upload and analysis
* 🤖 Dysarthria detection using HuBERT + CatBoost
* 📊 Severity classification (Mild / Moderate / Severe)
* 📈 Waveform visualization
* 🔥 Spectrogram heatmap generation
* 📉 PCA embedding visualization
* 🌌 t-SNE embedding visualization
* 🎵 Dataset Explorer with audio playback
* ⚡ RESTful API with FastAPI
* 🐳 Dockerized frontend and backend
* 🔄 CI/CD using GitHub Actions
* ☁️ Cloud deployment with Railway

---

## 🏗️ System Architecture

```text
                 Audio Input
                      │
                      ▼
               HuBERT Encoder
                      │
                      ▼
            Feature Embedding
                      │
                      ▼
            CatBoost Classifier
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
  Dysarthria Detection     Severity Prediction
          │                       │
          └───────────┬───────────┘
                      ▼
           Interactive Dashboard
       (Waveform • Spectrogram • PCA • t-SNE)
```

---

## 🛠️ Tech Stack

### Backend

* FastAPI
* Python
* PyTorch
* Transformers (HuBERT)
* CatBoost
* Librosa
* NumPy
* SciPy
* Scikit-learn

### Frontend

* React.js
* Tailwind CSS
* Recharts
* Axios

### DevOps & Deployment

* Docker
* Docker Compose
* GitHub Actions
* Railway
* Git & GitHub

---

## 📂 Project Structure

```text
NeuroSpeech-AI/
│
├── backend/
│   ├── main.py
│   ├── models/
│   ├── samples/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── docker.yml
│
└── docker-compose.yml
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/Hari-0509/NeuroSpeech-AI.git

cd NeuroSpeech-AI
```

### Run with Docker

```bash
docker-compose up --build
```

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm start
```

---

## 📡 API Endpoints

| Endpoint                    | Description                       |
| --------------------------- | --------------------------------- |
| `/predict`                  | Predict uploaded audio            |
| `/advanced-analysis`        | Full speech analysis              |
| `/samples`                  | List available dataset samples    |
| `/sample-predict`           | Predict sample audio              |
| `/sample-advanced-analysis` | Advanced sample analysis          |
| `/audio-analysis`           | Waveform & spectrogram generation |
| `/health`                   | Health check                      |

---

## 🔄 CI/CD Pipeline

```text
Git Push
    │
    ▼
GitHub Actions
    │
    ├── Backend Tests
    ├── Docker Build Validation
    └── Railway Auto Deploy
            │
            ▼
    Production Application
```

---

## 🎯 Key Highlights

* Full-stack AI application
* Real-time speech analysis
* Explainable AI visualizations
* Dockerized deployment
* Automated CI/CD pipeline
* Cloud-hosted REST API

---

## 👨‍💻 Author

**Harish Narayanan**

Aspiring DevOps & AI Engineer

GitHub: https://github.com/Hari-0509
