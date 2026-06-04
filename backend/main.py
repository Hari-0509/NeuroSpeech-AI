"""
NeuroSpeech AI Backend
HuBERT + CatBoost Dysarthria Detection API
"""
from pydantic import BaseModel
from scipy.signal import spectrogram
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from scipy.signal import spectrogram

from sklearn.decomposition import PCA

from sklearn.manifold import TSNE

from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi import FastAPI, UploadFile, File, HTTPException
from scipy.signal import spectrogram
from fastapi.middleware.cors import CORSMiddleware

import os
import tempfile
import logging

import torch
import librosa
import numpy as np

from pathlib import Path

from transformers import HubertModel, Wav2Vec2FeatureExtractor
from catboost import CatBoostClassifier
from pydantic import BaseModel

class SampleAnalysisRequest(
    BaseModel
):
    dataset: str
    category: str
    filename: str
# ==========================================
# Logging
# ==========================================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("neurospeech")

# ==========================================
# FastAPI App
# ==========================================

app = FastAPI(
    title="NeuroSpeech AI",
    description="AI-powered Dysarthria Detection using HuBERT and CatBoost",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Device
# ==========================================

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

logger.info(f"Using device: {DEVICE}")

# ==========================================
# Model Paths
# ==========================================

MODEL_DIR = Path("models")
SAMPLES_DIR = Path("../samples")

PRESENCE_MODEL_PATH = MODEL_DIR / "catboost_presence1.cbm"
SEVERITY_MODEL_PATH = MODEL_DIR / "catboost_severity1.cbm"

# ==========================================
# Global Models
# ==========================================

feature_extractor = None
hubert = None

presence_model = None
severity_model = None


@app.on_event("startup")
async def load_models():

    global feature_extractor
    global hubert
    global presence_model
    global severity_model

    try:

        logger.info("Loading HuBERT feature extractor...")

        feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(
            "facebook/hubert-base-ls960"
        )

        logger.info("Loading HuBERT model...")

        hubert = HubertModel.from_pretrained(
            "facebook/hubert-base-ls960"
        ).to(DEVICE)

        hubert.eval()

        logger.info("Loading CatBoost presence model...")

        presence_model = CatBoostClassifier()

        presence_model.load_model(
            str(PRESENCE_MODEL_PATH),
            format="cbm"
        )

        logger.info("Loading CatBoost severity model...")

        severity_model = CatBoostClassifier()

        severity_model.load_model(
            str(SEVERITY_MODEL_PATH),
            format="cbm"
        )

        logger.info("All models loaded successfully")

    except Exception as e:

        logger.error(f"Model loading failed: {e}")

        raise
# ==========================================
# Feature Extraction
# ==========================================

def extract_hubert_feature(audio_path: str):

    try:

        wav, sr = librosa.load(
            audio_path,
            sr=16000
        )

        if len(wav) < 1600:
            raise ValueError(
                "Audio too short. Minimum 100ms required."
            )

        inputs = feature_extractor(
            wav,
            sampling_rate=16000,
            return_tensors="pt",
            padding=True
        )

        with torch.no_grad():

            outputs = hubert(
                inputs.input_values.to(DEVICE)
            )

        feats = outputs.last_hidden_state.squeeze(0)

        feats = feats.cpu().numpy()

        mean_feat = feats.mean(axis=0)

        std_feat = feats.std(axis=0)

        embedding = np.concatenate(
            [mean_feat, std_feat]
        )

        return embedding

    except Exception as e:

        logger.error(
            f"Feature extraction failed: {e}"
        )

        return None


# ==========================================
# Prediction
# ==========================================

def predict_audio(audio_path: str):

    try:

        feat = extract_hubert_feature(
            audio_path
        )

        if feat is None:
            return None, None, None

        feat = feat.reshape(1, -1)

        probability = (
            presence_model
            .predict_proba(feat)[0][1]
        )

        prediction = int(
            probability >= 0.5
        )

        if prediction == 0:

            return (
                "NORMAL",
                round(1 - probability, 3),
                None
            )

        severity_pred = int(
            severity_model
            .predict(feat)
            .flatten()[0]
        )

        severity_map = {
            0: "MILD",
            1: "MODERATE",
            2: "SEVERE"
        }

        severity = severity_map.get(
            severity_pred,
            "UNKNOWN"
        )

        return (
            "DYSARTHRIA",
            round(probability, 3),
            severity
        )

    except Exception as e:

        logger.error(
            f"Prediction failed: {e}"
        )
        return None, None, None

def predict_sample_from_path(
    audio_path: str
):

    feat = extract_hubert_feature(
        audio_path
    )

    feat = feat.reshape(
        1,
        -1
    )

    presence_pred = int(
        presence_model.predict(
            feat
        )[0]
    )

    presence_prob = float(
        np.max(
            presence_model.predict_proba(
                feat
            )
        )
    )

    if presence_pred == 0:

        return {
            "condition": "Normal",
            "severity": "None",
            "confidence":
                round(
                    presence_prob * 100,
                    2
                )
        }

    severity_pred = int(
        severity_model.predict(
            feat
        )[0]
    )

    severity_map = {
        0: "Mild",
        1: "Moderate",
        2: "Severe"
    }

    return {
        "condition":
            "Dysarthria",
        "severity":
            severity_map.get(
                severity_pred,
                "Unknown"
            ),
        "confidence":
            round(
                presence_prob * 100,
                2
            )
    }

# ==========================================
# Root Endpoint
# ==========================================

class SamplePredictionRequest(BaseModel):
    dataset: str
    category: str
    file: str

@app.get("/")
def root():

    return {
        "message": "NeuroSpeech AI Backend Running",
        "docs": "/docs",
        "health": "/health",
        "info": "/info"
    }


# ==========================================
# Health Check
# ==========================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "device": DEVICE,
        "hubert_loaded": hubert is not None,
        "presence_model_loaded": presence_model is not None,
        "severity_model_loaded": severity_model is not None
    }


