import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  RotateCcw,
  Home,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import "../index.css";

interface Result {
  type: "confirmed" | "candidate" | "false_positive";
  confidence: number;
  title: string;
  description: string;
}

interface ResultConfig {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  particleColor: string;
  description: string;
  title?: string;
}

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    result,
    parameters,
  }: { result?: Result; parameters?: Record<string, any> } =
    location.state || {};
  const [showDetails, setShowDetails] = useState(false);

  if (!result) {
    navigate("/detection");
    return null;
  }

  const getResultConfig = (type: string): ResultConfig => {
    switch (type) {
      case "confirmed":
        return {
          glowColor: "0 0 30px rgba(34, 197, 94, 0.5)",
          particleColor: "bg-green-400",
          title: "CONFIRMED EXOPLANET",
          icon: "🌍",
          color: "linear-gradient(to right, #4ADE80, #059669)",
          bgColor: " bg-green-500/20 ",
          borderColor: " var(--color-green-400) ",
          description: "High confidence detection of a genuine exoplanet!",
        };
      case "candidate":
        return {
          glowColor: "0 0 30px rgba(34, 197, 94, 0.5)",
          particleColor: "bg-yellow-400",
          title: "EXOPLANET CANDIDATE",
          icon: "🌍",
          color: "linear-gradient(to right, #FBBF24, #F97316)",
          bgColor: " bg-yellow-500/20 ",
          borderColor: " var(--color-yellow-400) ",
          description: "Promising signal requires additional verification.",
        };
      case "false_positive":
        return {
          glowColor: "0 0 30px rgba(239, 68, 68, 0.5)",
          particleColor: "bg-red-400",
          title: "FALSE POSITIVE",
          color:
            "linear-gradient(to right, rgb(248, 113, 113), rgb(220, 38, 38))",
          bgColor: "bg-red-500/20",
          borderColor: "var(--color-red-400)",
          icon: "❌",
          description: "Signal likely caused by stellar activity or noise.",
        };
      default:
        return {
          icon: "⁉️",
          color: "linear-gradient(to right, #9CA3AF, #4B5563)",
          bgColor: "from-gray-900/20 to-gray-800/20",
          borderColor: "border-gray-400/50",
          glowColor: "0 0 30px rgba(107, 114, 128, 0.5)",
          particleColor: "bg-gray-400",
          description: "ERROR: Unknown result type.",
          title: "UNKNOWN RESULT",
        };
    }
  };

  const config = getResultConfig(result.type);

  const exportResults = () => {
    const exportData = {
      result,
      parameters,
      timestamp: new Date().toISOString(),
      analysis_id: `EXO-${Date.now()}`,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exoplanet_analysis_${exportData.analysis_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
       

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-6xl mb-4">{config.icon}</div>
          <h1
            className={`text-4xl mb-4 bg-gradient-to-r  bg-clip-text text-transparent`}
            style={{ backgroundImage: config.color }}
          >
            {config.title}
          </h1>
          <p className="text-xl text-gray-300">{config.description}</p>
        </motion.div>

        {/* Main result card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card
            className={`border-2  ${config.borderColor} border-2 p-8 mb-6`}
            style={{
              borderColor: config.borderColor,
              borderRadius: "20px",
            }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left column - Key metrics */}
              <div>
                <h3 className="text-2xl text-white mb-6">Detection Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Confidence Level:</span>
                    <Badge
                      className={`bg-gradient-to-r rounded-full text-white px-4 py-1`}
                      style={{ backgroundImage: config.color }}
                    >
                      {result.confidence.toFixed(1)}%
                    </Badge>
                  </div>

                  {/* put the planet radius here, but update the REsult interface first here and in the analysis */}
                  {/*<div className="flex justify-between items-center">
                      <span className="text-gray-300">Planet Radius:</span>
                      <span className="text-white">
                        {result.planetRadius.toFixed(3)} R⊕
                      </span>
                    </div> */}

                  {/* same here with the habitability score */}
                  {/* <div className="flex justify-between items-center">
                    <span className="text-gray-300">Habitability Score:</span>
                    <div className="flex items-center">
                      <span className="text-white mr-2">
                        {result.habitabilityScore.toFixed(0)}%
                      </span>
                      <div className="w-20 h-2 bg-gray-700 rounded-full">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.habitabilityScore}%` }}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Right column - Visual representation */}
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  className="relative w-40 h-40 mb-8"
                  style={{ width: "150px", height: "150px" }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full shadow-2xl`}
                    style={{
                      backgroundImage: config.color,
                      width: "100%",
                      height: "100%",
                      zIndex: "10",
                    }}
                  >
                    {/* Planet surface details */}
                    <div
                      className="absolute inset-4 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full opacity-30"
                      style={{
                        width: "80%",
                        height: "80%",
                        backgroundImage:
                          "linear-gradient(to right, #9CA3AF, #4B5563)",
                        top: "10%",
                        left: "10%",
                      }}
                    />
                    <div className="absolute top-5 right-5 w-6 h-6 bg-gray-400 rounded-full opacity-40" />
                    <div className="absolute bottom-12 left-12 w-4 h-4 bg-gray-500 rounded-full opacity-40" />
                  </div>

                  {/* Orbital ring */}
                  <motion.div
                    className="absolute -inset-8 border-2 border-cyan-400/30 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                <motion.div
                  className={`text-center p-4 bg-gradient-to-r ${config.color} rounded-lg text-white`}
                  style={{ backgroundImage: config.color }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 30px rgba(59, 130, 246, 0.6)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-sm opacity-90">Classification</div>
                  <div className="text-lg">{result.type.toUpperCase()}</div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="grid md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-gray-800/80 hover:bg-gray-700/80 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg p-4 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-sm">View Details</div>
            </div>
          </motion.button>

          <motion.button
            onClick={exportResults}
            className="bg-gray-800/80 hover:bg-gray-700/80 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg p-4 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <Download className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-sm">Export Data</div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate("/detection")}
            className="bg-gray-800/80 hover:bg-gray-700/80 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg p-4 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <RotateCcw className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-sm">New Analysis</div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg p-4 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <Home className="w-6 h-6 mx-auto mb-2 text-white" />
              <div className="text-sm text-white">Home</div>
            </div>
          </motion.button>
        </motion.div>

        {/* Detailed Results */}
        {showDetails && parameters && (
          <motion.div
            className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              Analysis Parameters
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(parameters).map(([key, value]) => (
                <div key={key} className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">
                    {key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </div>
                  <div className="text-lg text-white">{String(value)}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Floating Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`fixed w-1 h-1 ${config.particleColor} rounded-full pointer-events-none`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;
