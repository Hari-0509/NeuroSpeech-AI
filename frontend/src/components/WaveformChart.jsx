import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function WaveformChart({ waveform }) {

  if (!waveform || waveform.length === 0)
    return null;

  const data = waveform.map(
    (value, index) => ({
      index,
      value
    })
  );

  return (

    <div className="bg-white shadow-lg rounded-xl p-6">

      <h3 className="text-xl font-bold mb-4">
        Waveform
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <XAxis dataKey="index" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default WaveformChart;
