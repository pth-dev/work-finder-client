import React from 'react';
import './styles.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job</h1>
          <p>Discover thousands of job opportunities with all the information you need.</p>
          <div className="search-container">
            <input type="text" placeholder="Job title, keywords, or company" className="search-input" />
            <button className="search-button">Search</button>
          </div>
        </div>
      </section>

      <section className="featured-jobs">
        <h2>Featured Jobs</h2>
        <div className="jobs-grid">
          {/* Job cards would be mapped here */}
          <div className="job-card">
            <h3>Frontend Developer</h3>
            <p className="company">Tech Company Inc.</p>
            <p className="location">San Francisco, CA</p>
            <div className="tags">
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Remote</span>
            </div>
            <button className="apply-button">Apply Now</button>
          </div>

          <div className="job-card">
            <h3>UX Designer</h3>
            <p className="company">Design Studio</p>
            <p className="location">New York, NY</p>
            <div className="tags">
              <span className="tag">Figma</span>
              <span className="tag">UI/UX</span>
              <span className="tag">Hybrid</span>
            </div>
            <button className="apply-button">Apply Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
