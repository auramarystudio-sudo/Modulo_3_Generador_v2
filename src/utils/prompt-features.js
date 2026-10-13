// Utilidades para las mejoras del generador de prompts

// ========== 1. PRESETS RÁPIDOS ==========
export const presetsIniciales = [
  {
    id: 'preset-retrato-dramatico',
    nombre: 'Retrato Dramático',
    descripcion: 'Retrato cinematográfico con iluminación dramática',
    estilos: ['retrato-estudio', 'cinematografica'],
    boosters: ['masterpiece', 'best quality', 'cinematic lighting', 'dramatic'],
    macros: ['calidad_max', 'cinematico', 'iluminacion_dramatica'],
    negative: 'cartoon, anime, painting, illustration, blurry, deformed',
    es_sistema: true
  },
  {
    id: 'preset-paisaje-epico',
    nombre: 'Paisaje Épico',
    descripcion: 'Paisajes grandiosos con iluminación natural',
    estilos: ['paisaje-natural'],
    boosters: ['masterpiece', 'best quality', 'ultra detailed', '8k'],
    macros: ['calidad_max', 'composicion_paisaje', 'iluminacion_natural'],
    negative: 'urban, city, people, cartoon, anime',
    es_sistema: true
  },
  {
    id: 'preset-anime-character',
    nombre: 'Personaje Anime',
    descripcion: 'Personaje de anime con estilo shonen',
    estilos: ['shonen'],
    boosters: ['masterpiece', 'best quality', 'anime key visual', 'beautiful detailed eyes'],
    macros: ['calidad_alta', 'anime'],
    negative: 'realistic, photo, 3d, deformed, bad anatomy',
    es_sistema: true
  },
  {
    id: 'preset-cyberpunk-city',
    nombre: 'Ciudad Cyberpunk',
    descripcion: 'Escena cyberpunk con neones y lluvia',
    estilos: ['cyberpunk', 'nocturna'],
    boosters: ['masterpiece', 'best quality', 'neon lighting', 'cinematic'],
    macros: ['calidad_max', 'cinematico'],
    negative: 'nature, medieval, bright, cheerful, cartoon',
    es_sistema: true
  },
  {
    id: 'preset-fantasy-epic',
    nombre: 'Fantasía Épica',
    descripcion: 'Escena de fantasía con elementos mágicos',
    estilos: ['high-fantasy'],
    boosters: ['masterpiece', 'best quality', 'magical atmosphere', 'epic'],
    macros: ['calidad_max', 'iluminacion_dramatica'],
    negative: 'modern, urban, realistic photo, cartoon',
    es_sistema: true
  },
  {
    id: 'preset-producto-comercial',
    nombre: 'Producto Comercial',
    descripcion: 'Fotografía de producto profesional',
    estilos: ['producto'],
    boosters: ['masterpiece', 'best quality', 'commercial quality', 'sharp focus'],
    macros: ['calidad_max', 'composicion_producto'],
    negative: 'messy, dirty, blurry, cartoon, anime',
    es_sistema: true
  }
];

// ========== 2. WILDCARD SYSTEM ==========
// Parsea wildcards como {red|blue|green} y genera combinaciones
export function parseWildcards(texto) {
  const regex = /\{([^}]+)\}/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(texto)) !== null) {
    const opciones = match[1].split('|').map(o => o.trim());
    matches.push({
      full: match[0],
      opciones: opciones,
      index: match.index
    });
  }
  
  return matches;
}

// Genera todas las combinaciones de wildcards
export function generarCombinacionesWildcards(texto) {
  const wildcards = parseWildcards(texto);
  
  if (wildcards.length === 0) return [texto];
  
  // Generar combinaciones
  const combinaciones = [];
  const totalCombinaciones = wildcards.reduce((acc, w) => acc * w.opciones.length, 1);
  
  for (let i = 0; i < Math.min(totalCombinaciones, 50); i++) { // Máximo 50 combinaciones
    let resultado = texto;
    let index = i;
    
    for (let j = wildcards.length - 1; j >= 0; j--) {
      const wildcard = wildcards[j];
      const opcionIndex = index % wildcard.opciones.length;
      resultado = resultado.replace(wildcard.full, wildcard.opciones[opcionIndex]);
      index = Math.floor(index / wildcard.opciones.length);
    }
    
    combinaciones.push(resultado);
  }
  
  return combinaciones;
}

