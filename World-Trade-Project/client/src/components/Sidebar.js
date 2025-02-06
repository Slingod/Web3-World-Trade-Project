import React, { useState } from "react";
import {
    FiBarChart,
    FiBookOpen,
    FiChevronsRight,
    FiDollarSign,
    FiHome,
    FiMonitor,
    FiShoppingCart,
    FiTag,
    FiUsers
} from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      style={{
        width: open ? "225px" : "60px", 
        backgroundColor: "#1a202c",
        color: "#fff",
        height: "100vh", 
        borderRight: "2px solid #1a202c",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TitleSection open={open} />

      <div style={{ width: "100%" }}>
        <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Option Icon={FiHome} title="Home" selected={selected} setSelected={setSelected} open={open} />
        </a>
        <Option Icon={FiDollarSign} title="Sales" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiMonitor} title="Games" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiShoppingCart} title="Market" selected={selected} setSelected={setSelected} open={open} />
        <a href="https://paradox-8.gitbook.io/paradox" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
          <Option Icon={FiBookOpen} title="Wiki" selected={selected} setSelected={setSelected} open={open} />
        </a>
        <Option Icon={FiBarChart} title="Analytics" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiUsers} title="Members" selected={selected} setSelected={setSelected} open={open} />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "40px",
        padding: "10px",
        backgroundColor: selected === title ? "#EF5777" : "transparent",
        borderRadius: "50px",
        color: "white",
        cursor: "pointer",
        transition: "background 0.3s",
      }}
    >
      <motion.div style={{ width: "30px", textAlign: "center", fontSize: "18px" }}>
        <Icon />
      </motion.div>
      {open && (
        <motion.span style={{ marginLeft: "10px", fontSize: "14px" }}>
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div style={{ width: "100%", marginBottom: "20px", textAlign: "center" }}>
      {open && (
        <motion.div>
          <span style={{ display: "block", fontSize: "16px", fontWeight: "bold" }}>TomIsLoading</span>
        </motion.div>
      )}
    </div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((prev) => !prev)}
      style={{
        position: "absolute",
        bottom: "20px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "white",
      }}
    >
      <FiChevronsRight
        style={{
          fontSize: "24px",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s"
        }}
      />
    </motion.button>
  );
};

// ✅ Export default pour éviter l'erreur
export default Sidebar;
