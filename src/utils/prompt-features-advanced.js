// Utilidades para las 25 mejoras adicionales

// ========== 1. DETECTOR DE CONFLICTOS ==========
export function detectarConflictos(prompt) {
  const conflictos = [];
  const textoLower = prompt.toLowerCase();
  
  // Conflictos de estilo
  if (textoLower.includes('realistic') && textoLower.includes('cartoon')) {
    conflictos.push({ tipo: 'estilo', mensaje: 'Conflicto: "realistic" vs "cartoon"', severidad: 'alta' });
  }
  if (textoLower.includes('photo') && textoLower.includes('anime')) {
    conflictos.push({ tipo: 'estilo', mensaje: 'Conflicto: "photo" vs "anime"', severidad: 'alta' });
  }
  if (textoLower.includes('3d render') && textoLower.includes('2d')) {
    conflictos.push({ tipo: 'estilo', mensaje: 'Conflicto: "3d render" vs "2d"', severidad: 'media' });
  }
  
  // Conflictos de iluminación
  if (textoLower.includes('bright') && textoLower.includes('dark')) {
    conflictos.push({ tipo: 'iluminación', mensaje: 'Conflicto: "bright" vs "dark"', severidad: 'media' });
  }
  if (textoLower.includes('sunny') && textoLower.includes('night')) {
    conflictos.push({ tipo: 'iluminación', mensaje: 'Conflicto: "sunny" vs "night"', severidad: 'alta' });
  }
  
  // Conflictos de calidad
  if (textoLower.includes('high quality') && textoLower.includes('low quality')) {
    conflictos.push({ tipo: 'calidad', mensaje: 'Conflicto: "high quality" vs "low quality"', severidad: 'crítica' });
  }
  
  // Conflictos de época
  if (textoLower.includes('medieval') && textoLower.includes('futuristic')) {
    conflictos.push({ tipo: 'época', mensaje: 'Conflicto: "medieval" vs "futuristic"', severidad: 'media' });
  }
  
  // Conflictos de ambiente
  if (textoLower.includes('indoor') && textoLower.includes('outdoor')) {
    conflictos.push({ tipo: 'ambiente', mensaje: 'Conflicto: "indoor" vs "outdoor"', severidad: 'media' });
  }
  
  return conflictos;
}

export function calcularCoherencia(prompt) {
  const conflictos = detectarConflictos(prompt);
  let score = 100;
  conflictos.forEach(c => {
    if (c.severidad === 'crítica') score -= 30;
    else if (c.severidad === 'alta') score -= 20;
    else if (c.severidad === 'media') score -= 10;
  });
  return Math.max(0, score);
}

// ========== 2. ANÁLISIS DE FRECUENCIA ==========
export function analizarFrecuencia(historial) {
  const frecuencia = {};
  historial.forEach(item => {
    const terminos = item.prompt.split(',').map(t => t.trim().toLowerCase());
    terminos.forEach(t => {
      if (t.length > 3) {
        frecuencia[t] = (frecuencia[t] || 0) + 1;
      }
    });
  });
  return Object.entries(frecuencia)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([termino, count]) => ({ termino, count }));
}

// ========== 3. ESTIMADOR DE COMPLEJIDAD ==========
export function estimarComplejidad(prompt) {
  const terminos = prompt.split(',').filter(t => t.trim());
  const palabras = prompt.split(/\s+/).length;
  const tokens = Math.ceil(terminos.length * 1.5);
  
  let nivel = 'simple';
  let tiempoEstimado = '5-10 segundos';
  
  if (tokens > 75 || palabras > 100) {
    nivel = 'muy compleja';
    tiempoEstimado = '30-60 segundos';
  } else if (tokens > 50 || palabras > 70) {
    nivel = 'compleja';
    tiempoEstimado = '20-30 segundos';
  } else if (tokens > 25 || palabras > 40) {
    nivel = 'moderada';
    tiempoEstimado = '10-20 segundos';
  }
  
  return { nivel, tiempoEstimado, tokens, palabras, terminos: terminos.length };
}

// ========== 4. PROMPT DNA (Código de barras visual) ==========
export function generarPromptDNA(prompt) {
  const hash = prompt.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  const bars = [];
  for (let i = 0; i < 20; i++) {
    const value = Math.abs((hash * (i + 1)) % 100);
    bars.push(value);
  }
  
  return bars;
}

