import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Bot,
  User,
  AlertCircle,
  Upload,
  FileText,
  X,
} from "lucide-react";
import "../styles/chat.css";

interface Question {
  id: string;
  question: string;
  type: string;
  placeholder: string;
  hint: string;
  min: number;
  max: number;
  apiKey: string;
}

interface Message {
  id: string;
  content: string;
  sender: "bot" | "user";
  timestamp: Date;
  isError?: boolean;
}

const questions: Question[] = [
  {
    id: "orbital_period",
    apiKey: "orbper",
    question: "What is the orbital period in days?",
    type: "number",
    placeholder: "e.g., 1",
    hint: "Time for one complete orbit around the star (0.16 - 35.9 days)",
    min: 0.16,
    max: 35.9,
  },
  {
    id: "transit_depth",
    apiKey: "trandep",
    question: "What is the transit depth in ppm?",
    type: "number",
    placeholder: "e.g., 100",
    hint: "How much the star dims during transit (0.05 - 14187.7 ppm)",
    min: 0.05,
    max: 14187.7,
  },
  {
    id: "transit_duration",
    apiKey: "trandur",
    question: "What is the transit duration in hours?",
    type: "number",
    placeholder: "e.g., 3.5",
    hint: "How long the transit lasts (0 - 7.87 hours)",
    min: 0,
    max: 7.87,
  },
  {
    id: "planet_radius",
    apiKey: "rade",
    question: "What is the planet radius in Earth radii?",
    type: "number",
    placeholder: "e.g., 1.2",
    hint: "Size relative to Earth (0.08 - 26.36 Earth radii)",
    min: 0.08,
    max: 26.36,
  },
  {
    id: "insolation_flux",
    apiKey: "insol",
    question: "What is the insolation flux in Earth flux units?",
    type: "number",
    placeholder: "e.g., 1.0",
    hint: "Amount of stellar energy received (0.015 - 1366.64 Earth flux units)",
    min: 0.015,
    max: 1366.64,
  },
  {
    id: "equilibrium_temp",
    apiKey: "eqt",
    question: "What is the equilibrium temperature in Kelvin?",
    type: "number",
    placeholder: "e.g., 288",
    hint: "Expected surface temperature (97 - 2146 K)",
    min: 97,
    max: 2146,
  },
  {
    id: "stellar_temp",
    apiKey: "teff",
    question: "What is the stellar effective temperature in Kelvin?",
    type: "number",
    placeholder: "e.g., 5778",
    hint: "Temperature of the host star (2828 - 7257 K)",
    min: 2828,
    max: 7257,
  },
  {
    id: "stellar_logg",
    apiKey: "logg",
    question: "What is the stellar log(g) in cm/s²?",
    type: "number",
    placeholder: "e.g., 4.5",
    hint: "Surface gravity of the star (3.89 - 4.91)",
    min: 3.89,
    max: 4.91,
  },
  {
    id: "stellar_radius",
    apiKey: "rad",
    question: "What is the stellar radius in solar radii?",
    type: "number",
    placeholder: "e.g., 1.0",
    hint: "Size relative to the Sun (0.16 - 2.07 solar radii)",
    min: 0.16,
    max: 2.07,
  },
];

const CSV_API_CONFIG = {
  enabled: true, // Set to true when backend is ready
  endpoint: "https://web-production-10e6.up.railway.app//api/analyze_csv", // Backend API endpoint for CSV processing
  timeout: 300000, // Request timeout in milliseconds
};

