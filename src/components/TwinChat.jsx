import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import A11yButton from './common/A11yButton';
import { createChartLabel } from '../utils/a11y';
import { sanitizeInput, classifyScenario, getChatResponse } from '../services/chatService';

/**
 * AI Climate Twin Chat component.
 * Allows users to UNDERSTAND how lifestyle adjustments reduce future emissions.
 * 
 * Alignment:
 * 1. Understand: Interact with the AI Coach to run hypothetical carbon projections.
 * 2. Track: Visualize cumulative carbon reductions in a 10-year line graph.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.chatMessages - Array of chat message objects
 * @param {Function} props.setChatMessages - State setter callback for chat messages
 * @returns {React.ReactElement} The TwinChat panel component
 */
const TwinChat = memo(({ chatMessages, setChatMessages }) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('general');
  const chatEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Handle sending a message
  const handleSendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    
    // Security check: Validate length constraints
    if (trimmed.length > 500) {
      alert("Please limit your queries to under 500 characters.");
      return;
    }

    const sanitized = sanitizeInput(trimmed);

    // Add user message
    const userMsg = {
      sender: 'user',
      text: sanitized,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Trigger typing simulation
    setIsTyping(true);

    setTimeout(() => {
      const scenario = classifyScenario(sanitized);
      setSelectedScenario(scenario);
      
      const response = getChatResponse(scenario);

      const twinMsg = {
        sender: 'twin',
        text: response.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        scenario: scenario
      };

      setChatMessages(prev => [...prev, twinMsg]);
      setIsTyping(false);
    }, 1200);
  };

  // Get active chart data (memoized)
  const currentChartData = useMemo(() => {
    return getChatResponse(selectedScenario).chartData;
  }, [selectedScenario]);

  // SVG Chart drawing calculations (constant dimensions)
  const chartWidth = 340;
  const chartHeight = 200;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 25;

  const graphWidth = chartWidth - paddingLeft - paddingRight;
  const graphHeight = chartHeight - paddingTop - paddingBottom;

  // Find max value in chart data to scale Y axis (memoized)
  const maxValue = useMemo(() => {
    const allValues = currentChartData.flatMap(d => [d.statusQuo, d.withAction]);
    return Math.max(...allValues, 10);
  }, [currentChartData]);

  // Map year (0 to 10) to X coord
  const getX = (year) => paddingLeft + (year / 10) * graphWidth;
  // Map value (0 to maxVal) to Y coord (inverted in SVG)
  const getY = (val) => chartHeight - paddingBottom - (val / maxValue) * graphHeight;

  // Draw line path generator (memoized)
  const statusQuoPath = useMemo(() => {
    return currentChartData.reduce((acc, d, idx) => {
      const x = getX(d.year);
      const y = getY(d.statusQuo);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [currentChartData, maxValue]);

  const withActionPath = useMemo(() => {
    return currentChartData.reduce((acc, d, idx) => {
      const x = getX(d.year);
      const y = getY(d.withAction);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [currentChartData, maxValue]);

  const tenYearSavingsText = useMemo(() => {
    const lastData = currentChartData[currentChartData.length - 1];
    return (lastData.statusQuo - lastData.withAction).toFixed(1);
  }, [currentChartData]);

  const accessibleChartDescription = createChartLabel(
    `Projections for ${selectedScenario} modifications`,
    `A 10-year projection comparing status quo emissions which accumulate to ${currentChartData[currentChartData.length - 1].statusQuo.toFixed(1)} tons versus lifestyle changes which reduce emissions to ${currentChartData[currentChartData.length - 1].withAction.toFixed(1)} tons.`
  );

  return (
    <div className="grid-2" style={{ height: 'calc(100vh - 150px)' }}>
      
      {/* Left Pane: Chat Screen */}
      <section 
        className="glass-card" 
        style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
        aria-label="Coach Chat Window"
      >
        {/* Chat Title */}
        <header style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} className="animate-pulse-glow" aria-hidden="true"></div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700' }}>AI Twin Simulation Agent</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Finetuned Llama-3-8B Quantum Model</span>
          </div>
        </header>

        {/* Scrollable Message Box */}
        <div 
          style={{ flexGrow: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}
          role="log"
          aria-live="polite"
          aria-label="Chat messages transcript"
        >
          {chatMessages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              <div style={{ 
                padding: '12px 16px', 
                borderRadius: '16px', 
                fontSize: '13.5px', 
                lineHeight: '1.5',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-emerald), #047857)' : 'rgba(255, 255, 255, 0.03)',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-light)',
                color: 'white',
                borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.sender === 'user' ? '16px' : '4px'
              }}>
                {msg.text}
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.sender === 'user' ? 'You' : 'AI Climate Twin'} • {msg.timestamp}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px 20px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block' }} className="animate-pulse-glow" aria-hidden="true"></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block', animationDelay: '0.2s' }} className="animate-pulse-glow" aria-hidden="true"></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block', animationDelay: '0.4s' }} className="animate-pulse-glow" aria-hidden="true"></span>
              <span className="sr-only">AI is typing...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Question Chips */}
        <div style={{ padding: '8px 16px', display: 'flex', gap: '8px', overflowX: 'auto', borderTop: '1px solid var(--border-light)', whiteSpace: 'nowrap' }} aria-label="Suggested topics">
          <A11yButton onClick={() => handleSendMessage("What if I swap beef for chicken 3x a week?")} className="btn-secondary" style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>🥗 Beef-Free Simulation</A11yButton>
          <A11yButton onClick={() => handleSendMessage("How much carbon will I save if I buy an EV next year?")} className="btn-secondary" style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>🚗 EV Travel Simulation</A11yButton>
          <A11yButton onClick={() => handleSendMessage("What happens if I sign up for community solar?")} className="btn-secondary" style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>☀️ Community Solar Link</A11yButton>
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '12px' }}>
          <label htmlFor="chat-message-input" className="sr-only">Ask a question to your Climate Twin</label>
          <input 
            id="chat-message-input"
            type="text" 
            placeholder="Ask your Twin about energy, commutes, diet..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            style={{ 
              flexGrow: 1, 
              background: 'var(--bg-input)', 
              border: '1px solid var(--border-light)', 
              borderRadius: '10px', 
              padding: '12px 16px', 
              color: 'white', 
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <A11yButton onClick={() => handleSendMessage(inputText)} className="btn-primary" style={{ padding: '12px 20px', fontSize: '13px' }}>
            Send
          </A11yButton>
        </div>
      </section>

      {/* Right Pane: Trajectory Chart */}
      <section 
        className="glass-card cyan-glow" 
        style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}
        aria-label="Simulation projection data charts"
      >
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Simulated Trajectory Visualizer</h3>
        <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Modeling accumulated metric tons of carbon ($CO_2e$) over a 10-year projection horizon.
        </p>

        {/* Chart Card with accessible label */}
        <div 
          style={{ background: 'rgba(11, 16, 31, 0.4)', borderRadius: '16px', padding: '16px', border: '1px solid var(--border-light)', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          role="img"
          aria-label={accessibleChartDescription}
        >
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto' }}>
            <title>{`10-Year projections comparing status quo versus lifestyle scenario: ${selectedScenario}`}</title>
            <desc>{`A line graph mapping carbon saved in metric tons from year zero to ten.`}</desc>
            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const yVal = ratio * maxValue;
              const y = getY(yVal);
              return (
                <g key={idx}>
                  <line x1={paddingLeft} y1={y} x2={chartWidth - paddingRight} y2={y} stroke="var(--border-light)" strokeWidth="0.5" strokeDasharray="3,3" />
                  <text x={paddingLeft - 8} y={y + 3} fill="var(--text-muted)" fontSize="9" textAnchor="end">{yVal.toFixed(1)}t</text>
                </g>
              );
            })}

            {/* X Axis labels */}
            {currentChartData.map((d, idx) => (
              <text key={idx} x={getX(d.year)} y={chartHeight - 6} fill="var(--text-muted)" fontSize="9" textAnchor="middle">Yr {d.year}</text>
            ))}

            {/* Line: Status Quo */}
            <path d={statusQuoPath} fill="none" stroke="var(--accent-red)" strokeWidth="2.5" style={{ transition: 'd 0.5s ease' }} />
            {/* Line: With Action */}
            <path d={withActionPath} fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5" style={{ transition: 'd 0.5s ease' }} />

            {/* Circles & Dots */}
            {currentChartData.map((d, idx) => (
              <g key={idx}>
                {/* Status Quo dot */}
                <circle cx={getX(d.year)} cy={getY(d.statusQuo)} r="4" fill="var(--accent-red)" />
                <circle cx={getX(d.year)} cy={getY(d.statusQuo)} r="7" fill="none" stroke="var(--accent-red)" strokeWidth="1" opacity="0.3" />
                
                {/* With Action dot */}
                <circle cx={getX(d.year)} cy={getY(d.withAction)} r="4" fill="var(--accent-emerald)" />
                <circle cx={getX(d.year)} cy={getY(d.withAction)} r="7" fill="none" stroke="var(--accent-emerald)" strokeWidth="1" opacity="0.3" />
              </g>
            ))}
          </svg>
        </div>

        {/* Legend & Summary Info */}
        <footer style={{ marginTop: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-red)', display: 'inline-block' }} aria-hidden="true"></span>
              <span style={{ fontSize: '12.5px', fontWeight: '500' }}>Status Quo (Base Trail)</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-red)' }}>
              +{currentChartData[currentChartData.length - 1].statusQuo.toFixed(1)} tons
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-emerald)', display: 'inline-block' }} aria-hidden="true"></span>
              <span style={{ fontSize: '12.5px', fontWeight: '500' }}>With Lifestyle Change</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-emerald)' }}>
              +{currentChartData[currentChartData.length - 1].withAction.toFixed(1)} tons
            </span>
          </div>

          {/* Highlights box */}
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '12px', padding: '12px', fontSize: '12px', display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '18px' }} role="img" aria-label="Lightbulb icon">💡</span>
            <div>
              <b style={{ color: 'var(--accent-emerald)' }}>Simulated 10-Yr Savings:</b> Net savings of {tenYearSavingsText} metric tons of CO2e.
            </div>
          </div>
        </footer>

      </section>

    </div>
  );
});

TwinChat.displayName = 'TwinChat';
export default TwinChat;
