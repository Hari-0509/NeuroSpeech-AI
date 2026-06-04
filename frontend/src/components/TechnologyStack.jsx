import React from "react";

function TechnologyStack() {

  const tech = [
    "HuBERT",
    "CatBoost",
    "FastAPI",
    "React",
    "Docker",
    "GitHub Actions"
  ];

  return (

    <div
      className="
      bg-white
      shadow-lg
      rounded-xl
      p-8"
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-6"
      >
        Technology Stack
      </h2>

      <div
        className="
        flex
        flex-wrap
        gap-4"
      >

        {
          tech.map(item => (

            <div
              key={item}
              className="
              bg-blue-100
              text-blue-800
              px-4
              py-2
              rounded-full
              font-medium"
            >
              {item}
            </div>

          ))
        }

      </div>

    </div>

  );
}

export default TechnologyStack;
