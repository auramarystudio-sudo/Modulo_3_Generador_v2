// Motor de Prompts - Funciones principales para combinar, resolver y generar prompts

// Combina estilos respetando pesos
export function combinarEstilos(estilosConPeso, sujetoBase, todosLosEstilos) {
  if (!estilosConPeso || estilosConPeso.length === 0) return sujetoBase || '';
  
  let partes = [];
  let boostersUsados = new Set();
  let artistasUsados = [];
  
  estilosConPeso.forEach(({ id, peso }) => {
    const estilo = todosLosEstilos.find(e => e.id === id);
    if (!estilo) return;
    
    if (peso > 0.5) {
      // Peso alto: prefijo completo
      partes.push(estilo.prompt_prefijo);
    } else if (peso > 0.2) {
      // Peso medio: primera mitad del prefijo
      const palabras = estilo.prompt_prefijo.split(', ');
      const mitad = Math.ceil(palabras.length / 2);
      partes.push(palabras.slice(0, mitad).join(', '));
    }
    // Sufijos siempre completos si peso > 0.3
    if (peso > 0.3 && estilo.prompt_sufijo) {
      partes.push(estilo.prompt_sufijo);
    }
    // Boosters según peso
    if (peso > 0.4 && estilo.quality_boosters) {
      estilo.quality_boosters.forEach(b => boostersUsados.add(b));
    }
    // Artistas como "by [nombre]"
    if (peso > 0.6 && estilo.artistas_referencia) {
      estilo.artistas_referencia.forEach(a => artistasUsados.push(a));
    }
  });
  
  // Construir resultado sin duplicados
  let resultado = [];
  if (sujetoBase) resultado.push(sujetoBase);
  
  // Eliminar duplicados
  const todasPalabras = new Set();
  partes.forEach(parte => {
    const terminos = parte.split(',').map(t => t.trim()).filter(t => t);
    terminos.forEach(t => {
      if (!todasPalabras.has(t.toLowerCase())) {
        todasPalabras.add(t.toLowerCase());
        resultado.push(t);
      }
    });
  });
  
  // Añadir boosters
  boostersUsados.forEach(b => {
    if (!todasPalabras.has(b.toLowerCase())) {
      resultado.push(b);
    }
  });
  
  // Añadir artistas
  if (artistasUsados.length > 0) {
    resultado.push(`by ${artistasUsados.join(' and ')}`);
  }
  
  return resultado.join(', ');
}

// Genera negative combinado
export function combinarNegativos(estilosConPeso, negativeBase, todosLosEstilos, negativosDisponibles) {
  let partes = [];
  
  if (negativeBase) partes.push(negativeBase);
  
  estilosConPeso.forEach(({ id, peso }) => {
    const estilo = todosLosEstilos.find(e => e.id === id);
    if (estilo && estilo.negative_boost && peso > 0.4) {
      partes.push(estilo.negative_boost);
    }
  });
  
  // Eliminar duplicados
  const todasPalabras = new Set();
  const resultado = [];
  partes.forEach(parte => {
    const terminos = parte.split(',').map(t => t.trim()).filter(t => t);
    terminos.forEach(t => {
      if (!todasPalabras.has(t.toLowerCase())) {
        todasPalabras.add(t.toLowerCase());
        resultado.push(t);
      }
    });
  });
  
  return resultado.join(', ');
}

// Detecta variables [variable] en una plantilla
export function detectarVariables(plantilla) {
  const regex = /\[([^\]]+)\]/g;
  const variables = [];
  let match;
  while ((match = regex.exec(plantilla)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
}

// Reemplaza variables en plantilla
export function resolverPlantilla(plantilla, variables) {
  let resultado = plantilla;
  Object.entries(variables).forEach(([nombre, valor]) => {
    const regex = new RegExp(`\\[${nombre}\\]`, 'g');
    resultado = resultado.replace(regex, valor);
  });
  return resultado;
}

// Resuelve macros anidados {{macro}} (máx iteraciones para evitar loops)
export function resolverMacros(texto, macros, maxIteraciones = 10) {
  let resultado = texto;
  let iteracion = 0;
  
  while (iteracion < maxIteraciones) {
    const regex = /\{\{([^}]+)\}\}/g;
    let tieneMacros = false;
    
    resultado = resultado.replace(regex, (match, nombreMacro) => {
      tieneMacros = true;
      const macro = macros.find(m => m.nombre === nombreMacro.trim());
      return macro ? macro.valor : match;
    });
    
    if (!tieneMacros) break;
    iteracion++;
  }
  
  return resultado;
}

