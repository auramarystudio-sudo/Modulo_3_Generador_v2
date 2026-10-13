// 5 Mejoras Premium: ML Optimizer, Analytics, Lighting, Levels, Workflows

// ========== 1. PROMPT OPTIMIZER CON ML ==========
export function optimizarPromptConML(prompt, historial = []) {
  const sugerencias = [];
  const terminos = prompt.split(',').map(t => t.trim()).filter(t => t);
  
  // Analizar patrones de prompts exitosos
  const promptsExitosos = historial.filter(h => h.rating >= 4);
  
  // Sugerencia 1: Términos de calidad faltantes
  const tieneCalidad = /masterpiece|best quality|high quality/i.test(prompt);
  if (!tieneCalidad) {
    sugerencias.push({
      tipo: 'calidad',
      prioridad: 'alta',
      mensaje: 'Añadir términos de calidad',
      accion: 'Añadir "masterpiece, best quality"',
      termino: 'masterpiece, best quality'
    });
  }
  
  // Sugerencia 2: Iluminación específica
  const tieneIluminacion = /lighting|light|illumination/i.test(prompt);
  if (!tieneIluminacion) {
    sugerencias.push({
      tipo: 'iluminación',
      prioridad: 'media',
      mensaje: 'Especificar iluminación',
      accion: 'Añadir "cinematic lighting" o "natural lighting"',
      termino: 'cinematic lighting'
    });
  }
  
  // Sugerencia 3: Detalles técnicos
  const tieneDetalles = /detailed|intricate|sharp/i.test(prompt);
  if (!tieneDetalles) {
    sugerencias.push({
      tipo: 'detalle',
      prioridad: 'media',
      mensaje: 'Añadir detalles técnicos',
      accion: 'Añadir "highly detailed, sharp focus"',
      termino: 'highly detailed, sharp focus'
    });
  }
  
  // Sugerencia 4: Composición
  const tieneComposicion = /composition|angle|view|perspective/i.test(prompt);
  if (!tieneComposicion && terminos.length > 5) {
    sugerencias.push({
      tipo: 'composición',
      prioridad: 'baja',
      mensaje: 'Especificar composición',
      accion: 'Añadir "rule of thirds" o "centered composition"',
      termino: 'rule of thirds'
    });
  }
  
  // Sugerencia 5: Redundancias
  const terminosLower = terminos.map(t => t.toLowerCase());
  const duplicados = terminosLower.filter((t, i) => terminosLower.indexOf(t) !== i);
  if (duplicados.length > 0) {
    sugerencias.push({
      tipo: 'redundancia',
      prioridad: 'alta',
      mensaje: 'Eliminar términos duplicados',
      accion: `Eliminar: ${[...new Set(duplicados)].join(', ')}`,
      termino: null
    });
  }
  
  // Sugerencia 6: Longitud óptima
  if (terminos.length < 5) {
    sugerencias.push({
      tipo: 'longitud',
      prioridad: 'media',
      mensaje: 'Prompt muy corto',
      accion: 'Añadir más detalles descriptivos',
      termino: null
    });
  } else if (terminos.length > 30) {
    sugerencias.push({
      tipo: 'longitud',
      prioridad: 'media',
      mensaje: 'Prompt muy largo',
      accion: 'Considerar simplificar para mejor resultados',
      termino: null
    });
  }
  
  // Calcular score de optimización
  let score = 50;
  if (tieneCalidad) score += 15;
  if (tieneIluminacion) score += 10;
  if (tieneDetalles) score += 10;
  if (tieneComposicion) score += 5;
  if (terminos.length >= 5 && terminos.length <= 30) score += 10;
  if (duplicados.length === 0) score += 10;
  
  return {
    score: Math.min(100, score),
    sugerencias: sugerencias.sort((a, b) => {
      const prioridad = { alta: 3, media: 2, baja: 1 };
      return prioridad[b.prioridad] - prioridad[a.prioridad];
    }),
    optimizado: aplicarSugerencias(prompt, sugerencias)
  };
}

function aplicarSugerencias(prompt, sugerencias) {
  let optimizado = prompt;
  sugerencias.forEach(s => {
    if (s.termino && s.prioridad === 'alta') {
      optimizado = optimizado ? `${optimizado}, ${s.termino}` : s.termino;
    }
  });
  return optimizado;
}

