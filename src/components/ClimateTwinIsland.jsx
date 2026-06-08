import React from 'react'; // eslint-disable-line no-unused-vars

function ClimateTwinIsland({ actions, carbonSaved }) {
  // Determine number of trees based on actions
  let treeCount = 2;
  if (actions.meat) treeCount += 2;
  if (actions.bike) treeCount += 1;
  if (actions.thermostat) treeCount += 1;

  // Determine turbine status
  const turbinesActive = actions.solar;
  
  // Sea level shifts up when carbon savings are low (or action count is low)
  let activeCount = Object.values(actions).filter(Boolean).length;
  // Sea height: high emission = high sea level. Ranges from y=270 (low) to y=295 (high)
  const seaY = 295 - (activeCount * 7);

  // Smog opacity decreases as active actions increase
  const smogOpacity = Math.max(0, 0.7 - (activeCount * 0.2));

  // Sky color shifts from polluted grey-indigo to clean blue-green
  const skyGradStart = activeCount === 0 ? '#1e293b' : activeCount <= 2 ? '#0f172a' : '#042f2e';
  const skyGradEnd = activeCount === 0 ? '#475569' : activeCount <= 2 ? '#0284c7' : '#0d9488';

  // Tree coordinates (Isometric positions on the grass polygon)
  const treePositions = [
    { cx: 160, cy: 190, r: 10, h: 25 },
    { cx: 240, cy: 185, r: 12, h: 28 },
    { cx: 130, cy: 215, r: 9, h: 22 }, // Spawns with bike
    { cx: 270, cy: 210, r: 11, h: 26 }, // Spawns with thermostat
    { cx: 190, cy: 235, r: 13, h: 30 }, // Spawns with meat 1
    { cx: 220, cy: 240, r: 10, h: 24 }  // Spawns with meat 2
  ];

  return (
    <div className="glass-card emerald-glow" style={{ padding: '20px', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700' }}>AI Climate Twin (3D Island)</h3>
        <span className="badge-status active">
          Ecosystem: {activeCount === 0 ? 'Threatened' : activeCount <= 2 ? 'Recovering' : 'Flourishing'}
        </span>
      </div>

      {/* SVG Canvas */}
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 400 350" style={{ width: '100%', maxHeight: '280px', borderRadius: '12px' }}>
          <defs>
            {/* Dynamic Sky Gradient */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={skyGradStart} style={{ transition: 'stop-color 0.5s ease' }} />
              <stop offset="100%" stopColor={skyGradEnd} style={{ transition: 'stop-color 0.5s ease' }} />
            </linearGradient>

            {/* Ground Side Gradient */}
            <linearGradient id="dirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>

            {/* Sea Gradient */}
            <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
            </linearGradient>

            {/* Solar Panel Dark Indigo */}
            <linearGradient id="solarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
          </defs>

          {/* 1. Background Sky */}
          <rect x="0" y="0" width="400" height="350" fill="url(#skyGrad)" style={{ transition: 'fill 0.5s ease' }} />

          {/* 2. Floating Cloud Elements */}
          <g className="animate-float" style={{ opacity: 0.8 }}>
            <path d="M 50 80 Q 60 70 75 80 Q 90 70 100 80 Q 110 80 110 90 L 50 90 Z" fill="#ffffff" opacity="0.15" />
          </g>
          <g className="animate-float-delayed" style={{ opacity: 0.8 }}>
            <path d="M 280 60 Q 290 50 305 60 Q 320 50 330 60 Q 340 60 340 70 L 280 70 Z" fill="#ffffff" opacity="0.1" />
          </g>

          {/* 3. Smog Overlay (Fades as actions occur) */}
          <g style={{ opacity: smogOpacity, transition: 'opacity 0.5s ease' }}>
            <path d="M -20 120 C 40 100, 100 130, 180 110 C 260 90, 320 140, 420 110 L 420 160 L -20 160 Z" fill="#475569" opacity="0.4" />
            <path d="M -20 140 C 60 130, 120 150, 200 130 C 280 110, 340 160, 420 135 L 420 180 L -20 180 Z" fill="#334155" opacity="0.3" />
          </g>

          {/* 4. Rising Sea (Water around island) */}
          <path 
            d={`M 0 ${seaY} Q 100 ${seaY - 10} 200 ${seaY} Q 300 ${seaY + 10} 400 ${seaY} L 400 350 L 0 350 Z`} 
            fill="url(#seaGrad)" 
            style={{ transition: 'd 0.5s ease' }}
          />

          {/* 5. Main Floating Island Land Mass */}
          {/* Dirt / Soil Base */}
          <polygon points="100,220 200,270 300,220 300,250 200,300 100,250" fill="url(#dirtGrad)" />
          {/* Grass Top */}
          <polygon points="100,220 200,170 300,220 200,270" fill="#15803d" />
          {/* Isometric Grass Edge Accent */}
          <polygon points="100,220 200,270 200,272 100,222" fill="#22c55e" />
          <polygon points="200,270 300,220 300,222 200,272" fill="#166534" />

          {/* 6. Built Assets: House */}
          {/* House Base */}
          <polygon points="180,180 220,160 220,185 180,205" fill="#f1f5f9" /> {/* Front wall */}
          <polygon points="220,160 250,175 250,200 220,185" fill="#cbd5e1" /> {/* Side wall */}
          {/* Roof */}
          <polygon points="175,180 200,150 225,160 220,180" fill="#991b1b" /> {/* Front roof */}
          <polygon points="200,150 225,160 255,175 230,165" fill="#7f1d1d" /> {/* Side roof */}
          {/* Door */}
          <polygon points="192,199 202,194 202,184 192,189" fill="#78350f" />
          {/* Window */}
          <polygon points="230,183 242,189 242,179 230,173" fill="#38bdf8" />

          {/* Solar Panels (Appear on roof when solar active) */}
          <g style={{ opacity: actions.solar ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            <polygon points="203,151 223,161 247,171 228,162" fill="url(#solarGrad)" stroke="#0284c7" strokeWidth="0.5" />
            <line x1="213" y1="156" x2="238" y2="167" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="223" y1="161" x2="248" y2="172" stroke="#38bdf8" strokeWidth="0.5" />
          </g>

          {/* 7. Wind Turbines (Active when Solar/Grid is clean) */}
          <g transform="translate(270, 150)">
            {/* Mast */}
            <line x1="0" y1="40" x2="0" y2="0" stroke="#e2e8f0" strokeWidth="2.5" />
            {/* Spinning blades */}
            <g className={turbinesActive ? "animate-spin-slow" : ""} style={{ transformOrigin: '0px 0px', transition: 'transform 0.5s ease' }}>
              <line x1="0" y1="0" x2="0" y2="-18" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="0" y1="0" x2="15" y2="8" stroke="#f1f5f9" strokeWidth="2" />
              <line x1="0" y1="0" x2="-15" y2="8" stroke="#f1f5f9" strokeWidth="2" />
              <circle cx="0" cy="0" r="2.5" fill="#cbd5e1" />
            </g>
          </g>

          {/* 8. Trees (Spawn based on active count) */}
          {treePositions.slice(0, treeCount).map((pos, idx) => (
            <g key={idx} style={{ transition: 'opacity 0.5s ease' }}>
              {/* Trunk */}
              <line x1={pos.cx} y1={pos.cy} x2={pos.cx} y2={pos.cy - 12} stroke="#78350f" strokeWidth="2.5" />
              {/* Leaves */}
              <circle cx={pos.cx} cy={pos.cy - 12} r={pos.r} fill="#16a34a" opacity="0.9" />
              <circle cx={pos.cx - 2} cy={pos.cy - 15} r={pos.r - 2} fill="#22c55e" opacity="0.8" />
            </g>
          ))}
        </svg>
      </div>

      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <span>Total Carbon Offset:</span>
          <span style={{ fontWeight: '700', color: 'var(--accent-emerald)' }}>{carbonSaved} kg</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
          <span>Active Streak Bonus:</span>
          <span>+{(carbonSaved * 0.05).toFixed(1)} kg CO2</span>
        </div>
      </div>
    </div>
  );
}

export default ClimateTwinIsland;
