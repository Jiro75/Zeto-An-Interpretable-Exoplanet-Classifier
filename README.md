# 🌍 Zeto - An Interpretable Exoplanet Classifier

<div align="center">

![Exoplanet](https://img.shields.io/badge/NASA-Space%20Apps-blue?style=for-the-badge&logo=nasa)
![Python](https://img.shields.io/badge/Python-3.8+-yellow?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![ML](https://img.shields.io/badge/Machine%20Learning-Scikit--learn-orange?style=for-the-badge)

**An intelligent, user-friendly platform for hunting exoplanets with AI**

[Demo](#-website-demo) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Team](#-team)

</div>

---

## 🌐 Website Demo
<img width="2516" height="1199" alt="image" src="https://github.com/user-attachments/assets/0dd78d15-1412-44c3-80e1-81de3a157c6a" />

<div align="center">

### [ZETO.App](https://zeto-fawn.vercel.app/)

</div>

## 🚀 Overview

**Zeto** is a comprehensive web-based platform that revolutionizes exoplanet discovery by automating the classification of celestial objects using machine learning. Built for the NASA Space Apps Challenge "A World Away: Hunting for Exoplanets with AI," Zeto transforms the tedious manual analysis of transit signals into an instant, accurate, and accessible experience.

### The Problem We're Solving

Space telescopes like Kepler, K2, and TESS generate massive amounts of data daily. Currently, astrophysicists must manually vet each transit signal to distinguish genuine exoplanets from false positives, a bottleneck that:
- **Slows down discovery** of potentially habitable worlds
- **Risks overlooking** novel exoplanets buried in data
- **Limits accessibility** for students and enthusiasts wanting to explore exoplanet science

### Our Solution

Zeto provides a **dual-input system** combining cutting-edge ML with an intuitive interface:
- 🤖 **Conversational Chatbot** for guided, engaging data submission
- 📊 **CSV Upload** for batch processing of research data
- 🎯 **Instant Classification** as Confirmed Planet, Candidate, or False Positive
- 🌟 **Habitability Scoring** for confirmed exoplanets
- 📈 **Detailed Characteristics** including planetary radius and orbital period

---

## ✨ Features

### 🧠 Intelligent Classification Engine
- **Ensemble Machine Learning** models (Random Forest, Gradient Boosting)
- Trained on consolidated datasets from Kepler, K2, and TESS missions
- **86-88% accuracy** with rigorous cross-validation
- Interpretable predictions using SHAP values

### 🌐 Interactive Web Platform
- **Conversational AI Chatbot** that guides users through data input
- **CSV Batch Upload** for researchers analyzing multiple objects
- **Real-time predictions** with instant results dashboard
- **Responsive design** built with React and Tailwind CSS

### 🔬 Scientific Value-Add
- Automatic calculation of exoplanet characteristics
- **Habitability score** (0-100%) based on astrophysical parameters
- Planet classification by type (terrestrial, super-Earth, Neptune-like, gas giant)
- Orbital mechanics visualization

### 📚 Educational & Accessible
- Designed for both expert astronomers and curious beginners
- Demystifies complex exoplanet hunting processes
- Perfect classroom tool for STEM education

---

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**
- **Flask** - RESTful API framework
- **Scikit-learn** - Machine learning models
- **Pandas** - Data manipulation
- **Matplotlib** - Visualization

### Frontend
- **React 18+** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **JavaScript (ES6+)**

### Data Sources
- NASA Kepler Objects of Interest (KOI) Dataset
- K2 Mission Confirmed Planets Dataset
- TESS (Transiting Exoplanet Survey Satellite) Dataset

---

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 14+ and npm
- Git

### Clone the Repository
```bash
git clone https://github.com/your-team/zeto-exoplanet-classifier.git
cd zeto-exoplanet-classifier
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

---

## 🎯 Usage

### For Researchers
1. **CSV Upload**: Prepare your transit data in CSV format with required features (transit depth, orbital period, etc.)
2. **Upload**: Drag and drop your CSV file into the platform
3. **Classify**: Get instant predictions for all objects in your dataset
4. **Analyze**: Review detailed characteristics and habitability scores

### For Students & Enthusiasts
1. **Chat Interface**: Click on the chatbot icon
2. **Discover**: Receive classification results with comprehensive analysis
3. **Learn**: Explore what makes a planet potentially habitable

### Example Input Features
```
- Orbital Period (days)
- Transit Depth (parts per million)
- Transit Duration (hours)
- Stellar Temperature (Kelvin)
- Stellar Radius (solar radii)
- Insolation Flux (Earth Flux)
```

---

## 🔬 Methodology

### 1. Data Consolidation & Feature Engineering
- Merged tabular datasets from Kepler, K2, and TESS missions
- Cleaned and normalized cross-mission data
- Selected most predictive features
- Handled extreme class imbalance

### 2. Model Training & Validation
- Trained ensemble methods (XGBoost)
- Rigorous cross-validation across different missions
- SHAP analysis for model interpretability
- Optimized for both accuracy and speed

### 3. Characterization Logic
- Implemented astrophysical calculations for planet properties
- Developed habitability scoring algorithm
- Classified planets by type based on radius and mass

### 4. Web Integration
- Built RESTful API with Flask
- Created responsive React frontend
- Integrated conversational AI chatbot
- End-to-end testing and deployment

---

## 📊 Performance

- **Accuracy**: 86-88% on validation sets
- **Speed**: Classification in <1 second per object
- **Scalability**: Batch processing of 1000+ objects
- **Cross-Mission Reliability**: Consistent performance across Kepler, K2, and TESS data

---

## 🌟 What Sets Zeto Apart

| Feature | Zeto | Traditional Methods |
|---------|------|---------------------|
| **Speed** | Instant classification | Days to weeks |
| **Accessibility** | Conversational UI + CSV | Expert-only tools |
| **Interpretability** | SHAP explanations | Black-box or manual |
| **Value-Add** | Habitability scores | Classification only |
| **User Base** | Researchers + Public | Researchers only |

---

## 👥 Team

### The Exo-Topians

**Data Preprocessing & Feature Engineering**
- **Mostafa Hany** - Biomedical Engineer | Data Cleaning & Feature Selection
- **Anas Mohammed** - Biomedical Engineer | Cross-Mission Data Consolidation

**Model Selection & Training**
- **Sandy Khalil** - Biomedical Engineer | ML Model Training & Validation
- **Muslim Ahmed** - Computer Engineer | Model Optimization & Characterization Logic

**Web Platform & Integration**
- **David Amir** - Biomedical Engineer | Frontend Development & UX Design
- **Ahmed Kamal** - Computer Engineer | Backend API & System Integration

---

## 📚 References

1. Shallue, C. J., & Vanderburg, A. (2018). Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain around K2-138 and an Eighth Planet around Kepler-90. *The Astronomical Journal*, 155(2), 94.

2. NASA Exoplanet Archive - [https://exoplanetarchive.ipac.caltech.edu/](https://exoplanetarchive.ipac.caltech.edu/)

3. Assessment of Ensemble-Based Machine Learning Algorithms for Exoplanet Identification

4. Machine Learning for Exoplanet Detection: A Comparative Analysis Using Kepler Data

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, improving documentation, or proposing new features, your input is valuable.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


---

## 🙏 Acknowledgments

- **NASA** for providing open-source exoplanet datasets
- **NASA Space Apps Cairo** for hosting this incredible challenge
- The **Kepler, K2, and TESS** missions for revolutionizing exoplanet science
- The open-source community for the amazing tools that made this possible

---

## 📧 Contact

For questions, feedback, or collaboration opportunities:
- **Team**: The Exo-Topians
- **Event**: NASA Space Apps Cairo 2025
- **Challenge**: A World Away: Hunting for Exoplanets with AI

---

<div align="center">

**Made with ❤️ by The Exo-Topians**

*Bringing the universe a little closer to everyone*

</div>
