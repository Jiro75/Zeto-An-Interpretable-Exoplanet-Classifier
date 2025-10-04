import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Telescope,
  Search,
  Zap,
  Rocket,
  Globe,
  Stars,
  Menu,
  X,
} from "lucide-react";
import "../styles/home.css";
import MilkyWayImage from "../../assets/milky-way.jpg";
import CsvImage from "../../assets/csv-image.png";
interface Planet {
  name: string;
  size: number;
  distance: number;
  speed: number;
  color: string;
}

const planets: Planet[] = [
  { name: "Mercury", size: 8, distance: 60, speed: 4, color: "#FFA726" },
  { name: "Venus", size: 12, distance: 80, speed: 3, color: "#FF7043" },
  { name: "Earth", size: 14, distance: 100, speed: 2, color: "#42A5F5" },
  { name: "Mars", size: 10, distance: 120, speed: 1.5, color: "#EF5350" },
  { name: "Jupiter", size: 28, distance: 160, speed: 1, color: "#FFB74D" },
  { name: "Saturn", size: 24, distance: 200, speed: 0.8, color: "#FFCC02" },
  { name: "Uranus", size: 18, distance: 240, speed: 0.6, color: "#29B6F6" },
  { name: "Neptune", size: 16, distance: 280, speed: 0.4, color: "#3F51B5" },
];

