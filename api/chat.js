// api/chat.js
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  // parse JSON body
  let body;
  try {
    body = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(JSON.parse(data)));
      req.on('error', reject);
    });
  } catch (err) {
    console.error('Erro ao ler body:', err);
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // proxy to OpenAI
  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });
    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
  } catch (error) {
    console.error('Chat proxy error:', error);
    return res.status(500).json({ error: 'Chat proxy failure' });
  }
}