// ========== 2. ANALYTICS DASHBOARD ==========
export function generarAnalytics(historial, estilos, presets) {
  const ahora = new Date();
  const hace30Dias = new Date(ahora.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  // Prompts recientes (últimos 30 días)
  const promptsRecientes = historial.filter(h => new Date(h.fecha) > hace30Dias);
  
  // Estadísticas básicas
  const totalPrompts = historial.length;
  const promedioDiario = promptsRecientes.length / 30;
  
  // Estilos más usados
  const estilosUsados = {};
  historial.forEach(h => {
    h.estilos?.forEach(e => {
      estilosUsados[e.id] = (estilosUsados[e.id] || 0) + 1;
    });
  });
  
  const topEstilos = Object.entries(estilosUsados)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id, count]) => {
      const estilo = estilos.find(e => e.id === id);
      return { nombre: estilo?.nombre || id, count };
    });
  
  // Calidad promedio
  const ratings = historial.filter(h => h.rating > 0).map(h => h.rating);
  const calidadPromedio = ratings.length > 0 
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
    : 0;
  
  // Términos más frecuentes
  const frecuenciaTerminos = {};
  historial.forEach(h => {
    const terminos = h.prompt.split(',').map(t => t.trim().toLowerCase());
    terminos.forEach(t => {
      if (t.length > 3) {
        frecuenciaTerminos[t] = (frecuenciaTerminos[t] || 0) + 1;
      }
    });
  });
  
  const topTerminos = Object.entries(frecuenciaTerminos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([termino, count]) => ({ termino, count }));
  
  // Prompts por día (últimos 7 días)
  const promptsPorDia = [];
  for (let i = 6; i >= 0; i--) {
    const fecha = new Date(ahora.getTime() - i * 24 * 60 * 60 * 1000);
    const diaStr = fecha.toISOString().split('T')[0];
    const count = historial.filter(h => h.fecha.startsWith(diaStr)).length;
    promptsPorDia.push({ dia: diaStr, count });
  }
  
  // Categorías favoritas
  const categoriasFavoritas = {};
  historial.forEach(h => {
    h.estilos?.forEach(e => {
      const estilo = estilos.find(s => s.id === e.id);
      if (estilo) {
        categoriasFavoritas[estilo.categoria] = (categoriasFavoritas[estilo.categoria] || 0) + 1;
      }
    });
  });
  
  return {
    totalPrompts,
    promedioDiario: promedioDiario.toFixed(1),
    calidadPromedio: calidadPromedio.toFixed(1),
    topEstilos,
    topTerminos,
    promptsPorDia,
    categoriasFavoritas,
    promptsRecientes: promptsRecientes.length
  };
}

// ========== 3. LIGHTING PRESETS ==========
export const lightingPresets = [
  {
    id: 'rembrandt',
    nombre: 'Rembrandt',
    descripcion: 'Iluminación dramática con triángulo de luz en la mejilla',
    icono: '🎭',
    terminos: 'Rembrandt lighting, dramatic chiaroscuro, triangle light on cheek, dark background, studio portrait',
    preview: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)'
  },
  {
    id: 'butterfly',
    nombre: 'Butterfly',
    descripcion: 'Luz frontal suave, ideal para retratos femeninos',
    icono: '🦋',
    terminos: 'butterfly lighting, soft frontal light, shadow under nose, glamorous, beauty shot',
    preview: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 50%, #c0c0c0 100%)'
  },
  {
    id: 'split',
    nombre: 'Split',
    descripcion: 'Mitad iluminada, mitad en sombra, muy dramático',
    icono: '◐',
    terminos: 'split lighting, half face illuminated, half in shadow, dramatic contrast, moody',
    preview: 'linear-gradient(90deg, #000000 0%, #000000 50%, #ffffff 50%, #ffffff 100%)'
  },
  {
    id: 'loop',
    nombre: 'Loop',
    descripcion: 'Luz lateral suave con sombra pequeña en la nariz',
    icono: '🔄',
    terminos: 'loop lighting, soft side light, small shadow from nose, natural look, flattering',
    preview: 'linear-gradient(120deg, #2a2a2a 0%, #6a6a6a 40%, #4a4a4a 100%)'
  },
  {
    id: 'broad',
    nombre: 'Broad',
    descripcion: 'Ilumina el lado más ancho de la cara',
    icono: '↔️',
    terminos: 'broad lighting, illuminated side facing camera, wider side lit, slimming effect',
    preview: 'linear-gradient(90deg, #3a3a3a 0%, #7a7a7a 60%, #5a5a5a 100%)'
  },
  {
    id: 'short',
    nombre: 'Short',
    descripcion: 'Ilumina el lado más estrecho de la cara',
    icono: '↕️',
    terminos: 'short lighting, narrow side facing camera, dramatic shadows, adds width',
    preview: 'linear-gradient(90deg, #5a5a5a 0%, #3a3a3a 40%, #1a1a1a 100%)'
  },
  {
    id: 'rim',
    nombre: 'Rim Light',
    descripcion: 'Luz de contorno que separa del fondo',
    icono: '💫',
    terminos: 'rim lighting, backlight, edge light, separation from background, halo effect',
    preview: 'radial-gradient(circle, transparent 40%, #ffffff 60%, transparent 80%)'
  },
  {
    id: 'golden-hour',
    nombre: 'Golden Hour',
    descripcion: 'Luz cálida del atardecer, suave y dorada',
    icono: '🌅',
    terminos: 'golden hour lighting, warm sunset light, soft golden tones, long shadows, magical atmosphere',
    preview: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)'
  },
  {
    id: 'blue-hour',
    nombre: 'Blue Hour',
    descripcion: 'Luz azulada del crepúsculo, misteriosa',
    icono: '🌆',
    terminos: 'blue hour lighting, twilight blue tones, cool atmosphere, mysterious, serene',
    preview: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)'
  },
  {
    id: 'neon',
    nombre: 'Neon',
    descripcion: 'Iluminación neón colorida, cyberpunk',
    icono: '💡',
    terminos: 'neon lighting, colorful neon glow, cyberpunk atmosphere, vibrant colors, night scene',
    preview: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 50%, #ff00ff 100%)'
  },
  {
    id: 'volumetric',
    nombre: 'Volumetric',
    descripcion: 'Rayos de luz visibles a través de partículas',
    icono: '☀️',
    terminos: 'volumetric lighting, god rays, light beams through fog, atmospheric, dramatic',
    preview: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)'
  },
  {
    id: 'studio-softbox',
    nombre: 'Studio Softbox',
    descripcion: 'Iluminación de estudio profesional, suave y uniforme',
    icono: '📸',
    terminos: 'studio softbox lighting, professional photography, soft even light, no harsh shadows',
    preview: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 50%, #d0d0d0 100%)'
  }
];