function HomePage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const planetsRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const discoveryRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Planets revolve independent of scroll; keep ref for viewport but no scroll binding

  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: discoveryProgress } = useScroll({
    target: discoveryRef,
    offset: ["start end", "end start"],
  });

  // Hero animations
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "0%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2]);

  // Planet animations are time-based below (no scroll transforms)

  // Mission section

  // Discovery section
  const discoveryY = useTransform(
    discoveryProgress,
    [0, 1],
    ["150px", "-150px"]
  );
  const discoveryScale = useTransform(discoveryProgress, [0, 0.5], [0.8, 1]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 border-b border-gray-800"
        style={{
          boxShadow: "0 10px 1000px rgba(255, 255, 255, 0.5)",
          margin: "0 0 64px 0",
          backgroundColor: "rgba(0, 0, 0, 0)",
          zIndex: 1000,
          backdropFilter: "blur(80px)",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <div
          className="w-full flex justify-between px-8"
          style={{ height: "64px", alignItems: "center", paddingX: "30px" }}
        >
          {/* Left Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* Mobile: Hamburger Menu */}
            <div className="mobile-menu-btn items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-cyan-400 transition-colors p-2"
                aria-label="Toggle menu"
                style={{ cursor: "pointer" }}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Desktop: Section Links */}
            <div className="desktop-nav-links items-center">
              <button
                onClick={() => scrollToSection(planetsRef)}
                className="text-gray-300  transition-colors duration-200 text-m font-medium px-3 py-2"
                style={{ cursor: "pointer" }}
              >
                Challenge
              </button>
              <button
                onClick={() => scrollToSection(missionRef)}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-m font-medium px-3 py-2"
                style={{ cursor: "pointer", marginLeft: "1rem" }}
              >
                Solution
              </button>
              <button
                onClick={() => scrollToSection(discoveryRef)}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-m font-medium px-3 py-2"
                style={{ cursor: "pointer", marginLeft: "1rem" }}
              >
                How To Use
              </button>
            </div>
          </div>

          {/* Center: ZETO Logo */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <motion.h1
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundSize: "200% 200%",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onClick={() => scrollToSection(heroRef)}
            >
              ZETO
            </motion.h1>
          </div>

          {/* Right: Action Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="nav-action-btn  bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white overflow-hidden"
              onClick={() => {
                console.log("Button clicked!");
                navigate("/detection");
              }}
              style={{ cursor: "pointer" }}
            >
              <span className="flex items-center gap-2">
                <Rocket style={{ width: "1rem", height: "1rem" }} />
                <span className="nav-button-text-full">Zeto System</span>
                <span className="nav-button-text-short">Start</span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                borderTop: "1px solid rgb(31, 41, 55)",
                backgroundColor: "rgba(0, 0, 0, 0.95)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="px-4 py-4">
                <button
                  onClick={() => scrollToSection(planetsRef)}
                  className="w-full text-left text-gray-300 hover:text-cyan-400 transition-all duration-200 text-sm font-medium px-4 py-3 rounded-lg"
                  style={{
                    cursor: "pointer",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(31, 41, 55, 0.5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Challenge
                </button>
                <button
                  onClick={() => scrollToSection(missionRef)}
                  className="w-full text-left text-gray-300 hover:text-cyan-400 transition-all duration-200 text-sm font-medium px-4 py-3 rounded-lg"
                  style={{
                    cursor: "pointer",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(31, 41, 55, 0.5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Solution
                </button>
                <button
                  onClick={() => scrollToSection(discoveryRef)}
                  className="w-full text-left text-gray-300 hover:text-cyan-400 transition-all duration-200 text-sm font-medium px-4 py-3 rounded-lg"
                  style={{ cursor: "pointer", display: "block" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(31, 41, 55, 0.5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  How To Use
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <div
        ref={containerRef}
        className="min-h-screen"
        style={{ overflowX: "hidden", width: "100vw" }}
      >
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="h-screen relative flex items-center justify-center overflow-hidden pt-16"
          style={{
            y: heroY,
            opacity: heroOpacity,
            scale: heroScale,
            margin: "64px 0 0 0 ",
            width: "100vw",
            overflow: "hidden",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

          <motion.div
            className="text-center z-10 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.h1
              className="text-8xl md:text-9xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              ZETO
            </motion.h1>
            <motion.h2
              className="text-3xl md:text-5xl mb-8 text-blue-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              EXOPLANET DETECTION SYSTEM
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              AI-powered discovery of worlds beyond our solar system
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-cyan-400" />
          </motion.div>

          {/* Hero floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${20 + (i % 6) * 12}%`,
                top: `${20 + Math.floor(i / 6) * 15}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 0.9, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.section>

        {/* Planetary System Section */}
        <motion.section
          ref={planetsRef}
          className="min-h-screen relative flex flex-col items-center justify-start overflow-visible py-20"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          style={{ width: "100vw", overflow: "hidden" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none" />

          <div className="relative z-10 text-center mb-16">
            <motion.h2 className="text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Why Is It A Challenge?
            </motion.h2>
            <motion.p className="text-xl mb-6 text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
              In the vast expanse of space, billions of worlds await discovery.
              Each planet tells a story of cosmic evolution.
            </motion.p>
          </div>

          {/* Detection Challenges Containers */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 mb-16">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Image Container - Left */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl flex items-center justify-center"
                style={{ border: "1px solid rgba(163, 113, 255 ,0.5)" }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0 }}
              >
                <div className="w-full h-full min-h-[400px] relative overflow-hidden rounded-xl">
                  <img
                    src={MilkyWayImage}
                    alt="Milky Way Galaxy"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                  {/* Floating particles overlay */}
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        x: [0, 8, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Text Container - Right */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
                style={{ border: "1px solid rgba(163, 113, 255 ,0.5)" }}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  The Challenge of Detection
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6">
                  The main challenge in detecting exoplanets stems from the fact
                  that they are tiny, incredibly distant, and overwhelmed by the
                  light of their host star.
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                      Extreme Brightness Contrast
                    </h4>
                    <p className="text-gray-400 text-sm">
                      A star is about a billion times brighter than its orbiting
                      planet—like spotting a firefly next to a giant spotlight.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">
                      Angular Separation
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Exoplanets appear incredibly close to their stars from our
                      distant perspective, making separation nearly impossible.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">
                      Indirect Methods
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Astronomers detect minute effects: tiny light dips during
                      transits or stellar "wobbles" of just 9 cm/second.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Animated Solar System */}
          <motion.div
            className="absolute left-0 right-0 bottom-0 overflow-visible"
            style={{ pointerEvents: "none", top: "500px" }}
          >
            {/* Sun positioned half outside on the right */}
            {(() => {
              const sunSize = 200; // px
              return (
                <motion.div
                  className="absolute bg-yellow-400 rounded-full"
                  style={{
                    width: sunSize,
                    height: sunSize,
                    top: "50%",
                    right: -sunSize / 2,
                    transform: "translateY(-50%)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 40px #FFD700",
                      "0 0 80px #FFD700",
                      "0 0 40px #FFD700",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              );
            })()}

            {/* Orbital center anchored at sun center */}
            {(() => {
              const sunSize = 200;
              const centerStyle = {
                position: "absolute" as const,
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
              };
              return (
                <div style={centerStyle}>
                  {planets.map((planet, index) => {
                    const minClearance = 50 + planet.size;
                    const baseRadius = sunSize / 2 + minClearance;
                    const radiusStep = 35;
                    const orbitRadius = baseRadius + index * radiusStep;
                    const duration = 10 / planet.speed;

                    return (
                      <motion.div
                        key={planet.name}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          transformOrigin: "0 0",
                          willChange: "transform",
                        }}
                        initial={{ rotate: index * 45 }}
                        animate={{ rotate: index * 45 + 360 }}
                        transition={{
                          duration: duration,
                          repeat: Infinity,
                          ease: "linear",
                          repeatType: "loop",
                        }}
                      >
                        <div
                          className="rounded-full"
                          style={{
                            width: planet.size * 2,
                            height: planet.size * 2,
                            backgroundColor: planet.color,
                            marginLeft: orbitRadius,
                            boxShadow: `0 0 20px ${planet.color}`,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              );
            })()}
          </motion.div>
        </motion.section>

        {/* Mission Details Section */}
        <motion.section
          ref={missionRef}
          className="min-h-screen flex-col flex items-center justify-center px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ width: "100vw", overflow: "hidden" }}
        >
          <div className="relative z-10 text-center mb-16 ">
            <motion.h2 className="text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Our Solution
            </motion.h2>
            <motion.p className="text-xl mb-6 text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
              Analyzing space mission data with AI to identify and confirm
              exoplanets.
            </motion.p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Telescope className="w-16 h-16" />,
                title: "Data Foundation",
                description:
                  "ZETO combines data from three major exoplanet missions (Kepler, TESS, and K2), carefully cleaned and standardized to focus on nine key features related to orbital and stellar properties.",
                planet: planets[0], // Mercury
              },
              {
                icon: <Globe className="w-16 h-16" />,
                title: "Model Training",
                description:
                  "Deep learning models classify planetary candidates by size, composition, and orbital characteristics to determine habitability potential.",
                planet: planets[2], // Earth
              },
              {
                icon: <Stars className="w-16 h-16" />,
                title: "Prediction Pipeline",
                description:
                  "Expanding humanity's understanding of the universe by cataloging new worlds and advancing our search for life beyond Earth.",
                planet: planets[4], // Jupiter
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center relative flex-col bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl flex items-center justify-center"
                style={{
                  y: useTransform(missionProgress, [0, 0.5, 1], [100, 0, -100]),
                  rotate: useTransform(
                    missionProgress,
                    [0, 0.2],
                    [0, index % 2 === 0 ? 0 : 0]
                  ),
                }}
              >
                {/* Floating planet background */}

                <motion.div
                  className="text-cyan-400 mb-6 relative z-10"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Discovery Showcase Section */}
        <motion.section
          ref={discoveryRef}
          className="min-h-screen flex-col flex items-center justify-center px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ width: "100vw", overflow: "hidden" }}
        >
          <div className="relative z-10 text-center mb-16">
            <motion.h2 className="text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              How To Use
            </motion.h2>
            <motion.p className="text-xl mb-6 text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
              Two simple ways to get predictions from Zeto for your exoplanet
              data.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-12">
            {/* Chat Card */}
            <motion.div
              className="text-center relative flex-col bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl flex items-center justify-center"
              style={{
                y: useTransform(discoveryProgress, [0, 0.5, 1], [100, 0, -100]),
              }}
            >
              <motion.div
                className="text-cyan-400 mb-6 relative z-10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Globe className="w-16 h-16" />
              </motion.div>
              <h3 className="text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Chat with Zeto
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Simply talk to Zeto and provide the 9 required parameters:
                orbital period, transit depth, transit duration, planet radius,
                insolation flux, equilibrium temperature, stellar effective
                temperature, stellar log(g), and stellar radius. Each parameter
                should be within its valid range. Once you provide them, Zeto
                will instantly predict whether the planet is a False Positive,
                Candidate, or Confirmed.
              </p>
            </motion.div>

            {/* CSV Upload Card */}
            <motion.div
              className="text-center relative flex-col bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl flex items-center justify-center"
              style={{
                y: useTransform(discoveryProgress, [0, 0.5, 1], [100, 0, -100]),
              }}
            >
              <motion.div
                className="text-cyan-400 mb-6 relative z-10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Rocket className="w-16 h-16" />
              </motion.div>
              <h3 className="text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Upload a CSV File
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                If you prefer bulk predictions, you can upload a CSV file
                containing exactly 9 columns, named using the abbreviations:
                orbper, trandep, trandur, rade, insol, eqt, teff, logg, rad.
                Zeto will process the file and return a new CSV with an
                additional column showing the prediction result for each entry.
              </p>

              {/* Image Placeholder */}
              <div className="flex flex-col w-full max-w-2xl mx-auto bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                <p className="text-cyan-500 text-sm mb-2">
                  CSV Format Example Image
                </p>
                <img
                  src={CsvImage}
                  alt="CSV Format Example"
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section
          ref={finalRef}
          className="h-screen flex items-center justify-center relative overflow-hidden px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ width: "100vw", overflow: "hidden" }}
        >
          <motion.div
            className="text-center z-10 relative max-w-4xl mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="final-title mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Begin Your Journey
            </motion.h2>
            <p className="final-paragraph text-gray-300 mb-6 max-w-3xl mx-auto px-4">
              Launch Zeto's AI detection system and embark on humanity's
              greatest adventure
            </p>
            <motion.button
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white overflow-hidden"
              onClick={() => navigate("/detection")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="final-rocket" />
                <span className="final-button-text-desktop">
                  Launch Zeto System
                </span>
                <span className="final-button-text-mobile">Launch</span>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* Final animated solar system - (No changes needed here as they were not responsive utility classes) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {planets.map((planet, index) => {
              const orbitRadius = 100 + index * 40;
              return (
                <motion.div
                  key={`final-${planet.name}`}
                  className="absolute"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 60 / planet.speed,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full opacity-30"
                    style={{
                      backgroundColor: planet.color,
                      marginLeft: orbitRadius,
                      boxShadow: `0 0 10px ${planet.color}`,
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}

export default HomePage;