// ========== 3. NEGATIVE PROMPT ASSISTANT ==========
export function sugerirNegativos(promptPositivo) {
  const sugerencias = [];
  const textoLower = promptPositivo.toLowerCase();
  
  // Detectar tipo de imagen
  const esRealista = /photo|realistic|photograph|portrait|landscape/i.test(textoLower);
  const esAnime = /anime|manga|chibi|kawaii/i.test(textoLower);
  const esFantasia = /fantasy|magic|dragon|wizard|elf/i.test(textoLower);
  const esCyberpunk = /cyberpunk|neon|futuristic|sci-fi/i.test(textoLower);
  const esPaisaje = /landscape|mountain|forest|nature|sea|ocean/i.test(textoLower);
  const esRetrato = /portrait|face|person|woman|man|girl|boy/i.test(textoLower);
  const esProducto = /product|commercial|advertising|item/i.test(textoLower);
  
  // Negativos generales siempre
  sugerencias.push('worst quality, low quality, blurry, jpeg artifacts, watermark, text, signature');
  
  if (esRealista) {
    sugerencias.push('cartoon, anime, painting, illustration, 3d render, cgi, drawing, sketch');
    if (esRetrato) {
      sugerencias.push('deformed, ugly, disfigured, mutated, extra limbs, bad anatomy, bad hands');
    }
  }
  
  if (esAnime) {
    sugerencias.push('realistic, photo, 3d, western, deformed, bad anatomy, bad hands, missing fingers');
  }
  
  if (esFantasia) {
    sugerencias.push('modern, urban, realistic photo, cartoon, chibi, bright, cheerful');
  }
  
  if (esCyberpunk) {
    sugerencias.push('nature, forest, medieval, bright, cheerful, clean, minimalist');
  }
  
  if (esPaisaje) {
    sugerencias.push('urban, city, buildings, people, cars, frame, border');
  }
  
  if (esProducto) {
    sugerencias.push('messy, dirty, blurry, amateur, low quality, cartoon, anime');
  }
  
  return sugerencias;
}

// ========== 4. UNDO/REDO SYSTEM ==========
export class PromptHistory {
  constructor(maxSize = 20) {
    this.history = [];
    this.currentIndex = -1;
    this.maxSize = maxSize;
  }
  
  push(value) {
    // Si estamos en el medio del historial, truncar
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }
    
    this.history.push(value);
    
    // Mantener tamaño máximo
    if (this.history.length > this.maxSize) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }
  }
  
  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }
  
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
  
  canUndo() {
    return this.currentIndex > 0;
  }
  
  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }
  
  clear() {
    this.history = [];
    this.currentIndex = -1;
  }
}

// ========== 5. AUTO-SAVE ==========
export function guardarBorrador(datos) {
  try {
    localStorage.setItem('prompt-generator-draft', JSON.stringify({
      ...datos,
      timestamp: Date.now()
    }));
    return true;
  } catch (e) {
    console.warn('No se pudo guardar el borrador:', e);
    return false;
  }
}

export function cargarBorrador() {
  try {
    const data = localStorage.getItem('prompt-generator-draft');
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    // Solo cargar si tiene menos de 24 horas
    if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('prompt-generator-draft');
      return null;
    }
    
    return parsed;
  } catch (e) {
    console.warn('No se pudo cargar el borrador:', e);
    return null;
  }
}

export function eliminarBorrador() {
  try {
    localStorage.removeItem('prompt-generator-draft');
  } catch (e) {
    console.warn('No se pudo eliminar el borrador:', e);
  }
}

// ========== 6. EMBEDDING/LORA HELPER ==========
export function insertarEmbedding(nombre, peso = 1.0) {
  return `<embed:${nombre}:${peso}>`;
}