// Genera prompt aleatorio
export function generarPromptAleatorio(datos) {
  const { estilos, sujetos, acciones, ambientes } = datos;
  
  const sujetoAleatorio = sujetos[Math.floor(Math.random() * sujetos.length)];
  const estiloAleatorio = estilos[Math.floor(Math.random() * estilos.length)];
  const accionAleatoria = acciones[Math.floor(Math.random() * acciones.length)];
  const ambienteAleatorio = ambientes[Math.floor(Math.random() * ambientes.length)];
  
  return `${estiloAleatorio.prompt_prefijo}, ${sujetoAleatorio}, ${accionAleatoria}, ${ambienteAleatorio}, ${estiloAleatorio.prompt_sufijo}`;
}

// Sugerencias contextuales basadas en el texto
export function obtenerSugerenciasContextuales(texto, estilos) {
  const sugerencias = [];
  const textoLower = texto.toLowerCase();
  
  if (textoLower.includes('retrato') || textoLower.includes('portrait') || textoLower.includes('face')) {
    sugerencias.push({ tipo: 'macro', nombre: 'retrato_pro', desc: 'Macro profesional para retratos' });
    sugerencias.push({ tipo: 'macro', nombre: 'composicion_retrato', desc: 'Composición para retratos' });
    sugerencias.push({ tipo: 'booster', nombre: 'detailed skin texture', desc: 'Textura de piel detallada' });
  }
  if (textoLower.includes('paisaje') || textoLower.includes('landscape') || textoLower.includes('mountain')) {
    sugerencias.push({ tipo: 'macro', nombre: 'composicion_paisaje', desc: 'Composición para paisajes' });
    sugerencias.push({ tipo: 'macro', nombre: 'iluminacion_natural', desc: 'Iluminación natural' });
  }
  if (textoLower.includes('producto') || textoLower.includes('product')) {
    sugerencias.push({ tipo: 'macro', nombre: 'composicion_producto', desc: 'Composición para productos' });
  }
  if (textoLower.includes('anime') || textoLower.includes('manga')) {
    sugerencias.push({ tipo: 'macro', nombre: 'anime', desc: 'Boosters de anime' });
  }
  if (textoLower.includes('cinema') || textoLower.includes('movie') || textoLower.includes('film')) {
    sugerencias.push({ tipo: 'macro', nombre: 'cinematico', desc: 'Estilo cinematográfico' });
  }
  if (textoLower.includes('cyberpunk') || textoLower.includes('neon')) {
    sugerencias.push({ tipo: 'estilo', nombre: 'cyberpunk', desc: 'Estilo cyberpunk completo' });
  }
  if (textoLower.includes('fantasy') || textoLower.includes('dragon') || textoLower.includes('magic')) {
    sugerencias.push({ tipo: 'booster', nombre: 'magical atmosphere', desc: 'Atmósfera mágica' });
    sugerencias.push({ tipo: 'booster', nombre: 'epic composition', desc: 'Composición épica' });
  }
  
  return sugerencias;
}

// Añade término sin duplicados
export function agregarAlPrompt(promptActual, termino) {
  if (!termino) return promptActual;
  const terminos = promptActual.split(',').map(t => t.trim()).filter(t => t);
  const terminoLower = termino.toLowerCase();
  if (terminos.some(t => t.toLowerCase() === terminoLower)) return promptActual;
  return promptActual ? `${promptActual}, ${termino}` : termino;
}

// Inserta macro en posición del cursor
export function insertarMacroEnCursor(texto, cursorPos, macroNombre) {
  const macro = `{{${macroNombre}}}`;
  return texto.slice(0, cursorPos) + macro + texto.slice(cursorPos);
}

// Estima tokens (~1.5 tokens por término separado por coma)
export function estimarTokens(texto) {
  if (!texto) return 0;
  const terminos = texto.split(',').filter(t => t.trim());
  return Math.ceil(terminos.length * 1.5);
}

