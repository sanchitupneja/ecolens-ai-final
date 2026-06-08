import React from 'react';
import ClimateTwinIsland from './ClimateTwinIsland';

function Dashboard({ carbonSaved, waterSaved, wasteDiverted, actions, onToggleAction }) {
  // Convert metrics into relatable analogies
  const treeYears = (carbonSaved / 22.0).toFixed(1);
  const kmDriven = (carbonSaved * 4.2).toFixed(0);
  const showersSaved = (waterSaved / 80).toFixed(0);
  const bottlesDiverted = (wasteDiverted * 50).toFixed(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Core Analogies Top Row */}
      <section className="grid-3">
        <div className="glass-card emerald-glow" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>🌲</div>
          <div>
            <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Carbon Analogy</h4>
            <div style={{ fontSize: '20px', fontWeight: '800', margin: '4px 0 2px' }}>{treeYears} Tree-Years</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Equivalent mature oak trees absorbing CO2 for a year, or {kmDriven} km petrol driving avoided.</p>
          </div>
        </div>

        <div className="glass-card cyan-glow" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', background: 'rgba(6, 182, 212, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>💧</div>
          <div>
            <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Water Preserved</h4>
            <div style={{ fontSize: '20px', fontWeight: '800', margin: '4px 0 2px' }}>{waterSaved.toLocaleString()} Liters</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Equal to {showersSaved} standard 8-minute showers saved through lifestyle dietary choices.</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>♻️</div>
          <div>
            <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Waste Diverted</h4>
            <div style={{ fontSize: '20px', fontWeight: '800', margin: '4px 0 2px' }}>{wasteDiverted} kg</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Equivalent to keeping approximately {bottlesDiverted} single-use plastic bottles out of landfills.</p>
          </div>
        </div>
      </section>

      {/* 2. Main Visual Layout */}
      <section className="grid-2">
        {/* Island Component */}
        <ClimateTwinIsland actions={actions} carbonSaved={carbonSaved} />

        {/* Actions & Telemetry panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Daily Action Cards */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Context-Aware Action Cards</span>
              <span style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: '600' }}>Updated: 15m ago</span>
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Solar card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: actions.solar ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)', border: actions.solar ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)', borderRadius: '12px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>☀️</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Community Solar Link</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Shift electrical grid to clean solar energy (+50 CC)</p>
                  </div>
                </div>
                <button 
                  onClick={() => onToggleAction('solar')}
                  className="btn-primary" 
                  style={{ padding: '6px 12px', fontSize: '12px', background: actions.solar ? '#ef4444' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', boxShadow: 'none' }}
                >
                  {actions.solar ? 'Disconnect' : 'Connect'}
                </button>
              </div>

              {/* Bike commute card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: actions.bike ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)', border: actions.bike ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)', borderRadius: '12px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>🚲</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Cycle Commute Challenge</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Bike to the office today (-1.8 kg CO2, +25 CC)</p>
                  </div>
                </div>
                <button 
                  onClick={() => onToggleAction('bike')}
                  className="btn-primary" 
                  style={{ padding: '6px 12px', fontSize: '12px', background: actions.bike ? '#ef4444' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', boxShadow: 'none' }}
                >
                  {actions.bike ? 'Reset' : 'Log Trip'}
                </button>
              </div>

              {/* Thermostat card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: actions.thermostat ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)', border: actions.thermostat ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)', borderRadius: '12px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>🌡️</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Smart Thermostat Tuning</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Reduce temperature setpoint by 1.5°C (+10 CC)</p>
                  </div>
                </div>
                <button 
                  onClick={() => onToggleAction('thermostat')}
                  className="btn-primary" 
                  style={{ padding: '6px 12px', fontSize: '12px', background: actions.thermostat ? '#ef4444' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', boxShadow: 'none' }}
                >
                  {actions.thermostat ? 'Reset' : 'Tune'}
                </button>
              </div>

              {/* Meat free card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: actions.meat ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)', border: actions.meat ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)', borderRadius: '12px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>🥗</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Meat-Free Day Swap</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Log plant-based lunch/dinner (+1200L water, +20 CC)</p>
                  </div>
                </div>
                <button 
                  onClick={() => onToggleAction('meat')}
                  className="btn-primary" 
                  style={{ padding: '6px 12px', fontSize: '12px', background: actions.meat ? '#ef4444' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', boxShadow: 'none' }}
                >
                  {actions.meat ? 'Reset' : 'Log Meal'}
                </button>
              </div>
            </div>
          </div>

          {/* Connected Feeds Telemetry */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>Passive Automation Feeds</h3>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-light)', fontSize: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} className="animate-pulse-glow"></span>
                <span style={{ color: 'var(--text-secondary)' }}>Plaid API:</span> <b>Linked</b>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-light)', fontSize: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} className="animate-pulse-glow"></span>
                <span style={{ color: 'var(--text-secondary)' }}>UtilityAPI:</span> <b>Connected</b>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-light)', fontSize: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} className="animate-pulse-glow"></span>
                <span style={{ color: 'var(--text-secondary)' }}>CoreMotion:</span> <b>Tracking</b>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Simulated Telemetry Log Feed */}
      <section className="glass-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Simulated Telemetry Logs</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: 'var(--accent-emerald)' }}>⚡</span>
              <span><b>UtilityAPI</b>: Home battery storage charging delayed to clean grid hours.</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>10m ago</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>🚶</span>
              <span><b>CoreMotion</b>: Auto-detected walk (1.2 km). Logged under commuter savings.</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>1h ago</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: 'var(--accent-orange)' }}>💳</span>
              <span><b>Plaid API</b>: Transaction category <i>Supermarket</i> scanned. Food LCA catalog loaded.</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>3h ago</span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Dashboard;
