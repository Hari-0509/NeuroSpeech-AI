import React from "react";

import WaveformChart
from "./WaveformChart";

import SpectrogramHeatmap
from "./SpectrogramHeatmap";

import PCAPlot
from "./PCAPlot";

import TSNEPlot
from "./TSNEPlot";

function AnalysisDashboard({
  analysis
}) {

  if (!analysis)
    return null;
console.log("ANALYSIS DASHBOARD:", analysis);
  return (

    <div className="space-y-8">

      <div>

        <h2
          className="
          text-3xl
          font-bold
          mb-4"
        >
          Speech Signal Analysis
        </h2>

        <div
          className="
          grid
          lg:grid-cols-2
          gap-6"
        >

          <WaveformChart
            waveform={
              analysis.waveform
            }
          />

          <SpectrogramHeatmap
            spectrogram={
              analysis.spectrogram
            }
          />

        </div>

      </div>

      <div>

        <h2
          className="
          text-3xl
          font-bold
          mb-4"
        >
          HuBERT Embedding Visualization
        </h2>

        <div
          className="
          grid
          lg:grid-cols-2
          gap-6"
        >

          <PCAPlot
            reference={
              analysis.pca_reference
            }
            test={
              analysis.pca_test
            }
          />

          <TSNEPlot
            reference={
              analysis.tsne_reference
            }
            test={
              analysis.tsne_test
            }
          />

        </div>

      </div>

    </div>

  );
}

export default AnalysisDashboard;
