import React from "react";
import { Link } from "react-router-dom";
import '../index.css';

export default function Page({ children, title }) {
  return (
    <div className="page-container">
      <header className="header">
        <div className="header-content">
          <h1>RandoMe</h1>
          <Link to="/" className="back-link">
            <div className="back-icon-bg">
              <img src="RandoMe/images/BackIcon.png" alt="Back" />
            </div>
          </Link>
        </div>
      </header>

      <main className="main">
        {title && <h2>{title}</h2>}
        {children}
      </main>
    </div>
  );
}
