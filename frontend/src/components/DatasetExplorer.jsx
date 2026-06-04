import React, {
  useEffect,
  useState
} from "react";

import {
  getSamples,
  sampleAdvancedAnalysis
} from "../api";

function DatasetExplorer({
  setResult,
  setAudioAnalysis
}) {

  const [samples, setSamples] =
    useState({});

  const [dataset, setDataset] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [file, setFile] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getSamples();

        setSamples(data);

        const firstDataset =
          Object.keys(data)[0];

        if (firstDataset) {

          setDataset(
            firstDataset
          );

        }

      } catch (error) {

        console.error(
          error
        );

      }

    }

    load();

  }, []);

  useEffect(() => {

    if (!dataset)
      return;

    const categories =
      Object.keys(
        samples[dataset] || {}
      );

    setCategory(
      categories[0] || ""
    );

  }, [
    dataset,
    samples
  ]);

  useEffect(() => {

    if (
      !dataset ||
      !category
    )
      return;

    const files =
      samples[dataset]?.[
        category
      ] || [];

    setFile(
      files[0] || ""
    );

  }, [
    dataset,
    category,
    samples
  ]);

  const analyze =
    async () => {

      try {

        setLoading(true);

        const response =
          await sampleAdvancedAnalysis({

            dataset,

            category,

            filename: file

          });

        console.log(
          "SAMPLE ANALYSIS:",
          response
        );

        setResult(
          response.prediction
        );

        setAudioAnalysis(
          response
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Sample analysis failed"
        );

      } finally {

        setLoading(false);

      }

    };

  const audioUrl =
    dataset &&
    category &&
    file
      ? `http://localhost:8000/audio/${dataset}/${category}/${file}`
      : "";

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
        Dataset Explorer
      </h2>

      <select
        value={dataset}
        onChange={(e) =>
          setDataset(
            e.target.value
          )
        }
        className="
        border
        p-2
        w-full
        mb-3"
      >

        {
          Object.keys(samples)
            .map(ds => (

              <option
                key={ds}
                value={ds}
              >
                {ds}
              </option>

            ))
        }

      </select>

      <select
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
        className="
        border
        p-2
        w-full
        mb-3"
      >

        {
          Object.keys(
            samples[
              dataset
            ] || {}
          ).map(cat => (

            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>

          ))
        }

      </select>

      <select
        value={file}
        onChange={(e) =>
          setFile(
            e.target.value
          )
        }
        className="
        border
        p-2
        w-full
        mb-4"
      >

        {
          (
            samples[
              dataset
            ]?.[
              category
            ] || []
          ).map(f => (

            <option
              key={f}
              value={f}
            >
              {f}
            </option>

          ))
        }

      </select>

      {
        audioUrl && (

          <audio
            controls
            className="
            w-full
            mb-4"
          >

            <source
              src={audioUrl}
              type="audio/wav"
            />

          </audio>

        )
      }

      <button
        onClick={analyze}
        disabled={loading}
        className="
        bg-green-700
        text-white
        px-4
        py-2
        rounded-lg
        disabled:opacity-50"
      >

        {
          loading
            ? "Analyzing..."
            : "Analyze Sample"
        }

      </button>

    </div>

  );
}

export default DatasetExplorer;
