const SUPABASE_URL = 'https://cftbzeiiyzffxjqhilyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmdGJ6ZWlpeXpmZnhqcWhpbHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDMxNTYsImV4cCI6MjA4OTE3OTE1Nn0.snDQLyX-ZksPojIaz1-usLRMnyF8CtYedB-bYV44LO0';
 
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
 
  const { post_id, id } = req.query;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  };
 
  let url, options;
 
  if (req.method === 'GET') {
    url = `${SUPABASE_URL}/rest/v1/comments?post_id=eq.${post_id}&select=*&order=date.asc`;
    options = { headers };
  } else if (req.method === 'POST') {
    url = `${SUPABASE_URL}/rest/v1/comments`;
    options = { method: 'POST', headers: { ...headers, 'Prefer': 'return=representation' }, body: JSON.stringify(req.body) };
  } else if (req.method === 'DELETE') {
    url = `${SUPABASE_URL}/rest/v1/comments?id=eq.${id}`;
    options = { method: 'DELETE', headers };
  }
 
  const response = await fetch(url, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  res.status(response.status).json(data);
}
