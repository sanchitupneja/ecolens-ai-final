import React, { memo } from 'react';
import { createMetricLabel } from '../../utils/a11y';

/**
 * Reusable Metric display card for sustainability statistics.
 * Incorporates semantic HTML landmarks, custom HSL styling, and screen reader announcements.
 * 
 * @param {Object} props
 * @param {string} props.title - Metric title (e.g., "Water Preserved")
 * @param {string|number} props.value - Metric numeric score/value
 * @param {string} props.unit - Metric measurement units
 * @param {string} props.emoji - Descriptive emoji icon
 * @param {string} props.description - Body description text explaining the analogy
 * @param {string} props.glowColor - Visual design glow variant ('emerald', 'cyan', or 'default')
 */
const MetricCard = memo(({ 
  title, 
  value, 
  unit, 
  emoji, 
  description, 
  glowColor = 'default' 
}) => {
  const glowClass = glowColor === 'emerald' ? 'emerald-glow' : glowColor === 'cyan' ? 'cyan-glow' : '';
  const accessibleLabel = createMetricLabel(title, value, unit);

  // Styling maps based on theme
  const getIconStyles = () => {
    switch (glowColor) {
      case 'emerald':
        return { background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' };
      case 'cyan':
        return { background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)' };
      default:
        return { background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-light)' };
    }
  };

  return (
    <article 
      className={`glass-card ${glowClass}`} 
      style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}
      aria-label={`${accessibleLabel}. ${description}`}
    >
      <div 
        style={{ 
          fontSize: '32px', 
          padding: '12px', 
          borderRadius: '12px',
          ...getIconStyles()
        }}
        role="img" 
        aria-label={`${title} icon`}
      >
        {emoji}
      </div>
      <div>
        <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {title}
        </h4>
        <div style={{ fontSize: '20px', fontWeight: '800', margin: '4px 0 2px' }}>
          {value} {unit}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {description}
        </p>
      </div>
    </article>
  );
});

MetricCard.displayName = 'MetricCard';
export default MetricCard;
