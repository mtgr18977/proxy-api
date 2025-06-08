export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Access-Token");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const clientToken = req.headers['x-access-token'];
  const expectedToken = process.env.X_ACCESS_TOKEN;

  if (!clientToken || clientToken !== expectedToken) {
    return res.status(403).json({ error: "Token inválido" });
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await openaiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao chamar OpenAI", detail: error.message });
  }
}