// ========== 5. MOOD BOARD AUTOMÁTICO ==========
export function analizarMood(prompt) {
  const textoLower = prompt.toLowerCase();
  const moods = {
    oscuro: ['dark', 'gothic', 'horror', 'shadow', 'night', 'black'],
    alegre: ['bright', 'happy', 'cheerful', 'sunny', 'colorful', 'vibrant'],
    épico: ['epic', 'grand', 'majestic', 'monumental', 'legendary'],
    misterioso: ['mysterious', 'enigmatic', 'fog', 'mist', 'shadow', 'hidden'],
    romántico: ['romantic', 'love', 'soft', 'gentle', 'tender', 'intimate'],
    nostálgico: ['vintage', 'retro', 'old', 'classic', 'nostalgic', 'memory'],
    futurista: ['futuristic', 'cyber', 'neon', 'tech', 'sci-fi', 'space'],
    natural: ['nature', 'forest', 'mountain', 'ocean', 'landscape', 'organic'],
    minimalista: ['minimal', 'simple', 'clean', 'white', 'empty'],
    caótico: ['chaos', 'messy', 'crowded', 'busy', 'explosion']
  };
  
  const resultados = {};
  Object.entries(moods).forEach(([mood, palabras]) => {
    const count = palabras.filter(p => textoLower.includes(p)).length;
    if (count > 0) resultados[mood] = count;
  });
  
  const moodDominante = Object.entries(resultados).sort((a, b) => b[1] - a[1])[0];
  return {
    dominante: moodDominante ? moodDominante[0] : 'neutral',
    intensidad: moodDominante ? moodDominante[1] : 0,
    todos: resultados
  };
}

// ========== 6. SISTEMA DE LOGROS ==========
export const logrosDefinidos = [
  { id: 'primer-prompt', nombre: 'Primer Paso', descripcion: 'Genera tu primer prompt', icono: '🎉', condicion: (stats) => stats.totalPrompts >= 1 },
  { id: 'diez-prompts', nombre: 'En Racha', descripcion: 'Genera 10 prompts', icono: '🔥', condicion: (stats) => stats.totalPrompts >= 10 },
  { id: 'cien-prompts', nombre: 'Centurión', descripcion: 'Genera 100 prompts', icono: '💯', condicion: (stats) => stats.totalPrompts >= 100 },
  { id: 'maestro-cyberpunk', nombre: 'Cyberpunk Master', descripcion: 'Usa el estilo cyberpunk 10 veces', icono: '🤖', condicion: (stats) => stats.estilosUsados.cyberpunk >= 10 },
  { id: 'explorador', nombre: 'Explorador', descripcion: 'Usa 10 estilos diferentes', icono: '🌟', condicion: (stats) => Object.keys(stats.estilosUsados).length >= 10 },
  { id: 'perfeccionista', nombre: 'Perfeccionista', descripcion: 'Guarda 5 prompts con rating 5', icono: '⭐', condicion: (stats) => stats.prompts5Estrellas >= 5 },
  { id: 'coleccionista', nombre: 'Coleccionista', descripcion: 'Crea 5 presets personalizados', icono: '📚', condicion: (stats) => stats.presetsCreados >= 5 },
  { id: 'traductor', nombre: 'Bilingüe', descripcion: 'Traduce 20 prompts', icono: '🌐', condicion: (stats) => stats.traducciones >= 20 },
  { id: 'minimalista', nombre: 'Menos es Más', descripcion: 'Genera un prompt con menos de 10 tokens', icono: '✨', condicion: (stats) => stats.promptsCortos >= 1 },
  { id: 'maximalista', nombre: 'Detalle Total', descripcion: 'Genera un prompt con más de 50 tokens', icono: '🎨', condicion: (stats) => stats.promptsLargos >= 1 },
];

export function verificarLogros(stats) {
  return logrosDefinidos.filter(logro => logro.condicion(stats));
}

