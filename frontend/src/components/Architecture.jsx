import React from "react";

function Architecture() {

  return (

    <div
      className="
      bg-white
      rounded-xl
      shadow-lg
      p-8"
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-8"
      >
        Model Architecture
      </h2>

      <div
        className="
        grid
        md:grid-cols-5
        gap-4
        text-center"
      >

        <div
          className="
          bg-slate-100
          p-4
          rounded-lg"
        >
          Audio Input
        </div>

        <div
          className="
          bg-blue-100
          p-4
          rounded-lg"
        >
          HuBERT
        </div>

        <div
          className="
          bg-green-100
          p-4
          rounded-lg"
        >
          Embeddings
        </div>

        <div
          className="
          bg-purple-100
          p-4
          rounded-lg"
        >
          CatBoost
        </div>

        <div
          className="
          bg-red-100
          p-4
          rounded-lg"
        >
          Prediction
        </div>

      </div>

    </div>
  );
}

export default Architecture;
