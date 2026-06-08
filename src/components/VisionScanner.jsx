import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { mockReceipts, mockWasteItems } from '../data/mockData';

function VisionScanner({ addCarbonSaved, addWasteDiverted, addCredits, addXp }) {
  const [scanMode, setScanMode] = useState('receipt'); // 'receipt' or 'waste'
  const [isScanning, setIsScanning] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(scanMode === 'receipt' ? mockReceipts[0].id : mockWasteItems[0].id);
  const [scanResult, setScanResult] = useState(null);
  const [actionApplied, setActionApplied] = useState(false);

  // Trigger simulated OCR/object scan
  const handleStartScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setActionApplied(false);

    setTimeout(() => {
      setIsScanning(false);
      if (scanMode === 'receipt') {
        const item = mockReceipts.find(r => r.id === selectedItemId);
        setScanResult({ type: 'receipt', data: item });
      } else {
        const item = mockWasteItems.find(w => w.id === selectedItemId);
        setScanResult({ type: 'waste', data: item });
      }
    }, 1500);
  };

  const handleApplyAlternative = (carbonReduced) => {
    if (actionApplied) return;
    addCarbonSaved(carbonReduced);
    addCredits(30);
    addXp(40);
    setActionApplied(true);
  };

  const handleLogWasteDiverted = (wasteWeight) => {
    if (actionApplied) return;
    addWasteDiverted(wasteWeight);
    addCredits(15);
    addXp(20);
    setActionApplied(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Tab select header */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Computer Vision & OCR Module</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Extract carbon footprints from receipts or classify waste sorting rules locally on-device.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', background: 'var(--bg-primary)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
          <button 
            onClick={() => { setScanMode('receipt'); setSelectedItemId(mockReceipts[0].id); setScanResult(null); setActionApplied(false); }}
            className={`btn-secondary ${scanMode === 'receipt' ? 'active' : ''}`}
            style={{ padding: '6px 14px', fontSize: '12px', border: 'none', background: scanMode === 'receipt' ? 'var(--bg-card)' : 'transparent', color: scanMode === 'receipt' ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}
          >
            Receipt OCR
          </button>
          <button 
            onClick={() => { setScanMode('waste'); setSelectedItemId(mockWasteItems[0].id); setScanResult(null); setActionApplied(false); }}
            className={`btn-secondary ${scanMode === 'waste' ? 'active' : ''}`}
            style={{ padding: '6px 14px', fontSize: '12px', border: 'none', background: scanMode === 'waste' ? 'var(--bg-card)' : 'transparent', color: scanMode === 'waste' ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}
          >
            Waste Object Detector
          </button>
        </div>
      </div>

      <div className="grid-2">
        {/* Left Panel: Camera Viewfinder */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '380px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', alignSelf: 'flex-start' }}>Edge Lens Simulation</h3>
          
          {/* Simulated Camera Screen */}
          <div style={{ 
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
          }}>
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
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>✅</div>
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
            <select 
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              style={{ flexGrow: 1, background: 'var(--bg-input)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '10px', color: 'white', outline: 'none', fontSize: '13px' }}
            >
              {scanMode === 'receipt' ? (
                mockReceipts.map(r => <option key={r.id} value={r.id}>{r.name}</option>)
              ) : (
                mockWasteItems.map(w => <option key={w.id} value={w.id}>{w.name}</option>)
              )}
            </select>

            <button 
              onClick={handleStartScan} 
              disabled={isScanning}
              className="btn-primary" 
              style={{ padding: '10px 18px', fontSize: '13px', whiteSpace: 'nowrap' }}
            >
              {isScanning ? 'Processing...' : 'Simulate Snap'}
            </button>
          </div>
        </div>

        {/* Right Panel: Scan Results */}
        <div className="glass-card emerald-glow" style={{ padding: '24px', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '16px' }}>
            Classifier Audit Results
          </h3>

          {!scanResult ? (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center' }}>
              <span style={{ fontSize: '36px', marginBottom: '12px' }}>📊</span>
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
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto', paddingRight: '4px', marginBottom: '16px' }}>
                {scanResult.data.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <b>{item.name}</b>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Alternative: {item.alternative}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '700' }}>{item.carbon} kg</span>
                      <span style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: item.level === 'high' ? 'var(--accent-red)' : item.level === 'medium' ? 'var(--accent-orange)' : 'var(--accent-emerald)'
                      }}></span>
                    </div>
                  </div>
                ))}
              </div>

              {/* High impact recommendations */}
              {scanResult.data.id === 'rec_1' && (
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '12px', padding: '12px', fontSize: '12px', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <b>💡 Eco-Replacement Recommendation:</b>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>Save 11.2 kg CO2e</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '11px' }}>
                    Swap Organic Ribeye Steak for Plant-Based Meatballs on your next supermarket trip.
                  </p>
                  <button 
                    onClick={() => handleApplyAlternative(11.2)}
                    disabled={actionApplied}
                    className="btn-primary" 
                    style={{ width: '100%', padding: '8px', fontSize: '11.5px', background: actionApplied ? 'var(--bg-secondary)' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', border: actionApplied ? '1px solid var(--border-light)' : 'none', color: actionApplied ? 'var(--text-muted)' : 'white' }}
                  >
                    {actionApplied ? '✓ Swap Decision Logged (+30 CC)' : 'Commit to Alternative (+30 Eco-Credits)'}
                  </button>
                </div>
              )}

              {scanResult.data.id === 'rec_2' && (
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '12px', padding: '12px', fontSize: '12px', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <b>💡 Eco-Replacement Recommendation:</b>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>Save 0.7 kg CO2e</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '11px' }}>
                    Select Oat Milk instead of Whole Milk dairy for your daily Latte.
                  </p>
                  <button 
                    onClick={() => handleApplyAlternative(0.7)}
                    disabled={actionApplied}
                    className="btn-primary" 
                    style={{ width: '100%', padding: '8px', fontSize: '11.5px', background: actionApplied ? 'var(--bg-secondary)' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', border: actionApplied ? '1px solid var(--border-light)' : 'none', color: actionApplied ? 'var(--text-muted)' : 'white' }}
                  >
                    {actionApplied ? '✓ Swap Decision Logged (+30 CC)' : 'Commit to Alternative (+30 Eco-Credits)'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              {/* Waste results */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px' }}>{scanResult.data.image}</span>
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
              <button 
                onClick={() => handleLogWasteDiverted(0.4)}
                disabled={actionApplied}
                className="btn-primary" 
                style={{ width: '100%', padding: '10px', fontSize: '12.5px', background: actionApplied ? 'var(--bg-secondary)' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', border: actionApplied ? '1px solid var(--border-light)' : 'none', color: actionApplied ? 'var(--text-muted)' : 'white' }}
              >
                {actionApplied ? '✓ Waste Sorting Verified (+15 CC)' : 'Verify Sorting & Claim (+15 Eco-Credits)'}
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default VisionScanner;
