import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:8000";

export async function getSamples() {

  const response =
    await axios.get(
      `${API_URL}/samples`
    );

  return response.data;
}

export async function predictAudio(
  file
) {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axios.post(
      `${API_URL}/predict`,
      formData
    );

  return response.data;
}

export async function analyzeAudio(
  file
) {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axios.post(
      `${API_URL}/audio-analysis`,
      formData
    );

  return response.data;
}

export async function predictSample(
  payload
) {

  const response =
    await axios.post(
      `${API_URL}/sample-predict`,
      payload
    );

  return response.data;
}

export async function advancedAnalysis(
  file
) {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axios.post(
      `${API_URL}/advanced-analysis`,
      formData
    );

  return response.data;
}
export async function sampleAdvancedAnalysis(
  payload
) {

  const response =
    await axios.post(
      `${API_URL}/sample-advanced-analysis`,
      payload
    );

  return response.data;
}
