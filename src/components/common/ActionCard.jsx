import React, { memo } from 'react';
import A11yButton from './A11yButton';
import { createActionLabel } from '../../utils/a11y';

/**
 * Reusable ActionCard component to toggle daily climate actions/habits.
 * 
 * @param {Object} props
 * @param {string} props.actionKey - Key representing the action (e.g., 'solar')
 * @param {string} props.emoji - Icon representation
 * @param {string} props.title - Action title
 * @param {string} props.description - Impact details
 * @param {string} props.impactLabel - Short impact representation (e.g., '+50 CC')
 * @param {boolean} props.isActive - Toggle state
 * @param {Function} props.onToggle - Trigger callback
 * @param {string} props.activeText - Text on active button (e.g. 'Disconnect')
 * @param {string} props.inactiveText - Text on inactive button (e.g. 'Connect')
 */
const ActionCard = memo(({ 
  actionKey, 
  emoji, 
  title, 
  description, 
  impactLabel,
  isActive, 
  onToggle,
  activeText = 'Reset',
  inactiveText = 'Log'
}) => {
  const accessibleLabel = createActionLabel(title, isActive, impactLabel);

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px', 
        background: isActive ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)', 
        border: isActive ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)', 
        borderRadius: '12px', 
        transition: 'all 0.3s ease' 
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '20px' }} role="img" aria-label={`${title} icon`}>
          {emoji}
        </span>
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '600' }}>{title}</h4>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{description}</p>
        </div>
      </div>
      <A11yButton 
        onClick={() => onToggle(actionKey)}
        ariaLabel={accessibleLabel}
        className="btn-primary" 
        style={{ 
          padding: '6px 12px', 
          fontSize: '12px', 
          background: isActive ? '#ef4444' : 'linear-gradient(135deg, var(--accent-emerald), #059669)', 
          boxShadow: 'none' 
        }}
      >
        {isActive ? activeText : inactiveText}
      </A11yButton>
    </div>
  );
});

ActionCard.displayName = 'ActionCard';
export default ActionCard;
