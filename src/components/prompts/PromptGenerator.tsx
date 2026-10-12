// @ts-nocheck
// PromptGenerator - Componente principal del generador de prompts
import { useState, useEffect, useRef } from 'react';
import { estilosIniciales } from '../../data/estilos-iniciales.js';
import { negativesSistema, boostersSistema, macrosSistema, plantillasSistema } from '../../data/prompt-data.js';
import { combinarEstilos, combinarNegativos, resolverMacros, agregarAlPrompt, estimarTokens, obtenerSugerenciasContextuales, generarVariantes, tokenizarPrompt, sujetosAleatorios, accionesAleatorios, ambientesAleatorios } from '../../utils/prompt-engine.js';
import { traducirPromptESaEN } from '../../utils/translator.js';
import { refinarPrompt } from '../../utils/llm-refiner.js';
import { exportarPrompt } from '../../utils/api-integration.js';
import { 
  Sparkles, Copy, Check, Shuffle, Save, Star, Trash2, Plus, Edit3, X, 
  Search, Zap, Globe, Wand2, Layers, Palette, Type, History, BarChart3, Focus, Send
} from 'lucide-react';

// Componente principal
export default function PromptGenerator() {
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
  const [mostrarRefiner, setMostrarRefiner] = useState(false);
  const [promptRefinado, setPromptRefinado] = useState('');
  const [estiloRefiner, setEstiloRefiner] = useState('cinematico');
  const [refinando, setRefinando] = useState(false);
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
  const [mostrarAnalizador, setMostrarAnalizador] = useState(false);
  const [promptAnalizar, setPromptAnalizar] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);
  const [valoresPlantilla, setValoresPlantilla] = useState({});
  const [interfazSeleccionada, setInterfazSeleccionada] = useState('a1111');
  const [enviando, setEnviando] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState(null); // 'exito' | 'error' | null
  const [mensajeEnvio, setMensajeEnvio] = useState('');
  const [configInterfaz, setConfigInterfaz] = useState({
    a1111: { url: 'http://127.0.0.1:7860', sampler: 'Euler a', steps: 20, cfg: 7, width: 512, height: 512 },
    comfyui: { url: 'http://127.0.0.1:8188', modelo: 'sd_xl_base_1.0.safetensors', steps: 20, cfg: 7, width: 1024, height: 1024 }
  });
  const [mostrarConfigInterfaz, setMostrarConfigInterfaz] = useState(false);
  const textareaRef = useRef(null);
  const traduceTimeoutRef = useRef(null);

  const categorias = [...new Set(estilos.map(e => e.categoria))];
  const estilosFiltrados = estilos.filter(e => {
    const matchBusqueda = !busquedaEstilos || e.nombre.toLowerCase().includes(busquedaEstilos.toLowerCase()) || e.tags?.some(t => t.toLowerCase().includes(busquedaEstilos.toLowerCase()));
    const matchCategoria = !categoriaFiltro || e.categoria === categoriaFiltro;
    return matchBusqueda && matchCategoria;
  });

  // Generar prompt automáticamente
  useEffect(() => {
    if (estilosSeleccionados.length > 0 || sujeto) {
      const promptGenerado = combinarEstilos(estilosSeleccionados, sujeto, estilos);
      const promptConMacros = resolverMacros(promptGenerado, macros);
      setPrompt(promptConMacros);
      setSugerencias(obtenerSugerenciasContextuales(promptConMacros, estilos));
    }
  }, [estilosSeleccionados, sujeto, estilos, macros]);

  // Generar negative
  useEffect(() => {
    if (estilosSeleccionados.length > 0) {
      const negGenerado = combinarNegativos(estilosSeleccionados, '', estilos, negativos);
      setNegative(negGenerado);
    }
  }, [estilosSeleccionados, estilos, negativos]);

  // Traducción con debounce
  useEffect(() => {
    if (traducir && prompt) {
      if (traduceTimeoutRef.current) clearTimeout(traduceTimeoutRef.current);
      traduceTimeoutRef.current = setTimeout(async () => {
        setTraduciendo(true);
        const traduccion = await traducirPromptESaEN(prompt);
        setPromptEN(traduccion);
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
      if (e.key === 'Escape') { setModalCRUD(null); setMostrarRefiner(false); setMostrarHistorial(false); setVariantes([]); setMostrarAnalizador(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prompt, negative]);

  const toggleEstilo = (id) => {
    setEstilosSeleccionados(prev => {
      if (prev.find(e => e.id === id)) return prev.filter(e => e.id !== id);
      if (prev.length >= 5) return prev;
      return [...prev, { id, peso: 0.7 }];
    });
  };

  const actualizarPeso = (id, peso) => {
    setEstilosSeleccionados(prev => prev.map(e => e.id === id ? { ...e, peso } : e));
  };

  const agregarBooster = (valor) => setPrompt(prev => agregarAlPrompt(prev, valor));
  const agregarMacro = (nombre) => setPrompt(prev => agregarAlPrompt(prev, `{{${nombre}}}`));
  const agregarNegativo = (valor) => setNegative(prev => agregarAlPrompt(prev, valor));

  // Cargar plantilla en el área de sujeto
  const aplicarPlantilla = (plantilla) => {
    if (plantilla.variables && plantilla.variables.length > 0) {
      // Cargar valores por defecto en los campos
      const valoresDefault = {};
      plantilla.variables.forEach(v => { valoresDefault[v.nombre] = v.default || ''; });
      setValoresPlantilla(valoresDefault);
      setPlantillaSeleccionada(plantilla);
      // Combinar valores default como sujeto inicial
      const sujetoCombinado = Object.values(valoresDefault).filter(v => v).join(', ');
      setSujeto(sujetoCombinado);
    } else {
      // Plantilla sin variables, aplicar directamente
      let resuelta = plantilla.plantilla;
      setPrompt(resolverMacros(resuelta, macros));
    }
  };

  const generarAleatorio = () => {
    const sujetoRand = sujetosAleatorios[Math.floor(Math.random() * sujetosAleatorios.length)];
    const accionRand = accionesAleatorias[Math.floor(Math.random() * accionesAleatorias.length)];
    const ambRand = ambientesAleatorios[Math.floor(Math.random() * ambientesAleatorios.length)];
    const estiloRand = estilos[Math.floor(Math.random() * estilos.length)];
    setSujeto(sujetoRand);
    setEstilosSeleccionados([{ id: estiloRand.id, peso: 0.8 }]);
    setPrompt(`${estiloRand.prompt_prefijo}, ${sujetoRand}, ${accionRand}, ${ambRand}, ${estiloRand.prompt_sufijo}, masterpiece, best quality`);
  };

  const copiarPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const guardarEnHistorial = () => {
    if (!prompt) return;
    setHistorial(prev => [{ id: Date.now(), prompt, negative, promptEN, estilos: estilosSeleccionados, fecha: new Date().toISOString(), favorito: false, rating: 0 }, ...prev]);
  };

  const generarFinal = () => { setPrompt(resolverMacros(prompt, macros)); };

  // Enviar prompt a interfaz (A1111 o ComfyUI)
  const enviarAInterfaz = async () => {
    if (!prompt) return;
    setEnviando(true);
    setEstadoEnvio(null);
    setMensajeEnvio('');

    const config = configInterfaz[interfazSeleccionada];
    const promptFinal = promptEN || prompt; // Usar traducción si está disponible

    try {
      if (interfazSeleccionada === 'a1111') {
        const response = await fetch(`${config.url}/sdapi/v1/txt2img`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptFinal,
            negative_prompt: negative,
            steps: config.steps,
            cfg_scale: config.cfg,
            width: config.width,
            height: config.height,
            sampler_name: config.sampler,
          }),
          signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
          setEstadoEnvio('exito');
          setMensajeEnvio('✓ Prompt enviado a A1111 correctamente');
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      } else if (interfazSeleccionada === 'comfyui') {
        const workflow = {
          prompt: {
            "3": {
              class_type: "KSampler",
              inputs: {
                seed: Math.floor(Math.random() * 999999999),
                steps: config.steps,
                cfg: config.cfg,
                sampler_name: "euler",
                scheduler: "normal",
                denoise: 1,
                model: ["4", 0],
                positive: ["6", 0],
                negative: ["7", 0],
                latent_image: ["5", 0]
              }
            },
            "4": { class_type: "CheckpointLoaderSimple", inputs: { ckpt_name: config.modelo } },
            "5": { class_type: "EmptyLatentImage", inputs: { width: config.width, height: config.height, batch_size: 1 } },
            "6": { class_type: "CLIPTextEncode", inputs: { text: promptFinal, clip: ["4", 1] } },
            "7": { class_type: "CLIPTextEncode", inputs: { text: negative, clip: ["4", 1] } },
            "8": { class_type: "VAEDecode", inputs: { samples: ["3", 0], vae: ["4", 2] } },
            "9": { class_type: "SaveImage", inputs: { filename_prefix: "PromptGen", images: ["8", 0] } }
          }
        };

        const response = await fetch(`${config.url}/prompt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(workflow),
          signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
          setEstadoEnvio('exito');
          setMensajeEnvio('✓ Prompt enviado a ComfyUI correctamente');
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }
    } catch (error) {
      setEstadoEnvio('error');
      setMensajeEnvio(`✗ Error: ${error.message}. Verifica que la interfaz esté corriendo en ${config.url}`);
    } finally {
      setEnviando(false);
      setTimeout(() => { setEstadoEnvio(null); setMensajeEnvio(''); }, 5000);
    }
  };

  const refinar = async () => {
    setRefinando(true);
    const resultado = await refinarPrompt(prompt, estiloRefiner);
    setPromptRefinado(resultado);
    setRefinando(false);
  };

  const aplicarRefinado = () => { setPrompt(promptRefinado); setMostrarRefiner(false); };

  const generarVariantesFn = () => {
    setVariantes(generarVariantes(prompt, estilos));
  };

  const guardarCRUD = (tipo, item, modo) => {
    const setters = { boosters: setBoosters, macros: setMacros, negativos: setNegativos, plantillas: setPlantillas, estilos: setEstilos };
    const setter = setters[tipo];
    if (!setter) return;
    if (modo === 'crear') setter(prev => [...prev, { ...item, id: `${tipo}-${Date.now()}`, es_sistema: false }]);
    else if (modo === 'editar') setter(prev => prev.map(i => i.id === item.id ? item : i));
    else if (modo === 'eliminar') setter(prev => prev.filter(i => i.id !== item.id));
    setModalCRUD(null);
  };

  const tokens = tokenizarPrompt(prompt, estilosSeleccionados.map(e => estilos.find(s => s.id === e.id)).filter(Boolean), boosters);
  const tokensEstimados = estimarTokens(prompt);

  const analisis = (() => {
    if (!prompt) return { score: 0, detalles: [], palabras: 0, terminos: 0, tokens: 0 };
    let score = 0; const detalles = [];
    const terminos = prompt.split(',').map(t => t.trim()).filter(t => t);
    if (terminos.length >= 5) { score += 15; detalles.push('✅ Buena cantidad de términos'); } else { score += 5; detalles.push('⚠️ Pocos términos'); }
    if (/masterpiece|best quality|detailed/i.test(prompt)) { score += 20; detalles.push('✅ Incluye calidad'); } else detalles.push('❌ Falta términos de calidad');
    if (/light|lighting|illumination/i.test(prompt)) { score += 15; detalles.push('✅ Iluminación definida'); } else detalles.push('⚠️ Falta iluminación');
    if (/style|art|render|photo|cinematic/i.test(prompt)) { score += 15; detalles.push('✅ Estilo visual'); } else detalles.push('⚠️ Falta estilo');
    if (terminos.length > 50) { score -= 10; detalles.push('⚠️ Exceso de términos'); }
    return { score: Math.min(100, Math.max(0, score)), detalles, palabras: prompt.split(/\s+/).length, terminos: terminos.length, tokens: tokensEstimados };
  })();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Generador de Prompts Avanzado</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setModoFocus(!modoFocus)} className={`p-2 rounded-lg transition ${modoFocus ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`} title="Modo Focus">
              <Focus className="w-4 h-4" />
            </button>
            <button onClick={() => setMostrarHistorial(!mostrarHistorial)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition" title="Historial">
              <History className="w-4 h-4" />
            </button>
            <button onClick={guardarEnHistorial} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition" title="Guardar (Ctrl+S)">
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <div className={`grid gap-4 ${modoFocus ? 'grid-cols-1' : 'lg:grid-cols-[1fr_380px]'}`}>
          {/* Columna izquierda */}
          <div className="space-y-4">
            {/* Sujeto / Idea Base - Con campos de plantilla si está seleccionada */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              {plantillaSeleccionada ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <label className="text-sm font-medium text-cyan-400">Plantilla: {plantillaSeleccionada.nombre}</label>
                    </div>
                    <button 
                      onClick={() => { setPlantillaSeleccionada(null); setValoresPlantilla({}); setSujeto(''); }}
                      className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Cerrar
                    </button>
                  </div>
                  {plantillaSeleccionada.descripcion && (
                    <p className="text-xs text-slate-500 mb-3">{plantillaSeleccionada.descripcion}</p>
                  )}
                  <div className="space-y-3">
                    {plantillaSeleccionada.variables?.map((variable, index) => (
                      <div key={index}>
                        <label className="text-xs text-cyan-400 block mb-1 font-medium capitalize">
                          {variable.nombre.replace(/_/g, ' ')}
                        </label>
                        {variable.descripcion && (
                          <p className="text-xs text-slate-500 mb-1">{variable.descripcion}</p>
                        )}
                        <input
                          type="text"
                          value={valoresPlantilla[variable.nombre] || ''}
                          onChange={(e) => {
                            const nuevosValores = { ...valoresPlantilla, [variable.nombre]: e.target.value };
                            setValoresPlantilla(nuevosValores);
                            // Actualizar sujeto combinando todos los valores
                            const sujetoCombinado = Object.values(nuevosValores).filter(v => v).join(', ');
                            setSujeto(sujetoCombinado);
                          }}
                          placeholder={variable.default || `Escribe ${variable.nombre}...`}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Vista previa del sujeto combinado */}
                  {sujeto && (
                    <div className="mt-3 bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
                      <span className="text-xs text-slate-500 block mb-1">Sujeto combinado (alimenta el prompt):</span>
                      <p className="text-xs text-slate-300">{sujeto}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">Sujeto / Idea Base</label>
                  <input 
                    type="text" 
                    value={sujeto} 
                    onChange={(e) => setSujeto(e.target.value)} 
                    placeholder="Describe el sujeto principal... ej: una mujer guerrera con armadura dorada" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition" 
                  />
                </>
              )}
            </div>

            {/* Editor de Prompt */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">Prompt Positivo</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setTraducir(!traducir)} className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${traducir ? 'bg-emerald-900 text-emerald-300' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                    <Globe className="w-3 h-3" /> ES→EN
                  </button>
                  <button onClick={generarAleatorio} className="flex items-center gap-1 px-2 py-1 rounded bg-purple-900/50 text-purple-300 hover:bg-purple-900 text-xs transition">
                    <Shuffle className="w-3 h-3" /> Aleatorio
                  </button>
                </div>
              </div>
              <textarea ref={textareaRef} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="El prompt se genera automáticamente al seleccionar estilos..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition min-h-[120px] resize-y font-mono text-sm" />
              
              {traducir && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-emerald-400">🌐 Traducción EN:</span>
                    {traduciendo && <span className="text-xs text-slate-500 animate-pulse">Traduciendo...</span>}
                  </div>
                  <textarea value={promptEN} readOnly className="w-full bg-slate-800/50 border border-emerald-900/30 rounded-lg px-4 py-2 text-emerald-300 text-sm font-mono min-h-[60px] resize-y" />
                </div>
              )}

              {/* Token Visualizer */}
              {tokens.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-slate-500">Tokens: ~{tokensEstimados}</span>
                    {tokensEstimados > 75 && <span className="text-xs text-red-400">⚠️ Exceso de tokens</span>}
                    <span className="ml-auto flex gap-2 text-xs">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500"></span>Sujeto</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-500"></span>Estilo</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-yellow-500"></span>Booster</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tokens.map((token, i) => (
                      <span key={i} title={token.tipo} className={`px-2 py-0.5 rounded text-xs ${token.tipo === 'sujeto' ? 'bg-blue-900/50 text-blue-300' : token.tipo === 'estilo' ? 'bg-green-900/50 text-green-300' : token.tipo === 'booster' ? 'bg-yellow-900/50 text-yellow-300' : token.tipo === 'contradiccion' ? 'bg-red-900/50 text-red-300' : 'bg-slate-800 text-slate-400'}`}>
                        {token.texto}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Negative */}
            <div className="bg-slate-900 border border-red-900/30 rounded-xl p-4">
              <label className="text-sm font-medium text-red-400 mb-2 block">Prompt Negativo</label>
              <textarea value={negative} onChange={(e) => setNegative(e.target.value)} placeholder="Términos a evitar..." className="w-full bg-slate-800 border border-red-900/20 rounded-lg px-4 py-3 text-red-300 placeholder-slate-500 focus:outline-none focus:border-red-500 transition min-h-[80px] resize-y font-mono text-sm" />
            </div>

            {/* Score */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-400">Análisis del Prompt</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${analisis.score >= 70 ? 'bg-green-900/50 text-green-400' : analisis.score >= 40 ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'}`}>{analisis.score}</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
                <span>Palabras: {analisis.palabras}</span>
                <span>Términos: {analisis.terminos}</span>
                <span>Tokens: ~{analisis.tokens}</span>
              </div>
              {sugerencias.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {sugerencias.slice(0, 4).map((s, i) => (
                    <button key={i} onClick={() => { if (s.tipo === 'macro') agregarMacro(s.nombre); else if (s.tipo === 'booster') agregarBooster(s.nombre); }} className="px-2 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs hover:bg-cyan-900 transition">+ {s.desc}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Output Final */}
            <div className="bg-slate-900 border border-cyan-900/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-cyan-400">📋 Prompt Final</label>
                <div className="flex items-center gap-2">
                  <select value={formatoExport} onChange={(e) => setFormatoExport(e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300">
                    <option value="texto">Texto Plano</option>
                    <option value="a1111">A1111</option>
                    <option value="comfyui">ComfyUI</option>
                    <option value="midjourney">Midjourney</option>
                    <option value="fooocus">Fooocus</option>
                  </select>
                  <button onClick={copiarPrompt} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${copiado ? 'bg-green-600 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}>
                    {copiado ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copiado ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 font-mono text-sm text-slate-200 min-h-[60px] whitespace-pre-wrap">
                {exportarPrompt(prompt, negative, formatoExport) || 'Genera un prompt para ver el resultado...'}
              </div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <button onClick={generarFinal} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition"><Zap className="w-3 h-3" /> Generar Final</button>
                <button onClick={() => setMostrarRefiner(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition"><Wand2 className="w-3 h-3" /> Mejorar IA</button>
                <button onClick={generarVariantesFn} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition"><Layers className="w-3 h-3" /> Variantes</button>
                <button onClick={() => setMostrarAnalizador(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition"><BarChart3 className="w-3 h-3" /> Analizar</button>
              </div>

              {/* Envío a interfaces */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-300">Enviar a:</span>
                  <select 
                    value={interfazSeleccionada} 
                    onChange={(e) => setInterfazSeleccionada(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300"
                  >
                    <option value="a1111">Automatic1111</option>
                    <option value="comfyui">ComfyUI</option>
                  </select>
                  <button 
                    onClick={() => setMostrarConfigInterfaz(!mostrarConfigInterfaz)}
                    className="text-xs text-slate-400 hover:text-white transition"
                  >
                    ⚙️ Config
                  </button>
                </div>

                {/* Configuración de interfaz */}
                {mostrarConfigInterfaz && (
                  <div className="mb-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">URL:</label>
                        <input
                          type="text"
                          value={configInterfaz[interfazSeleccionada].url}
                          onChange={(e) => setConfigInterfaz(prev => ({
                            ...prev,
                            [interfazSeleccionada]: { ...prev[interfazSeleccionada], url: e.target.value }
                          }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Steps:</label>
                        <input
                          type="number"
                          value={configInterfaz[interfazSeleccionada].steps}
                          onChange={(e) => setConfigInterfaz(prev => ({
                            ...prev,
                            [interfazSeleccionada]: { ...prev[interfazSeleccionada], steps: parseInt(e.target.value) }
                          }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">CFG Scale:</label>
                        <input
                          type="number"
                          step="0.5"
                          value={configInterfaz[interfazSeleccionada].cfg}
                          onChange={(e) => setConfigInterfaz(prev => ({
                            ...prev,
                            [interfazSeleccionada]: { ...prev[interfazSeleccionada], cfg: parseFloat(e.target.value) }
                          }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Width:</label>
                        <input
                          type="number"
                          value={configInterfaz[interfazSeleccionada].width}
                          onChange={(e) => setConfigInterfaz(prev => ({
                            ...prev,
                            [interfazSeleccionada]: { ...prev[interfazSeleccionada], width: parseInt(e.target.value) }
                          }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Height:</label>
                        <input
                          type="number"
                          value={configInterfaz[interfazSeleccionada].height}
                          onChange={(e) => setConfigInterfaz(prev => ({
                            ...prev,
                            [interfazSeleccionada]: { ...prev[interfazSeleccionada], height: parseInt(e.target.value) }
                          }))}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                        />
                      </div>
                      {interfazSeleccionada === 'a1111' && (
                        <div>
                          <label className="text-slate-400 block mb-1">Sampler:</label>
                          <input
                            type="text"
                            value={configInterfaz.a1111.sampler}
                            onChange={(e) => setConfigInterfaz(prev => ({
                              ...prev,
                              a1111: { ...prev.a1111, sampler: e.target.value }
                            }))}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                          />
                        </div>
                      )}
                      {interfazSeleccionada === 'comfyui' && (
                        <div>
                          <label className="text-slate-400 block mb-1">Modelo:</label>
                          <input
                            type="text"
                            value={configInterfaz.comfyui.modelo}
                            onChange={(e) => setConfigInterfaz(prev => ({
                              ...prev,
                              comfyui: { ...prev.comfyui, modelo: e.target.value }
                            }))}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Botón de envío */}
                <button
                  onClick={enviarAInterfaz}
                  disabled={enviando || !prompt}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-sm font-medium transition"
                >
                  {enviando ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar a {interfazSeleccionada === 'a1111' ? 'A1111' : 'ComfyUI'}
                    </>
                  )}
                </button>

                {/* Mensaje de estado */}
                {estadoEnvio && (
                  <div className={`mt-2 p-2 rounded-lg text-xs ${estadoEnvio === 'exito' ? 'bg-green-900/30 border border-green-800/50 text-green-300' : 'bg-red-900/30 border border-red-800/50 text-red-300'}`}>
                    {mensajeEnvio}
                  </div>
                )}
              </div>
            </div>

            {/* Variantes A/B - Card debajo del Prompt Final */}
            {variantes.length > 0 && (
              <div className="bg-slate-900 border border-purple-900/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <label className="text-sm font-medium text-purple-400">Variantes A/B Testing</label>
                  </div>
                  <button 
                    onClick={() => setVariantes([])}
                    className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Cerrar
                  </button>
                </div>
                <p className="text-xs text-slate-500 mb-3">Compara diferentes versiones del prompt y elige la mejor</p>
                <div className="space-y-3">
                  {variantes.map((v, i) => (
                    <div key={i} className="bg-slate-800 rounded-lg p-3 border border-slate-700 hover:border-purple-800/50 transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-purple-400">{v.nombre}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setPrompt(v.prompt); }} 
                            className="text-xs px-2 py-1 rounded bg-purple-950 text-purple-300 hover:bg-purple-900 transition"
                          >
                            Usar esta
                          </button>
                          <button 
                            onClick={() => { navigator.clipboard.writeText(v.prompt); }}
                            className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition"
                          >
                            <Copy className="w-3 h-3 inline" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed">{v.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha */}
          {!modoFocus && (
            <div className="space-y-4">
              {/* Tabs */}
              <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
                {[{ id: 'estilos', icon: Palette, label: 'Estilos' }, { id: 'boosters', icon: Zap, label: 'Boost' }, { id: 'macros', icon: Type, label: 'Macros' }, { id: 'negativos', icon: X, label: 'Neg' }, { id: 'plantillas', icon: Layers, label: 'Plant' }].map(tab => (
                  <button key={tab.id} onClick={() => setPanelActivo(tab.id)} className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition ${panelActivo === tab.id ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                    <tab.icon className="w-3 h-3" /><span className="hidden xl:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Estilos */}
              {panelActivo === 'estilos' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-slate-300">Biblioteca de Estilos ({estilos.length})</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'estilos', modo: 'crear', item: {} })} className="p-1 rounded bg-cyan-900/50 text-cyan-400 hover:bg-cyan-900"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                      <input value={busquedaEstilos} onChange={(e) => setBusquedaEstilos(e.target.value)} placeholder="Buscar..." className="w-full bg-slate-800 border border-slate-700 rounded pl-7 pr-2 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500" />
                    </div>
                    <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300">
                      <option value="">Todas</option>
                      {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {estilosSeleccionados.length > 0 && (
                    <div className="mb-3 space-y-2">
                      <span className="text-xs text-cyan-400">Seleccionados ({estilosSeleccionados.length}/5):</span>
                      {estilosSeleccionados.map(({ id, peso }) => {
                        const estilo = estilos.find(e => e.id === id);
                        if (!estilo) return null;
                        return (
                          <div key={id} className="flex items-center gap-2 bg-cyan-950/50 border border-cyan-800/50 rounded-lg p-2">
                            <span className="text-xs text-cyan-300 flex-1 truncate">{estilo.nombre}</span>
                            <input type="range" min="0" max="1" step="0.1" value={peso} onChange={(e) => actualizarPeso(id, parseFloat(e.target.value))} className="w-16 h-1 accent-cyan-500" />
                            <span className="text-xs text-cyan-400 w-6">{peso.toFixed(1)}</span>
                            <button onClick={() => toggleEstilo(id)} className="text-red-400 hover:text-red-300"><X className="w-3 h-3" /></button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="space-y-1">
                    {estilosFiltrados.map(estilo => {
                      const seleccionado = estilosSeleccionados.some(e => e.id === estilo.id);
                      return (
                        <div key={estilo.id} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${seleccionado ? 'bg-cyan-950 border border-cyan-800' : 'hover:bg-slate-800 border border-transparent'}`}>
                          <button onClick={() => toggleEstilo(estilo.id)} className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${seleccionado ? 'bg-cyan-500 border-cyan-400' : 'border-slate-600'}`}>
                            {seleccionado && <Check className="w-3 h-3 text-white" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium text-slate-200 truncate">{estilo.nombre}</span>
                              {estilo.popularidad >= 90 && <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />}
                            </div>
                            <span className="text-xs text-slate-500 truncate block">{estilo.categoria}</span>
                          </div>
                          {!estilo.es_sistema && (
                            <button onClick={() => setModalCRUD({ tipo: 'estilos', modo: 'editar', item: estilo })} className="text-slate-500 hover:text-slate-300"><Edit3 className="w-3 h-3" /></button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Boosters */}
              {panelActivo === 'boosters' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-slate-300">Quality Boosters</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'boosters', modo: 'crear', item: {} })} className="p-1 rounded bg-cyan-900/50 text-cyan-400 hover:bg-cyan-900"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-3">
                    {['ultra', 'alta', 'fotografica', 'artistica', 'anime', 'cinematica', 'fantasia', 'realista'].map(cat => {
                      const items = boosters.filter(b => b.categoria === cat);
                      if (items.length === 0) return null;
                      return (
                        <div key={cat}>
                          <span className="text-xs text-slate-500 uppercase tracking-wider">{cat}</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {items.map(b => (
                              <button key={b.id} onClick={() => agregarBooster(b.valor)} className="px-2 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs hover:bg-cyan-900 transition">+ {b.nombre}</button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Macros */}
              {panelActivo === 'macros' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-slate-300">Macros</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'macros', modo: 'crear', item: {} })} className="p-1 rounded bg-cyan-900/50 text-cyan-400 hover:bg-cyan-900"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-1">
                    {macros.map(m => (
                      <div key={m.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition group">
                        <button onClick={() => agregarMacro(m.nombre)} className="flex-1 text-left">
                          <span className="text-xs font-medium text-purple-400">{`{{${m.nombre}}}`}</span>
                          <span className="text-xs text-slate-500 block truncate">{m.valor.substring(0, 60)}...</span>
                        </button>
                        {!m.es_sistema && <button onClick={() => setModalCRUD({ tipo: 'macros', modo: 'editar', item: m })} className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100"><Edit3 className="w-3 h-3" /></button>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Negativos */}
              {panelActivo === 'negativos' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-red-400">Negativos por Categoría</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'negativos', modo: 'crear', item: {} })} className="p-1 rounded bg-red-900/50 text-red-400 hover:bg-red-900"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-2">
                    {negativos.map(n => (
                      <div key={n.id} className="p-2 rounded-lg bg-slate-800/50 border border-red-900/20 group">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-red-300">{n.nombre}</span>
                          <div className="flex gap-1">
                            <button onClick={() => agregarNegativo(n.valor)} className="text-xs px-2 py-0.5 rounded bg-red-950 text-red-300 hover:bg-red-900 transition">+ Añadir</button>
                            {!n.es_sistema && <button onClick={() => setModalCRUD({ tipo: 'negativos', modo: 'editar', item: n })} className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100"><Edit3 className="w-3 h-3" /></button>}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 truncate">{n.valor.substring(0, 80)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Plantillas */}
              {panelActivo === 'plantillas' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-[600px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-slate-300">Plantillas</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'plantillas', modo: 'crear', item: {} })} className="p-1 rounded bg-cyan-900/50 text-cyan-400 hover:bg-cyan-900"><Plus className="w-4 h-4" /></button>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Selecciona una plantilla para personalizar sus variables</p>
                  <div className="space-y-2">
                    {plantillas.map(p => (
                      <div key={p.id} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-800/50 transition group">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-200">{p.nombre}</span>
                            {p.variables && p.variables.length > 0 && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-400">
                                {p.variables.length} var{p.variables.length > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => aplicarPlantilla(p)} className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900 transition flex items-center gap-1">
                              <Layers className="w-3 h-3" /> Cargar
                            </button>
                            {!p.es_sistema && <button onClick={() => setModalCRUD({ tipo: 'plantillas', modo: 'editar', item: p })} className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100"><Edit3 className="w-3 h-3" /></button>}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mb-1">{p.descripcion}</p>
                        {/* Mostrar variables disponibles */}
                        {p.variables && p.variables.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {p.variables.map((v, i) => (
                              <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">
                                [{v.nombre}]
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-purple-400/70 mt-2 font-mono truncate">{p.plantilla.substring(0, 60)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODALES */}
      {mostrarRefiner && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setMostrarRefiner(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><Wand2 className="w-5 h-5 text-purple-400" /> LLM Refiner</h3>
              <button onClick={() => setMostrarRefiner(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Estilo de mejora:</label>
                <div className="flex gap-2">
                  {['cinematico', 'detallado', 'creativo'].map(e => (
                    <button key={e} onClick={() => setEstiloRefiner(e)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${estiloRefiner === e ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>{e.charAt(0).toUpperCase() + e.slice(1)}</button>
                  ))}
                </div>
              </div>
              <button onClick={refinar} disabled={refinando} className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition disabled:opacity-50">{refinando ? '✨ Refinando...' : '✨ Mejorar con IA'}</button>
              {promptRefinado && (
                <div className="space-y-2">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <span className="text-xs text-slate-500 block mb-1">Original:</span>
                    <p className="text-xs text-slate-300 font-mono">{prompt.substring(0, 200)}...</p>
                  </div>
                  <div className="bg-purple-950/30 border border-purple-800/30 rounded-lg p-3">
                    <span className="text-xs text-purple-400 block mb-1">Mejorado:</span>
                    <p className="text-xs text-purple-200 font-mono">{promptRefinado.substring(0, 200)}...</p>
                  </div>
                  <button onClick={aplicarRefinado} className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition">✓ Aplicar mejora</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {mostrarHistorial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setMostrarHistorial(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><History className="w-5 h-5 text-cyan-400" /> Historial ({historial.length})</h3>
              <button onClick={() => setMostrarHistorial(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            {historial.length === 0 ? <p className="text-slate-500 text-center py-8">No hay prompts guardados. Usa Ctrl+S para guardar.</p> : (
              <div className="space-y-2">
                {historial.map((h, i) => (
                  <div key={h.id} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-500">{new Date(h.fecha).toLocaleString()}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <button key={s} onClick={() => setHistorial(prev => prev.map((item, idx) => idx === i ? {...item, rating: s} : item))} className={`text-xs ${s <= h.rating ? 'text-yellow-400' : 'text-slate-600'}`}>★</button>
                          ))}
                        </div>
                        <button onClick={() => { setPrompt(h.prompt); setNegative(h.negative || ''); setMostrarHistorial(false); }} className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 hover:bg-cyan-900">Usar</button>
                        <button onClick={() => setHistorial(prev => prev.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 font-mono truncate">{h.prompt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}



      {mostrarAnalizador && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setMostrarAnalizador(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-cyan-400" /> Analizador</h3>
              <button onClick={() => setMostrarAnalizador(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <textarea value={promptAnalizar || prompt} onChange={(e) => setPromptAnalizar(e.target.value)} placeholder="Pega un prompt para analizar..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 text-sm font-mono min-h-[100px] resize-y focus:outline-none focus:border-cyan-500 mb-4" />
            {(() => {
              const texto = promptAnalizar || prompt;
              if (!texto) return <p className="text-slate-500 text-center">Escribe un prompt</p>;
              const terms = texto.split(',').map(t => t.trim()).filter(t => t);
              let score = 0; const detalles = [];
              if (terms.length >= 5) { score += 15; detalles.push('✅ Buena cantidad de términos'); } else { score += 5; detalles.push('⚠️ Pocos términos'); }
              if (/masterpiece|best quality|detailed/i.test(texto)) { score += 20; detalles.push('✅ Incluye calidad'); } else detalles.push('❌ Falta calidad');
              if (/light|lighting/i.test(texto)) { score += 15; detalles.push('✅ Iluminación'); } else detalles.push('⚠️ Falta iluminación');
              if (/style|art|render|photo|cinematic/i.test(texto)) { score += 15; detalles.push('✅ Estilo definido'); } else detalles.push('⚠️ Falta estilo');
              if (/by\s+\w+/i.test(texto)) { score += 10; detalles.push('✅ Referencia artistas'); } else detalles.push('ℹ️ Sin artistas');
              if (terms.length > 50) { score -= 10; detalles.push('⚠️ Exceso de términos'); }
              score = Math.min(100, Math.max(0, score));
              return (
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${score >= 70 ? 'bg-green-900/50 text-green-400' : score >= 40 ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'}`}>{score}</div>
                    <div className="text-sm text-slate-400"><p>Palabras: {texto.split(/\s+/).length}</p><p>Términos: {terms.length}</p><p>Tokens: ~{Math.ceil(terms.length * 1.5)}</p></div>
                  </div>
                  <div className="space-y-1">{detalles.map((d, i) => <p key={i} className="text-xs text-slate-400">{d}</p>)}</div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {modalCRUD && <CRUDModal tipo={modalCRUD.tipo} item={modalCRUD.item} modo={modalCRUD.modo} onGuardar={(item, modo) => guardarCRUD(modalCRUD.tipo, item, modo)} onCerrar={() => setModalCRUD(null)} />}
    </div>
  );
}

// CRUD Modal reutilizable
function CRUDModal({ tipo, item, modo, onGuardar, onCerrar }) {
  const [formData, setFormData] = useState({ ...item });
  const tiposConfig = {
    boosters: { titulo: 'Booster', campos: ['nombre', 'categoria', 'valor'] },
    macros: { titulo: 'Macro', campos: ['nombre', 'valor'] },
    negativos: { titulo: 'Negativo', campos: ['nombre', 'categoria', 'valor'] },
    plantillas: { titulo: 'Plantilla', campos: ['nombre', 'plantilla', 'descripcion'] },
    estilos: { titulo: 'Estilo', campos: ['nombre', 'categoria', 'prompt_prefijo', 'prompt_sufijo', 'negative_boost', 'descripcion'] },
  };
  const config = tiposConfig[tipo];
  if (!config) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onCerrar}>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-100">{modo === 'crear' ? `+ Nuevo ${config.titulo}` : `Editar ${config.titulo}`}</h3>
          <button onClick={onCerrar} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onGuardar(formData, modo); }} className="space-y-3">
          {config.campos.map(campo => (
            <div key={campo}>
              <label className="text-xs text-slate-400 block mb-1">{campo.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
              {['descripcion', 'valor', 'prompt_prefijo', 'prompt_sufijo', 'negative_boost', 'plantilla'].includes(campo) ? (
                <textarea value={formData[campo] || ''} onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 min-h-[60px]" required={modo === 'crear'} />
              ) : (
                <input type="text" value={formData[campo] || ''} onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" required={modo === 'crear'} />
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition">{modo === 'crear' ? 'Crear' : 'Guardar'}</button>
            {modo === 'editar' && !item.es_sistema && (
              <button type="button" onClick={() => onGuardar(item, 'eliminar')} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition">Eliminar</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