// Analiza el prompt y devuelve un score
export function analizarPrompt(prompt) {
  if (!prompt || prompt.trim().length === 0) return { score: 0, detalles: [] };
  
  let score = 0;
  const detalles = [];
  const terminos = prompt.split(',').map(t => t.trim()).filter(t => t);
  
  // Longitud (más términos = mejor, hasta cierto punto)
  if (terminos.length >= 5) { score += 15; detalles.push('✅ Buena cantidad de términos'); }
  else if (terminos.length >= 3) { score += 10; detalles.push('⚠️ Pocos términos, considera añadir más detalles'); }
  else { score += 5; detalles.push('❌ Muy pocos términos'); }
  
  // Calidad
  const tieneCalidad = /masterpiece|best quality|high quality|detailed/i.test(prompt);
  if (tieneCalidad) { score += 20; detalles.push('✅ Incluye términos de calidad'); }
  else { detalles.push('❌ Falta términos de calidad (masterpiece, best quality)'); }
  
  // Iluminación
  const tieneIluminacion = /lighting|light|illumination|golden hour|studio/i.test(prompt);
  if (tieneIluminacion) { score += 15; detalles.push('✅ Incluye descripción de iluminación'); }
  else { detalles.push('⚠️ Falta descripción de iluminación'); }
  
  // Composición
  const tieneComposicion = /composition|angle|view|perspective|close-up|wide/i.test(prompt);
  if (tieneComposicion) { score += 10; detalles.push('✅ Incluye composición'); }
  else { detalles.push('⚠️ Falta descripción de composición'); }
  
  // Estilo
  const tieneEstilo = /style|art|painting|render|photo|anime|cinematic/i.test(prompt);
  if (tieneEstilo) { score += 15; detalles.push('✅ Define un estilo visual'); }
  else { detalles.push('⚠️ No define un estilo visual claro'); }
  
  // Artista
  const tieneArtista = /by\s+\w+/i.test(prompt);
  if (tieneArtista) { score += 10; detalles.push('✅ Referencia artistas'); }
  else { detalles.push('ℹ️ Sin referencia a artistas (opcional)'); }
  
  // Negativos
  const tieneNegativos = terminos.length > 10;
  if (tieneNegativos) { score += 5; detalles.push('✅ Prompt extenso y detallado'); }
  
  // Penalización por exceso
  if (terminos.length > 50) { score -= 10; detalles.push('⚠️ Demasiados términos, puede confundir al modelo'); }
  
  // Contador de palabras
  const palabras = prompt.split(/\s+/).length;
  
  return {
    score: Math.max(0, Math.min(100, score)),
    detalles,
    palabras,
    terminos: terminos.length,
    tokens: estimarTokens(prompt)
  };
}

// Genera variantes A/B
export function generarVariantes(prompt, estilos) {
  const terminos = prompt.split(',').map(t => t.trim()).filter(t => t);
  
  // Variante A: Énfasis en primer estilo
  const varianteA = [...terminos].sort(() => Math.random() - 0.3).join(', ');
  
  // Variante B: Reorganizado con énfasis diferente
  const varianteB = [...terminos].reverse().join(', ');
  
  // Variante C: Balanceada con pesos
  const mitad = Math.ceil(terminos.length / 2);
  const varianteC = [...terminos.slice(0, mitad), ...terminos.slice(mitad).sort(() => Math.random() - 0.5)].join(', ');
  
  return [
    { nombre: 'Variante A (Énfasis Original)', prompt: varianteA },
    { nombre: 'Variante B (Reorganizada)', prompt: varianteB },
    { nombre: 'Variante C (Balanceada)', prompt: varianteC },
  ];
}

// Tokenizar prompt para visualizador
export function tokenizarPrompt(prompt, estilos, boosters) {
  if (!prompt) return [];
  const terminos = prompt.split(',').map(t => t.trim()).filter(t => t);
  
  return terminos.map(termino => {
    let tipo = 'neutral';
    const terminoLower = termino.toLowerCase();
    
    // Verificar si es un estilo
    if (estilos && estilos.some(e => 
      e.prompt_prefijo.toLowerCase().includes(terminoLower) || 
      e.prompt_sufijo?.toLowerCase().includes(terminoLower)
    )) {
      tipo = 'estilo';
    }
    // Verificar si es un booster
    else if (boosters && boosters.some(b => 
      b.valor.toLowerCase().includes(terminoLower) || 
      b.nombre.toLowerCase() === terminoLower
    )) {
      tipo = 'booster';
    }
    // Verificar si es sujeto (término más largo)
    else if (termino.length > 10) {
      tipo = 'sujeto';
    }
    // Verificar contradicciones
    else if (/blurry|low quality|worst/i.test(termino)) {
      tipo = 'contradiccion';
    }
    
    return { texto: termino, tipo };
  });
}

// Sujetos aleatorios para generación random
export const sujetosAleatorios = [
  'a beautiful woman', 'a young warrior', 'an old wizard', 'a cyberpunk hacker',
  'a dragon', 'a spaceship', 'a medieval castle', 'a futuristic city',
  'a mystical forest', 'a crystal cave', 'a floating island', 'a robot',
  'a samurai', 'a fairy', 'a phoenix', 'a giant whale',
  'an ancient temple', 'a steampunk airship', 'a haunted mansion', 'a volcanic landscape'
];

export const accionesAleatorias = [
  'standing in a dramatic pose', 'walking through the mist', 'looking at the horizon',
  'fighting a battle', 'casting a spell', 'flying through the sky',
  'sitting peacefully', 'running through rain', 'emerging from shadows',
  'dancing in the light', 'exploring ruins', 'meditating on a mountain'
];

export const ambientesAleatorios = [
  'at sunset', 'in a storm', 'under northern lights', 'in a dense fog',
  'during cherry blossom season', 'in a neon-lit alley', 'on a cliff edge',
  'in an ancient library', 'underwater', 'in space', 'in a crystal palace',
  'during a thunderstorm', 'in autumn', 'at dawn', 'under moonlight'
];
