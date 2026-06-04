import React from "react";

function Footer() {

  return (

    <footer
      className="
      bg-slate-900
      text-white
      mt-12
      p-8"
    >

      <div
        className="
        max-w-7xl
        mx-auto"
      >

        <h3
          className="
          text-xl
          font-bold"
        >
          NeuroSpeech AI
        </h3>

        <p className="mt-3">

          HuBERT + CatBoost based
          dysarthria detection
          and severity analysis.

        </p>

        <p
          className="
          mt-6
          text-sm
          text-gray-400"
        >
          Healthcare AI Research Platform
        </p>

      </div>

    </footer>
  );
}

export default Footer;
