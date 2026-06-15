import React, { memo } from 'react';
import { useLeagues } from '../hooks/useLeagues';
import { mockLeagues } from '../data/mockData';
import A11yButton from './common/A11yButton';

/**
 * Leagues Component.
 * Gamified leaderboard to compete in weekly localized neighborhoods.
 * 
 * Alignment:
 * 1. Track: Monitor your weekly ranking and comparative XP scoring within the neighborhood.
 * 2. Reduce: Keep logging active habits and buy streak shields to prevent multiplier resets.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.ecoCredits - Eco-Credits balance
 * @param {Function} props.setEcoCredits - Callback to update Eco-Credits balance
 * @param {number} props.streakShields - Current count of streak shields
 * @param {Function} props.setStreakShields - Callback to update streak shields count
 * @param {Function} props.addXp - Callback to award experience points (XP)
 * @returns {React.ReactElement} The Leagues component
 */
const Leagues = memo(({ ecoCredits, setEcoCredits, streakShields, setStreakShields, addXp }) => {
  const {
    leaguesList,
    activityLogged,
    shieldError,
    setShieldError,
    handleSimulateActivity,
    handleBuyShield
  } = useLeagues(mockLeagues);

  const simulateLog = () => {
    handleSimulateActivity(addXp);
  };

  const purchaseShield = () => {
    handleBuyShield(ecoCredits, setEcoCredits, setStreakShields);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Help Banner: Problem Alignment */}
      <section 
        className="glass-card" 
        style={{ padding: '16px 20px', background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.15)' }}
        aria-label="Features summary"
      >
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-emerald)', marginBottom: '4px' }}>
          🏆 Gamified Habits and Community Rankings
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Competing with neighbors helps you <strong style={{ color: 'white' }}>track</strong> your progress comparative to others. 
          Gamification encourages continuous habits to <strong style={{ color: 'white' }}>reduce</strong> footprints. 
          Use shields to safeguard your multiplier during busy travel days.
        </p>
      </section>

      {/* Transaction Alert Messages */}
      {shieldError && (
        <div 
          role="alert" 
          aria-live="assertive"
          style={{ 
            padding: '12px 16px', 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid var(--accent-red)', 
            borderRadius: '10px', 
            fontSize: '12.5px', 
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>⚠️ {shieldError}</span>
          <A11yButton 
            onClick={() => setShieldError(null)} 
            ariaLabel="Dismiss error alert"
            style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', fontWeight: '700' }}
          >
            ×
          </A11yButton>
        </div>
      )}

      {/* Header Info */}
      <header className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Regional Carbon Leagues</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>You are competing in the weekly <b>Oakridge Neighborhood League</b> (Tier: Gold).</p>
        </div>
        <span className="badge-status active">Gold League Standings</span>
      </header>

      <div className="grid-2">
        {/* Left: Leaderboard list */}
        <section className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }} aria-label="Leaderboard standings">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Oakridge League Board</h3>
            <A11yButton 
              onClick={simulateLog}
              disabled={activityLogged}
              className="btn-primary" 
              ariaLabel={activityLogged ? 'Rank updated' : 'Log simulated carbon reduction activity to climb leaderboard'}
              style={{ padding: '6px 12px', fontSize: '12px', background: activityLogged ? 'var(--bg-secondary)' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', border: activityLogged ? '1px solid var(--border-light)' : 'none', color: activityLogged ? 'var(--text-muted)' : 'white', boxShadow: 'none' }}
            >
              {activityLogged ? '✓ Rank Updated (+60 XP)' : 'Log Activity & Climb Rank'}
            </A11yButton>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }} role="list" aria-label="Leaderboard rankings">
            {leaguesList.map((member) => (
              <div 
                key={member.rank}
                role="listitem"
                aria-label={`Rank ${member.rank}: ${member.name}. Points: ${member.points} XP. Streak: ${member.streak ? 'Active' : 'Inactive'}`}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '10px 16px', 
                  borderRadius: '12px', 
                  background: member.isUser ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: member.isUser ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)',
                  boxShadow: member.isUser ? '0 0 10px rgba(16, 185, 129, 0.1)' : 'none',
                  fontSize: '13px',
                  transition: 'all 0.4s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: '800', width: '20px', color: member.rank <= 3 ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                    #{member.rank}
                  </span>
                  <span style={{ fontSize: '18px' }} role="img" aria-label="Avatar icon">{member.avatar}</span>
                  <span style={{ fontWeight: member.isUser ? '700' : '500', color: member.isUser ? 'white' : 'var(--text-secondary)' }}>
                    {member.name} {member.isUser && '(You)'}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{member.points} XP</span>
                  {member.streak && <span title="Active daily streak!" style={{ fontSize: '14px' }} role="img" aria-label="Active Streak">🔥</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Streak Shields & Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Streak Shield Store */}
          <section className="glass-card" style={{ padding: '20px' }} aria-label="Streak Safeguard Shop">
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>Streak Safeguard Store</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Protect your daily multiplier streak! A shield automatically prevents your streak from resetting if you miss a travel or utility logging day.
            </p>

            <div style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexGrow: 1 }}>
                <span style={{ fontSize: '32px' }} role="img" aria-label="Shield icon">🛡️</span>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Active Shields: {streakShields}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cost: 100 Eco-Credits (CC)</p>
                </div>
              </div>
              <A11yButton 
                onClick={purchaseShield}
                className="btn-primary" 
                ariaLabel="Purchase one active streak shield for one hundred eco-credits"
                style={{ padding: '8px 16px', fontSize: '12px', background: 'linear-gradient(135deg, var(--accent-cyan), #0891b2)', boxShadow: 'none' }}
              >
                Purchase
              </A11yButton>
            </div>
          </section>

          {/* Achievements Badge Case */}
          <section className="glass-card" style={{ padding: '20px' }} aria-label="Badge Locker">
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Accomplishment Locker</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }} role="img" aria-label="Sun icon">☀️</span>
                <div>
                  <b style={{ fontSize: '12px', color: 'white' }}>Solar Pioneer</b>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Link home energy grid</p>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }} role="img" aria-label="Bicycle icon">🚲</span>
                <div>
                  <b style={{ fontSize: '12px', color: 'white' }}>Velocipede</b>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Cycle commute logged</p>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }} role="img" aria-label="Salad bowl icon">🥗</span>
                <div>
                  <b style={{ fontSize: '12px', color: 'white' }}>Herbivore</b>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Plant meal substitution</p>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }} role="img" aria-label="Receipt icon">🧾</span>
                <div>
                  <b style={{ fontSize: '12px', color: 'white' }}>Scanner Pro</b>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>First receipt scan</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
});

Leagues.displayName = 'Leagues';
export default Leagues;
