import React from "react";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
}
from "recharts";

function TSNEPlot({
  reference,
  test
}) {

  if (!reference || !test)
    return null;

  const refData =
    reference.map(
      point => ({
        x: point[0],
        y: point[1]
      })
    );

  const testData = [
    {
      x: test[0],
      y: test[1]
    }
  ];

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
        text-xl
        font-bold
        mb-4"
      >
        t-SNE Projection
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <ScatterChart>

          <XAxis
            dataKey="x"
            type="number"
          />

          <YAxis
            dataKey="y"
            type="number"
          />

          <Tooltip />

          <Scatter
            data={refData}
            fill="#3b82f6"
          />

          <Scatter
            data={testData}
            fill="#f59e0b"
          />

        </ScatterChart>

      </ResponsiveContainer>

    </div>

  );
}

export default TSNEPlot;
