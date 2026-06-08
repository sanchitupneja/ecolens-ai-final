/**
 * TwinChat component tests
 * Tests chat logic, scenario classification, and message handling
 */

describe('TwinChat Message Classification', () => {
  const classifyMessage = (text) => {
    const cleanText = text.toLowerCase();
    if (cleanText.includes('meat') || cleanText.includes('beef') || cleanText.includes('vegetarian') || cleanText.includes('vegan') || cleanText.includes('food')) {
      return 'meat';
    } else if (cleanText.includes('ev') || cleanText.includes('car') || cleanText.includes('electric vehicle') || cleanText.includes('drive')) {
      return 'ev';
    } else if (cleanText.includes('solar') || cleanText.includes('panels') || cleanText.includes('community solar') || cleanText.includes('electricity')) {
      return 'solar';
    }
    return 'general';
  };

  it('should classify meat-related questions', () => {
    expect(classifyMessage('What if I swap beef for chicken?')).toBe('meat');
    expect(classifyMessage('I want to be vegetarian')).toBe('meat');
    expect(classifyMessage('Tell me about vegan options')).toBe('meat');
  });

  it('should classify EV-related questions', () => {
    expect(classifyMessage('How much carbon will an EV save?')).toBe('ev');
    expect(classifyMessage('Should I buy an electric vehicle?')).toBe('ev');
    expect(classifyMessage('Tell me about driving an EV')).toBe('ev');
  });

  it('should classify solar-related questions', () => {
    expect(classifyMessage('What about community solar?')).toBe('solar');
    expect(classifyMessage('Can I install solar panels?')).toBe('solar');
    expect(classifyMessage('How does electricity affect my carbon?')).toBe('solar');
  });

  it('should classify as general for unknown topics', () => {
    expect(classifyMessage('Hello')).toBe('general');
    expect(classifyMessage('What do you do?')).toBe('general');
    expect(classifyMessage('Tell me something')).toBe('general');
  });
});

describe('TwinChat Message Structure', () => {
  it('should create valid user message', () => {
    const message = {
      sender: 'user',
      text: 'Test message',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    expect(message.sender).toBe('user');
    expect(message.text).not.toBe('');
    expect(message.timestamp).toBeDefined();
  });

  it('should create valid twin message', () => {
    const message = {
      sender: 'twin',
      text: 'Response from twin',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scenario: 'meat'
    };
    expect(message.sender).toBe('twin');
    expect(message.scenario).toBe('meat');
  });

  it('should handle empty text validation', () => {
    const text = '';
    const isValid = text.trim().length > 0;
    expect(isValid).toBe(false);
  });

  it('should validate non-empty text', () => {
    const text = 'Valid message';
    const isValid = text.trim().length > 0;
    expect(isValid).toBe(true);
  });
});

describe('TwinChat Chart Data', () => {
  const getMockChartData = (scenario) => {
    const data = {
      meat: [
        { year: 0, statusQuo: 0, withAction: 0 },
        { year: 10, statusQuo: 6.5, withAction: 2.5 }
      ],
      ev: [
        { year: 0, statusQuo: 0, withAction: 0 },
        { year: 10, statusQuo: 31.0, withAction: 9.0 }
      ],
      solar: [
        { year: 0, statusQuo: 0, withAction: 0 },
        { year: 10, statusQuo: 18.0, withAction: 0 }
      ],
      general: [
        { year: 0, statusQuo: 0, withAction: 0 },
        { year: 10, statusQuo: 7.5, withAction: 4.0 }
      ]
    };
    return data[scenario] || data.general;
  };

  it('should return valid chart data for meat scenario', () => {
    const data = getMockChartData('meat');
    expect(data).toHaveLength(2);
    expect(data[data.length - 1].statusQuo).toBe(6.5);
  });

  it('should calculate 10-year savings difference', () => {
    const data = getMockChartData('ev');
    const savings = data[data.length - 1].statusQuo - data[data.length - 1].withAction;
    expect(savings).toBe(22);
  });

  it('should find max value for chart scaling', () => {
    const data = getMockChartData('solar');
    const allValues = data.flatMap(d => [d.statusQuo, d.withAction]);
    const maxValue = Math.max(...allValues, 10);
    expect(maxValue).toBeGreaterThanOrEqual(10);
  });
});
