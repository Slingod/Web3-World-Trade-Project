// src/components/Countdown/Countdownhome.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useAnimate } from 'framer-motion';
import './Countdownhome.css'; // Import the styles css files

const COUNTDOWN_FROM = '2025-03-01';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = () => {
  return (
    <div className="countdown-container">
      <div className="countdown-items">
        <CountdownItem unit="Day" text="days" />
        <CountdownItem unit="Hour" text="hours" />
        <CountdownItem unit="Minute" text="minutes" />
        <CountdownItem unit="Second" text="seconds" />
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text }) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className="countdown-item">
      <div className="countdown-value">
        
        <span ref={ref} className="countdown-time">
          {time}
        </span>
      </div>
      <span className="countdown-text">{text}</span>
    </div>
  );
};

export default ShiftingCountdown;

const useTimer = (unit) => {
  const [ref, animate] = useAnimate();

  const intervalRef = useRef(null);
  const timeRef = useRef(0);

  const [time, setTime] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;

    if (unit === 'Day') {
      newTime = Math.floor(distance / DAY);
    } else if (unit === 'Hour') {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === 'Minute') {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(
        ref.current,
        { y: ['0%', '-50%'], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Enter animation
      await animate(
        ref.current,
        { y: ['50%', '0%'], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};
