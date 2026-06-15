import React, { useState, Suspense, lazy } from 'react';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useXPProgress } from './hooks/useXPProgress';
import { useCarbonActions } from './hooks/useCarbonActions';

// Lazy load route tabs to reduce initial bundle weight
const Dashboard = lazy(() => import('./components/Dashboard'));
const TwinChat = lazy(() => import('./components/TwinChat'));
const VisionScanner = lazy(() => import('./components/VisionScanner'));
const Leagues = lazy(() => import('./components/Leagues'));
const Marketplace = lazy(() => import('./components/Marketplace'));

/**
 * EcoLens AI Main Application Entry.
 * Implements code splitting, performance optimization, and robust error fallback.
 */
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Custom Progression Hook
  const { level, xp, ecoCredits, addXp, addCredits, setEcoCredits } = useXPProgress();
  
  // Custom Habits/Actions Hook
  const {
    carbonSaved,
    waterSaved,
    wasteDiverted,
    actions,
    handleToggleAction,
    setCarbonSaved,
    setWasteDiverted
  } = useCarbonActions({ addXp, addCredits });

  const streakDays = 14; 
  const [streakShields, setStreakShields] = useState(1);
  const [unlockedVouchers, setUnlockedVouchers] = useState({});

  // Chat messages initial state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'twin',
      text: "Hello Maya! I am your AI Climate Twin. I model your resource footprint and simulate how lifestyle adjustments affect your future. Ask me anything like: 'What if I go vegetarian three days a week?' or 'How much carbon does switching to an EV save?'",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showChart: false
    }
  ]);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar" role="navigation" aria-label="Main navigation menu">
        <div className="logo-container">
          <div className="logo-icon" aria-hidden="true">🍀</div>
          <div className="logo-details">
            <span className="logo-text">EcoLens AI</span>
            <div className="logo-sub">Climate Operating System</div>
          </div>
        </div>

        <nav>
          <ul className="nav-links" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            <li className="nav-item">
              <button 
                className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
                aria-current={activeTab === 'dashboard' ? 'page' : undefined}
                aria-label="View Dashboard"
              >
                <span className="nav-icon" aria-hidden="true">📊</span> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-button ${activeTab === 'twin-chat' ? 'active' : ''}`}
                onClick={() => setActiveTab('twin-chat')}
                aria-current={activeTab === 'twin-chat' ? 'page' : undefined}
                aria-label="View AI Twin Coach Chat"
              >
                <span className="nav-icon" aria-hidden="true">🤖</span> AI Twin Coach
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-button ${activeTab === 'scanner' ? 'active' : ''}`}
                onClick={() => setActiveTab('scanner')}
                aria-current={activeTab === 'scanner' ? 'page' : undefined}
                aria-label="View OCR Scanner"
              >
                <span className="nav-icon" aria-hidden="true">📷</span> OCR & Waste Scan
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-button ${activeTab === 'leagues' ? 'active' : ''}`}
                onClick={() => setActiveTab('leagues')}
                aria-current={activeTab === 'leagues' ? 'page' : undefined}
                aria-label="View Leaderboards"
              >
                <span className="nav-icon" aria-hidden="true">🏆</span> Leaderboards
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-button ${activeTab === 'marketplace' ? 'active' : ''}`}
                onClick={() => setActiveTab('marketplace')}
                aria-current={activeTab === 'marketplace' ? 'page' : undefined}
                aria-label="View Eco-Marketplace"
              >
                <span className="nav-icon" aria-hidden="true">🛍️</span> Eco-Marketplace
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-summary" aria-label="User Profile">
            <div className="user-avatar-circle" aria-hidden="true">👩‍💼</div>
            <div className="user-details">
              <span className="user-name">Maya Patel</span>
              <span className="user-role">Carbon Pioneer</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="main-content" id="main-content" tabIndex="-1">
        <header className="top-header">
          <div className="welcome-section">
            <h1>EcoLens AI Ecosystem</h1>
            <p>Welcome back, Maya. Your digital twin is active.</p>
          </div>

          <div className="header-stats" role="region" aria-label="Progression metrics">
            {/* Level & XP */}
            <div className="header-stat-badge" title={`Level ${level} - ${(xp / 500) * 100}% towards next level`} tabIndex="0">
              <span className="stat-badge-icon" aria-hidden="true">🎖️</span>
              <div className="stat-badge-info">
                <span className="stat-badge-label">Level {level}</span>
                <div 
                  role="progressbar"
                  aria-valuenow={xp}
                  aria-valuemin="0"
                  aria-valuemax="500"
                  aria-label="Experience points"
                  style={{ width: '80px', height: '6px', background: '#2d3748', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}
                >
                  <div style={{ width: `${(xp / 500) * 100}%`, height: '100%', background: '#10b981', transition: 'width 0.4s ease' }}></div>
                </div>
              </div>
            </div>

            {/* Streak */}
            <div className="header-stat-badge" title="Daily logging streak" tabIndex="0">
              <span className="stat-badge-icon animate-bounce-slow" aria-hidden="true">🔥</span>
              <div className="stat-badge-info">
                <span className="stat-badge-label">Active Streak</span>
                <span className="stat-badge-value orange">{streakDays} Days</span>
              </div>
            </div>

            {/* Eco Credits */}
            <div className="header-stat-badge" title="Eco-credits balance" tabIndex="0">
              <span className="stat-badge-icon" aria-hidden="true">🍃</span>
              <div className="stat-badge-info">
                <span className="stat-badge-label">Eco-Credits</span>
                <span className="stat-badge-value emerald">{ecoCredits} CC</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Routing Panels wrapped in ErrorBoundary & Suspense */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
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
                addCredits={(amount) => addCredits(amount)}
                addXp={addXp}
              />
            )}

            {activeTab === 'leagues' && (
              <Leagues 
                ecoCredits={ecoCredits}
                setEcoCredits={setEcoCredits}
                streakShields={streakShields}
                setStreakShields={setStreakShields}
                addXp={addXp}
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
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
