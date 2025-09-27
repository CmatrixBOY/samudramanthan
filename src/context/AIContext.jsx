import { createContext, useContext, useMemo, useState } from 'react';
import policies from '../mock/policies.json';

const AIContext = createContext({ messages: [], sendMessage: async () => {} });

function answerFromPolicies(q) {
  const text = q.toLowerCase();
  const hits = policies.items.filter(p =>
    [p.title, p.summary, p.body || '', (p.keywords || []).join(' ')].join(' ').toLowerCase().includes(text)
  );
  if (hits.length === 0) {
    return 'I could not find a specific Indian policy for that. Refer to MoES, CMFRI, MPEDA, CPCB and CRZ notifications. Seasonal fishing bans vary by state—check local fisheries department.';
  }
  const parts = hits.slice(0, 3).map(p => `• ${p.title}: ${p.summary}${p.penalties ? ` (Penalties: ${p.penalties})` : ''}`);
  return `Relevant Indian policies and guidelines:\n${parts.join('\n')}`;
}

export const AIProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (content) => {
    const userMsg = { role: 'user', content, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    await new Promise(r => setTimeout(r, 300));
    const reply = answerFromPolicies(content);
    const aiMsg = { role: 'assistant', content: reply, ts: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
  };

  const value = useMemo(() => ({ messages, sendMessage }), [messages]);
  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

export const useAI = () => useContext(AIContext);
