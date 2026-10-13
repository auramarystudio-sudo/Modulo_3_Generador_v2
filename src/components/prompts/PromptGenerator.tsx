// @ts-nocheck
// PromptGenerator - Componente principal con 10 mejoras
import { useState, useEffect, useRef, useCallback } from 'react';
import { estilosIniciales } from '../../data/estilos-iniciales.js';
import { negativesSistema, boostersSistema, macrosSistema, plantillasSistema } from '../../data/prompt-data.js';
import { combinarEstilos, combinarNegativos, resolverMacros, agregarAlPrompt, estimarTokens, obtenerSugerenciasContextuales, generarVariantes, tokenizarPrompt } from '../../utils/prompt-engine.js';
import { traducirPromptESaEN } from '../../utils/translator.js';
import { refinarPrompt } from '../../utils/llm-refiner.js';
import { exportarPrompt } from '../../utils/api-integration.js';
import { presetsIniciales, generarCombinacionesWildcards, sugerirNegativos, PromptHistory, guardarBorrador, cargarBorrador, insertarEmbedding, insertarLoRA, regionesDefault, generarRegionalPrompt, generarBatch, compararPrompts, atajosTeclado } from '../../utils/prompt-features.js';
import { Sparkles, Copy, Check, Shuffle, Save, Star, Trash2, Plus, Edit3, X, Search, Zap, Globe, Wand2, Layers, Palette, Type, History, BarChart3, Focus, Send, Undo2, Redo2, BookOpen, Keyboard, Cpu, Grid3x3, Eye } from 'lucide-react';