# ==========================================
# API Info
# ==========================================

@app.get("/info")
def info():

    return {
        "application": "NeuroSpeech AI",
        "version": "1.0.0",
        "supported_formats": [
            "wav"
        ]
    }


# ==========================================
# Predict Endpoint
# ==========================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    temp_path = None

    try:

        if not file.filename.lower().endswith(".wav"):

            raise HTTPException(
                status_code=400,
                detail="Only WAV files accepted"
            )

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".wav"
        ) as temp:

            content = await file.read()

            temp.write(content)

            temp_path = temp.name

        prediction, confidence, severity = predict_audio(
            temp_path
        )

        if prediction is None:

            raise HTTPException(
                status_code=400,
                detail="Audio processing failed"
            )

        return {
            "success": True,
            "prediction": prediction,
            "confidence": confidence,
            "severity": severity,
            "model_version": "1.0"
        }

    except HTTPException:
        raise

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


# ==========================================
# Feature Extraction Endpoint
# ==========================================

@app.post("/extract-features")
async def extract_features(
    file: UploadFile = File(...)
):

    temp_path = None

    try:

        if not file.filename.lower().endswith(".wav"):

            raise HTTPException(
                status_code=400,
                detail="Only WAV files accepted"
            )

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".wav"
        ) as temp:

            content = await file.read()

            temp.write(content)

            temp_path = temp.name

        feat = extract_hubert_feature(
            temp_path
        )

        if feat is None:

            raise HTTPException(
                status_code=400,
                detail="Feature extraction failed"
            )

        return {
            "success": True,
            "shape": list(feat.shape),
            "embedding_dim": int(feat.shape[0])
        }

    except HTTPException:
        raise

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)
@app.get("/samples")
def get_samples():

    result = {}

    try:

        for dataset in SAMPLES_DIR.iterdir():

            if not dataset.is_dir():
                continue

            dataset_name = dataset.name

            result[dataset_name] = {}

            for category in dataset.iterdir():

                if not category.is_dir():
                    continue

                result[dataset_name][category.name] = sorted(
                    [
                        file.name
                        for file in category.glob("*.wav")
                    ]
                )

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.get("/audio/{dataset}/{category}/{filename}")
def stream_audio(
    dataset: str,
    category: str,
    filename: str
):

    file_path = (
        SAMPLES_DIR /
        dataset /
        category /
        filename
    )

    if not file_path.exists():

        raise HTTPException(
            status_code=404,
            detail="Audio file not found"
        )

    return FileResponse(
        path=str(file_path),
        media_type="audio/wav",
        filename=filename
    )

@app.post("/sample-predict")
def predict_sample(
    request: SamplePredictionRequest
):

    file_path = (
        SAMPLES_DIR /
        request.dataset /
        request.category /
        request.file
    )

    if not file_path.exists():

        raise HTTPException(
            status_code=404,
            detail="Sample not found"
        )

    prediction, confidence, severity = predict_audio(
        str(file_path)
    )

    if prediction is None:

        raise HTTPException(
            status_code=400,
            detail="Prediction failed"
        )

    return {
        "success": True,
        "prediction": prediction,
        "confidence": confidence,
        "severity": severity,
        "sample": request.file,
        "dataset": request.dataset
    }