// ========== 7. GENERADOR POR EMOCIONES ==========
export const emocionesPresets = {
  alegria: {
    nombre: 'Alegría',
    icono: '😊',
    colores: ['#FFD700', '#FFA500', '#FF6347'],
    terminos: ['bright', 'happy', 'cheerful', 'vibrant', 'colorful', 'sunny', 'joyful', 'smiling', 'warm light', 'festive']
  },
  tristeza: {
    nombre: 'Tristeza',
    icono: '😢',
    colores: ['#4682B4', '#708090', '#2F4F4F'],
    terminos: ['melancholic', 'sad', 'gloomy', 'rainy', 'lonely', 'somber', 'tears', 'grey', 'overcast', 'desolate']
  },
  misterio: {
    nombre: 'Misterio',
    icono: '🔮',
    colores: ['#4B0082', '#800080', '#2F4F4F'],
    terminos: ['mysterious', 'enigmatic', 'fog', 'mist', 'shadow', 'hidden', 'secret', 'dark', 'eerie', 'suspenseful']
  },
  terror: {
    nombre: 'Terror',
    icono: '😱',
    colores: ['#8B0000', '#2F4F4F', '#000000'],
    terminos: ['horror', 'scary', 'terrifying', 'dark', 'bloody', 'creepy', 'haunted', 'nightmare', 'demonic', 'gruesome']
  },
  nostalgia: {
    nombre: 'Nostalgia',
    icono: '🥺',
    colores: ['#DEB887', '#D2691E', '#8B4513'],
    terminos: ['nostalgic', 'vintage', 'retro', 'old', 'memory', 'classic', 'sepia', 'faded', 'antique', 'timeless']
  },
  romance: {
    nombre: 'Romance',
    icono: '💕',
    colores: ['#FF69B4', '#FF1493', '#FFB6C1'],
    terminos: ['romantic', 'love', 'soft', 'gentle', 'tender', 'intimate', 'passionate', 'beautiful', 'dreamy', 'ethereal']
  },
  aventura: {
    nombre: 'Aventura',
    icono: '🗺️',
    colores: ['#228B22', '#8B4513', '#DAA520'],
    terminos: ['adventure', 'epic', 'journey', 'exploration', 'brave', 'heroic', 'wild', 'untamed', 'magnificent', 'breathtaking']
  },
  calma: {
    nombre: 'Calma',
    icono: '😌',
    colores: ['#87CEEB', '#98FB98', '#F0E68C'],
    terminos: ['peaceful', 'calm', 'serene', 'tranquil', 'quiet', 'still', 'gentle', 'soft', 'harmonious', 'balanced']
  }
};

export function generarPromptPorEmocion(emocion, sujeto = 'a person') {
  const preset = emocionesPresets[emocion];
  if (!preset) return '';
  
  const terminosSeleccionados = preset.terminos.sort(() => Math.random() - 0.5).slice(0, 5);
  return `${sujeto}, ${terminosSeleccionados.join(', ')}, ${preset.nombre.toLowerCase()} atmosphere, masterpiece, best quality`;
}

// ========== 8. RECETAS PROBADAS ==========
export const recetasProbadas = [
  {
    id: 'retrato-rembrandt',
    nombre: 'Retrato Rembrandt',
    dificultad: 'Intermedio',
    rating: 4.8,
    uso: 1250,
    prompt: 'portrait, Rembrandt lighting, dramatic chiaroscuro, dark background, oil painting style, masterpiece, best quality',
    explicacion: 'Iluminación clásica de Rembrandt con fuerte contraste entre luz y sombra'
  },
  {
    id: 'cyberpunk-noir',
    nombre: 'Cyberpunk Noir',
    dificultad: 'Avanzado',
    rating: 4.9,
    uso: 2100,
    prompt: 'cyberpunk city, neon lights, rain, dark streets, film noir style, cinematic lighting, blade runner atmosphere, masterpiece',
    explicacion: 'Combinación de estética cyberpunk con estilo noir clásico'
  },
  {
    id: 'ghibli-paisaje',
    nombre: 'Paisaje Ghibli',
    dificultad: 'Principiante',
    rating: 4.7,
    uso: 1800,
    prompt: 'Studio Ghibli style, beautiful landscape, lush green nature, fluffy clouds, peaceful atmosphere, hand-painted, masterpiece',
    explicacion: 'Estilo visual de Studio Ghibli con paisajes naturales'
  },
  {
    id: 'fantasia-epica',
    nombre: 'Fantasía Épica',
    dificultad: 'Intermedio',
    rating: 4.6,
    uso: 950,
    prompt: 'epic fantasy landscape, magical atmosphere, dramatic lighting, volumetric fog, ancient ruins, masterpiece, best quality, 8k',
    explicacion: 'Paisajes fantásticos con atmósfera mágica y épica'
  },
  {
    id: 'anime-shonen',
    nombre: 'Anime Shonen',
    dificultad: 'Principiante',
    rating: 4.5,
    uso: 1600,
    prompt: 'shonen anime style, dynamic action pose, vibrant colors, bold lines, energetic atmosphere, anime key visual, masterpiece',
    explicacion: 'Estilo anime shonen con poses dinámicas y colores vibrantes'
  }
];

