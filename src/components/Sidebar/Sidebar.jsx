import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { menuSlide } from "../../ui/Anime/anime";
import "./Sidebar.scss";

export function Sidebar() {
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="menu"
    >
      <div className="body">
        <div className="nav">
          <div className="nav-header">
            <p>EMPLOYEES</p>
          </div>
          <ul>
            <li>
              <Link to="/">Employees</Link>
            </li>
            <li>
              <Link to="/statistics">Statistics</Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
