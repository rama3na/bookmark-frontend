import React from "react";
import { Link } from "react-router-dom";
import "../allcss/Home.css";  

function Home() {
  return (
    <div className="home-container">
      
      <header className="home-header">
        <h1>📌 Bookmark Manager</h1>
        <p>Save, Organize, and Access Your Favorite Links Easily!</p>
      </header>
 
      <section className="home-about">
        <h2>What is Bookmark Manager?</h2>
        <p>
          Bookmark Manager is a **smart tool** that helps you **store, categorize, 
          and manage** your favorite web links effortlessly. Never lose track of 
          important websites again—everything is organized in one place!  
        </p>
      </section>
 
      <section className="home-features">
        <h2>🔹 Key Features</h2>
        <div className="features-grid">
          <div className="feature-box">
            <h3>📌 Save Links</h3>
            <p>One-click bookmarking for quick access to your favorite websites.</p>
          </div>
          <div className="feature-box">
            <h3>🗂 Categorization</h3>
            <p>Organize bookmarks into folders for easy browsing.</p>
          </div>
          <div className="feature-box">
            <h3>🔍 Search & Filter</h3>
            <p>Find saved bookmarks instantly using smart search filters.</p>
          </div>
          <div className="feature-box">
            <h3>🔒 Secure & Private</h3>
            <p>Authentication via Clerk ensures your data remains safe.</p>
          </div>
        </div>
      </section>
 
      <section className="home-cta">
        <p>Start organizing your bookmarks today!</p>
        
      </section>
    </div>
  );
}

export default Home;