// ========== 9. NEGATIVE PROMPT GENERATOR ==========
export function generarNegativeCompleto(loQueNoQuieres) {
  const negatives = {
    'personas': 'people, person, human, crowd',
    'texto': 'text, watermark, signature, logo, letters, words',
    'baja calidad': 'low quality, worst quality, blurry, jpeg artifacts, noise',
    'deformaciones': 'deformed, ugly, disfigured, mutated, extra limbs, bad anatomy',
    'colores apagados': 'dull, faded, desaturated, grey, monochrome',
    'fondo complejo': 'busy background, cluttered, messy, distracting',
    'estilo cartoon': 'cartoon, anime, illustration, drawing, painting',
    'estilo realista': 'realistic, photo, photograph, 3d render',
    'oscuro': 'dark, shadow, black, night, gloomy',
    'brillante': 'bright, light, white, overexposed, blown out'
  };
  
  const terminos = [];
  loQueNoQuieres.forEach(item => {
    if (negatives[item]) {
      terminos.push(negatives[item]);
    }
  });
  
  // Siempre añadir calidad básica
  terminos.unshift('worst quality, low quality, blurry');
  
  return terminos.join(', ');
}

// ========== 10. SISTEMA DE FAVORITOS ==========
export function guardarFavorito(prompt, negative, nombre, tags = []) {
  return {
    id: Date.now(),
    nombre,
    prompt,
    negative,
    tags,
    fecha: new Date().toISOString(),
    favorito: true
  };
}

export function buscarEnFavoritos(favoritos, query) {
  const queryLower = query.toLowerCase();
  return favoritos.filter(fav => 
    fav.nombre.toLowerCase().includes(queryLower) ||
    fav.prompt.toLowerCase().includes(queryLower) ||
    fav.tags.some(tag => tag.toLowerCase().includes(queryLower))
  );
}

// ========== 11. IMPORTAR/EXPORTAR ==========
export function exportarComoJSON(datos) {
  return JSON.stringify(datos, null, 2);
}

export function exportarComoCSV(prompts) {
  const headers = ['nombre', 'prompt', 'negative', 'tags', 'fecha'];
  const rows = prompts.map(p => [
    p.nombre || '',
    p.prompt || '',
    p.negative || '',
    (p.tags || []).join(';'),
    p.fecha || ''
  ]);
  
  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
}

export function importarDesdeJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Error al importar JSON:', e);
    return null;
  }
}

// ========== 12. GENERADOR POR EMOCIONES (ya definido arriba) ==========

// ========== 13. RECETAS PROBADAS (ya definido arriba) ==========

// ========== 14. NEGATIVE PROMPT GENERATOR (ya definido arriba) ==========

// ========== 15. COMPARTIR PROMPTS ==========
export function generarLinkCompartible(prompt, negative) {
  const data = { p: prompt, n: negative };
  const encoded = btoa(JSON.stringify(data));
  return `${window.location.origin}?prompt=${encoded}`;
}

export function generarQRData(prompt) {
  return prompt.substring(0, 200); // Limitar para QR
}

// ========== 16. REVERSE PROMPT ENGINEERING ==========
export async function reversePromptFromImage(imageFile) {
  // Placeholder para integración con APIs de visión
  // En el futuro: GPT-4V, Claude, etc.
  return {
    exito: false,
    mensaje: 'Función disponible próximamente. Requiere configuración de API de visión.'
  };
}

// ========== 17. INTEGRACIÓN CON APIs ==========
export const apisSoportadas = [
  { id: 'dalle', nombre: 'DALL-E 3', estado: 'próximamente' },
  { id: 'midjourney', nombre: 'Midjourney API', estado: 'próximamente' },
  { id: 'stable-diffusion', nombre: 'Stable Diffusion API', estado: 'disponible' },
  { id: 'leonardo', nombre: 'Leonardo.ai', estado: 'próximamente' }
];

