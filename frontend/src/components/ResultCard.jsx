import React from "react";

function ResultCard({ result }) {

  if (!result)
    return null;

  let confidence =
  Number(
    result.confidence || 0
  );

if (confidence <= 1) {

  confidence =
    confidence * 100;

}

confidence =
  confidence.toFixed(2);
  const progressWidth =
    Math.min(
      Number(confidence),
      100
    );

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
        mb-6"
      >
        Prediction Result
      </h2>

      <div className="space-y-5">

        {/* Condition */}

        <div>

          <p
            className="
            text-gray-500
            font-medium"
          >
            Condition
          </p>

          <p
            className="
            text-2xl
            font-bold
            mt-1"
          >
            {result.prediction || result.condition}
          </p>

        </div>

        {/* Confidence */}

        <div>

          <p
            className="
            text-gray-500
            font-medium
            mb-2"
          >
            Confidence
          </p>

          <div
            className="
            w-full
            bg-gray-200
            rounded-full
            h-4"
          >

            <div
              className="
              bg-blue-600
              h-4
              rounded-full
              transition-all
              duration-500"
              style={{
                width:
                  `${progressWidth}%`
              }}
            />

          </div>

          <p
            className="
            mt-2
            font-semibold"
          >
            {confidence}%
          </p>

        </div>

        {/* Severity */}

        {
          result.severity && (

            <div>

              <p
                className="
                text-gray-500
                font-medium
                mb-2"
              >
                Severity
              </p>

              <span
                className="
                px-3
                py-1
                bg-red-100
                text-red-700
                rounded-full
                font-medium"
              >
                {result.severity}
              </span>

            </div>

          )
        }

      </div>

    </div>

  );
}

export default ResultCard;
