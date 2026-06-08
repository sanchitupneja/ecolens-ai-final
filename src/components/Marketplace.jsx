import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { mockMarketplaceItems } from '../data/mockData';

function Marketplace({ ecoCredits, setEcoCredits, unlockedVouchers, setUnlockedVouchers }) {
  const [activePromo, setActivePromo] = useState(null); // Selected promo code for popup modal

  const handleRedeemItem = (item) => {
    if (ecoCredits >= item.cost) {
      setEcoCredits(prev => prev - item.cost);
      setUnlockedVouchers(prev => ({
        ...prev,
        [item.id]: item.code
      }));
      setActivePromo(item);
    } else {
      alert(`Insufficient Eco-Credits! This coupon requires ${item.cost} CC, but you only have ${ecoCredits} CC.`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Panel */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Eco-Alternative Marketplace</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Spend earned Eco-Credits for real discounts on zero-carbon transit, food, and energy utilities.</p>
        </div>
        <span className="badge-status active">4 Partners Online</span>
      </div>

      {/* Unlocked Vouchers Drawer */}
      {Object.keys(unlockedVouchers).length > 0 && (
        <section className="glass-card emerald-glow" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎟️ Your Active Vouchers</span>
            <span style={{ background: 'var(--accent-emerald)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>
              {Object.keys(unlockedVouchers).length} Unlocked
            </span>
          </h3>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {Object.keys(unlockedVouchers).map(id => {
              const item = mockMarketplaceItems.find(m => m.id === id);
              if (!item) return null;
              return (
                <div key={id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 14px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--accent-emerald)', borderRadius: '10px', fontSize: '12px' }}>
                  <span><b>{item.partner}</b> ({item.name})</span>
                  <span style={{ background: 'var(--bg-primary)', border: '1px dotted var(--accent-emerald)', padding: '4px 8px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700', color: 'var(--accent-emerald)', letterSpacing: '0.5px' }}>
                    {unlockedVouchers[id]}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Grid List of Coupons */}
      <section className="grid-2">
        {mockMarketplaceItems.map((item) => {
          const isUnlocked = !!unlockedVouchers[item.id];
          return (
            <div key={item.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: isUnlocked ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent-cyan)', fontWeight: '700', letterSpacing: '0.5px' }}>
                    {item.partner}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                    Cost: {item.cost} CC
                  </span>
                </div>
                
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px', color: 'white' }}>{item.name}</h3>
                <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent-emerald)', marginBottom: '8px' }}>{item.discount}</h4>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '16px' }}>{item.desc}</p>
              </div>

              {isUnlocked ? (
                <button 
                  onClick={() => setActivePromo(item)}
                  className="btn-secondary" 
                  style={{ width: '100%', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)', fontSize: '12.5px', padding: '10px' }}
                >
                  ✓ Claimed Voucher ({item.code})
                </button>
              ) : (
                <button 
                  onClick={() => handleRedeemItem(item)}
                  className="btn-primary" 
                  style={{ width: '100%', fontSize: '12.5px', padding: '10px' }}
                >
                  Redeem Voucher
                </button>
              )}
            </div>
          );
        })}
      </section>

      {/* Scan QR Modal Popup */}
      {activePromo && (
        <div style={{ 
          position: 'fixed', 
          top: '0', 
          left: '0', 
          width: '100vw', 
          height: '100vh', 
          background: 'rgba(7, 10, 19, 0.85)', 
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '9999'
        }}>
          <div className="glass-card emerald-glow" style={{ padding: '30px', maxWidth: '380px', width: '90%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '48px', marginBottom: '12px' }}>🎟️</span>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>Redeem at Checkout</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Present this QR code or coupon code at checkout with <b>{activePromo.partner}</b>.
            </p>

            {/* Mock QR Code */}
            <div style={{ 
              width: '160px', 
              height: '160px', 
              background: 'white', 
              border: '8px solid white', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              marginBottom: '20px'
            }}>
              {/* QR Pattern Representation */}
              <div style={{ 
                width: '144px', 
                height: '144px', 
                backgroundImage: 'radial-gradient(black 30%, transparent 30%), radial-gradient(black 30%, transparent 30%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 8px 8px',
                opacity: '0.85'
              }}></div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Promo Code:</div>
            <div style={{ 
              background: 'var(--bg-primary)', 
              border: '1px dashed var(--accent-emerald)', 
              borderRadius: '8px', 
              padding: '8px 16px', 
              fontFamily: 'monospace', 
              fontSize: '16px', 
              fontWeight: '800', 
              color: 'var(--accent-emerald)', 
              letterSpacing: '1px', 
              marginBottom: '24px' 
            }}>
              {activePromo.code}
            </div>

            <button onClick={() => setActivePromo(null)} className="btn-primary" style={{ width: '100%', padding: '10px' }}>
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Marketplace;
