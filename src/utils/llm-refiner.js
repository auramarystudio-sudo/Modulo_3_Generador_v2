// LLM Refiner - Mejora prompts con IA local (placeholder Ollama)
// En el futuro: POST http://127.0.0.1:11434/api/generate

const OLLAMA_URL = 'http://127.0.0.1:11434/api/generate';
const MODEL = 'llama3.1:8b';

const promptsPorEstilo = {
  'cinematico': 'Expande este prompt para hacerlo más cinematográfico, añade detalles de iluminación, composición y atmósfera. Responde SOLO con el prompt mejorado en inglés.',
  'detallado': 'Añade más detalles visuales, texturas y elementos descriptivos a este prompt. Responde SOLO con el prompt mejorado en inglés.',
  'creativo': 'Reinterpreta este prompt de forma creativa, añade elementos sorprendentes manteniendo la idea original. Responde SOLO con el prompt mejorado en inglés.',
};

// Refina un prompt usando LLM local
export async function refinarPrompt(promptBase, estilo = 'cinematico') {
  if (!promptBase || promptBase.trim().length === 0) return promptBase;
  
  const instruccion = promptsPorEstilo[estilo] || promptsPorEstilo['cinematico'];
  
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt: `Eres un experto en Stable Diffusion. ${instruccion}\n\nPrompt original: ${promptBase}\n\nPrompt mejorado:`,
        stream: false
      }),
      signal: AbortSignal.timeout(15000)
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.response?.trim() || refinarLocalmente(promptBase, estilo);
    }
    return refinarLocalmente(promptBase, estilo);
  } catch (error) {
    console.warn('Ollama no disponible, usando refiner local');
    return refinarLocalmente(promptBase, estilo);
  }
}

// Refiner local (fallback cuando Ollama no está disponible)
export function refinarLocalmente(prompt, estilo) {
  const mejoras = {
    'cinematico': {
      añadir: ['cinematic lighting', 'dramatic atmosphere', 'volumetric light', 'film grain', 'anamorphic lens', 'color grading'],
      prefijo: 'cinematic shot, movie still,',
    },
    'detallado': {
      añadir: ['intricate details', 'highly detailed', 'sharp focus', 'micro details', 'fine textures', 'complex patterns'],
      prefijo: 'highly detailed,',
    },
    'creativo': {
      añadir: ['surreal elements', 'unexpected composition', 'dreamlike atmosphere', 'unique perspective', 'artistic interpretation'],
      prefijo: 'creative interpretation,',
    },
  };
  
  const mejora = mejoras[estilo] || mejoras['cinematico'];
  const terminosActuales = prompt.split(',').map(t => t.trim()).filter(t => t);
  const nuevosTerminos = mejora.añadir.filter(t => 
    !terminosActuales.some(actual => actual.toLowerCase().includes(t.toLowerCase()))
  );
  
  return [mejora.prefijo, ...terminosActuales, ...nuevosTerminos].join(', ');
}

// Compara dos prompts y muestra diferencias
export function compararPrompts(original, refinado) {
  const origTerminos = new Set(original.split(',').map(t => t.trim().toLowerCase()));
  const refTerminos = new Set(refinado.split(',').map(t => t.trim().toLowerCase()));
  
  const añadidos = [...refTerminos].filter(t => !origTerminos.has(t));
  const eliminados = [...origTerminos].filter(t => !refTerminos.has(t));
  
  return { añadidos, eliminados };
}
