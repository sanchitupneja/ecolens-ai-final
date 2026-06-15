import React, { memo } from 'react';
import { mockMarketplaceItems } from '../data/mockData';
import { useMarketplace } from '../hooks/useMarketplace';
import A11yButton from './common/A11yButton';
import Modal from './common/Modal';

/**
 * Eco-Alternative Marketplace component.
 * Spend CC points on local sustainable transit, electricity offsets, and organic foods.
 * 
 * Alignment:
 * 1. Reduce: Directly swap CC points for E-Bike trials, community solar bonuses, and waste grocery offsets.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.ecoCredits - Current balance of Eco-Credits
 * @param {Function} props.setEcoCredits - State setter callback for Eco-Credits
 * @param {Object} props.unlockedVouchers - Set of unlocked voucher codes mapped by ID
 * @param {Function} props.setUnlockedVouchers - State setter callback for unlocked vouchers
 * @returns {React.ReactElement} The Marketplace component
 */
const Marketplace = memo(({ ecoCredits, setEcoCredits, unlockedVouchers, setUnlockedVouchers }) => {
  const {
    activePromo,
    setActivePromo,
    redeemError,
    setRedeemError,
    handleRedeemItem
  } = useMarketplace();

  const handleRedeem = (item) => {
    handleRedeemItem(item, ecoCredits, setEcoCredits, setUnlockedVouchers);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Help Banner: Problem Alignment */}
      <section 
        className="glass-card" 
        style={{ padding: '16px 20px', background: 'rgba(6, 182, 212, 0.04)', border: '1px solid rgba(6, 182, 212, 0.15)' }}
        aria-label="Features summary"
      >
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-cyan)', marginBottom: '4px' }}>
          🛍️ Translate Credits into Direct Carbon Reduction
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Eco-Credits (CC) are earned by adopting clean actions. In the marketplace, you spend these credits to buy actual 
          discounts on E-Bikes, smart plugs, and local community solar shares, transforming digital stats into 
          <strong style={{ color: 'white' }}> footprint reduction</strong>.
        </p>
      </section>

      {/* Transaction Alert Messages */}
      {redeemError && (
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
          <span>⚠️ {redeemError}</span>
          <A11yButton 
            onClick={() => setRedeemError(null)} 
            ariaLabel="Dismiss error alert"
            style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '14px', fontWeight: '700' }}
          >
            ×
          </A11yButton>
        </div>
      )}

      {/* Header Panel */}
      <header className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Eco-Alternative Marketplace</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Spend earned Eco-Credits for real discounts on zero-carbon transit, food, and energy utilities.</p>
        </div>
        <span className="badge-status active">4 Partners Online</span>
      </header>

      {/* Unlocked Vouchers Drawer */}
      {Object.keys(unlockedVouchers).length > 0 && (
        <section className="glass-card emerald-glow" style={{ padding: '20px' }} aria-label="Unlocked vouchers drawer">
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎟️ Your Active Vouchers</span>
            <span style={{ background: 'var(--accent-emerald)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>
              {Object.keys(unlockedVouchers).length} Unlocked
            </span>
          </h3>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} role="list">
            {Object.keys(unlockedVouchers).map(id => {
              const item = mockMarketplaceItems.find(m => m.id === id);
              if (!item) return null;
              return (
                <div 
                  key={id} 
                  role="listitem" 
                  style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 14px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--accent-emerald)', borderRadius: '10px', fontSize: '12px' }}
                >
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
      <section className="grid-2" aria-label="Available sustainable vouchers list">
        {mockMarketplaceItems.map((item) => {
          const isUnlocked = !!unlockedVouchers[item.id];
          return (
            <div 
              key={item.id} 
              className="glass-card" 
              style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: isUnlocked ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)' }}
            >
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
                <A11yButton 
                  onClick={() => setActivePromo(item)}
                  className="btn-secondary" 
                  ariaLabel={`Claimed Voucher for ${item.partner}, Promo Code: ${item.code}`}
                  style={{ width: '100%', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)', fontSize: '12.5px', padding: '10px' }}
                >
                  ✓ Claimed Voucher ({item.code})
                </A11yButton>
              ) : (
                <A11yButton 
                  onClick={() => handleRedeem(item)}
                  className="btn-primary" 
                  ariaLabel={`Redeem Voucher for ${item.partner} costing ${item.cost} credits`}
                  style={{ width: '100%', fontSize: '12.5px', padding: '10px' }}
                >
                  Redeem Voucher
                </A11yButton>
              )}
            </div>
          );
        })}
      </section>

      {/* Accessible Scan QR Modal Popup using the custom Modal component */}
      <Modal 
        isOpen={!!activePromo} 
        onClose={() => setActivePromo(null)}
        title={activePromo ? `Redeem ${activePromo.partner} voucher code` : 'Redeem voucher'}
      >
        {activePromo && (
          <>
            <span style={{ fontSize: '48px', marginBottom: '12px' }} role="img" aria-label="Ticket icon">🎟️</span>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>Redeem at Checkout</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Present this QR code or coupon code at checkout with <b>{activePromo.partner}</b>.
            </p>

            {/* Mock QR Code */}
            <div 
              style={{ 
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
              }}
              role="img"
              aria-label={`Mock barcode for ${activePromo.partner}`}
            >
              {/* QR Pattern Representation */}
              <div style={{ 
                width: '144px', 
                height: '144px', 
                backgroundImage: 'radial-gradient(black 30%, transparent 30%), radial-gradient(black 30%, transparent 30%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 8px 8px',
                opacity: 0.85
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

            <A11yButton onClick={() => setActivePromo(null)} className="btn-primary" style={{ width: '100%', padding: '10px' }}>
              Done
            </A11yButton>
          </>
        )}
      </Modal>

    </div>
  );
});

Marketplace.displayName = 'Marketplace';
export default Marketplace;
