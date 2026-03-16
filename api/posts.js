const SUPABASE_URL = 'https://cftbzeiiyzffxjqhilyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmdGJ6ZWlpeXpmZnhqcWhpbHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDMxNTYsImV4cCI6MjA4OTE3OTE1Nn0.snDQLyX-ZksPojIaz1-usLRMnyF8CtYedB-bYV44LO0'; // your full key

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const method = req.method;
  const { action, id } = req.query;

  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };

  let url, options;

  if (method === 'GET') {
    url = `${SUPABASE_URL}/rest/v1/posts?select=*&order=date.desc`;
    options = { headers };
  } else if (method === 'POST') {
    url = `${SUPABASE_URL}/rest/v1/posts`;
    options = { method: 'POST', headers: { ...headers, 'Prefer': 'return=representation' }, body: JSON.stringify(req.body) };
  } else if (method === 'PUT') {
    url = `${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`;
    options = { method: 'PATCH', headers, body: JSON.stringify(req.body) };
  } else if (method === 'DELETE') {
    url = `${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`;
    options = { method: 'DELETE', headers };
  }

  const response = await fetch(url, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  res.status(response.status).json(data);
}
