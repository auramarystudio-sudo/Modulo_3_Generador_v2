// Traducción ES→EN usando Ollama local (placeholder)
// En el futuro se conectará a Ollama: POST http://127.0.0.1:11434/api/generate

const OLLAMA_URL = 'http://127.0.0.1:11434/api/generate';
const MODEL = 'llama3.1:8b';

// Diccionario básico para traducción offline
const diccionarioBasico = {
  'retrato': 'portrait', 'paisaje': 'landscape', 'mujer': 'woman', 'hombre': 'man',
  'hermosa': 'beautiful', 'joven': 'young', 'viejo': 'old', 'guerrero': 'warrior',
  'mago': 'wizard', 'dragón': 'dragon', 'castillo': 'castle', 'bosque': 'forest',
  'ciudad': 'city', 'montaña': 'mountain', 'río': 'river', 'mar': 'sea',
  'cielo': 'sky', 'sol': 'sun', 'luna': 'moon', 'estrellas': 'stars',
  'noche': 'night', 'día': 'day', 'atardecer': 'sunset', 'amanecer': 'sunrise',
  'lluvia': 'rain', 'nieve': 'snow', 'niebla': 'fog', 'tormenta': 'storm',
  'fuego': 'fire', 'agua': 'water', 'tierra': 'earth', 'aire': 'air',
  'oscuro': 'dark', 'claro': 'light', 'colorido': 'colorful', 'blanco': 'white',
  'negro': 'black', 'rojo': 'red', 'azul': 'blue', 'verde': 'green',
  'dorado': 'golden', 'plateado': 'silver', 'brillante': 'shining', 'opaco': 'matte',
  'grande': 'large', 'pequeño': 'small', 'gigante': 'giant', 'diminuto': 'tiny',
  'antiguo': 'ancient', 'moderno': 'modern', 'futurista': 'futuristic', 'medieval': 'medieval',
  'mágico': 'magical', 'místico': 'mystical', 'épico': 'epic', 'dramático': 'dramatic',
  'sereno': 'serene', 'tranquilo': 'peaceful', 'caótico': 'chaotic', 'violento': 'violent',
  'una': 'a', 'un': 'a', 'el': 'the', 'la': 'the', 'los': 'the', 'las': 'the',
  'con': 'with', 'sin': 'without', 'en': 'in', 'sobre': 'on', 'bajo': 'under',
  'entre': 'between', 'dentro': 'inside', 'fuera': 'outside', 'arriba': 'above',
  'debajo': 'below', 'frente': 'front', 'detrás': 'behind', 'lado': 'side',
  'iluminación': 'lighting', 'composición': 'composition', 'estilo': 'style',
  'calidad': 'quality', 'detalle': 'detail', 'detallado': 'detailed',
  'profesional': 'professional', 'artístico': 'artistic', 'realista': 'realistic',
  'cinematográfico': 'cinematic', 'fotográfico': 'photographic',
};

// Traduce texto usando Ollama (placeholder con fallback a diccionario)
export async function traducirPromptESaEN(textoES) {
  if (!textoES || textoES.trim().length === 0) return '';
  
  const promptSistema = `Traduce el siguiente prompt de español a inglés para Stable Diffusion. 
Mantén los términos técnicos de IA (masterpiece, best quality, etc.). 
Responde SOLO con la traducción, sin texto adicional.`;

  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt: `${promptSistema}\n\nTexto a traducir: ${textoES}`,
        stream: false
      }),
      signal: AbortSignal.timeout(10000) // Timeout 10s
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.response?.trim() || traducirConDiccionario(textoES);
    }
    return traducirConDiccionario(textoES);
  } catch (error) {
    console.warn('Ollama no disponible, usando traducción con diccionario');
    return traducirConDiccionario(textoES);
  }
}

// Traducción básica con diccionario (fallback)
export function traducirConDiccionario(texto) {
  let resultado = texto.toLowerCase();
  
  // Reemplazar palabras del diccionario
  Object.entries(diccionarioBasico)
    .sort((a, b) => b[0].length - a[0].length) // Más largas primero
    .forEach(([es, en]) => {
      const regex = new RegExp(`\\b${es}\\b`, 'gi');
      resultado = resultado.replace(regex, en);
    });
  
  return resultado;
}

// Verifica si Ollama está disponible
export async function verificarOllama() {
  try {
    const response = await fetch('http://127.0.0.1:11434/api/tags', {
      signal: AbortSignal.timeout(3000)
    });
    return response.ok;
  } catch {
    return false;
  }
}