// ========== 18. TEMAS PERSONALIZABLES ==========
export const temasDisponibles = {
  oscuro: {
    nombre: 'Oscuro',
    bg: 'bg-slate-950',
    card: 'bg-slate-900',
    border: 'border-slate-800',
    text: 'text-slate-100',
    accent: 'cyan'
  },
  claro: {
    nombre: 'Claro',
    bg: 'bg-gray-50',
    card: 'bg-white',
    border: 'border-gray-200',
    text: 'text-gray-900',
    accent: 'blue'
  },
  midnight: {
    nombre: 'Medianoche',
    bg: 'bg-gray-950',
    card: 'bg-gray-900',
    border: 'border-gray-800',
    text: 'text-gray-100',
    accent: 'purple'
  }
};

// ========== 19. LAYOUT PERSONALIZABLE ==========
export const layoutsDisponibles = {
  clasico: { nombre: 'Clásico', columnas: 'lg:grid-cols-[1fr_380px]' },
  ancho: { nombre: 'Ancho', columnas: 'lg:grid-cols-[1fr_450px]' },
  estrecho: { nombre: 'Estrecho', columnas: 'lg:grid-cols-[1fr_320px]' },
  focus: { nombre: 'Focus', columnas: 'grid-cols-1' }
};

// ========== 20. PERFILES DE USUARIO ==========
export function crearPerfil(nombre, tipo = 'personal') {
  return {
    id: Date.now(),
    nombre,
    tipo, // 'personal', 'trabajo', 'proyecto'
    fechaCreacion: new Date().toISOString(),
    stats: {
      totalPrompts: 0,
      estilosUsados: {},
      prompts5Estrellas: 0,
      presetsCreados: 0,
      traducciones: 0,
      promptsCortos: 0,
      promptsLargos: 0
    }
  };
}

// ========== 21. GENERACIÓN PROGRAMADA ==========
export function programarGeneracion(config) {
  // Placeholder para integración con cron jobs
  return {
    id: Date.now(),
    ...config,
    estado: 'programado',
    proximaEjecucion: config.fecha
  };
}

// ========== 22. A/B TESTING AUTOMÁTICO ==========
export async function ejecutarABTesting(prompt, variantes = 5) {
  // Generar variantes
  const promptsVariantes = [];
  for (let i = 0; i < variantes; i++) {
    const terminos = prompt.split(',').map(t => t.trim());
    const shuffled = terminos.sort(() => Math.random() - 0.5);
    promptsVariantes.push(shuffled.join(', '));
  }
  
  return {
    variantes: promptsVariantes,
    mensaje: 'Variantes generadas. Conecta con API de generación para evaluar resultados.'
  };
}

// ========== 23. MACRO RECORDER ==========
export class MacroRecorder {
  constructor() {
    this.acciones = [];
    this.grabando = false;
  }
  
  iniciarGrabacion() {
    this.acciones = [];
    this.grabando = true;
  }
  
  grabarAccion(tipo, datos) {
    if (this.grabando) {
      this.acciones.push({ tipo, datos, timestamp: Date.now() });
    }
  }
  
  detenerGrabacion() {
    this.grabando = false;
    return this.acciones;
  }
  
  async reproducir(macro, callbacks) {
    for (const accion of macro) {
      if (callbacks[accion.tipo]) {
        await callbacks[accion.tipo](accion.datos);
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay entre acciones
      }
    }
  }
}

// ========== 24. TUTORIAL INTERACTIVO ==========
export const tutorialPasos = [
  {
    id: 1,
    titulo: '¡Bienvenido al Generador de Prompts!',
    contenido: 'Esta herramienta te ayudará a crear prompts profesionales para IA generativa. Vamos a aprender los conceptos básicos paso a paso.',
    accion: 'siguiente'
  },
  {
    id: 2,
    titulo: 'Paso 1: Escribe tu idea',
    contenido: 'Comienza escribiendo tu idea en el campo "Sujeto / Idea Base". Por ejemplo: "una mujer guerrera con armadura dorada"',
    accion: 'esperar_input',
    campo: 'sujeto'
  },
  {
    id: 3,
    titulo: 'Paso 2: Selecciona un estilo',
    contenido: 'En el panel derecho, haz clic en "Estilos" y selecciona uno o más estilos. Cada estilo añade características visuales específicas.',
    accion: 'esperar_estilo'
  },
  {
    id: 4,
    titulo: 'Paso 3: Ajusta los pesos',
    contenido: 'Los estilos seleccionados aparecen arriba con sliders. Ajusta el peso (0.0 a 1.0) para controlar cuánto influye cada estilo.',
    accion: 'siguiente'
  },
  {
    id: 5,
    titulo: 'Paso 4: Revisa el prompt',
    contenido: '¡Listo! El prompt se genera automáticamente en el campo "Prompt Positivo". Puedes editarlo manualmente si quieres.',
    accion: 'siguiente'
  },
  {
    id: 6,
    titulo: 'Paso 5: Copia y usa',
    contenido: 'Haz clic en "Copiar" y pega el prompt en tu herramienta de IA (A1111, ComfyUI, Midjourney, etc.)',
    accion: 'finalizar'
  }
];

