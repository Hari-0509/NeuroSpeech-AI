import React, { useState } from "react";

import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";

import ClinicalNote from "./components/ClinicalNote";
import DatasetInfo from "./components/DatasetInfo";

import DatasetExplorer from "./components/DatasetExplorer";
import UploadSection from "./components/UploadSection";

import ResultCard from "./components/ResultCard";
import SummaryCard from "./components/SummaryCard";

import ExportReportButton
from "./components/ExportReportButton";

import Architecture from "./components/Architecture";
import TechnologyStack from "./components/TechnologyStack";

import AnalysisDashboard
from "./components/AnalysisDashboard";

import LoadingOverlay
from "./components/LoadingOverlay";

import Footer from "./components/Footer";

function App() {

  const [result, setResult] =
    useState(null);

  const [audioAnalysis,
    setAudioAnalysis] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const [loadingStage,
    setLoadingStage] =
    useState("");

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <header className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto p-6">

          <h1
            className="
            text-3xl
            font-bold
            text-blue-900"
          >
            NeuroSpeech AI
          </h1>

          <p
            className="
            text-gray-600
            mt-2"
          >
            AI-Powered Dysarthria Speech Analysis Platform
          </p>

        </div>

      </header>

      {/* Main Content */}

      <main className="max-w-7xl mx-auto p-6">

        <HeroSection />

        <div className="h-8" />

        <StatsSection />

        <div className="h-8" />

        <ClinicalNote />

        <div className="h-6" />

        <DatasetInfo />

        <div className="h-8" />

        {/* Main Dashboard */}

        <div
          className="
          grid
          lg:grid-cols-2
          gap-8"
        >

          {/* Left Panel */}

          <div className="space-y-6">

            <DatasetExplorer
              setResult={setResult}
              setAudioAnalysis={
                setAudioAnalysis
              }
            />

            <UploadSection
              setResult={setResult}
              setAudioAnalysis={
                setAudioAnalysis
              }
              setLoading={
                setLoading
              }
              setLoadingStage={
                setLoadingStage
              }
            />

          </div>

          {/* Right Panel */}

          <div className="space-y-6">

            <ResultCard
              result={result}
            />

            <SummaryCard
              result={result}
              analysis={audioAnalysis}
            />

            <ExportReportButton
              result={result}
              analysis={audioAnalysis}
            />

          </div>

        </div>

        {/* Architecture */}

        <div className="mt-10">

          <Architecture />

        </div>

        {/* Analysis Dashboard */}

        {
          audioAnalysis && (

            <div className="mt-10">

              <AnalysisDashboard
                analysis={
                  audioAnalysis
                }
              />

            </div>

          )
        }

        {/* Technology Stack */}

        <div className="mt-10">

          <TechnologyStack />

        </div>

      </main>

      {/* Loading Overlay */}

      <LoadingOverlay
        loading={loading}
        stage={loadingStage}
      />

      {/* Footer */}

      <Footer />

    </div>

  );
}

export default App;
