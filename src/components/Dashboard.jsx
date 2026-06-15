import React, { memo, useMemo } from 'react';
import ClimateTwinIsland from './ClimateTwinIsland';
import MetricCard from './common/MetricCard';
import ActionCard from './common/ActionCard';
import { 
  calculateCarbonMetrics, 
  calculateWaterMetrics, 
  calculateWasteMetrics 
} from '../utils/performance';

/**
 * Dashboard Component.
 * Integrates visual twin feedback, daily habits management, and telemetry logs.
 * Includes explicit indicators demonstrating alignment with Carbon footprints pillars.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.carbonSaved - Total saved carbon in kg CO2
 * @param {number} props.waterSaved - Total saved water in Liters
 * @param {number} props.wasteDiverted - Total diverted waste in kg
 * @param {Object} props.actions - Active habits toggle state
 * @param {boolean} props.actions.solar - True if solar active
 * @param {boolean} props.actions.bike - True if biking active
 * @param {boolean} props.actions.thermostat - True if thermostat active
 * @param {boolean} props.actions.meat - True if meat reduction active
 * @param {Function} props.onToggleAction - Callback to switch active actions
 * @returns {React.ReactElement} The Dashboard panel element
 */
const Dashboard = memo(({ carbonSaved, waterSaved, wasteDiverted, actions, onToggleAction }) => {
  // Memoize conversions to prevent recalculating on unrelated re-renders
  const carbonMetrics = useMemo(() => calculateCarbonMetrics(carbonSaved), [carbonSaved]);
  const waterMetrics = useMemo(() => calculateWaterMetrics(waterSaved), [waterSaved]);
  const wasteMetrics = useMemo(() => calculateWasteMetrics(wasteDiverted), [wasteDiverted]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Problem Alignment Help Section */}
      <section 
        className="glass-card" 
        style={{ padding: '16px 20px', background: 'rgba(6, 182, 212, 0.04)', border: '1px solid rgba(6, 182, 212, 0.15)' }}
        aria-label="Pillars explanation"
      >
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-cyan)', marginBottom: '6px' }}>
          🌿 How TerraTwin Optimizes Your Footprint
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '11px', color: 'var(--text-secondary)' }}>
          <div>
            <b style={{ color: 'white' }}>1. Understand</b>: The 3D Digital Twin island updates in real-time to show how raw numbers translate directly into ecological health.
          </div>
          <div>
            <b style={{ color: 'white' }}>2. Track</b>: Integration status feeds automate active daily recording from external telemetry sources.
          </div>
          <div>
            <b style={{ color: 'white' }}>3. Reduce</b>: Toggling context-aware habit cards commits offsets directly into the grid, saving carbon instantly.
          </div>
        </div>
      </section>

      {/* 1. Core Analogies Top Row */}
      <section className="grid-3" role="region" aria-label="Footprint Analogies">
        <MetricCard 
          title="Carbon Analogy"
          value={carbonMetrics.treeYears}
          unit="Tree-Years"
          emoji="🌲"
          description={`Equivalent mature oak trees absorbing CO2 for a year, or ${carbonMetrics.kmDriven} km petrol driving avoided.`}
          glowColor="emerald"
        />

        <MetricCard 
          title="Water Preserved"
          value={waterSaved.toLocaleString()}
          unit="Liters"
          emoji="💧"
          description={`Equal to ${waterMetrics.showersSaved} standard 8-minute showers saved through lifestyle dietary choices.`}
          glowColor="cyan"
        />

        <MetricCard 
          title="Waste Diverted"
          value={wasteDiverted}
          unit="kg"
          emoji="♻️"
          description={`Equivalent to keeping approximately ${wasteMetrics.bottlesDiverted} single-use plastic bottles out of landfills.`}
          glowColor="default"
        />
      </section>

      {/* 2. Main Visual Layout */}
      <section className="grid-2">
        {/* Island Component */}
        <div role="img" aria-label="3D Ecological Digital Twin Visualization">
          <ClimateTwinIsland actions={actions} carbonSaved={carbonSaved} />
        </div>

        {/* Actions & Telemetry panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} role="region" aria-label="Daily reduction triggers">
          
          {/* Daily Action Cards */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Context-Aware Action Cards</span>
              <span style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: '600' }} aria-live="polite">Updated: 15m ago</span>
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <ActionCard 
                actionKey="solar"
                emoji="☀️"
                title="Community Solar Link"
                description="Shift electrical grid to clean solar energy (+50 CC)"
                impactLabel="+60 CC, +80 XP"
                isActive={actions.solar}
                onToggle={onToggleAction}
                activeText="Disconnect"
                inactiveText="Connect"
              />

              <ActionCard 
                actionKey="bike"
                emoji="🚲"
                title="Cycle Commute Challenge"
                description="Bike to the office today (-1.8 kg CO2, +25 CC)"
                impactLabel="+25 CC, +30 XP"
                isActive={actions.bike}
                onToggle={onToggleAction}
                activeText="Reset"
                inactiveText="Log Trip"
              />

              <ActionCard 
                actionKey="thermostat"
                emoji="🌡️"
                title="Smart Thermostat Tuning"
                description="Reduce temperature setpoint by 1.5°C (+10 CC)"
                impactLabel="+10 CC, +15 XP"
                isActive={actions.thermostat}
                onToggle={onToggleAction}
                activeText="Reset"
                inactiveText="Tune"
              />

              <ActionCard 
                actionKey="meat"
                emoji="🥗"
                title="Meat-Free Day Swap"
                description="Log plant-based lunch/dinner (+1200L water, +20 CC)"
                impactLabel="+20 CC, +25 XP"
                isActive={actions.meat}
                onToggle={onToggleAction}
                activeText="Reset"
                inactiveText="Log Meal"
              />
            </div>
          </div>

          {/* Connected Feeds Telemetry */}
          <div className="glass-card" style={{ padding: '20px' }} role="region" aria-label="Passive feeds status">
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>Passive Automation Feeds</h3>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-light)', fontSize: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} className="animate-pulse-glow" aria-hidden="true"></span>
                <span style={{ color: 'var(--text-secondary)' }}>Plaid API:</span> <strong style={{ color: 'white' }}>Linked</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-light)', fontSize: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} className="animate-pulse-glow" aria-hidden="true"></span>
                <span style={{ color: 'var(--text-secondary)' }}>UtilityAPI:</span> <strong style={{ color: 'white' }}>Connected</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-light)', fontSize: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} className="animate-pulse-glow" aria-hidden="true"></span>
                <span style={{ color: 'var(--text-secondary)' }}>CoreMotion:</span> <strong style={{ color: 'white' }}>Tracking</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Simulated Telemetry Log Feed */}
      <section className="glass-card" style={{ padding: '20px' }} role="region" aria-label="System telemetry log">
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Simulated Telemetry Logs</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '13px' }} role="log">
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: 'var(--accent-emerald)' }} aria-hidden="true">⚡</span>
              <span><strong>UtilityAPI</strong>: Home battery storage charging delayed to clean grid hours.</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>10m ago</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '13px' }} role="log">
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: 'var(--accent-cyan)' }} aria-hidden="true">🚶</span>
              <span><strong>CoreMotion</strong>: Auto-detected walk (1.2 km). Logged under commuter savings.</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>1h ago</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '13px' }} role="log">
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: 'var(--accent-orange)' }} aria-hidden="true">💳</span>
              <span><strong>Plaid API</strong>: Transaction category <i>Supermarket</i> scanned. Food LCA catalog loaded.</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>3h ago</span>
          </div>
        </div>
      </section>

    </div>
  );
});

Dashboard.displayName = 'Dashboard';
export default Dashboard;
