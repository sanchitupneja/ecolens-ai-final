import React, { useState, useRef, useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { mockChatTemplates } from '../data/mockData';

function TwinChat({ chatMessages, setChatMessages }) {
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
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Trigger typing simulation
    setIsTyping(true);

    setTimeout(() => {
      // Basic text classification for demo
      let scenario = 'general';
      const cleanText = text.toLowerCase();
      if (cleanText.includes('meat') || cleanText.includes('beef') || cleanText.includes('vegetarian') || cleanText.includes('vegan') || cleanText.includes('food')) {
        scenario = 'meat';
      } else if (cleanText.includes('ev') || cleanText.includes('car') || cleanText.includes('electric vehicle') || cleanText.includes('drive')) {
        scenario = 'ev';
      } else if (cleanText.includes('solar') || cleanText.includes('panels') || cleanText.includes('community solar') || cleanText.includes('electricity')) {
        scenario = 'solar';
      }

      setSelectedScenario(scenario);
      const template = mockChatTemplates[scenario];

      const twinMsg = {
        sender: 'twin',
        text: template.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        scenario: scenario
      };

      setChatMessages(prev => [...prev, twinMsg]);
      setIsTyping(false);
    }, 1200);
  };

  // Get active chart data
  const currentChartData = mockChatTemplates[selectedScenario].chartData;

  // SVG Chart drawing calculations
  // Width 340, Height 200. Margins: left 40, right 20, top 20, bottom 30
  const chartWidth = 340;
  const chartHeight = 200;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 25;

  const graphWidth = chartWidth - paddingLeft - paddingRight;
  const graphHeight = chartHeight - paddingTop - paddingBottom;

  // Find max value in chart data to scale Y axis
  const allValues = currentChartData.flatMap(d => [d.statusQuo, d.withAction]);
  const maxValue = Math.max(...allValues, 10); // clamp max to at least 10 for aesthetics

  // Map year (0 to 10) to X coord
  const getX = (year) => paddingLeft + (year / 10) * graphWidth;
  // Map value (0 to maxVal) to Y coord (inverted in SVG)
  const getY = (val) => chartHeight - paddingBottom - (val / maxValue) * graphHeight;

  // Draw line path generator
  const getPathD = (key) => {
    return currentChartData.reduce((acc, d, idx) => {
      const x = getX(d.year);
      const y = getY(d[key]);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  };

  return (
    <div className="grid-2" style={{ height: 'calc(100vh - 150px)' }}>
      
      {/* Left Pane: Chat Screen */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {/* Chat Title */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} className="animate-pulse-glow"></div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700' }}>AI Twin Simulation Agent</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Finetuned Llama-3-8B Quantum Model</span>
          </div>
        </div>

        {/* Scrollable Message Box */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block' }} className="animate-pulse-glow"></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block', animationDelay: '0.2s' }} className="animate-pulse-glow"></span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block', animationDelay: '0.4s' }} className="animate-pulse-glow"></span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Question Chips */}
        <div style={{ padding: '8px 16px', display: 'flex', gap: '8px', overflowX: 'auto', borderTop: '1px solid var(--border-light)', whiteSpace: 'nowrap' }}>
          <button onClick={() => handleSendMessage("What if I swap beef for chicken 3x a week?")} className="btn-secondary" style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>🥗 Beef-Free Simulation</button>
          <button onClick={() => handleSendMessage("How much carbon will I save if I buy an EV next year?")} className="btn-secondary" style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>🚗 EV Travel Simulation</button>
          <button onClick={() => handleSendMessage("What happens if I sign up for community solar?")} className="btn-secondary" style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '500' }}>☀️ Community Solar Link</button>
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '12px' }}>
          <input 
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
          <button onClick={() => handleSendMessage(inputText)} className="btn-primary" style={{ padding: '12px 20px', fontSize: '13px' }}>
            Send
          </button>
        </div>
      </div>

      {/* Right Pane: Trajectory Chart */}
      <div className="glass-card cyan-glow" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Simulated Trajectory Visualizer</h3>
        <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Modeling accumulated metric tons of carbon ($CO_2e$) over a 10-year projection horizon.
        </p>

        {/* Chart Card */}
        <div style={{ background: 'rgba(11, 16, 31, 0.4)', borderRadius: '16px', padding: '16px', border: '1px solid var(--border-light)', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto' }}>
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
            <path d={getPathD('statusQuo')} fill="none" stroke="var(--accent-red)" strokeWidth="2.5" style={{ transition: 'd 0.5s ease' }} />
            {/* Line: With Action */}
            <path d={getPathD('withAction')} fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5" style={{ transition: 'd 0.5s ease' }} />

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
        <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-red)', display: 'inline-block' }}></span>
              <span style={{ fontSize: '12.5px', fontWeight: '500' }}>Status Quo (Base Trail)</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-red)' }}>
              +{currentChartData[currentChartData.length - 1].statusQuo.toFixed(1)} tons
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-emerald)', display: 'inline-block' }}></span>
              <span style={{ fontSize: '12.5px', fontWeight: '500' }}>With Lifestyle Change</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-emerald)' }}>
              +{currentChartData[currentChartData.length - 1].withAction.toFixed(1)} tons
            </span>
          </div>

          {/* Highlights box */}
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '12px', padding: '12px', fontSize: '12px', display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>💡</span>
            <div>
              <b style={{ color: 'var(--accent-emerald)' }}>Simulated 10-Yr Savings:</b> Net savings of {(currentChartData[currentChartData.length - 1].statusQuo - currentChartData[currentChartData.length - 1].withAction).toFixed(1)} metric tons of CO2e.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default TwinChat;
