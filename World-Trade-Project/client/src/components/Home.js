import React, { useEffect } from 'react';
import ShiftingCountdown from "../components/ShiftingCountdown"; // Import the ShiftingCountdown component

const Home = () => {
  useEffect(() => {
    const progressBar = document.getElementById('progressBar');
    const percentageText = document.querySelector('.percentage');
    let width = 0;

    const interval = setInterval(() => {
      if (width >= 100) {
        width = 0;
      }
      width++;
      progressBar.style.width = width + '%';
      percentageText.textContent = width + '%';
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <h1 className="main-title">World Trade Project</h1>
      <h2>Work in Progress</h2>

      {/* Add coldown */}
      <ShiftingCountdown />

      <div className="progress-container">
        <div className="progress-bar" id="progressBar"></div>
      </div>
      <div className="percentage">0%</div>
      
      <div className="center-link">
        <a href="/current-version" className="link">Current Version</a>
      </div>

      
    </div>
  );
};

export default Home;
