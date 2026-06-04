import React, {
  useState
} from "react";

import {
  predictAudio,
  advancedAnalysis
} from "../api";

function UploadSection({

  setResult,

  setAudioAnalysis,

  setLoading,

  setLoadingStage

}) {

  const [file, setFile] =
    useState(null);

  const handleAnalyze =
    async () => {

      if (!file) {

        alert(
          "Please select a WAV file"
        );

        return;
      }

      try {

        setLoading(true);

        setLoadingStage(
          "Extracting HuBERT Features..."
        );

        const prediction =
          await predictAudio(
            file
          );

        setLoadingStage(
          "Generating Embeddings..."
        );

        setResult(
          prediction
        );

        setLoadingStage(
          "Running CatBoost Classification..."
        );

        const analysis =
          await advancedAnalysis(
            file
          );

        setLoadingStage(
          "Rendering Dashboard..."
        );

        setAudioAnalysis(
          analysis
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Analysis failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
      bg-white
      shadow-lg
      rounded-xl
      p-6"
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-4"
      >
        Upload Audio
      </h2>

      <input
        type="file"
        accept=".wav"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={
          handleAnalyze
        }
        className="
        mt-4
        px-5
        py-2
        bg-blue-700
        text-white
        rounded-lg
        hover:bg-blue-800"
      >
        Analyze Upload
      </button>

    </div>

  );
}

export default UploadSection;