// ========== 25. GLOSARIO DE TÉRMINOS ==========
export const glosarioTerminos = {
  'prompt': {
    definicion: 'Texto que describe lo que quieres generar. Es la instrucción principal para la IA.',
    ejemplo: 'a beautiful landscape with mountains and a lake'
  },
  'negative prompt': {
    definicion: 'Texto que describe lo que NO quieres ver en la imagen. Ayuda a evitar elementos indeseados.',
    ejemplo: 'blurry, low quality, deformed'
  },
  'masterpiece': {
    definicion: 'Término que indica que quieres una imagen de la más alta calidad posible.',
    ejemplo: 'masterpiece, best quality, ultra detailed'
  },
  'best quality': {
    definicion: 'Similar a masterpiece, indica que quieres la mejor calidad posible.',
    ejemplo: 'best quality, high resolution, sharp focus'
  },
  'booster': {
    definicion: 'Términos que mejoran aspectos específicos de la imagen (calidad, iluminación, estilo, etc.)',
    ejemplo: 'cinematic lighting, dramatic atmosphere'
  },
  'macro': {
    definicion: 'Atajo que expande a múltiples términos. Ejemplo: {{calidad_max}} se expande a varios términos de calidad.',
    ejemplo: '{{calidad_max}} → masterpiece, best quality, ultra detailed, 8k'
  },
  'estilo': {
    definicion: 'Conjunto de términos que definen el aspecto visual de la imagen (fotorrealista, anime, óleo, etc.)',
    ejemplo: 'oil painting style, watercolor, anime style'
  },
  'token': {
    definicion: 'Unidad básica de texto que la IA procesa. Aproximadamente 1 token = 4 caracteres o 0.75 palabras en inglés.',
    ejemplo: 'Un prompt de 75 tokens es considerado óptimo para la mayoría de modelos'
  },
  'CFG Scale': {
    definicion: 'Controla qué tan fielmente sigue la IA tu prompt. Valores altos = más fiel, valores bajos = más creativa.',
    ejemplo: 'CFG 7 es un buen punto de partida. CFG 15 es muy estricto.'
  },
  'sampler': {
    definicion: 'Algoritmo que controla cómo se genera la imagen. Diferentes samplers producen resultados diferentes.',
    ejemplo: 'Euler a, DPM++ 2M Karras, DDIM'
  },
  'steps': {
    definicion: 'Número de iteraciones de refinamiento. Más steps = más detalle pero más tiempo.',
    ejemplo: '20-30 steps es típico. 50+ para máximo detalle.'
  },
  'seed': {
    definicion: 'Número aleatorio que controla la generación. Mismo seed + mismo prompt = misma imagen.',
    ejemplo: 'Usa seed -1 para aleatorio, o un número fijo para reproducibilidad'
  },
  'checkpoint': {
    definicion: 'Modelo de IA entrenado para generar imágenes. Diferentes checkpoints tienen diferentes estilos.',
    ejemplo: 'RealisticVision, DreamShaper, AnythingV5'
  },
  'LoRA': {
    definicion: 'Modelo pequeño que se añade al checkpoint principal para añadir estilos o características específicas.',
    ejemplo: '<lora:style_name:0.8> añade un estilo con peso 0.8'
  },
  'embedding': {
    definicion: 'Representación textual entrenada que se inserta en el prompt para mejorar ciertos aspectos.',
    ejemplo: '<embed:embedding_name:1.0>'
  }
};

export function buscarEnGlosario(termino) {
  const terminoLower = termino.toLowerCase();
  return Object.entries(glosarioTerminos).find(([key]) => 
    key.toLowerCase().includes(terminoLower)
  );
}
