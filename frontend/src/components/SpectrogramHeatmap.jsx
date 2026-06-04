import React from "react";

import Plot from "react-plotly.js";

function SpectrogramHeatmap({
  spectrogram
}) {

  if (!spectrogram)
    return null;

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
        Spectrogram
      </h2>

      <Plot

        data={[
          {
            z: spectrogram,
            type: "heatmap",
            colorscale: [
  [0, "#ffffff"],
  [0.2, "#cffafe"],
  [0.4, "#67e8f9"],
  [0.6, "#06b6d4"],
  [0.8, "#2563eb"],
  [1, "#1e3a8a"]
]
          }
        ]}

        layout={{
          height: 400,

          margin: {
            l: 60,
            r: 20,
            t: 20,
            b: 50
          },

          xaxis: {
            title: "Time"
          },

          yaxis: {
            title: "Frequency"
          }
        }}

        style={{
          width: "100%"
        }}

        useResizeHandler

      />

    </div>

  );
}

export default SpectrogramHeatmap;
