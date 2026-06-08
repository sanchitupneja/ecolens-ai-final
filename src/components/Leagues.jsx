import React, { useState } from 'react';
import { mockLeagues } from '../data/mockData';

function Leagues({ ecoCredits, setEcoCredits, streakShields, setStreakShields }) {
  const [leaguesList, setLeaguesList] = useState(mockLeagues);
  const [activityLogged, setActivityLogged] = useState(false);

  // Simulate logging a carbon saving activity to climb ranks
  const handleSimulateActivity = () => {
    if (activityLogged) return;

    setLeaguesList(prev => {
      const updated = prev.map(member => {
        if (member.isUser) {
          return { ...member, points: member.points + 60, streak: true };
        }
        return member;
      });
      // Re-sort list based on points descending
      const sorted = [...updated].sort((a, b) => b.points - a.points);
      // Re-assign ranks
      return sorted.map((member, idx) => ({ ...member, rank: idx + 1 }));
    });

    setActivityLogged(true);
  };

  // Buy a streak shield
  const handleBuyShield = () => {
    if (ecoCredits >= 100) {
      setEcoCredits(prev => prev - 100);
      setStreakShields(prev => prev + 1);
    } else {
      alert("Insufficient Eco-Credits! Earn more by toggling habits or scanning receipts.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Info */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Regional Carbon Leagues</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>You are competing in the weekly <b>Oakridge Neighborhood League</b> (Tier: Gold).</p>
        </div>
        <span className="badge-status active">Gold League Standings</span>
      </div>

      <div className="grid-2">
        {/* Left: Leaderboard list */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Oakridge League Board</h3>
            <button 
              onClick={handleSimulateActivity}
              disabled={activityLogged}
              className="btn-primary" 
              style={{ padding: '6px 12px', fontSize: '12px', background: activityLogged ? 'var(--bg-secondary)' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', border: activityLogged ? '1px solid var(--border-light)' : 'none', color: activityLogged ? 'var(--text-muted)' : 'white', boxShadow: 'none' }}
            >
              {activityLogged ? '✓ Rank Updated (+60 XP)' : 'Log Activity & Climb Rank'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
            {leaguesList.map((member) => (
              <div 
                key={member.rank}
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
                  <span style={{ fontSize: '18px' }}>{member.avatar}</span>
                  <span style={{ fontWeight: member.isUser ? '700' : '500', color: member.isUser ? 'white' : 'var(--text-secondary)' }}>
                    {member.name} {member.isUser && '(You)'}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{member.points} XP</span>
                  {member.streak && <span title="Active daily streak!" style={{ fontSize: '14px' }}>🔥</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Streak Shields & Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Streak Shield Store */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>Streak Safeguard Store</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Protect your daily multiplier streak! A shield automatically prevents your streak from resetting if you miss a travel or utility logging day.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '32px' }}>🛡️</span>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Active Shields: {streakShields}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cost: 100 Eco-Credits (CC)</p>
                </div>
              </div>
              <button 
                onClick={handleBuyShield}
                className="btn-primary" 
                style={{ padding: '8px 16px', fontSize: '12px', background: 'linear-gradient(135deg, var(--accent-cyan), #0891b2)', boxShadow: 'none' }}
              >
                Purchase
              </button>
            </div>
          </div>

          {/* Achievements Badge Case */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Accomplishment Locker</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>☀️</span>
                <div>
                  <b style={{ fontSize: '12px', color: 'white' }}>Solar Pioneer</b>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Link home energy grid</p>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>🚲</span>
                <div>
                  <b style={{ fontSize: '12px', color: 'white' }}>Velocipede</b>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Cycle commute logged</p>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>🥗</span>
                <div>
                  <b style={{ fontSize: '12px', color: 'white' }}>Herbivore</b>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Plant meal substitution</p>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>🧾</span>
                <div>
                  <b style={{ fontSize: '12px', color: 'white' }}>Scanner Pro</b>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>First receipt scan</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Leagues;
