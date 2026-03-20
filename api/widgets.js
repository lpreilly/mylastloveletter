const SUPABASE_URL = 'https://cftbzeiiyzffxjqhilyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmdGJ6ZWlpeXpmZnhqcWhpbHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDMxNTYsImV4cCI6MjA4OTE3OTE1Nn0.snDQLyX-ZksPojIaz1-usLRMnyF8CtYedB-bYV44LO0';
 
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
 
  const { id, area } = req.query;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };
 
  let url, options;
 
  if (req.method === 'GET') {
    url = area
      ? `${SUPABASE_URL}/rest/v1/widgets?area=eq.${area}&select=*&order=sort_order.asc`
      : `${SUPABASE_URL}/rest/v1/widgets?select=*&order=sort_order.asc`;
    options = { headers };
  } else if (req.method === 'POST') {
    url = `${SUPABASE_URL}/rest/v1/widgets`;
    options = { method: 'POST', headers: { ...headers, 'Prefer': 'return=representation' }, body: JSON.stringify(req.body) };
  } else if (req.method === 'PUT') {
    url = `${SUPABASE_URL}/rest/v1/widgets?id=eq.${id}`;
    options = { method: 'PATCH', headers, body: JSON.stringify(req.body) };
  } else if (req.method === 'DELETE') {
    url = `${SUPABASE_URL}/rest/v1/widgets?id=eq.${id}`;
    options = { method: 'DELETE', headers };
  }
 
  const response = await fetch(url, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  res.status(response.status).json(data);
}
