import React from "react";

function HeroSection() {

  return (

    <section
      className="
      bg-gradient-to-r
      from-blue-900
      to-indigo-700
      text-white
      rounded-2xl
      p-10
      shadow-xl"
    >

      <h1
        className="
        text-5xl
        font-bold"
      >
        NeuroSpeech AI
      </h1>

      <p
        className="
        text-xl
        mt-4"
      >
        Advanced Dysarthria Detection
        using HuBERT Embeddings
        and CatBoost Models
      </p>

      <p
        className="
        mt-4
        max-w-3xl"
      >
        Analyze clinically validated
        speech recordings from TORGO
        and UASpeech datasets or upload
        your own WAV files for
        automated speech analysis.
      </p>

    </section>

  );
}

export default HeroSection;
