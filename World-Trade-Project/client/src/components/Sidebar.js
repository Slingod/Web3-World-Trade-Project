import React, { useState } from "react";
import { 
    FiBarChart, 
    FiChevronsRight, 
    FiDollarSign, 
    FiHome, 
    FiMonitor, 
    FiShoppingCart, 
    FiTag, 
    FiUsers 
  } from "react-icons/fi";
  
import { motion } from "framer-motion";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      style={{
        width: open ? "225px" : "60px",
        backgroundColor: "#23272a",
        color: "#ffffff",
        height: "100vh", //  Max height
        borderRight: "2px solid #ffffff22",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TitleSection open={open} />

      <div style={{ width: "100%" }}>
        <Option Icon={FiHome} title="Dashboard" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiDollarSign} title="Sales" selected={selected} setSelected={setSelected} open={open} notifs={3} />
        <Option Icon={FiMonitor} title="View Site" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiShoppingCart} title="Products" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiTag} title="Tags" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiBarChart} title="Analytics" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiUsers} title="Members" selected={selected} setSelected={setSelected} open={open} />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
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
        backgroundColor: selected === title ? "#7289da" : "transparent",
        borderRadius: "5px",
        color: selected === title ? "white" : "#b9bbbe",
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

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: "absolute",
            right: "15px",
            backgroundColor: "#ff3860",
            color: "white",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
          }}
        >
          {notifs}
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
          <span style={{ fontSize: "12px", color: "#b9bbbe" }}>Pro Plan</span>
        </motion.div>
      )}
    </div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      style={{
        position: "absolute",
        bottom: "20px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "#b9bbbe",
      }}
    >
      <FiChevronsRight style={{ fontSize: "24px", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
    </motion.button>
  );
};