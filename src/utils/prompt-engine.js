// Motor de Prompts - Funciones principales
export function combinarEstilos(estilosConPeso, sujetoBase, todosLosEstilos) {
  if (!estilosConPeso || estilosConPeso.length === 0) return sujetoBase || '';
  let partes = [], boostersUsados = new Set(), artistasUsados = [];
  estilosConPeso.forEach(({ id, peso }) => {
    const estilo = todosLosEstilos.find(e => e.id === id);
    if (!estilo) return;
    if (peso > 0.5) partes.push(estilo.prompt_prefijo);
    else if (peso > 0.2) { const palabras = estilo.prompt_prefijo.split(', '); partes.push(palabras.slice(0, Math.ceil(palabras.length / 2)).join(', ')); }
    if (peso > 0.3 && estilo.prompt_sufijo) partes.push(estilo.prompt_sufijo);
    if (peso > 0.4 && estilo.quality_boosters) estilo.quality_boosters.forEach(b => boostersUsados.add(b));
    if (peso > 0.6 && estilo.artistas_referencia) estilo.artistas_referencia.forEach(a => artistasUsados.push(a));
  });
  let resultado = [];
  if (sujetoBase) resultado.push(sujetoBase);
  const todasPalabras = new Set();
  partes.forEach(parte => { parte.split(',').map(t => t.trim()).filter(t => t).forEach(t => { if (!todasPalabras.has(t.toLowerCase())) { todasPalabras.add(t.toLowerCase()); resultado.push(t); } }); });
  boostersUsados.forEach(b => { if (!todasPalabras.has(b.toLowerCase())) resultado.push(b); });
  if (artistasUsados.length > 0) resultado.push('by ' + artistasUsados.join(' and '));
  return resultado.join(', ');
}

export function combinarNegativos(estilosConPeso, negativeBase, todosLosEstilos) {
  let partes = [];
  if (negativeBase) partes.push(negativeBase);
  estilosConPeso.forEach(({ id, peso }) => { const estilo = todosLosEstilos.find(e => e.id === id); if (estilo && estilo.negative_boost && peso > 0.4) partes.push(estilo.negative_boost); });
  const todasPalabras = new Set(), resultado = [];
  partes.forEach(parte => { parte.split(',').map(t => t.trim()).filter(t => t).forEach(t => { if (!todasPalabras.has(t.toLowerCase())) { todasPalabras.add(t.toLowerCase()); resultado.push(t); } }); });
  return resultado.join(', ');
}

export function resolverMacros(texto, macros, maxIteraciones = 10) {
  let resultado = texto, iteracion = 0;
  while (iteracion < maxIteraciones) {
    let tieneMacros = false;
    resultado = resultado.replace(/\{\{([^}]+)\}\}/g, (match, nombreMacro) => { tieneMacros = true; const macro = macros.find(m => m.nombre === nombreMacro.trim()); return macro ? macro.valor : match; });
    if (!tieneMacros) break;
    iteracion++;
  }
  return resultado;
}

export function agregarAlPrompt(promptActual, termino) {
  if (!termino) return promptActual;
  const terminos = promptActual.split(',').map(t => t.trim()).filter(t => t);
  if (terminos.some(t => t.toLowerCase() === termino.toLowerCase())) return promptActual;
  return promptActual ? `${promptActual}, ${termino}` : termino;
}

export function estimarTokens(texto) {
  if (!texto) return 0;
  return Math.ceil(texto.split(',').filter(t => t.trim()).length * 1.5);
}

export function obtenerSugerenciasContextuales(texto) {
  const sugerencias = [], textoLower = texto.toLowerCase();
  if (textoLower.includes('retrato') || textoLower.includes('portrait')) { sugerencias.push({ tipo: 'macro', nombre: 'retrato_pro', desc: 'Macro profesional para retratos' }); }
  if (textoLower.includes('paisaje') || textoLower.includes('landscape')) { sugerencias.push({ tipo: 'macro', nombre: 'composicion_paisaje', desc: 'Composición para paisajes' }); }
  if (textoLower.includes('anime') || textoLower.includes('manga')) { sugerencias.push({ tipo: 'macro', nombre: 'anime', desc: 'Boosters de anime' }); }
  if (textoLower.includes('cyberpunk') || textoLower.includes('neon')) { sugerencias.push({ tipo: 'estilo', nombre: 'cyberpunk', desc: 'Estilo cyberpunk' }); }
  return sugerencias;
}

export function generarVariantes(prompt) {
  const terminos = prompt.split(',').map(t => t.trim()).filter(t => t);
  return [
    { nombre: 'Variante A (Original)', prompt: terminos.slice().sort(() => Math.random() - 0.3).join(', ') },
    { nombre: 'Variante B (Reorganizada)', prompt: terminos.slice().reverse().join(', ') },
    { nombre: 'Variante C (Balanceada)', prompt: terminos.slice().sort(() => Math.random() - 0.5).join(', ') },
  ];
}

export function tokenizarPrompt(prompt, estilos, boosters) {
  if (!prompt) return [];
  return prompt.split(',').map(t => t.trim()).filter(t => t).map(termino => {
    let tipo = 'neutral';
    const terminoLower = termino.toLowerCase();
    if (estilos && estilos.some(e => e.prompt_prefijo.toLowerCase().includes(terminoLower))) tipo = 'estilo';
    else if (boosters && boosters.some(b => b.valor.toLowerCase().includes(terminoLower))) tipo = 'booster';
    else if (termino.length > 10) tipo = 'sujeto';
    return { texto: termino, tipo };
  });
}