// ========== 4. SISTEMA DE NIVELES ==========
export const niveles = [
  { nombre: 'Novato', minXP: 0, maxXP: 100, color: '#94a3b8', icono: '🌱' },
  { nombre: 'Aprendiz', minXP: 100, maxXP: 500, color: '#3b82f6', icono: '📘' },
  { nombre: 'Intermedio', minXP: 500, maxXP: 1500, color: '#8b5cf6', icono: '⚡' },
  { nombre: 'Avanzado', minXP: 1500, maxXP: 3000, color: '#f59e0b', icono: '🔥' },
  { nombre: 'Experto', minXP: 3000, maxXP: 5000, color: '#ef4444', icono: '💎' },
  { nombre: 'Maestro', minXP: 5000, maxXP: Infinity, color: '#ec4899', icono: '👑' }
];

export function calcularNivel(xp) {
  const nivel = niveles.find(n => xp >= n.minXP && xp < n.maxXP) || niveles[niveles.length - 1];
  const progreso = ((xp - nivel.minXP) / (nivel.maxXP - nivel.minXP)) * 100;
  return {
    ...nivel,
    xp,
    progreso: Math.min(100, progreso),
    xpRestante: nivel.maxXP - xp,
    esMaximo: nivel.maxXP === Infinity
  };
}

export function calcularXP(accion) {
  const xpPorAccion = {
    generarPrompt: 10,
    guardarHistorial: 5,
    rating5Estrellas: 20,
    desbloquearLogro: 50,
    completarChallenge: 100,
    crearPreset: 15,
    compartirPrompt: 10,
    usarReceta: 5,
    traducirPrompt: 3,
    usarWildcard: 8
  };
  return xpPorAccion[accion] || 0;
}