@app.post("/audio-analysis")
async def audio_analysis(
    file: UploadFile = File(...)
):

    temp_path = None

    try:

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".wav"
        ) as temp:

            content = await file.read()

            temp.write(content)

            temp_path = temp.name

        audio, sr = librosa.load(
            temp_path,
            sr=16000
        )

        duration = len(audio) / sr

        waveform = audio[::50].tolist()

        f, t, spec = spectrogram(
            audio,
            fs=sr
        )

        spec = np.log1p(spec)

        spec = spec[:64, :64]

        return {
            "duration": round(duration, 2),
            "sample_rate": sr,
            "waveform": waveform,
            "spectrogram": spec.tolist()
        }

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)

@app.post("/advanced-analysis")
async def advanced_analysis(
    file: UploadFile = File(...)
):

    temp_path = None

    try:

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".wav"
        ) as temp:

            content = await file.read()

            temp.write(content)

            temp_path = temp.name

        # Load audio

        audio, sr = librosa.load(
            temp_path,
            sr=16000
        )

        duration = len(audio) / sr

        # Waveform

        waveform = audio[::50].tolist()

        # Spectrogram

        f, t, spec = spectrogram(
            audio,
            fs=sr
        )

        spec = np.log1p(spec)

        spec = spec[:64, :64]

        # HuBERT Embedding

        embedding = extract_hubert_feature(
            temp_path
        )

        # Generate reference cloud

        reference = np.random.normal(
            0,
            1,
            (80, embedding.shape[0])
        )

        combined = np.vstack([
            reference,
            embedding.reshape(1, -1)
        ])

        # PCA

        pca = PCA(
            n_components=2
        )

        pca_points = pca.fit_transform(
            combined
        )

        # t-SNE

        tsne = TSNE(
            n_components=2,
            perplexity=20,
            random_state=42
        )

        tsne_points = tsne.fit_transform(
            combined
        )

        return {

            "duration": round(
                duration,
                2
            ),

            "sample_rate": sr,

            "waveform": waveform,

            "spectrogram":
                spec.tolist(),

            "pca_reference":
                pca_points[:-1].tolist(),

            "pca_test":
                pca_points[-1].tolist(),

            "tsne_reference":
                tsne_points[:-1].tolist(),

            "tsne_test":
                tsne_points[-1].tolist()
        }

    finally:

        if (
            temp_path and
            os.path.exists(
                temp_path
            )
        ):
            os.remove(
                temp_path
            )

@app.post("/sample-advanced-analysis")
async def sample_advanced_analysis(
    request: SampleAnalysisRequest
):

    try:

        sample_path = (
            Path("../samples")
            / request.dataset
            / request.category
            / request.filename
        )

        if not sample_path.exists():

            raise HTTPException(
                status_code=404,
                detail="Sample not found"
            )

        audio, sr = librosa.load(
            str(sample_path),
            sr=16000
        )

        duration = len(audio) / sr

        waveform = audio[::50].tolist()

        f, t, spec = spectrogram(
            audio,
            fs=sr
        )

        spec = np.log1p(spec)
        spec = spec[:64, :64]

        embedding = extract_hubert_feature(
            str(sample_path)
        )

        reference = np.random.normal(
            0,
            1,
            (
                80,
                embedding.shape[0]
            )
        )

        combined = np.vstack([
            reference,
            embedding.reshape(
                1,
                -1
            )
        ])

        pca = PCA(
            n_components=2
        )

        pca_points = pca.fit_transform(
            combined
        )

        tsne = TSNE(
            n_components=2,
            perplexity=20,
            random_state=42
        )

        tsne_points = tsne.fit_transform(
            combined
        )

        prediction = predict_sample_from_path(
            str(sample_path)
        )

        return {
            "prediction": prediction,
            "duration": round(duration, 2),
            "sample_rate": sr,
            "waveform": waveform,
            "spectrogram": spec.tolist(),
            "pca_reference": pca_points[:-1].tolist(),
            "pca_test": pca_points[-1].tolist(),
            "tsne_reference": tsne_points[:-1].tolist(),
            "tsne_test": tsne_points[-1].tolist()
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# ==========================================
# Run Server
# ==========================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )

