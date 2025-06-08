# Proxy Seguro para OpenAI (Vercel)

Este é um proxy de backend que recebe chamadas do front-end da sua aplicação RAG, envia a requisição para a OpenAI com sua chave segura (via variável de ambiente), e retorna a resposta ao navegador.

## Como usar

1. Suba este diretório para o Vercel
2. No painel do Vercel, vá em "Environment Variables"
3. Adicione `OPENAI_API_KEY` com o valor da sua chave
4. Publique o projeto

A partir disso, o front-end pode fazer chamadas para `/api/chat` em vez de chamar diretamente `https://api.openai.com/...`, mantendo sua chave protegida.
