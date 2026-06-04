import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

function ClinicalNote() {

  return (

    <div
      className="
      bg-yellow-50
      border-l-4
      border-yellow-500
      p-6
      rounded-xl
      shadow-sm"
    >

      <div className="flex items-center gap-3 mb-4">

        <FaExclamationTriangle
          className="text-yellow-600"
        />

        <h2
          className="
          text-2xl
          font-bold"
        >
          Clinical Note
        </h2>

      </div>

      <p className="mb-4">

        Dysarthria is a motor speech disorder
        resulting from neurological damage
        affecting speech production muscles.

      </p>

      <ul
        className="
        list-disc
        ml-6
        space-y-2"
      >

        <li>
          Respiration – breath control
        </li>

        <li>
          Phonation – vocal fold vibration
        </li>

        <li>
          Articulation – imprecise speech
        </li>

        <li>
          Prosody – pitch and rhythm
        </li>

      </ul>

      <p className="mt-4">

        Reliable dysarthria detection
        requires clinically validated
        recordings captured under
        controlled conditions.

      </p>

    </div>
  );
}

export default ClinicalNote;
