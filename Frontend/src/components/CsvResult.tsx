import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, RotateCcw, Download } from "lucide-react";

const CSVResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;
  const parameters = location.state?.parameters;

  useEffect(() => {
    // Log the received data when component mounts
    console.log("=== CSV PAGE DATA ===");
    console.log("Backend Result:", result);
    console.log("Parameters:", parameters);
    console.log("Full location state:", location.state);
    console.log("====================");

    // If no data, redirect back
    if (!result) {
      console.warn("No result data found, redirecting to home");
      navigate("/");
    }
  }, [result, parameters, location.state, navigate]);

  /**
   * Download results as CSV
   */
  const handleDownload = () => {
    if (!result) return;
    console.log("Preparing to download results as CSV:", result);
    // Convert result to CSV format
    const csvData = Array.isArray(result) ? result : [result];

    // Get headers from first object
    const headers = Object.keys(csvData[0]);

    // Create CSV content
    const csvContent = [
      headers.join(","), // Header row
      ...csvData.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            // Escape commas and quotes in values
            return typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          })
          .join(",")
      ),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `exoplanet_analysis_results_${Date.now()}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get summary stats from result
  const getSummaryStats = () => {
    if (!result) {
      console.log("No result data available for stats calculation");
      return { total: 0, confirmed: 0, candidates: 0, falsePositives: 0 };
    }

    const results = Array.isArray(result) ? result : [result];

    console.log("Calculating stats from results:", results);

    return {
      total: results.length,

      confirmed: results.filter(
        (r) => r.model_prediction?.toLowerCase() === "confirmed"
      ).length,
      candidates: results.filter(
        (r) => r.model_prediction?.toLowerCase() === "candidate"
      ).length,
      falsePositives: results.filter(
        (r) => r.model_prediction?.toLowerCase() === "false_positive"
      ).length,
    };
  };

  const stats = getSummaryStats();
  console.log("Summary stats:", stats);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
      {/* Center Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Main Card */}
        <div
          className="bg-gray-800/80 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 mb-6"
          style={{ borderRadius: "24px" }}
        >
          {/* Success Icon */}
          <motion.div
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 20px rgba(52, 211, 153, 0.5)",
                "0 0 40px rgba(52, 211, 153, 0.8)",
                "0 0 20px rgba(52, 211, 153, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Analysis Complete!
          </h1>

          {/* Description */}
          <p className="text-center text-gray-300 mb-8">
            Your CSV data has been successfully analyzed. The exoplanet
            detection results are ready for review.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-cyan-500/10">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {stats.total}
              </div>
              <div className="text-sm text-gray-400 mt-1">Total</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-green-500/10">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                {stats.confirmed}
              </div>
              <div className="text-sm text-gray-400 mt-1">Confirmed</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-yellow-500/10">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                {stats.candidates}
              </div>
              <div className="text-sm text-gray-400 mt-1">Candidates</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-red-500/10">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">
                {stats.falsePositives}
              </div>
              <div className="text-sm text-gray-400 mt-1">False Positives</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Home Button */}
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-800/80 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400 rounded-xl text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: "10px", borderRadius: "12px" }}
          >
            <Home className="w-5 h-5" />
            <span className="font-semibold">Home</span>
          </motion.button>

          {/* New Analysis Button */}
          <motion.button
            onClick={() => navigate("/detection")}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-800/80 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400 rounded-xl text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: "10px", borderRadius: "12px" }}
          >
            <RotateCcw className="w-5 h-5" />
            <span className="font-semibold">New Analysis</span>
          </motion.button>

          {/* Export Data Button */}
          <motion.button
            onClick={handleDownload}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: "10px", borderRadius: "12px" }}
          >
            <Download className="w-5 h-5" />
            <span className="font-semibold">Export Data</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default CSVResultsPage;
