import { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { useAI } from '../context/AIContext.jsx';
import policies from '../mock/policies.json';

export default function Policies() {
  const { messages, sendMessage } = useAI();
  const [q, setQ] = useState('What are seasonal fishing bans in India?');

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Key Indian Policies</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {policies.items.map(p => (
              <li key={p.id} className="rounded-md border p-3">
                <div className="font-medium">{p.title}</div>
                <p className="text-sm text-muted-foreground">{p.summary}</p>
                {p.penalties && <p className="mt-1 text-xs">Penalties: {p.penalties}</p>}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Policy Assistant</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about MoES/CMFRI/MPEDA/CPCB/CRZ policies" />
              <Button onClick={()=>sendMessage(q)}>Ask</Button>
            </div>
            <div className="max-h-80 space-y-2 overflow-auto rounded-md border p-3 text-sm">
              {messages.length === 0 && <p className="text-muted-foreground">Ask a question to get AI-guided summaries.</p>}
              {messages.map((m, i) => (
                <p key={i} className={m.role==='user'? 'font-medium':'text-muted-foreground whitespace-pre-wrap'}>
                  {m.role==='user' ? `You: ${m.content}` : m.content}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
