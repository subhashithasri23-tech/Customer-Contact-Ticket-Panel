import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:5000/api/tickets';

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTickets() {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('fetchTickets', err);
      setTickets([]);
    }
    setLoading(false);
  }

  async function createDemoTicket() {
    const ticketId = 'demo-' + Date.now();
    const body = { ticketId, customerName: 'Demo Customer', messages: [] };
    try {
      await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      fetchTickets();
    } catch (err) {
      console.error('createDemoTicket', err);
    }
  }

  async function addMessage(ticketId, text, sender = 'Agent') {
    try {
      await fetch(`${API_BASE}/${ticketId}/message`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, text }),
      });
      fetchTickets();
    } catch (err) {
      console.error('addMessage', err);
    }
  }

  return (
    <div className="App" style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <header>
        <h1>Customer Contact Ticket Panel</h1>
        <p>Timeline feed layout with reply forms.</p>
      </header>

      <div style={{ marginBottom: 16 }}>
        <button onClick={createDemoTicket}>Create Demo Ticket</button>
      </div>

      {loading ? (
        <p>Loading tickets…</p>
      ) : tickets.length === 0 ? (
        <p>No tickets yet. Click "Create Demo Ticket".</p>
      ) : (
        <div>
          {tickets.map((t) => (
            <TicketCard key={t.ticketId} ticket={t} onReply={addMessage} />
          ))}
        </div>
      )}
    </div>
  );
}

function TicketCard({ ticket, onReply }) {
  const [text, setText] = useState('');

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12, borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>{ticket.customerName}</strong>
          <div style={{ fontSize: 12, color: '#666' }}>{ticket.ticketId}</div>
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        {Array.isArray(ticket.messages) && ticket.messages.length > 0 ? (
          ticket.messages.map((m, i) => (
            <div key={i} style={{ padding: 8, background: i % 2 ? '#fafafa' : '#fff', borderRadius: 4, marginBottom: 6 }}>
              <div style={{ fontSize: 13 }}>
                <strong>{m.sender}</strong>: {m.text}
              </div>
              <div style={{ fontSize: 11, color: '#888' }}>{m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</div>
            </div>
          ))
        ) : (
          <div style={{ color: '#666' }}>No messages yet.</div>
        )}
      </div>

      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <input
          placeholder="Write a reply..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button
          onClick={() => {
            if (!text.trim()) return;
            onReply(ticket.ticketId, text.trim());
            setText('');
          }}
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default App;
