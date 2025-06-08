// pages/api/chat.js

export default async function handler(req, res) {
  const expectedToken = process.env.X_ACCESS_TOKEN;
  const providedToken = req.headers['x-access-token'];

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!providedToken || providedToken !== expectedToken) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor', detail: error.message });
  }
}
