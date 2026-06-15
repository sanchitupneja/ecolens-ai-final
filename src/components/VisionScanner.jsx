import React, { memo } from 'react';
import { mockReceipts, mockWasteItems } from '../data/mockData';
import { useVisionScanner } from '../hooks/useVisionScanner';
import { getReceiptRecommendation } from '../services/scannerService';
import A11yButton from './common/A11yButton';

/**
 * Computer Vision and OCR Scanner simulator.
 * 
 * Alignments:
 * 1. Track: Scan supermarket receipts via OCR to log exact LCA carbon indexes.
 * 2. Reduce: Check segregation guidelines on materials to divert packaging from landfills.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.addCarbonSaved - Callback to add saved carbon amount in kg CO2
 * @param {Function} props.addWasteDiverted - Callback to add waste diverted amount in kg
 * @param {Function} props.addCredits - Callback to award credits
 * @param {Function} props.addXp - Callback to award experience points (XP)
 * @returns {React.ReactElement} The VisionScanner component
 */
const VisionScanner = memo(({ addCarbonSaved, addWasteDiverted, addCredits, addXp }) => {
  const {
    scanMode,
    isScanning,
    selectedItemId,
    setSelectedItemId,
    scanResult,
    actionApplied,
    handleStartScan,
    handleApplyAlternative,
    handleLogWasteDiverted,
    changeScanMode
  } = useVisionScanner();

  const handleModeToggle = (mode) => {
    const defaultId = mode === 'receipt' ? mockReceipts[0].id : mockWasteItems[0].id;
    changeScanMode(mode, defaultId);
  };

  const activeOptions = scanMode === 'receipt' ? mockReceipts : mockWasteItems;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Help Banner: Problem Alignment */}
      <section 
        className="glass-card" 
        style={{ padding: '16px 20px', background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.15)' }}
        aria-label="Features summary"
      >
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-emerald)', marginBottom: '4px' }}>
          📷 Track & Reduce Carbon with Computer Vision
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          By scanning receipts, you <strong style={{ color: 'white' }}>track</strong> exact greenhouse gas coefficients from supermarket purchases. 
          By detecting object materials, you get automated sorting rules to <strong style={{ color: 'white' }}>reduce</strong> solid waste emissions.
        </p>
      </section>

      {/* Tab select header */}
      <header className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Computer Vision & OCR Module</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Extract carbon footprints from receipts or classify waste sorting rules locally on-device.</p>
        </div>
        <div 
          role="tablist" 
          aria-label="Scanning Mode selection"
          style={{ display: 'flex', gap: '10px', background: 'var(--bg-primary)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-light)' }}
        >
          <A11yButton 
            onClick={() => handleModeToggle('receipt')}
            role="tab"
            aria-selected={scanMode === 'receipt'}
            className={`btn-secondary ${scanMode === 'receipt' ? 'active' : ''}`}
            style={{ 
              padding: '6px 14px', 
              fontSize: '12px', 
              border: 'none', 
              background: scanMode === 'receipt' ? 'var(--bg-card)' : 'transparent', 
              color: scanMode === 'receipt' ? 'var(--accent-emerald)' : 'var(--text-secondary)' 
            }}
          >
            Receipt OCR
          </A11yButton>
          <A11yButton 
            onClick={() => handleModeToggle('waste')}
            role="tab"
            aria-selected={scanMode === 'waste'}
            className={`btn-secondary ${scanMode === 'waste' ? 'active' : ''}`}
            style={{ 
              padding: '6px 14px', 
              fontSize: '12px', 
              border: 'none', 
              background: scanMode === 'waste' ? 'var(--bg-card)' : 'transparent', 
              color: scanMode === 'waste' ? 'var(--accent-emerald)' : 'var(--text-secondary)' 
            }}
          >
            Waste Object Detector
          </A11yButton>
        </div>
      </header>

      {/* Screen reader status announcements */}
      <div className="sr-only" role="status" aria-live="polite">
        {isScanning && 'Simulated viewport scanner is active and processing image...'}
        {scanResult && `Scanning finished. Results for ${scanResult.data.name || scanResult.data.store} loaded.`}
        {actionApplied && 'Credit reward logged successfully.'}
      </div>

      <div className="grid-2">
        {/* Left Panel: Camera Viewfinder */}
        <section 
          className="glass-card" 
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '380px' }}
          aria-label="Viewport simulation panel"
        >
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', alignSelf: 'flex-start' }}>Edge Lens Simulation</h3>
          
          {/* Simulated Camera Screen */}
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '280px', 
              height: '220px', 
              background: 'var(--bg-primary)', 
              border: '2px solid var(--text-muted)', 
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
              margin: '20px 0'
            }}
            aria-hidden="true"
          >
            {/* Viewfinder crosshairs */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', width: '15px', height: '15px', borderLeft: '2px solid var(--text-secondary)', borderTop: '2px solid var(--text-secondary)' }}></div>
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '15px', height: '15px', borderRight: '2px solid var(--text-secondary)', borderTop: '2px solid var(--text-secondary)' }}></div>
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '15px', height: '15px', borderLeft: '2px solid var(--text-secondary)', borderBottom: '2px solid var(--text-secondary)' }}></div>
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '15px', height: '15px', borderRight: '2px solid var(--text-secondary)', borderBottom: '2px solid var(--text-secondary)' }}></div>
            
            {/* Live scanning overlay line */}
            {isScanning && (
              <div style={{ 
                position: 'absolute', 
                left: '0', 
                width: '100%', 
                height: '4px', 
                background: 'rgba(16, 185, 129, 0.8)', 
                boxShadow: '0 0 10px #10b981',
                animation: 'receiptScan 1.5s ease-in-out infinite' 
              }}></div>
            )}

            {/* Simulated item render */}
            {isScanning ? (
              <div style={{ color: 'var(--accent-emerald)', fontSize: '14px', fontWeight: '700', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🤖</div>
                {scanMode === 'receipt' ? 'Extracting LCA Values...' : 'Detecting Material Comp...'}
              </div>
            ) : scanResult ? (
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center', padding: '16px' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}></div>
                <b>Scan Successful</b>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Result generated in 48ms</div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '16px' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>{scanMode === 'receipt' ? '🧾' : '♻️'}</div>
                Select an item and press trigger
              </div>
            )}
          </div>

          {/* Trigger inputs */}
          <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
            <label htmlFor="scan-selector" className="sr-only">Choose mock scan asset</label>
            <select 
              id="scan-selector"
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              style={{ flexGrow: 1, background: 'var(--bg-input)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '10px', color: 'white', outline: 'none', fontSize: '13px' }}
            >
              {activeOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
            </select>

            <A11yButton 
              onClick={() => handleStartScan(mockReceipts, mockWasteItems)} 
              disabled={isScanning}
              className="btn-primary" 
              style={{ padding: '10px 18px', fontSize: '13px', whiteSpace: 'nowrap' }}
            >
              {isScanning ? 'Processing...' : 'Simulate Snap'}
            </A11yButton>
          </div>
        </section>

        {/* Right Panel: Scan Results */}
        <section 
          className="glass-card emerald-glow" 
          style={{ padding: '24px', minHeight: '380px', display: 'flex', flexDirection: 'column' }}
          aria-label="Classifier feedback results"
        >
          <h3 style={{ fontSize: '15px', fontWeight: '700', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '16px' }}>
            Classifier Audit Results
          </h3>

          {!scanResult ? (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center' }}>
              <span style={{ fontSize: '36px', marginBottom: '12px' }} aria-hidden="true">📊</span>
              <h4>Awaiting Input</h4>
              <p style={{ fontSize: '12px', marginTop: '4px', maxWidth: '240px' }}>Snap a simulated object or receipt image to display the carbon ledger analysis.</p>
            </div>
          ) : scanResult.type === 'receipt' ? (
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              {/* Receipt metadata */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '13px' }}>
                <div>
                  <b style={{ fontSize: '14px' }}>{scanResult.data.store}</b>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{scanResult.data.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <b>Total Spent: {scanResult.data.total}</b>
                  <div style={{ fontSize: '11px', color: 'var(--accent-red)', fontWeight: '600' }}>+{scanResult.data.totalCarbon} kg CO2e</div>
                </div>
              </div>

              {/* Line items list */}
              <div 
                style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto', paddingRight: '4px', marginBottom: '16px' }}
                aria-label="Extracted product list"
                role="list"
              >
                {scanResult.data.items.map((item, idx) => (
                  <div key={idx} role="listitem" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <b>{item.name}</b>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Alternative: {item.alternative}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '700' }}>{item.carbon} kg</span>
                      <span 
                        style={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          background: item.level === 'high' ? 'var(--accent-red)' : item.level === 'medium' ? 'var(--accent-orange)' : 'var(--accent-emerald)'
                        }}
                        aria-label={`Impact level: ${item.level}`}
                      ></span>
                    </div>
                  </div>
                ))}
              </div>

              {/* High impact recommendations */}
              {(() => {
                const recommendation = getReceiptRecommendation(scanResult.data.id);
                if (!recommendation) return null;
                return (
                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '12px', padding: '12px', fontSize: '12px', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <b>💡 Eco-Replacement Recommendation:</b>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>Save {recommendation.savings} kg CO2e</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '11px' }}>
                      {recommendation.text}
                    </p>
                    <A11yButton 
                      onClick={() => handleApplyAlternative(recommendation.savings, addCarbonSaved, addCredits, addXp)}
                      disabled={actionApplied}
                      className="btn-primary" 
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        fontSize: '11.5px', 
                        background: actionApplied ? 'var(--bg-secondary)' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', 
                        border: actionApplied ? '1px solid var(--border-light)' : 'none', 
                        color: actionApplied ? 'var(--text-muted)' : 'white' 
                      }}
                    >
                      {actionApplied ? '✓ Swap Decision Logged (+30 CC)' : 'Commit to Alternative (+30 Eco-Credits)'}
                    </A11yButton>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              {/* Waste results */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px' }} role="img" aria-label={scanResult.data.name}>{scanResult.data.image}</span>
                <div>
                  <b style={{ fontSize: '15px' }}>{scanResult.data.name}</b>
                  <div style={{ fontSize: '11px', color: 'var(--accent-cyan)' }}>CoreML Material Segregation Active</div>
                </div>
              </div>

              {/* Instructions list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1, marginBottom: '20px' }}>
                {scanResult.data.instructions.map((inst, idx) => (
                  <div key={idx} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <b>{inst.component}</b>
                      <span style={{ color: inst.color, fontWeight: '700', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px' }}>
                        {inst.bin}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '11.5px' }}>{inst.detail}</p>
                  </div>
                ))}
              </div>

              {/* Log sorting reward */}
              <A11yButton 
                onClick={() => handleLogWasteDiverted(0.4, addWasteDiverted, addCredits, addXp)}
                disabled={actionApplied}
                className="btn-primary" 
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  fontSize: '12.5px', 
                  background: actionApplied ? 'var(--bg-secondary)' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', 
                  border: actionApplied ? '1px solid var(--border-light)' : 'none', 
                  color: actionApplied ? 'var(--text-muted)' : 'white' 
                }}
              >
                {actionApplied ? '✓ Waste Sorting Verified (+15 CC)' : 'Verify Sorting & Claim (+15 Eco-Credits)'}
              </A11yButton>
            </div>
          )}
        </section>
      </div>

    </div>
  );
});

VisionScanner.displayName = 'VisionScanner';
export default VisionScanner;
