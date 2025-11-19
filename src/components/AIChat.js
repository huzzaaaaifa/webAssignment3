import React, { useState } from 'react';

// AI chat with DeepSeek API
function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Call DeepSeek API
  const callDeepSeek = async (text) => {
    const key = process.env.REACT_APP_DEEPSEEK_API_KEY;
    console.log('API Key present?', !!key);
    console.log('Key starts with:', key ? key.substring(0, 10) + '...' : 'NO KEY');
    
    if (!key) {
      console.error('No API key found in environment');
      return null;
    }

    try {
      console.log('Calling OpenRouter API with DeepSeek...');
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'CyberSecure - Cybersecurity Learning Platform'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful cybersecurity assistant. Provide concise, informative answers about cybersecurity topics.'
            },
            {
              role: 'user',
              content: text
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      console.log('Response status:', res.status, res.statusText);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('OpenRouter API error:', res.status, errorText);
        return null;
      }

      const data = await res.json();
      console.log('OpenRouter Response:', data);
      
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content;
      }
      
      console.warn('Unexpected response format:', data);
      return null;
    } catch (err) {
      console.error('OpenRouter request failed:', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);

    const userPrompt = prompt.trim();
    setResponses(prev => [...prev, { role: 'user', text: userPrompt }]);

    const aiReply = await callDeepSeek(userPrompt);
    if (aiReply) {
      setResponses(prev => [...prev, { role: 'ai', text: aiReply }]);
    } else {
      setResponses(prev => [...prev, { role: 'ai', text: "Sorry — I don't have an API key configured. Try setting REACT_APP_DEEPSEEK_API_KEY in your .env to enable real responses." }]);
    }

    setPrompt('');
    setLoading(false);
  };

  return (
    <div className="page-container">
      <main className="fade-in">
        <h2>Ask AI</h2>
        <p>Type a prompt and get a response from DeepSeek AI. Cybersecurity assistant powered by DeepSeek.</p>

        <form onSubmit={handleSubmit} style={{ maxWidth: 800, marginBottom: 20 }}>
          <div className="form-group">
            <label htmlFor="prompt">Your prompt</label>
            <input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question or request a short summary..."
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </form>

        <div>
          {responses.map((r, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong>{r.role === 'user' ? 'You' : 'AI'}:</strong>
              <div style={{ marginTop: 6 }}>{r.text}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AIChat;
