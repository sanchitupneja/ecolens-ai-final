import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TwinChat from './components/TwinChat';
import VisionScanner from './components/VisionScanner';
import Leagues from './components/Leagues';
import Marketplace from './components/Marketplace';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Core User Metrics State
  const [carbonSaved, setCarbonSaved] = useState(182.4); // in kg
  const [waterSaved, setWaterSaved] = useState(4200);   // in Liters
  const [wasteDiverted, setWasteDiverted] = useState(22.8); // in kg
  const [ecoCredits, setEcoCredits] = useState(420);    // Credits balance
  const [streakDays, setStreakDays] = useState(14);
  const [streakShields, setStreakShields] = useState(1);
  const [level, setLevel] = useState(8);
  const [xp, setXp] = useState(320); // out of 500 XP to next level

  // Active Reduction Actions State (Dashboard Toggles)
  const [actions, setActions] = useState({
    solar: false,
    bike: false,
    thermostat: false,
    meat: false
  });

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'twin',
      text: "Hello Maya! I am your AI Climate Twin. I model your resource footprint and simulate how lifestyle adjustments affect your future. Ask me anything like: 'What if I go vegetarian three days a week?' or 'How much carbon does switching to an EV save?'",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showChart: false
    }
  ]);

  // Purchased Vouchers State (Marketplace)
  const [unlockedVouchers, setUnlockedVouchers] = useState({});

  // XP addition helper
  const addXp = (amount) => {
    let newXp = xp + amount;
    let newLevel = level;
    while (newXp >= 500) {
      newXp -= 500;
      newLevel += 1;
      // Bonus credits for level up
      setEcoCredits(prev => prev + 100);
    }
    setXp(newXp);
    setLevel(newLevel);
  };

  // Toggle dynamic actions from Dashboard
  const handleToggleAction = (actionKey) => {
    const isActivating = !actions[actionKey];
    setActions(prev => ({ ...prev, [actionKey]: isActivating }));

    // Impact coefficients
    let carbonChange = 0;
    let waterChange = 0;
    let creditChange = 0;
    let xpChange = 0;

    switch (actionKey) {
      case 'solar':
        carbonChange = 24.0; // grid solar offset/month base rate
        creditChange = 60;
        xpChange = 80;
        break;
      case 'bike':
        carbonChange = 1.8;  // commute trip offset
        creditChange = 25;
        xpChange = 30;
        break;
      case 'thermostat':
        carbonChange = 0.8;  // daily smart adjust offset
        creditChange = 10;
        xpChange = 15;
        break;
      case 'meat':
        carbonChange = 3.2;  // meal swap offset
        waterChange = 1200;  // water saved
        creditChange = 20;
        xpChange = 25;
        break;
      default:
        break;
    }

    if (isActivating) {
      setCarbonSaved(prev => parseFloat((prev + carbonChange).toFixed(1)));
      if (waterChange > 0) setWaterSaved(prev => prev + waterChange);
      setEcoCredits(prev => prev + creditChange);
      addXp(xpChange);
    } else {
      setCarbonSaved(prev => parseFloat((prev - carbonChange).toFixed(1)));
      if (waterChange > 0) setWaterSaved(prev => prev - waterChange);
      setEcoCredits(prev => Math.max(0, prev - creditChange));
      setXp(prev => Math.max(0, prev - xpChange)); // Simple reverse xp for demo
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">🍀</div>
          <div className="logo-details">
            <span className="logo-text">TerraTwin</span>
            <div className="logo-sub">AI Operating System</div>
          </div>
        </div>

        <nav className="nav-links">
          <li className="nav-item">
            <button 
              className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="nav-icon">📊</span> Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeTab === 'twin-chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('twin-chat')}
            >
              <span className="nav-icon">🤖</span> AI Twin Coach
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeTab === 'scanner' ? 'active' : ''}`}
              onClick={() => setActiveTab('scanner')}
            >
              <span className="nav-icon">📷</span> OCR & Waste Scan
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeTab === 'leagues' ? 'active' : ''}`}
              onClick={() => setActiveTab('leagues')}
            >
              <span className="nav-icon">🏆</span> Leaderboards
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeTab === 'marketplace' ? 'active' : ''}`}
              onClick={() => setActiveTab('marketplace')}
            >
              <span className="nav-icon">🛍️</span> Eco-Marketplace
            </button>
          </li>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-summary">
            <div className="user-avatar-circle">👩‍💼</div>
            <div className="user-details">
              <span className="user-name">Maya Patel</span>
              <span className="user-role">Carbon Pioneer</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="main-content">
        {/* Top Header Metrics bar */}
        <header className="top-header">
          <div className="welcome-section">
            <h1>TerraTwin Ecosystem</h1>
            <p>Welcome back, Maya. Your digital twin is active.</p>
          </div>

          <div className="header-stats">
            {/* Level & XP */}
            <div className="header-stat-badge" title="Level Progress - Earn XP to level up!">
              <span className="stat-badge-icon">🎖️</span>
              <div className="stat-badge-info">
                <span className="stat-badge-label">Level {level}</span>
                <div style={{ width: '80px', height: '6px', background: '#2d3748', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(xp / 500) * 100}%`, height: '100%', background: '#10b981', transition: 'width 0.4s ease' }}></div>
                </div>
              </div>
            </div>

            {/* Streak */}
            <div className="header-stat-badge" title="Carbon reduction streak">
              <span className="stat-badge-icon animate-bounce-slow">🔥</span>
              <div className="stat-badge-info">
                <span className="stat-badge-label">Active Streak</span>
                <span className="stat-badge-value orange">{streakDays} Days</span>
              </div>
            </div>

            {/* Eco Credits */}
            <div className="header-stat-badge" title="Spent in Eco-Marketplace">
              <span className="stat-badge-icon">🍃</span>
              <div className="stat-badge-info">
                <span className="stat-badge-label">Eco-Credits</span>
                <span className="stat-badge-value emerald">{ecoCredits} CC</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Routing Panels */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            carbonSaved={carbonSaved}
            waterSaved={waterSaved}
            wasteDiverted={wasteDiverted}
            actions={actions}
            onToggleAction={handleToggleAction}
          />
        )}
        
        {activeTab === 'twin-chat' && (
          <TwinChat 
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        )}

        {activeTab === 'scanner' && (
          <VisionScanner 
            addCarbonSaved={(kg) => setCarbonSaved(prev => parseFloat((prev + kg).toFixed(1)))}
            addWasteDiverted={(kg) => setWasteDiverted(prev => parseFloat((prev + kg).toFixed(1)))}
            addCredits={(amount) => setEcoCredits(prev => prev + amount)}
            addXp={addXp}
          />
        )}

        {activeTab === 'leagues' && (
          <Leagues 
            ecoCredits={ecoCredits}
            setEcoCredits={setEcoCredits}
            streakShields={streakShields}
            setStreakShields={setStreakShields}
          />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace 
            ecoCredits={ecoCredits}
            setEcoCredits={setEcoCredits}
            unlockedVouchers={unlockedVouchers}
            setUnlockedVouchers={setUnlockedVouchers}
          />
        )}
      </main>
    </div>
  );
}

export default App;