export default function PromptGenerator() {
  // Estados principales
  const [prompt, setPrompt] = useState('');
  const [negative, setNegative] = useState('');
  const [promptEN, setPromptEN] = useState('');
  const [sujeto, setSujeto] = useState('');
  const [estilosSeleccionados, setEstilosSeleccionados] = useState([]);
  const [busquedaEstilos, setBusquedaEstilos] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [panelActivo, setPanelActivo] = useState('estilos');
  const [modoFocus, setModoFocus] = useState(false);
  const [traducir, setTraducir] = useState(false);
  const [traduciendo, setTraduciendo] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [formatoExport, setFormatoExport] = useState('texto');
  const [copiado, setCopiado] = useState(false);
  const [modalCRUD, setModalCRUD] = useState(null);
  const [boosters, setBoosters] = useState(boostersSistema);
  const [macros, setMacros] = useState(macrosSistema);
  const [negativos, setNegativos] = useState(negativesSistema);
  const [plantillas, setPlantillas] = useState(plantillasSistema);
  const [estilos, setEstilos] = useState(estilosIniciales);
  const [variantes, setVariantes] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);
  const [valoresPlantilla, setValoresPlantilla] = useState({});

  // NUEVAS MEJORAS
  const [presets, setPresets] = useState(presetsIniciales);
  const [mostrarPresets, setMostrarPresets] = useState(false);
  const [mostrarBatch, setMostrarBatch] = useState(false);
  const [batchResultados, setBatchResultados] = useState([]);
  const [batchVariable, setBatchVariable] = useState('');
  const [batchOpciones, setBatchOpciones] = useState('');
  const [mostrarEmbeddings, setMostrarEmbeddings] = useState(false);
  const [embeddingNombre, setEmbeddingNombre] = useState('');
  const [embeddingPeso, setEmbeddingPeso] = useState(1.0);
  const [loraNombre, setLoraNombre] = useState('');
  const [loraPeso, setLoraPeso] = useState(1.0);
  const [mostrarUndoRedo, setMostrarUndoRedo] = useState(false);
  const [mostrarNegAssistant, setMostrarNegAssistant] = useState(false);
  const [negSugeridos, setNegSugeridos] = useState([]);
  const [mostrarComparador, setMostrarComparador] = useState(false);
  const [promptComparar1, setPromptComparar1] = useState('');
  const [promptComparar2, setPromptComparar2] = useState('');
  const [comparacionResult, setComparacionResult] = useState(null);
  const [mostrarRegional, setMostrarRegional] = useState(false);
  const [regiones, setRegiones] = useState(regionesDefault);
  const [mostrarAtajos, setMostrarAtajos] = useState(false);
  const [autoSaveActivo, setAutoSaveActivo] = useState(true);
  const [ultimoGuardado, setUltimoGuardado] = useState(null);

  // Refs
  const textareaRef = useRef(null);
  const traduceTimeoutRef = useRef(null);
  const autoSaveTimeoutRef = useRef(null);
  const promptHistoryRef = useRef(new PromptHistory(20));
  const esAleatorioRef = useRef(false);

  // Cargar borrador al inicio
  useEffect(() => {
    const borrador = cargarBorrador();
    if (borrador) {
      if (borrador.prompt) setPrompt(borrador.prompt);
      if (borrador.negative) setNegative(borrador.negative);
      if (borrador.sujeto) setSujeto(borrador.sujeto);
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (!autoSaveActivo) return;
    if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    autoSaveTimeoutRef.current = setTimeout(() => {
      guardarBorrador({ prompt, negative, sujeto });
      setUltimoGuardado(new Date().toLocaleTimeString());
    }, 2000);
    return () => { if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current); };
  }, [prompt, negative, sujeto, autoSaveActivo]);

  // Historial para undo/redo
  useEffect(() => {
    if (prompt) promptHistoryRef.current.push(prompt);
  }, [prompt]);

  // Generar prompt automáticamente
  useEffect(() => {
    if (esAleatorioRef.current) { esAleatorioRef.current = false; return; }
    if (estilosSeleccionados.length > 0 || sujeto) {
      const promptGenerado = combinarEstilos(estilosSeleccionados, sujeto, estilos);
      const promptConMacros = resolverMacros(promptGenerado, macros);
      setPrompt(promptConMacros);
      setSugerencias(obtenerSugerenciasContextuales(promptConMacros));
    }
  }, [estilosSeleccionados, sujeto, estilos, macros]);

  // Generar negative
  useEffect(() => {
    if (estilosSeleccionados.length > 0) {
      setNegative(combinarNegativos(estilosSeleccionados, '', estilos));
    }
  }, [estilosSeleccionados, estilos]);

  // Traducción
  useEffect(() => {
    if (traducir && prompt) {
      if (traduceTimeoutRef.current) clearTimeout(traduceTimeoutRef.current);
      traduceTimeoutRef.current = setTimeout(async () => {
        setTraduciendo(true);
        setPromptEN(await traducirPromptESaEN(prompt));
        setTraduciendo(false);
      }, 1000);
    }
    return () => { if (traduceTimeoutRef.current) clearTimeout(traduceTimeoutRef.current); };
  }, [prompt, traducir]);

  // Atajos de teclado
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); generarFinal(); }
      if (e.ctrlKey && e.key === 's') { e.preventDefault(); guardarEnHistorial(); }
      if (e.ctrlKey && e.shiftKey && e.key === 'C') { e.preventDefault(); copiarPrompt(); }
      if (e.ctrlKey && e.key === 't') { e.preventDefault(); setTraducir(!traducir); }
      if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); }
      if (e.ctrlKey && e.key === 'y') { e.preventDefault(); redo(); }
      if (e.ctrlKey && e.key === 'p') { e.preventDefault(); setMostrarPresets(!mostrarPresets); }
      if (e.ctrlKey && e.key === 'b') { e.preventDefault(); setMostrarBatch(!mostrarBatch); }
      if (e.ctrlKey && e.key === 'r') { e.preventDefault(); generarAleatorio(); }
      if (e.ctrlKey && e.key === 'f') { e.preventDefault(); setModoFocus(!modoFocus); }
      if (e.key === 'Escape') { setModalCRUD(null); setMostrarHistorial(false); setVariantes([]); setMostrarPresets(false); setMostrarBatch(false); setMostrarEmbeddings(false); setMostrarComparador(false); setMostrarRegional(false); setMostrarAtajos(false); setMostrarNegAssistant(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prompt, negative, traducir, modoFocus, mostrarPresets, mostrarBatch]);

  // Funciones principales
  const toggleEstilo = (id) => { setEstilosSeleccionados(prev => { if (prev.find(e => e.id === id)) return prev.filter(e => e.id !== id); if (prev.length >= 5) return prev; return [...prev, { id, peso: 0.7 }]; }); };
  const actualizarPeso = (id, peso) => { setEstilosSeleccionados(prev => prev.map(e => e.id === id ? { ...e, peso } : e)); };
  const agregarBooster = (valor) => setPrompt(prev => agregarAlPrompt(prev, valor));
  const agregarMacro = (nombre) => setPrompt(prev => agregarAlPrompt(prev, `{{${nombre}}}`));
  const agregarNegativo = (valor) => setNegative(prev => agregarAlPrompt(prev, valor));

  const aplicarPlantilla = (plantilla) => {
    if (plantilla.variables && plantilla.variables.length > 0) {
      const valoresDefault = {};
      plantilla.variables.forEach(v => { valoresDefault[v.nombre] = v.default || ''; });
      setValoresPlantilla(valoresDefault);
      setPlantillaSeleccionada(plantilla);
      setSujeto(Object.values(valoresDefault).filter(v => v).join(', '));
    } else { setPrompt(resolverMacros(plantilla.plantilla, macros)); }
  };

  // Listas aleatorias locales
  const sujetosAleatorios = ['a beautiful woman', 'a young warrior', 'an old wizard', 'a cyberpunk hacker', 'a dragon', 'a spaceship', 'a medieval castle', 'a futuristic city', 'a mystical forest', 'a crystal cave', 'a floating island', 'a robot', 'a samurai', 'a fairy', 'a phoenix'];
  const accionesAleatorias = ['standing in a dramatic pose', 'walking through the mist', 'looking at the horizon', 'fighting a battle', 'casting a spell', 'flying through the sky', 'sitting peacefully', 'running through rain', 'emerging from shadows'];
  const ambientesAleatorios = ['at sunset', 'in a storm', 'under northern lights', 'in a dense fog', 'during cherry blossom season', 'in a neon-lit alley', 'on a cliff edge', 'in an ancient library', 'underwater', 'in space'];

  const generarAleatorio = () => {
    const sujetoRand = sujetosAleatorios[Math.floor(Math.random() * sujetosAleatorios.length)];
    const accionRand = accionesAleatorias[Math.floor(Math.random() * accionesAleatorias.length)];
    const ambRand = ambientesAleatorios[Math.floor(Math.random() * ambientesAleatorios.length)];
    const estiloRand = estilos[Math.floor(Math.random() * estilos.length)];
    esAleatorioRef.current = true;
    setNegative(estiloRand.negative_boost || 'worst quality, low quality, blurry');
    setPrompt(`${estiloRand.prompt_prefijo}, ${sujetoRand}, ${accionRand}, ${ambRand}, ${estiloRand.prompt_sufijo}, masterpiece, best quality`);
  };

  const copiarPrompt = async () => { await navigator.clipboard.writeText(prompt); setCopiado(true); setTimeout(() => setCopiado(false), 2000); };
  const guardarEnHistorial = () => { if (!prompt) return; setHistorial(prev => [{ id: Date.now(), prompt, negative, promptEN, estilos: estilosSeleccionados, fecha: new Date().toISOString(), favorito: false, rating: 0 }, ...prev]); };
  const generarFinal = () => { setPrompt(resolverMacros(prompt, macros)); };

  // MEJORA 5: Undo/Redo
  const undo = () => { const val = promptHistoryRef.current.undo(); if (val) { esAleatorioRef.current = true; setPrompt(val); setMostrarUndoRedo(true); setTimeout(() => setMostrarUndoRedo(false), 1500); } };
  const redo = () => { const val = promptHistoryRef.current.redo(); if (val) { esAleatorioRef.current = true; setPrompt(val); setMostrarUndoRedo(true); setTimeout(() => setMostrarUndoRedo(false), 1500); } };

  // MEJORA 1: Aplicar preset
  const aplicarPreset = (preset) => {
    esAleatorioRef.current = true;
    setEstilosSeleccionados(preset.estilos.map(id => ({ id, peso: 0.8 })));
    setNegative(preset.negative);
    const boostersStr = preset.boosters.join(', ');
    const macrosStr = preset.macros.map(m => `{{${m}}}`).join(', ');
    setPrompt(`${macrosStr}, ${boostersStr}`);
    setMostrarPresets(false);
  };

  // MEJORA 2: Batch Generator
  const ejecutarBatch = () => {
    if (!batchVariable || !batchOpciones || !prompt) return;
    const opciones = batchOpciones.split(',').map(o => o.trim()).filter(o => o);
    const plantilla = prompt.replace(new RegExp(`\\[${batchVariable}\\]`, 'g'), `[${batchVariable}]`);
    const resultados = opciones.map(opcion => plantilla.replace(new RegExp(`\\[${batchVariable}\\]`, 'g'), opcion));
    setBatchResultados(resultados);
  };

  // MEJORA 3: Wildcards
  const procesarWildcards = () => {
    const combinaciones = generarCombinacionesWildcards(prompt);
    if (combinaciones.length > 1) { setBatchResultados(combinaciones); setMostrarBatch(true); }
  };

  // MEJORA 4: Embeddings/LoRA
  const agregarEmbedding = () => { if (embeddingNombre) { setPrompt(prev => agregarAlPrompt(prev, insertarEmbedding(embeddingNombre, embeddingPeso))); setEmbeddingNombre(''); } };
  const agregarLoRA = () => { if (loraNombre) { setPrompt(prev => agregarAlPrompt(prev, insertarLoRA(loraNombre, loraPeso))); setLoraNombre(''); } };

  // MEJORA 6: Negative Assistant
  const generarNegSugeridos = () => { setNegSugeridos(sugerirNegativos(prompt)); setMostrarNegAssistant(true); };

  // MEJORA 7: Comparador
  const ejecutarComparacion = () => { if (promptComparar1 && promptComparar2) { setComparacionResult(compararPrompts(promptComparar1, promptComparar2)); } };

  // MEJORA 9: Regional
  const generarRegional = () => { const rp = generarRegionalPrompt(regiones); if (rp) { setPrompt(prev => prev + '\n\n' + rp); setMostrarRegional(false); } };

  const categorias = [...new Set(estilos.map(e => e.categoria))];
  const estilosFiltrados = estilos.filter(e => { const matchBusqueda = !busquedaEstilos || e.nombre.toLowerCase().includes(busquedaEstilos.toLowerCase()); const matchCategoria = !categoriaFiltro || e.categoria === categoriaFiltro; return matchBusqueda && matchCategoria; });
  const tokens = tokenizarPrompt(prompt, estilosSeleccionados.map(e => estilos.find(s => s.id === e.id)).filter(Boolean), boosters);
  const tokensEstimados = estimarTokens(prompt);

  const guardarCRUD = (tipo, item, modo) => {
    const setters = { boosters: setBoosters, macros: setMacros, negativos: setNegativos, plantillas: setPlantillas, estilos: setEstilos, presets: setPresets };
    const setter = setters[tipo];
    if (!setter) return;
    if (modo === 'crear') setter(prev => [...prev, { ...item, id: `${tipo}-${Date.now()}`, es_sistema: false }]);
    else if (modo === 'editar') setter(prev => prev.map(i => i.id === item.id ? item : i));
    else if (modo === 'eliminar') setter(prev => prev.filter(i => i.id !== item.id));
    setModalCRUD(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Generador de Prompts Avanzado</h1>
            {ultimoGuardado && <span className="text-xs text-slate-500">💾 {ultimoGuardado}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMostrarAtajos(true)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition" title="Atajos"><Keyboard className="w-4 h-4" /></button>
            <button onClick={undo} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition" title="Deshacer (Ctrl+Z)"><Undo2 className="w-4 h-4" /></button>
            <button onClick={redo} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition" title="Rehacer (Ctrl+Y)"><Redo2 className="w-4 h-4" /></button>
            <button onClick={() => setModoFocus(!modoFocus)} className={`p-2 rounded-lg transition ${modoFocus ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`} title="Focus (Ctrl+F)"><Focus className="w-4 h-4" /></button>
            <button onClick={() => setMostrarHistorial(!mostrarHistorial)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition" title="Historial"><History className="w-4 h-4" /></button>
            <button onClick={guardarEnHistorial} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition" title="Guardar (Ctrl+S)"><Save className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <div className={`grid gap-4 ${modoFocus ? 'grid-cols-1' : 'lg:grid-cols-[1fr_380px]'}`}>
          {/* Columna izquierda */}
          <div className="space-y-4">
            {/* Sujeto / Plantilla */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              {plantillaSeleccionada ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-cyan-400" /><label className="text-sm font-medium text-cyan-400">Plantilla: {plantillaSeleccionada.nombre}</label></div>
                    <button onClick={() => { setPlantillaSeleccionada(null); setValoresPlantilla({}); setSujeto(''); }} className="text-xs text-slate-400 hover:text-white flex items-center gap-1"><X className="w-3 h-3" /> Cerrar</button>
                  </div>
                  <div className="space-y-3">
                    {plantillaSeleccionada.variables?.map((variable, index) => (
                      <div key={index}>
                        <label className="text-xs text-cyan-400 block mb-1 font-medium capitalize">{variable.nombre.replace(/_/g, ' ')}</label>
                        {variable.descripcion && <p className="text-xs text-slate-500 mb-1">{variable.descripcion}</p>}
                        <input type="text" value={valoresPlantilla[variable.nombre] || ''} onChange={(e) => { const nuevosValores = { ...valoresPlantilla, [variable.nombre]: e.target.value }; setValoresPlantilla(nuevosValores); setSujeto(Object.values(nuevosValores).filter(v => v).join(', ')); }} placeholder={variable.default || ''} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">Sujeto / Idea Base</label>
                  <input type="text" value={sujeto} onChange={(e) => setSujeto(e.target.value)} placeholder="Describe el sujeto principal..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition" />
                </>
              )}
            </div>

            {/* Prompt Positivo */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">Prompt Positivo</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setTraducir(!traducir)} className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${traducir ? 'bg-emerald-900 text-emerald-300' : 'bg-slate-800 text-slate-400 hover:text-white'}`}><Globe className="w-3 h-3" /> ES→EN</button>
                  <button onClick={generarAleatorio} className="flex items-center gap-1 px-2 py-1 rounded bg-purple-900/50 text-purple-300 hover:bg-purple-900 text-xs transition"><Shuffle className="w-3 h-3" /> Aleatorio</button>
                </div>
              </div>
              <textarea ref={textareaRef} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="El prompt se genera automáticamente..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition min-h-[120px] resize-y font-mono text-sm" />
              {traducir && (<div className="mt-3"><span className="text-xs text-emerald-400">🌐 Traducción EN:</span>{traduciendo && <span className="text-xs text-slate-500 animate-pulse ml-2">Traduciendo...</span>}<textarea value={promptEN} readOnly className="w-full bg-slate-800/50 border border-emerald-900/30 rounded-lg px-4 py-2 text-emerald-300 text-sm font-mono min-h-[60px] resize-y mt-1" /></div>)}
              {tokens.length > 0 && (<div className="mt-3"><div className="flex items-center gap-2 mb-2"><span className="text-xs text-slate-500">Tokens: ~{tokensEstimados}</span>{tokensEstimados > 75 && <span className="text-xs text-red-400">⚠️ Exceso</span>}<button onClick={procesarWildcards} className="ml-auto text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 hover:bg-indigo-900">🎲 Wildcards</button></div><div className="flex flex-wrap gap-1">{tokens.map((token, i) => (<span key={i} className={`px-2 py-0.5 rounded text-xs ${token.tipo === 'sujeto' ? 'bg-blue-900/50 text-blue-300' : token.tipo === 'estilo' ? 'bg-green-900/50 text-green-300' : token.tipo === 'booster' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-slate-800 text-slate-400'}`}>{token.texto}</span>))}</div></div>)}
            </div>

            {/* Negative */}
            <div className="bg-slate-900 border border-red-900/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-red-400">Prompt Negativo</label>
                <button onClick={generarNegSugeridos} className="text-xs px-2 py-1 rounded bg-red-950 text-red-300 hover:bg-red-900 transition">🚫 Auto-sugerir</button>
              </div>
              <textarea value={negative} onChange={(e) => setNegative(e.target.value)} placeholder="Términos a evitar..." className="w-full bg-slate-800 border border-red-900/20 rounded-lg px-4 py-3 text-red-300 placeholder-slate-500 focus:outline-none focus:border-red-500 transition min-h-[80px] resize-y font-mono text-sm" />
            </div>

            {/* Prompt Final */}
            <div className="bg-slate-900 border border-cyan-900/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-cyan-400">📋 Prompt Final</label>
                <div className="flex items-center gap-2">
                  <select value={formatoExport} onChange={(e) => setFormatoExport(e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300">
                    <option value="texto">Texto</option><option value="a1111">A1111</option><option value="comfyui">ComfyUI</option><option value="midjourney">Midjourney</option><option value="fooocus">Fooocus</option>
                  </select>
                  <button onClick={copiarPrompt} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${copiado ? 'bg-green-600 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}>{copiado ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copiado ? 'Copiado!' : 'Copiar'}</button>
                </div>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 font-mono text-sm text-slate-200 min-h-[60px] whitespace-pre-wrap">{exportarPrompt(prompt, negative, formatoExport) || 'Genera un prompt...'}</div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <button onClick={generarFinal} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition"><Zap className="w-3 h-3" /> Final</button>
                <button onClick={() => setMostrarPresets(!mostrarPresets)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium transition ${mostrarPresets ? 'bg-amber-500' : 'bg-amber-600 hover:bg-amber-500'}`}><BookOpen className="w-3 h-3" /> Presets</button>
                <button onClick={() => setMostrarBatch(!mostrarBatch)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium transition ${mostrarBatch ? 'bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}><Grid3x3 className="w-3 h-3" /> Batch</button>
                <button onClick={() => setMostrarEmbeddings(!mostrarEmbeddings)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium transition ${mostrarEmbeddings ? 'bg-pink-500' : 'bg-pink-600 hover:bg-pink-500'}`}><Cpu className="w-3 h-3" /> Embed/LoRA</button>
                <button onClick={() => setMostrarRegional(!mostrarRegional)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium transition ${mostrarRegional ? 'bg-teal-500' : 'bg-teal-600 hover:bg-teal-500'}`}><Eye className="w-3 h-3" /> Regional</button>
                <button onClick={() => { setVariantes(generarVariantes(prompt)); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition"><Layers className="w-3 h-3" /> Variantes</button>
                <button onClick={() => { setPromptComparar1(prompt); setMostrarComparador(true); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition"><Eye className="w-3 h-3" /> Comparar</button>
              </div>

              {/* Envío a interfaces */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-300">Enviar a:</span>
                  <select className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300"><option>A1111</option><option>ComfyUI</option></select>
                  <button className="flex-1 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-medium transition flex items-center justify-center gap-2"><Send className="w-3 h-3" /> Enviar</button>
                </div>
              </div>
            </div>

            {/* MEJORA 1: Presets Card */}
            {mostrarPresets && (
              <div className="bg-slate-900 border border-amber-900/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber-400" /><label className="text-sm font-medium text-amber-400">Presets Rápidos</label></div>
                  <div className="flex gap-2">
                    <button onClick={() => setModalCRUD({ tipo: 'presets', modo: 'crear', item: {} })} className="text-xs px-2 py-1 rounded bg-amber-950 text-amber-300 hover:bg-amber-900"><Plus className="w-3 h-3 inline" /> Nuevo</button>
                    <button onClick={() => setMostrarPresets(false)} className="text-xs text-slate-400 hover:text-white"><X className="w-3 h-3" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map(p => (
                    <button key={p.id} onClick={() => aplicarPreset(p)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-amber-800 text-left transition">
                      <span className="text-xs font-medium text-amber-300 block">{p.nombre}</span>
                      <span className="text-xs text-slate-500 block truncate">{p.descripcion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MEJORA 2: Batch Card */}
            {mostrarBatch && (
              <div className="bg-slate-900 border border-indigo-900/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><Grid3x3 className="w-4 h-4 text-indigo-400" /><label className="text-sm font-medium text-indigo-400">Batch Generator</label></div>
                  <button onClick={() => { setMostrarBatch(false); setBatchResultados([]); }} className="text-xs text-slate-400 hover:text-white"><X className="w-3 h-3" /></button>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input type="text" value={batchVariable} onChange={(e) => setBatchVariable(e.target.value)} placeholder="Variable [nombre]" className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200" />
                    <input type="text" value={batchOpciones} onChange={(e) => setBatchOpciones(e.target.value)} placeholder="opción1, opción2, opción3" className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200" />
                    <button onClick={ejecutarBatch} className="px-3 py-1 rounded bg-indigo-600 text-white text-xs">Generar</button>
                  </div>
                  <p className="text-xs text-slate-500">Usa [variable] en tu prompt y define opciones separadas por comas</p>
                  {batchResultados.length > 0 && (
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {batchResultados.map((r, i) => (
                        <div key={i} className="bg-slate-800 rounded p-2 flex items-center gap-2">
                          <span className="text-xs text-indigo-400 w-6">#{i+1}</span>
                          <span className="text-xs text-slate-300 flex-1 truncate">{r}</span>
                          <button onClick={() => { setPrompt(r); }} className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300">Usar</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MEJORA 4: Embeddings/LoRA Card */}
            {mostrarEmbeddings && (
              <div className="bg-slate-900 border border-pink-900/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-pink-400" /><label className="text-sm font-medium text-pink-400">Embeddings & LoRA</label></div>
                  <button onClick={() => setMostrarEmbeddings(false)} className="text-xs text-slate-400 hover:text-white"><X className="w-3 h-3" /></button>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input type="text" value={embeddingNombre} onChange={(e) => setEmbeddingNombre(e.target.value)} placeholder="Nombre embedding" className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200" />
                    <input type="number" value={embeddingPeso} onChange={(e) => setEmbeddingPeso(parseFloat(e.target.value))} step="0.1" min="0" max="2" className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200" />
                    <button onClick={agregarEmbedding} className="px-3 py-1 rounded bg-pink-600 text-white text-xs">+</button>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={loraNombre} onChange={(e) => setLoraNombre(e.target.value)} placeholder="Nombre LoRA" className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200" />
                    <input type="number" value={loraPeso} onChange={(e) => setLoraPeso(parseFloat(e.target.value))} step="0.1" min="0" max="2" className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200" />
                    <button onClick={agregarLoRA} className="px-3 py-1 rounded bg-pink-600 text-white text-xs">+</button>
                  </div>
                </div>
              </div>
            )}

            {/* MEJORA 6: Negative Assistant Card */}
            {mostrarNegAssistant && (
              <div className="bg-slate-900 border border-red-900/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /><label className="text-sm font-medium text-red-400">Negativos Sugeridos</label></div>
                  <button onClick={() => setMostrarNegAssistant(false)} className="text-xs text-slate-400 hover:text-white"><X className="w-3 h-3" /></button>
                </div>
                <div className="space-y-2">
                  {negSugeridos.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 flex-1 truncate">{s}</span>
                      <button onClick={() => { agregarNegativo(s); }} className="text-xs px-2 py-0.5 rounded bg-red-950 text-red-300 hover:bg-red-900">+ Añadir</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MEJORA 7: Comparador Card */}
            {mostrarComparador && (
              <div className="bg-slate-900 border border-violet-900/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-violet-400" /><label className="text-sm font-medium text-violet-400">Comparador de Prompts</label></div>
                  <button onClick={() => { setMostrarComparador(false); setComparacionResult(null); }} className="text-xs text-slate-400 hover:text-white"><X className="w-3 h-3" /></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-violet-400 block mb-1">Prompt 1</label>
                    <textarea value={promptComparar1} onChange={(e) => setPromptComparar1(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 min-h-[60px] font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-violet-400 block mb-1">Prompt 2</label>
                    <textarea value={promptComparar2} onChange={(e) => setPromptComparar2(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 min-h-[60px] font-mono" />
                  </div>
                </div>
                <button onClick={ejecutarComparacion} className="w-full mt-2 py-1.5 rounded bg-violet-600 text-white text-xs">Comparar</button>
                {comparacionResult && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-slate-400">Similitud: {Math.round(comparacionResult.similitud * 100)}%</div>
                    {comparacionResult.soloEnPrompt1.length > 0 && <div><span className="text-xs text-green-400">Solo en P1:</span><span className="text-xs text-slate-400 ml-1">{comparacionResult.soloEnPrompt1.join(', ')}</span></div>}
                    {comparacionResult.soloEnPrompt2.length > 0 && <div><span className="text-xs text-red-400">Solo en P2:</span><span className="text-xs text-slate-400 ml-1">{comparacionResult.soloEnPrompt2.join(', ')}</span></div>}
                    {comparacionResult.comunes.length > 0 && <div><span className="text-xs text-blue-400">Comunes:</span><span className="text-xs text-slate-400 ml-1">{comparacionResult.comunes.join(', ')}</span></div>}
                  </div>
                )}
              </div>
            )}

            {/* MEJORA 9: Regional Card */}
            {mostrarRegional && (
              <div className="bg-slate-900 border border-teal-900/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-teal-400" /><label className="text-sm font-medium text-teal-400">Regional Prompter</label></div>
                  <button onClick={() => setMostrarRegional(false)} className="text-xs text-slate-400 hover:text-white"><X className="w-3 h-3" /></button>
                </div>
                <div className="space-y-2">
                  {Object.entries(regiones).map(([key, region]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded" style={{ backgroundColor: region.color }}></span>
                      <span className="text-xs text-slate-300 w-20">{region.nombre}</span>
                      <input type="text" value={region.prompt || ''} onChange={(e) => setRegiones(prev => ({ ...prev, [key]: { ...prev[key], prompt: e.target.value } }))} placeholder={`Prompt para ${region.nombre}`} className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200" />
                    </div>
                  ))}
                </div>
                <button onClick={generarRegional} className="w-full mt-3 py-1.5 rounded bg-teal-600 text-white text-xs">Generar Regional</button>
              </div>
            )}

            {/* Variantes Card */}
            {variantes.length > 0 && (
              <div className="bg-slate-900 border border-purple-900/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-purple-400" /><label className="text-sm font-medium text-purple-400">Variantes A/B</label></div>
                  <button onClick={() => setVariantes([])} className="text-xs text-slate-400 hover:text-white"><X className="w-3 h-3" /></button>
                </div>
                <div className="space-y-2">
                  {variantes.map((v, i) => (
                    <div key={i} className="bg-slate-800 rounded-lg p-2 border border-slate-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-purple-400">{v.nombre}</span>
                        <button onClick={() => setPrompt(v.prompt)} className="text-xs px-2 py-0.5 rounded bg-purple-950 text-purple-300 hover:bg-purple-900">Usar</button>
                      </div>
                      <p className="text-xs text-slate-300 font-mono truncate">{v.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Undo/Redo Toast */}
            {mostrarUndoRedo && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 z-50 animate-pulse">↩️ Cambio aplicado</div>
            )}
          </div>

          {/* Columna derecha */}
          {!modoFocus && (
            <div className="space-y-4">
              <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
                {[{ id: 'estilos', icon: Palette, label: 'Estilos' }, { id: 'boosters', icon: Zap, label: 'Boost' }, { id: 'macros', icon: Type, label: 'Macros' }, { id: 'negativos', icon: X, label: 'Neg' }, { id: 'plantillas', icon: Layers, label: 'Plant' }].map(tab => (
                  <button key={tab.id} onClick={() => setPanelActivo(tab.id)} className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition ${panelActivo === tab.id ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><tab.icon className="w-3 h-3" /><span className="hidden xl:inline">{tab.label}</span></button>
                ))}
              </div>

              {panelActivo === 'estilos' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-slate-300">Estilos ({estilos.length})</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'estilos', modo: 'crear', item: {} })} className="p-1 rounded bg-cyan-900/50 text-cyan-400 hover:bg-cyan-900"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" /><input value={busquedaEstilos} onChange={(e) => setBusquedaEstilos(e.target.value)} placeholder="Buscar..." className="w-full bg-slate-800 border border-slate-700 rounded pl-7 pr-2 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500" /></div>
                    <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300"><option value="">Todas</option>{categorias.map(c => <option key={c} value={c}>{c}</option>)}</select>
                  </div>
                  {estilosSeleccionados.length > 0 && (<div className="mb-3 space-y-2"><span className="text-xs text-cyan-400">Seleccionados ({estilosSeleccionados.length}/5):</span>{estilosSeleccionados.map(({ id, peso }) => { const estilo = estilos.find(e => e.id === id); if (!estilo) return null; return (<div key={id} className="flex items-center gap-2 bg-cyan-950/50 border border-cyan-800/50 rounded-lg p-2"><span className="text-xs text-cyan-300 flex-1 truncate">{estilo.nombre}</span><input type="range" min="0" max="1" step="0.1" value={peso} onChange={(e) => actualizarPeso(id, parseFloat(e.target.value))} className="w-16 h-1 accent-cyan-500" /><span className="text-xs text-cyan-400 w-6">{peso.toFixed(1)}</span><button onClick={() => toggleEstilo(id)} className="text-red-400 hover:text-red-300"><X className="w-3 h-3" /></button></div>); })}</div>)}
                  <div className="space-y-1">{estilosFiltrados.map(estilo => { const seleccionado = estilosSeleccionados.some(e => e.id === estilo.id); return (<div key={estilo.id} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${seleccionado ? 'bg-cyan-950 border border-cyan-800' : 'hover:bg-slate-800 border border-transparent'}`}><button onClick={() => toggleEstilo(estilo.id)} className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${seleccionado ? 'bg-cyan-500 border-cyan-400' : 'border-slate-600'}`}>{seleccionado && <Check className="w-3 h-3 text-white" />}</button><div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="text-xs font-medium text-slate-200 truncate">{estilo.nombre}</span>{estilo.popularidad >= 90 && <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />}</div><span className="text-xs text-slate-500 truncate block">{estilo.categoria}</span></div></div>); })}</div>
                </div>
              )}

              {panelActivo === 'boosters' && (<div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto"><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-medium text-slate-300">Quality Boosters</h3><button onClick={() => setModalCRUD({ tipo: 'boosters', modo: 'crear', item: {} })} className="p-1 rounded bg-cyan-900/50 text-cyan-400 hover:bg-cyan-900"><Plus className="w-4 h-4" /></button></div><div className="space-y-3">{['ultra', 'alta', 'fotografica', 'artistica', 'anime', 'cinematica', 'fantasia', 'realista'].map(cat => { const items = boosters.filter(b => b.categoria === cat); if (items.length === 0) return null; return (<div key={cat}><span className="text-xs text-slate-500 uppercase tracking-wider">{cat}</span><div className="flex flex-wrap gap-1 mt-1">{items.map(b => (<button key={b.id} onClick={() => agregarBooster(b.valor)} className="px-2 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs hover:bg-cyan-900 transition">+ {b.nombre}</button>))}</div></div>); })}</div></div>)}

              {panelActivo === 'macros' && (<div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto"><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-medium text-slate-300">Macros</h3><button onClick={() => setModalCRUD({ tipo: 'macros', modo: 'crear', item: {} })} className="p-1 rounded bg-cyan-900/50 text-cyan-400 hover:bg-cyan-900"><Plus className="w-4 h-4" /></button></div><div className="space-y-1">{macros.map(m => (<div key={m.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition"><button onClick={() => agregarMacro(m.nombre)} className="flex-1 text-left"><span className="text-xs font-medium text-purple-400">{`{{${m.nombre}}}`}</span><span className="text-xs text-slate-500 block truncate">{m.valor.substring(0, 60)}...</span></button></div>))}</div></div>)}

              {panelActivo === 'negativos' && (<div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto"><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-medium text-red-400">Negativos</h3><button onClick={() => setModalCRUD({ tipo: 'negativos', modo: 'crear', item: {} })} className="p-1 rounded bg-red-900/50 text-red-400 hover:bg-red-900"><Plus className="w-4 h-4" /></button></div><div className="space-y-2">{negativos.map(n => (<div key={n.id} className="p-2 rounded-lg bg-slate-800/50 border border-red-900/20"><div className="flex items-center justify-between"><span className="text-xs font-medium text-red-300">{n.nombre}</span><button onClick={() => agregarNegativo(n.valor)} className="text-xs px-2 py-0.5 rounded bg-red-950 text-red-300 hover:bg-red-900">+ Añadir</button></div><p className="text-xs text-slate-500 mt-1 truncate">{n.valor.substring(0, 80)}...</p></div>))}</div></div>)}

              {panelActivo === 'plantillas' && (<div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto"><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-medium text-slate-300">Plantillas</h3><button onClick={() => setModalCRUD({ tipo: 'plantillas', modo: 'crear', item: {} })} className="p-1 rounded bg-cyan-900/50 text-cyan-400 hover:bg-cyan-900"><Plus className="w-4 h-4" /></button></div><div className="space-y-2">{plantillas.map(p => (<div key={p.id} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700"><div className="flex items-center justify-between mb-1"><span className="text-xs font-medium text-slate-200">{p.nombre}</span><button onClick={() => aplicarPlantilla(p)} className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900">Cargar</button></div><p className="text-xs text-slate-500 truncate">{p.descripcion}</p></div>))}</div></div>)}
            </div>
          )}
        </div>
      </div>

      {/* Historial Modal */}
      {mostrarHistorial && (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setMostrarHistorial(false)}><div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><History className="w-5 h-5 text-cyan-400" /> Historial</h3><button onClick={() => setMostrarHistorial(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button></div>{historial.length === 0 ? <p className="text-slate-500 text-center py-8">No hay prompts guardados</p> : (<div className="space-y-2">{historial.map((h, i) => (<div key={h.id} className="bg-slate-800 rounded-lg p-3 border border-slate-700"><div className="flex items-center justify-between mb-1"><span className="text-xs text-slate-500">{new Date(h.fecha).toLocaleString()}</span><div className="flex items-center gap-2"><div className="flex gap-0.5">{[1,2,3,4,5].map(s => (<button key={s} onClick={() => setHistorial(prev => prev.map((item, idx) => idx === i ? {...item, rating: s} : item))} className={`text-xs ${s <= h.rating ? 'text-yellow-400' : 'text-slate-600'}`}>★</button>))}</div><button onClick={() => { setPrompt(h.prompt); setNegative(h.negative || ''); setMostrarHistorial(false); }} className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900">Usar</button><button onClick={() => setHistorial(prev => prev.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300"><Trash2 className="w-3 h-3" /></button></div></div><p className="text-xs text-slate-300 font-mono truncate">{h.prompt}</p></div>))}</div>)}</div></div>)}

      {/* MEJORA 10: Atajos Modal */}
      {mostrarAtajos && (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setMostrarAtajos(false)}><div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><Keyboard className="w-5 h-5 text-cyan-400" /> Atajos de Teclado</h3><button onClick={() => setMostrarAtajos(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button></div><div className="space-y-2">{atajosTeclado.map((a, i) => (<div key={i} className="flex items-center justify-between py-1 border-b border-slate-800"><span className="text-xs text-slate-400">{a.categoria}</span><div className="flex items-center gap-3"><span className="text-xs text-slate-300">{a.descripcion}</span><kbd className="px-2 py-0.5 rounded bg-slate-800 text-xs text-cyan-400 font-mono">{a.tecla}</kbd></div></div>))}</div></div></div>)}

      {/* CRUD Modal */}
      {modalCRUD && <CRUDModal tipo={modalCRUD.tipo} item={modalCRUD.item} modo={modalCRUD.modo} onGuardar={(item, modo) => guardarCRUD(modalCRUD.tipo, item, modo)} onCerrar={() => setModalCRUD(null)} />}
    </div>
  );
}

function CRUDModal({ tipo, item, modo, onGuardar, onCerrar }) {
  const [formData, setFormData] = useState({ ...item });
  const tiposConfig = {
    boosters: { titulo: 'Booster', campos: ['nombre', 'categoria', 'valor'] },
    macros: { titulo: 'Macro', campos: ['nombre', 'valor'] },
    negativos: { titulo: 'Negativo', campos: ['nombre', 'categoria', 'valor'] },
    plantillas: { titulo: 'Plantilla', campos: ['nombre', 'plantilla', 'descripcion'] },
    estilos: { titulo: 'Estilo', campos: ['nombre', 'categoria', 'prompt_prefijo', 'prompt_sufijo', 'negative_boost', 'descripcion'] },
    presets: { titulo: 'Preset', campos: ['nombre', 'descripcion'] },
  };
  const config = tiposConfig[tipo];
  if (!config) return null;
  return (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onCerrar}><div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-slate-100">{modo === 'crear' ? `+ Nuevo ${config.titulo}` : `Editar ${config.titulo}`}</h3><button onClick={onCerrar} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button></div><form onSubmit={(e) => { e.preventDefault(); onGuardar(formData, modo); }} className="space-y-3">{config.campos.map(campo => (<div key={campo}><label className="text-xs text-slate-400 block mb-1">{campo.replace(/_/g, ' ')}</label>{['descripcion', 'valor', 'prompt_prefijo', 'prompt_sufijo', 'negative_boost', 'plantilla'].includes(campo) ? (<textarea value={formData[campo] || ''} onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 min-h-[60px]" />) : (<input type="text" value={formData[campo] || ''} onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />)}</div>))}<div className="flex gap-2 pt-2"><button type="submit" className="flex-1 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition">{modo === 'crear' ? 'Crear' : 'Guardar'}</button>{modo === 'editar' && !item.es_sistema && (<button type="button" onClick={() => onGuardar(item, 'eliminar')} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition">Eliminar</button>)}</div></form></div></div>);
}
