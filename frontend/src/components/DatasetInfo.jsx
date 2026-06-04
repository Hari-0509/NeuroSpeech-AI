import React from "react";
import { FaDatabase } from "react-icons/fa";

function DatasetInfo() {

  return (

    <div
      className="
      bg-blue-50
      border-l-4
      border-blue-500
      p-6
      rounded-xl
      shadow-sm"
    >

      <div className="flex items-center gap-3 mb-4">

        <FaDatabase
          className="text-blue-600"
        />

        <h2
          className="
          text-2xl
          font-bold"
        >
          Recommended Datasets
        </h2>

      </div>

      <p className="mb-3">

        For reliable evaluation,
        use clinically validated
        datasets.

      </p>

      <ul
        className="
        list-disc
        ml-6
        space-y-2"
      >

        <li>
          TORGO Dysarthric Speech Dataset
        </li>

        <li>
          UASpeech Dysarthric Speech Corpus
        </li>

      </ul>

    </div>
  );
}

export default DatasetInfo;
