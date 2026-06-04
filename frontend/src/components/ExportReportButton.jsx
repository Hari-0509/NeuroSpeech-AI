import React from "react";

import jsPDF from "jspdf";

function ExportReportButton({

  result,

  analysis

}) {

  if (!result)
    return null;

  const generatePDF = () => {

    const doc =
      new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "NeuroSpeech AI",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      "Clinical Speech Analysis Report",
      20,
      35
    );

    doc.line(
      20,
      40,
      190,
      40
    );

    doc.text(
      `Prediction: ${
        result.prediction
      }`,
      20,
      60
    );

    doc.text(
      `Confidence: ${
        (
          result.confidence * 100
        ).toFixed(2)
      }%`,
      20,
      75
    );

    doc.text(
      `Severity: ${
        result.severity || "None"
      }`,
      20,
      90
    );

    if (analysis) {

      doc.text(
        `Duration: ${
          analysis.duration
        } s`,
        20,
        105
      );

      doc.text(
        `Sample Rate: ${
          analysis.sample_rate
        } Hz`,
        20,
        120
      );

    }

    doc.text(
      `Generated: ${
        new Date()
          .toLocaleString()
      }`,
      20,
      145
    );

    doc.save(
      "NeuroSpeech_AI_Report.pdf"
    );
  };

  return (

    <button
      onClick={
        generatePDF
      }
      className="
      w-full
      bg-emerald-600
      text-white
      py-3
      rounded-xl
      font-semibold
      hover:bg-emerald-700"
    >
      Download Clinical Report
    </button>

  );
}

export default ExportReportButton;