export function insertarLoRA(nombre, peso = 1.0) {
  return `<lora:${nombre}:${peso}>`;
}

export function insertarHypernetwork(nombre, peso = 1.0) {
  return `<hypernet:${nombre}:${peso}>`;
}

// ========== 7. REGIONAL PROMPTER ==========
export const regionesDefault = {
  background: { nombre: 'Fondo', color: '#3b82f6', posicion: 'background' },
  subject: { nombre: 'Sujeto', color: '#10b981', posicion: 'subject' },
  foreground: { nombre: 'Primer Plano', color: '#f59e0b', posicion: 'foreground' },
  left: { nombre: 'Izquierda', color: '#8b5cf6', posicion: 'left' },
  right: { nombre: 'Derecha', color: '#ec4899', posicion: 'right' },
  top: { nombre: 'Arriba', color: '#06b6d4', posicion: 'top' },
  bottom: { nombre: 'Abajo', color: '#84cc16', posicion: 'bottom' }
};

export function generarRegionalPrompt(regiones) {
  const partes = [];
  
  Object.entries(regiones).forEach(([key, region]) => {
    if (region.prompt && region.prompt.trim()) {
      partes.push(`[${key}] ${region.prompt}`);
    }
  });
  
  return partes.join('\n');
}

// ========== 8. BATCH GENERATOR ==========
export function generarBatch(promptBase, variable, opciones) {
  return opciones.map(opcion => {
    const regex = new RegExp(`\\[${variable}\\]`, 'g');
    return promptBase.replace(regex, opcion);
  });
}

export function generarBatchEstilos(promptBase, estilos) {
  return estilos.map(estilo => {
    return `${estilo.prompt_prefijo}, ${promptBase}, ${estilo.prompt_sufijo}`;
  });
}

// ========== 9. PROMPT COMPARISON ==========
export function compararPrompts(prompt1, prompt2) {
  const terms1 = new Set(prompt1.split(',').map(t => t.trim().toLowerCase()));
  const terms2 = new Set(prompt2.split(',').map(t => t.trim().toLowerCase()));
  
  const soloEn1 = [...terms1].filter(t => !terms2.has(t));
  const soloEn2 = [...terms2].filter(t => !terms1.has(t));
  const comunes = [...terms1].filter(t => terms2.has(t));
  
  return {
    soloEnPrompt1: soloEn1,
    soloEnPrompt2: soloEn2,
    comunes: comunes,
    similitud: comunes.length / Math.max(terms1.size, terms2.size)
  };
}

// ========== 10. KEYBOARD SHORTCUTS ==========
export const atajosTeclado = [
  { tecla: 'Ctrl + Enter', descripcion: 'Generar prompt final', categoria: 'Generación' },
  { tecla: 'Ctrl + S', descripcion: 'Guardar en historial', categoria: 'Historial' },
  { tecla: 'Ctrl + Shift + C', descripcion: 'Copiar prompt', categoria: 'Portapapeles' },
  { tecla: 'Ctrl + T', descripcion: 'Toggle traducción ES→EN', categoria: 'Traducción' },
  { tecla: 'Ctrl + Z', descripcion: 'Deshacer cambio', categoria: 'Edición' },
  { tecla: 'Ctrl + Y', descripcion: 'Rehacer cambio', categoria: 'Edición' },
  { tecla: 'Ctrl + /', descripcion: 'Insertar macro', categoria: 'Macros' },
  { tecla: 'Ctrl + P', descripcion: 'Abrir presets', categoria: 'Presets' },
  { tecla: 'Ctrl + B', descripcion: 'Generador en lote', categoria: 'Batch' },
  { tecla: 'Ctrl + R', descripcion: 'Generar aleatorio', categoria: 'Generación' },
  { tecla: 'Ctrl + F', descripcion: 'Toggle modo focus', categoria: 'Interfaz' },
  { tecla: 'Esc', descripcion: 'Cerrar modal/card', categoria: 'Interfaz' }
];
