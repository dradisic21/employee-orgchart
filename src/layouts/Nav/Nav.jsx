import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import "./Nav.scss";

export function Nav() {
  const [isMobileOpen, setMobileOpen] = useState(false);

  const handleMobileToggle = () => {
    setMobileOpen(!isMobileOpen);
  };

  const closeMobileToggle = () => {
    setMobileOpen(false);
  };

  return (
    <div className={`nav-container ${isMobileOpen ? "mobile-open" : ""}`}>
      <div>
        <ul className="nav-list">
          <Link to="/" onClick={closeMobileToggle}>
            <p className="text-shadow">Employee</p>
          </Link>
          <Link to="/statistics" onClick={closeMobileToggle}>
            <p className="text-shadow">Charts</p>
          </Link>
        </ul>

        <div className="mobile-toggle" onClick={handleMobileToggle}>
          <Hamburger size={24} toggled={isMobileOpen} toggle={setMobileOpen} />
        </div>
      </div>
    </div>
  );
}
