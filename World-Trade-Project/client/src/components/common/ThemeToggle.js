import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    button: (isActive) => ({
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "24px",
      color: isActive ? "#f39c12" : "#7f8c8d",
      transition: "color 0.3s ease-in-out",
    }),
    slider: {
      width: "30px",
      height: "10px",
      backgroundColor: theme === "dark" ? "#2c3e50" : "#ecf0f1",
      borderRadius: "10px",
      transition: "background-color 0.3s ease-in-out",
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.button(theme === "light")} onClick={() => setTheme("light")}>
        <FiSun />
      </button>
      <button style={styles.button(theme === "dark")} onClick={() => setTheme("dark")}>
        <FiMoon />
      </button>
      <motion.div layout transition={{ type: "spring", damping: 15, stiffness: 250 }} style={styles.slider} />
    </div>
  );
};

export default ThemeToggle;
