import React from "react";

function StatsSection() {

  const stats = [

    {
      label: "Datasets",
      value: "2"
    },

    {
      label: "Speech Samples",
      value: "19"
    },

    {
      label: "ML Models",
      value: "2"
    },

    {
      label: "Embedding Size",
      value: "1536"
    }

  ];

  return (

    <div
      className="
      grid
      md:grid-cols-4
      gap-4"
    >

      {
        stats.map((item) => (

          <div
            key={item.label}
            className="
            bg-white
            rounded-xl
            shadow-lg
            p-6
            text-center"
          >

            <h2
              className="
              text-3xl
              font-bold
              text-blue-700"
            >
              {item.value}
            </h2>

            <p
              className="
              text-gray-600
              mt-2"
            >
              {item.label}
            </p>

          </div>

        ))
      }

    </div>

  );
}

export default StatsSection;
