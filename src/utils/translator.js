// Traducción ES→EN con Ollama (placeholder)
export async function traducirPromptESaEN(textoES) {
  if (!textoES) return '';
  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama3.1:8b', prompt: `Translate to English for Stable Diffusion: ${textoES}`, stream: false }),
      signal: AbortSignal.timeout(5000)
    });
    if (response.ok) { const data = await response.json(); return data.response?.trim() || textoES; }
    return textoES;
  } catch { return textoES; }
}
