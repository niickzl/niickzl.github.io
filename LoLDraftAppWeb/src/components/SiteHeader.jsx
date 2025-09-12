import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "/favicon/favicon-32x32.png";

// READ ME Popup Component
const ReadMePopup = ({ onClose }) => {
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div ref={popupRef} className="readme-popup">
        <h3>Nick's LoL Drafter</h3>
        <p>This site helps you analyze champion picks and bans for your League of Legends games.</p>
        <h4>How to Use:</h4>
        <li>Click on "Swap Side" to switch between blue and red team (The left is your team)</li>
        <li>Toggle between banning and picking modes</li>
        <li>Use the search bar to find champions</li>
        <li>Use the role buttons to filter champions by role</li>
        <li>Click on a champion to ban or select them</li>
        <li>Click on selected or banned champion icons to remove them</li>
        <h4>Note:</h4>
        <li>Each number shows a champion's score for the current stage</li>
        <li>Patch updates, tier lists, & specific champion counters/synergies are not factored in calculations</li>
        <li>This site assumes that you have basic drafting knowledge</li>
        <li>DO NOT RELY ON THIS SITE FOR IMPORTANT DECISIONS</li>
        <h5>Read "About This Site :)" for more information</h5>
        <div className="popup-close" onClick={onClose}>×</div>
      </div>
    </div>
  );
};

export default function SiteHeader() {
  const [showReadMe, setShowReadMe] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      style={{
        padding: "10px 20px",
        backgroundColor: "#111",
        borderBottom: "1px solid #222",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          onClick={() => navigate("/index.html")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#fff",
            textDecoration: "none",
            cursor: "pointer"
          }}
        >
          <img src={logo} alt="Nick's LoL Drafter Logo" style={{ height: 32, width: 32 }} />
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Nick's LoL Drafter</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={() => setShowReadMe(true)}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '4px 12px',
            minWidth: '80px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
            height: '32px',
            fontSize: '0.9em'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          READ ME FIRSTTT !!!
        </button>
        <Link
          to="/about"
          style={{
            backgroundColor: '#0d8a6b',
            color: 'white',
            border: 'none',
            padding: '4px 12px',
            minWidth: '80px',
            borderRadius: '4px',
            cursor: 'pointer',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '32px',
            fontSize: '0.9em',
            boxSizing: 'border-box'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0c7a5f'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#0d8a6b'}
        >
          About This Site :)
        </Link>
      </div>

      {showReadMe && <ReadMePopup onClose={() => setShowReadMe(false)} />}
    </header>
  );
}


