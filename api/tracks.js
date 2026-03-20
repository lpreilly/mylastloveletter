const sb_url = 'https://cftbzeiiyzffxjqhilyn.supabase.co';
const sb_key = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmdGJ6ZWlpeXpmZnhqcWhpbHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDMxNTYsImV4cCI6MjA4OTE3OTE1Nn0',
  'snDQLyX-ZksPojIaz1-usLRMnyF8CtYedB-bYV44LO0'
].join('.');
 
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
 
  const { id } = req.query;
  const headers = {
    'apikey': sb_key,
    'Authorization': `Bearer ${sb_key}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };
 
  let url, options;
 
  if (req.method === 'GET') {
    url = `${sb_url}/rest/v1/tracks?select=*&order=sort_order.asc`;
    options = { headers };
  } else if (req.method === 'POST') {
    url = `${sb_url}/rest/v1/tracks`;
    options = { method: 'POST', headers: { ...headers, 'Prefer': 'return=representation' }, body: JSON.stringify(req.body) };
  } else if (req.method === 'PUT') {
    url = `${sb_url}/rest/v1/tracks?id=eq.${id}`;
    options = { method: 'PATCH', headers, body: JSON.stringify(req.body) };
  } else if (req.method === 'DELETE') {
    url = `${sb_url}/rest/v1/tracks?id=eq.${id}`;
    options = { method: 'DELETE', headers };
  }
 
  const response = await fetch(url, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  res.status(response.status).json(data);
}
 
