// LLM Refiner - Mejora prompts con IA (placeholder Ollama)
export async function refinarPrompt(promptBase, estilo = 'cinematico') {
  if (!promptBase) return promptBase;
  const promptsPorEstilo = {
    'cinematico': 'Make this prompt more cinematic, add lighting and atmosphere details. Respond ONLY with the improved prompt in English.',
    'detallado': 'Add more visual details and textures. Respond ONLY with the improved prompt in English.',
    'creativo': 'Reinterpret creatively, add surprising elements. Respond ONLY with the improved prompt in English.'
  };
  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama3.1:8b', prompt: `You are a Stable Diffusion expert. ${promptsPorEstilo[estilo]}\n\nOriginal: ${promptBase}`, stream: false }),
      signal: AbortSignal.timeout(10000)
    });
    if (response.ok) { const data = await response.json(); return data.response?.trim() || refinarLocalmente(promptBase, estilo); }
    return refinarLocalmente(promptBase, estilo);
  } catch { return refinarLocalmente(promptBase, estilo); }
}

export function refinarLocalmente(prompt, estilo) {
  const mejoras = {
    'cinematico': { añadir: ['cinematic lighting', 'dramatic atmosphere', 'volumetric light', 'film grain'], prefijo: 'cinematic shot,' },
    'detallado': { añadir: ['intricate details', 'highly detailed', 'sharp focus', 'micro details'], prefijo: 'highly detailed,' },
    'creativo': { añadir: ['surreal elements', 'unexpected composition', 'dreamlike atmosphere'], prefijo: 'creative interpretation,' },
  };
  const mejora = mejoras[estilo] || mejoras['cinematico'];
  const terminosActuales = prompt.split(',').map(t => t.trim()).filter(t => t);
  const nuevosTerminos = mejora.añadir.filter(t => !terminosActuales.some(a => a.toLowerCase().includes(t.toLowerCase())));
  return [mejora.prefijo, ...terminosActuales, ...nuevosTerminos].join(', ');
}
