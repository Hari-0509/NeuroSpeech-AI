import React from "react";

function SummaryCard({
  result,
  analysis
}) {

  if (!result || !analysis)
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
        text-xl
        font-bold
        mb-4"
      >
        Analysis Summary
      </h2>

      <div className="space-y-3">

        <div>
          <span className="font-semibold">
            Prediction:
          </span>{" "}
          {result.prediction}
        </div>

        <div>
          <span className="font-semibold">
            Confidence:
          </span>{" "}
          {Number(
            result.confidence
          ).toFixed(2)}%
        </div>

        <div>
          <span className="font-semibold">
            Severity:
          </span>{" "}
          {result.severity}
        </div>

        <div>
          <span className="font-semibold">
            Duration:
          </span>{" "}
          {analysis.duration}s
        </div>

        <div>
          <span className="font-semibold">
            Sample Rate:
          </span>{" "}
          {analysis.sample_rate} Hz
        </div>

        <div>
          <span className="font-semibold">
            Model:
          </span>{" "}
          HuBERT + CatBoost
        </div>

      </div>

    </div>

  );
}

export default SummaryCard;