function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCsv, setIsCsv] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // A function to handle the entire greeting sequence
    const startGreeting = async () => {
      // 1. Initial greeting
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addMessage(
        "Hello, Commander! I'm Zeto, your AI exoplanet detection assistant. I'll help you analyze astronomical data to determine if we've found a new world.",
        "bot"
      );

      // 2. Introduction to the task
      await new Promise((resolve) => setTimeout(resolve, 2500));
      addMessage(
        "I need to collect some parameters from your observations. Let's begin!",
        "bot"
      );

      // 3. Ask the first question
      await new Promise((resolve) => setTimeout(resolve, 1500));
      askNextQuestion();
    };

    startGreeting();
  }, []); // Only runs once on mount

  // Ask next question whenever currentQuestion changes (except on mount)
  useEffect(() => {
    if (currentQuestion > 0 && currentQuestion < questions.length) {
      setTimeout(() => {
        askNextQuestion();
      }, 1500);
    }
  }, [currentQuestion]);

  const addMessage = (
    content: string,
    sender: "bot" | "user",
    delay = 0,
    isError = false
  ) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + Math.random()).toString(),
          content,
          sender,
          timestamp: new Date(),
          isError,
        },
      ]);
    }, delay);
  };

  const typeMessage = async (
    content: string,
    sender: "bot" | "user",
    isError = false
  ) => {
    // setIsTyping(true);
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );
    setIsTyping(false);
    addMessage(content, sender, 0, isError);
  };

  const askNextQuestion = () => {
    if (currentQuestion < questions.length) {
      const question = questions[currentQuestion];

      // Combine the question and the hint into a single message
      const combinedMessage = `${question.question}\n\n💡 ${question.hint}`;

      setTimeout(() => {
        // Use typeMessage to send the combined message
        typeMessage(combinedMessage, "bot");

        // Remove the separate setTimeout for the hint
        // setTimeout(() => {
        //   addMessage(`💡 ${question.hint}`, "bot");
        // }, 1500);
      }, 500);
    }
  };

  const validateInput = (
    value: number,
    question: Question
  ): { valid: boolean; message?: string } => {
    if (isNaN(value)) {
      return { valid: false, message: "Please enter a valid number." };
    }
    if (value < question.min || value > question.max) {
      return {
        valid: false,
        message: `Value must be between ${question.min} and ${question.max}.`,
      };
    }
    return { valid: true };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const question = questions[currentQuestion];
    const inputValue = parseFloat(userInput);

    // Validate input
    const validation = validateInput(inputValue, question);

    // Display user's input
    addMessage(userInput, "user");

    if (!validation.valid) {
      // Show error message
      setTimeout(() => {
        addMessage(
          `⚠️ ${validation.message} Please try again.`,
          "bot",
          0,
          true
        );
      }, 500);
      setUserInput("");
      return; // Exit early if validation fails
    }

    // Store parameter with API key (only if validation passed)
    setParameters((prev) => ({
      ...prev,
      [question.apiKey]: inputValue,
    }));

    setUserInput("");

    // Move to next question or complete
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        addMessage("Got it! Next parameter...", "bot");
      }, 500);

      // Just update the state - the useEffect will handle asking the next question
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 500);
    } else {
      setIsComplete(true);
      setIsCsv(false);
      setTimeout(() => {
        typeMessage(
          "Perfect! I have all the data I need. Initiating Zeto deep space analysis...",
          "bot"
        );
      }, 1000);
      setTimeout(() => {
        navigate("/analysis", { state: { parameters } });
      }, 3500);
    }
  };

  /**
   * Parse CSV file and convert to array of objects
   */
  const parseCSV = (csvText: string): Record<string, number>[] | null => {
    try {
      const lines = csvText.trim().split("\n");
      if (lines.length < 2) {
        throw new Error(
          "CSV file must have at least a header row and one data row"
        );
      }

      console.log("CSV Lines:", lines);
      console.log("CSV Lines[0]:", lines[0]);

      // Parse header
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      console.log("CSV Headers:", headers);

      // Map CSV columns to API keys
      const csvToApiKeyMap: Record<string, string> = {
        orbital_period: "orbper",
        orbper: "orbper",
        transit_depth: "trandep",
        trandep: "trandep",
        transit_duration: "trandur",
        trandur: "trandur",
        planet_radius: "rade",
        rade: "rade",
        insolation_flux: "insol",
        insol: "insol",
        equilibrium_temp: "eqt",
        eqt: "eqt",
        stellar_temp: "teff",
        teff: "teff",
        stellar_logg: "logg",
        logg: "logg",
        stellar_radius: "rad",
        rad: "rad",
      };

      // Create mapping of header positions to API keys
      const requiredKeys = questions.map((q) => q.apiKey);
      const headerIndexMap: Record<string, number> = {};

      headers.forEach((header, index) => {
        const apiKey = csvToApiKeyMap[header];
        if (apiKey) {
          headerIndexMap[apiKey] = index;
        }
      });

      // Validate that we have all required parameters
      const missingKeys = requiredKeys.filter(
        (key) => !(key in headerIndexMap)
      );
      if (missingKeys.length > 0) {
        throw new Error(
          `Missing required parameters: ${missingKeys.join(", ")}`
        );
      }

      // Parse data rows and convert to array of objects
      const dataRows: Record<string, number>[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim());
        const rowObject: Record<string, number> = {};

        // Extract values and create object with API keys
        for (const key of requiredKeys) {
          const index = headerIndexMap[key];
          const numValue = parseFloat(values[index]);

          if (isNaN(numValue)) {
            throw new Error(
              `Invalid value for ${key} in row ${i}: ${values[index]}`
            );
          }

          rowObject[key] = numValue;
        }

        dataRows.push(rowObject);
      }

      console.log("Parsed CSV Data Rows:", dataRows);
      return dataRows;
    } catch (error) {
      console.error("CSV parsing error:", error);
      return null;
    }
  };

  /**
   * Handle CSV file upload
   */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      addMessage("⚠️ Please upload a CSV file", "bot", 0, true);
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    addMessage(`📄 Uploaded: ${file.name}`, "user");

    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      console.log("Parsed CSV Data:", parsedData);

      if (!parsedData) {
        addMessage(
          "⚠️ Failed to parse CSV. Please ensure it has the correct format with all required parameters.",
          "bot",
          500,
          true
        );
        setIsUploading(false);
        setUploadedFile(null);
        return;
      }

      // If API is enabled, send to backend
      if (CSV_API_CONFIG.enabled) {
        console.log("Sending CSV data to backend:", parsedData);
        await sendCSVToBackend(parsedData);
      } else {
        // Store parameters and proceed
        setParameters(parsedData);
        setIsComplete(true);
        setIsCsv(true); // Set this before navigating

        setTimeout(() => {
          addMessage(
            "✅ CSV data loaded successfully! Initiating Zeto deep space analysis...",
            "bot"
          );
        }, 500);

        setTimeout(() => {
          navigate("/analysis", {
            state: {
              parameters: parsedData,
              isCsv: true, // Pass true directly instead of using state variable
            },
          });
        }, 2500);
      }
    } catch (error) {
      addMessage(
        `⚠️ Error reading file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "bot",
        500,
        true
      );
      setUploadedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Send CSV data to backend API
   */
  const sendCSVToBackend = async (data: Record<string, number>[]) => {
    addMessage("🚀 Sending data to backend for analysis...", "bot", 500);
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      CSV_API_CONFIG.timeout
    );

    try {
      console.log("Sending to backend");

      const response = await fetch(CSV_API_CONFIG.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Backend response:", result);

      addMessage("✅ Data sent to backend successfully!", "bot", 500);
      setIsComplete(true);
      setIsCsv(true); // Set this before navigating

      // Navigate with backend response
      setTimeout(() => {
        navigate("/analysis", {
          state: {
            parameters: data,
            backendResult: result,
            isCsv: true, // Pass true directly
          },
        });
      }, 2000);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        addMessage("⚠️ Request timed out", "bot", 500, true);
      } else {
        addMessage(
          `⚠️ Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          "bot",
          500,
          true
        );
      }
      setIsUploading(false);
      setUploadedFile(null);
    }
  };

  /**
   * Send CSV data to backend API
   */
  // const sendCSVToBackend = async (data: Record<string, number>[]) => {
  //   addMessage("🚀 Sending data to backend for analysis...", "bot", 500);
  //   const controller = new AbortController();
  //   const timeoutId = setTimeout(
  //     () => controller.abort(),
  //     CSV_API_CONFIG.timeout
  //   );

  //   try {
  //     console.log("in try");

  //     const response = await fetch(CSV_API_CONFIG.endpoint, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //       signal: controller.signal,
  //     });

  //     clearTimeout(timeoutId);

  //     if (!response.ok) {
  //       throw new Error(`API error: ${response.status} ${response.statusText}`);
  //     }

  //     const result = await response.json();
  //     console.log("Backend response:", result);

  //     addMessage("✅ Data sent to backend successfully!", "bot", 500);

  //     // Navigate with backend response
  //     setTimeout(() => {
  //       navigate("/analysis", {
  //         state: { parameters: data, backendResult: result },
  //       });
  //     }, 2000);
  //   } catch (error) {
  //     if (error instanceof Error && error.name === "AbortError") {
  //       throw new Error("Request timed out");
  //     }
  //     throw error;
  //   }
  // };

  /**
   * Clear uploaded file
   */
  const handleClearFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    addMessage("📄 File removed", "bot");
  };

  return (
    <div
      className=" min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col"
      style={{ hieght: "100vh", overflow: "hidden" }}
    >
      {/* Header */}
      <motion.header
        className="p-6 border-b border-blue-500/30 fixed  top-0 left-0 "
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          boxShadow: "0 10px 1000px rgba(0, 0, 0, 0.5)",
          margin: "0 0 64px 0",
          backgroundColor: "rgba(0, 0, 0, 0)",
          zIndex: 1000,
          backdropFilter: "blur(50px)",
          width: "100%",
        }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Zeto Detection Assistant
            </h1>
            <p className="text-gray-400">AI-Powered Exoplanet Analysis</p>
          </div>
        </div>
      </motion.header>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4"
        style={{ marginTop: "128px" }}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isError
                      ? "bg-gradient-to-r from-red-500 to-orange-500"
                      : "bg-gradient-to-r from-cyan-400 to-blue-500"
                  }`}
                  animate={{
                    boxShadow: message.isError
                      ? [
                          "0 0 10px rgba(239, 68, 68, 0.5)",
                          "0 0 20px rgba(239, 68, 68, 0.8)",
                          "0 0 10px rgba(239, 68, 68, 0.5)",
                        ]
                      : [
                          "0 0 10px rgba(0, 212, 255, 0.5)",
                          "0 0 20px rgba(0, 212, 255, 0.8)",
                          "0 0 10px rgba(0, 212, 255, 0.5)",
                        ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {message.isError ? (
                    <AlertCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </motion.div>
              )}

              <motion.div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto"
                    : message.isError
                    ? "bg-red-900/30 text-red-200 backdrop-blur-sm border border-red-500/30"
                    : "bg-gray-800/80 text-gray-100 backdrop-blur-sm border border-cyan-500/20"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {message.content}
              </motion.div>

              {message.sender === "user" && (
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-800/80 px-4 py-3 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!isComplete && currentQuestion < questions.length && !isTyping && (
        <motion.form
          onSubmit={handleSubmit}
          className="p-6 border-t border-blue-500/30"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex gap-3">
            <input
              type={questions[currentQuestion]?.type || "text"}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={
                questions[currentQuestion]?.placeholder ||
                "Type your response..."
              }
              className="flex-1 bg-gray-800/80 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm"
              autoFocus
              step="any"
            />
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 p-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!userInput.trim()}
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* CSV Upload Section */}
          <div className="file-container">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="upload-button">
              <Upload className="upload-icon" />
              <span className="upload-button-text">Upload CSV</span>
            </label>

            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="file-chip"
              >
                <FileText className="file-chip-icon" />
                <span className="file-chip-text">{uploadedFile.name}</span>
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="clear-button"
                >
                  <X className="clear-icon" />
                </button>
              </motion.div>
            )}

            {isUploading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="spinner"
              />
            )}
          </div>

          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.form>
      )}

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
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
}

export default ChatbotPage;
