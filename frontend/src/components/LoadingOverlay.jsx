import React from "react";

function LoadingOverlay({
  loading,
  stage
}) {

  if (!loading)
    return null;

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50"
    >

      <div
        className="
        bg-white
        rounded-xl
        p-8
        shadow-2xl
        w-96"
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-4"
        >
          NeuroSpeech AI
        </h2>

        <div
          className="
          animate-pulse
          text-blue-700
          font-semibold"
        >
          {stage}
        </div>

        <div
          className="
          mt-4
          h-2
          bg-gray-200
          rounded-full"
        >

          <div
            className="
            h-2
            bg-blue-600
            rounded-full
            animate-pulse"
          />

        </div>

      </div>

    </div>

  );
}

export default LoadingOverlay;
