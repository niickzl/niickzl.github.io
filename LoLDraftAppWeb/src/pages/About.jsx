import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">   
        <h1>About Nick's LoL Drafter...</h1>

        <div className="back-button-container">
          <Link to="/" className="back-button">
            ← Back to the main page
          </Link>
        </div>
        
        <section className="about-section">
          <h2>Why I made this:</h2>
          <p>
            I've been playing League of Legends for more than 6 years now (2019-2025).
            As this is the game I am passionate about, I decided to create this project with my coding expertise and my game knowledge.
          </p>
        </section>

        <section className="about-section">
          <h2>How this was made:</h2>
          <ul>
            <li>The majority of the frontend (React) was created with the assistance of LLMs</li>
            <li>The backend (algorithm) was designed by myself & created with the assistance of LLMs</li>
            <li>The mass champion statistics were generated with the assistance of LLMs (See prompt below)</li>
            <li>Champion statistics and the algorithm have went through multiple iterations and testing</li>
            <li>Manually modifying champion statistics, counter mapping, synergy mapping, etc.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>About me:</h2>
          <p>
            I am a peak Diamond 4 ADC/Support player. My rank may lower the credibility of this site,
            but I have led my highschool team making 3rd place in a local tournament (2023), 
            of which I did the drafting, pregame planning, and overall shot-calling. I've also temporarily positioned
            coach for an amateur team in 2022. Finally, I'm not sure if this matters but I am also an 8-time clash winner.

            <br /><br />Jokes aside, I am currently studying Computer Science at SFU, here is my <a 
            href="https://niickzl.github.io/" 
            style={{ color: '#ffffff', textDecoration: 'none', borderBottom: '1px solid #2563eb' }}
            onMouseOver={(e) => e.target.style.color = '#2563eb'}
            onMouseOut={(e) => e.target.style.color = '#ffffff'} target = "_blank">Website Hub</a>.
          </p>
        </section>

        <section className="about-section">
          <h2>Additional Information:</h2>
          <p>
            Download the champion statistics data: <a 
              href="/championStats.txt" 
              download="championStats.txt"
              style={{ color: '#ffffff', textDecoration: 'none', borderBottom: '1px solid #2563eb' }}
              onMouseOver={(e) => e.target.style.color = '#2563eb'}
              onMouseOut={(e) => e.target.style.color = '#ffffff'}
            >
              championStats.txt
            </a>
            <br /><br />
            Download the prompt used to generate that data: <a 
              href="/championStatsPrompt.txt" 
              download="championStatsPrompt.txt"
              style={{ color: '#ffffff', textDecoration: 'none', borderBottom: '1px solid #2563eb' }}
              onMouseOver={(e) => e.target.style.color = '#2563eb'}
              onMouseOut={(e) => e.target.style.color = '#ffffff'}
            >
              championStatsPrompt.txt
            </a>
          </p>
        </section>

        <div className="back-button-container">
          <Link to="/" className="back-button">
            ← Back to the main page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