// ========== 5. WORKFLOW TEMPLATES ==========
export const workflowTemplates = [
  {
    id: 'retrato-profesional',
    nombre: 'Retrato Profesional',
    descripcion: 'Flujo completo para retratos de estudio',
    icono: '📸',
    pasos: [
      { accion: 'seleccionarEstilo', datos: { id: 'retrato-estudio' }, descripcion: 'Seleccionar estilo "Retrato Estudio"' },
      { accion: 'añadirMacro', datos: { nombre: 'calidad_max' }, descripcion: 'Añadir macro "{{calidad_max}}"' },
      { accion: 'añadirBooster', datos: { valor: 'sharp focus' }, descripcion: 'Añadir booster "sharp focus"' },
      { accion: 'añadirLighting', datos: { id: 'rembrandt' }, descripcion: 'Aplicar iluminación Rembrandt' },
      { accion: 'configurarNegative', datos: { valor: 'deformed, blurry, cartoon' }, descripcion: 'Configurar negative prompt' }
    ]
  },
  {
    id: 'paisaje-epico',
    nombre: 'Paisaje Épico',
    descripcion: 'Flujo para paisajes grandiosos',
    icono: '🏔️',
    pasos: [
      { accion: 'seleccionarEstilo', datos: { id: 'paisaje-natural' }, descripcion: 'Seleccionar estilo "Paisaje Natural"' },
      { accion: 'añadirMacro', datos: { nombre: 'composicion_paisaje' }, descripcion: 'Añadir macro "{{composicion_paisaje}}"' },
      { accion: 'añadirLighting', datos: { id: 'golden-hour' }, descripcion: 'Aplicar iluminación Golden Hour' },
      { accion: 'añadirBooster', datos: { valor: '8k resolution' }, descripcion: 'Añadir booster "8k resolution"' },
      { accion: 'configurarNegative', datos: { valor: 'urban, city, people' }, descripcion: 'Configurar negative prompt' }
    ]
  },
  {
    id: 'anime-character',
    nombre: 'Personaje Anime',
    descripcion: 'Flujo para personajes de anime',
    icono: '🎌',
    pasos: [
      { accion: 'seleccionarEstilo', datos: { id: 'shonen' }, descripcion: 'Seleccionar estilo "Shonen"' },
      { accion: 'añadirMacro', datos: { nombre: 'anime' }, descripcion: 'Añadir macro "{{anime}}"' },
      { accion: 'añadirBooster', datos: { valor: 'anime key visual' }, descripcion: 'Añadir booster "anime key visual"' },
      { accion: 'añadirBooster', datos: { valor: 'beautiful detailed eyes' }, descripcion: 'Añadir booster "beautiful detailed eyes"' },
      { accion: 'configurarNegative', datos: { valor: 'realistic, photo, 3d' }, descripcion: 'Configurar negative prompt' }
    ]
  },
  {
    id: 'cyberpunk-noir',
    nombre: 'Cyberpunk Noir',
    descripcion: 'Flujo para escenas cyberpunk',
    icono: '🌃',
    pasos: [
      { accion: 'seleccionarEstilo', datos: { id: 'cyberpunk' }, descripcion: 'Seleccionar estilo "Cyberpunk"' },
      { accion: 'seleccionarEstilo', datos: { id: 'nocturna' }, descripcion: 'Seleccionar estilo "Nocturna"' },
      { accion: 'añadirMacro', datos: { nombre: 'cinematico' }, descripcion: 'Añadir macro "{{cinematico}}"' },
      { accion: 'añadirLighting', datos: { id: 'neon' }, descripcion: 'Aplicar iluminación Neón' },
      { accion: 'añadirBooster', datos: { valor: 'neon lights' }, descripcion: 'Añadir booster "neon lights"' },
      { accion: 'configurarNegative', datos: { valor: 'nature, bright, cheerful' }, descripcion: 'Configurar negative prompt' }
    ]
  },
  {
    id: 'fantasia-epica',
    nombre: 'Fantasía Épica',
    descripcion: 'Flujo para escenas de fantasía',
    icono: '🐉',
    pasos: [
      { accion: 'seleccionarEstilo', datos: { id: 'high-fantasy' }, descripcion: 'Seleccionar estilo "High Fantasy"' },
      { accion: 'añadirMacro', datos: { nombre: 'iluminacion_dramatica' }, descripcion: 'Añadir macro "{{iluminacion_dramatica}}"' },
      { accion: 'añadirBooster', datos: { valor: 'magical atmosphere' }, descripcion: 'Añadir booster "magical atmosphere"' },
      { accion: 'añadirBooster', datos: { valor: 'epic composition' }, descripcion: 'Añadir booster "epic composition"' },
      { accion: 'añadirLighting', datos: { id: 'volumetric' }, descripcion: 'Aplicar iluminación Volumetric' },
      { accion: 'configurarNegative', datos: { valor: 'modern, urban, realistic' }, descripcion: 'Configurar negative prompt' }
    ]
  },
  {
    id: 'producto-comercial',
    nombre: 'Producto Comercial',
    descripcion: 'Flujo para fotografía de producto',
    icono: '📦',
    pasos: [
      { accion: 'seleccionarEstilo', datos: { id: 'producto' }, descripcion: 'Seleccionar estilo "Producto"' },
      { accion: 'añadirMacro', datos: { nombre: 'composicion_producto' }, descripcion: 'Añadir macro "{{composicion_producto}}"' },
      { accion: 'añadirLighting', datos: { id: 'studio-softbox' }, descripcion: 'Aplicar iluminación Studio Softbox' },
      { accion: 'añadirBooster', datos: { valor: 'commercial quality' }, descripcion: 'Añadir booster "commercial quality"' },
      { accion: 'configurarNegative', datos: { valor: 'messy, blurry, amateur' }, descripcion: 'Configurar negative prompt' }
    ]
  }
];

export async function ejecutarWorkflow(workflow, callbacks) {
  const resultados = [];
  for (const paso of workflow.pasos) {
    if (callbacks[paso.accion]) {
      await callbacks[paso.accion](paso.datos);
      resultados.push({ paso: paso.descripcion, exito: true });
      await new Promise(resolve => setTimeout(resolve, 300)); // Delay visual
    }
  }
  return resultados;
}
