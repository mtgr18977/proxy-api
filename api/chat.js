export default async function handler(req, res) {
  // Adiciona suporte a CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Responde à requisição de preflight do CORS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
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
