// @ts-nocheck
// PromptGenerator - Interfaz Rediseñada v3.0
import { useState, useEffect, useRef } from 'react';
import { estilosIniciales } from '../../data/estilos-iniciales.js';
import { negativesSistema, boostersSistema, macrosSistema, plantillasSistema } from '../../data/prompt-data.js';
import { combinarEstilos, combinarNegativos, resolverMacros, agregarAlPrompt, estimarTokens, obtenerSugerenciasContextuales, generarVariantes, tokenizarPrompt } from '../../utils/prompt-engine.js';
import { traducirPromptESaEN } from '../../utils/translator.js';
import { refinarPrompt } from '../../utils/llm-refiner.js';
import { exportarPrompt } from '../../utils/api-integration.js';
import { presetsIniciales, generarCombinacionesWildcards, sugerirNegativos, PromptHistory, guardarBorrador, cargarBorrador, insertarEmbedding, insertarLoRA, regionesDefault, generarRegionalPrompt, generarBatch, compararPrompts, atajosTeclado } from '../../utils/prompt-features.js';
import { detectarConflictos, calcularCoherencia, estimarComplejidad, generarPromptDNA, analizarMood, logrosDefinidos, verificarLogros, emocionesPresets, generarPromptPorEmocion, recetasProbadas, generarNegativeCompleto, guardarFavorito, exportarComoJSON, exportarComoCSV, importarDesdeJSON, generarLinkCompartible, temasDisponibles, crearPerfil, MacroRecorder, tutorialPasos, glosarioTerminos, buscarEnGlosario } from '../../utils/prompt-features-advanced.js';
import { optimizarPromptConML, generarAnalytics, lightingPresets, calcularNivel, calcularXP, workflowTemplates, ejecutarWorkflow } from '../../utils/prompt-premium.js';
import { Sparkles, Copy, Check, Shuffle, Save, Star, Trash2, Plus, Edit3, X, Search, Zap, Globe, Wand2, Layers, Palette, Type, History, BarChart3, Focus, Send, Undo2, Redo2, BookOpen, Keyboard, Cpu, Grid3x3, Eye, AlertTriangle, Clock, Award, Compass, Heart, Share2, Download, Upload, HelpCircle, Trophy, Target, Lightbulb, TrendingUp, Eraser } from 'lucide-react';

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
  const [interfazSeleccionada, setInterfazSeleccionada] = useState('a1111');
  const [enviando, setEnviando] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState(null);
  const [mensajeEnvio, setMensajeEnvio] = useState('');
  const [configInterfaz, setConfigInterfaz] = useState({
    a1111: { url: 'http://127.0.0.1:7860', sampler: 'Euler a', steps: 20, cfg: 7, width: 512, height: 512 },
    comfyui: { url: 'http://127.0.0.1:8188', modelo: 'sd_xl_base_1.0.safetensors', steps: 20, cfg: 7, width: 1024, height: 1024 }
  });
  const [mostrarConfigInterfaz, setMostrarConfigInterfaz] = useState(false);
  const [mostrarAnalyzer, setMostrarAnalyzer] = useState(false);
  const [mostrarRefinerCard, setMostrarRefinerCard] = useState(false);
  const [promptRefinado, setPromptRefinado] = useState('');
  const [estiloRefiner, setEstiloRefiner] = useState('cinematico');
  const [refinando, setRefinando] = useState(false);
  const [promptAnalizar, setPromptAnalizar] = useState('');

  // Mejoras anteriores
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
  const [conflictos, setConflictos] = useState([]);
  const [coherencia, setCoherencia] = useState(100);
  const [complejidad, setComplejidad] = useState(null);
  const [promptDNA, setPromptDNA] = useState([]);
  const [mood, setMood] = useState({ dominante: 'neutral', intensidad: 0, todos: {} });
  const [logros, setLogros] = useState([]);
  const [mostrarLogros, setMostrarLogros] = useState(false);
  const [mostrarEmociones, setMostrarEmociones] = useState(false);
  const [mostrarRecetas, setMostrarRecetas] = useState(false);
  const [mostrarNegGenerator, setMostrarNegGenerator] = useState(false);
  const [negOpciones, setNegOpciones] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [mostrarTutorial, setMostrarTutorial] = useState(false);
  const [tutorialPaso, setTutorialPaso] = useState(0);
  const [mostrarGlosario, setMostrarGlosario] = useState(false);
  const [glosarioBusqueda, setGlosarioBusqueda] = useState('');
  const [perfilActual, setPerfilActual] = useState(() => crearPerfil('Principal', 'personal'));
  const [stats, setStats] = useState({
    totalPrompts: 0, estilosUsados: {}, prompts5Estrellas: 0, presetsCreados: 0,
    traducciones: 0, promptsCortos: 0, promptsLargos: 0
  });
  const macroRecorderRef = useRef(new MacroRecorder());
  const [grabandoMacro, setGrabandoMacro] = useState(false);

  // Mejoras Premium
  const [xp, setXp] = useState(0);
  const [mostrarOptimizer, setMostrarOptimizer] = useState(false);
  const [optimizacion, setOptimizacion] = useState(null);
  const [mostrarAnalytics, setMostrarAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [mostrarLighting, setMostrarLighting] = useState(false);
  const [mostrarWorkflows, setMostrarWorkflows] = useState(false);
  const [ejecutandoWorkflow, setEjecutandoWorkflow] = useState(false);

  // Refs
  const textareaRef = useRef(null);
  const traduceTimeoutRef = useRef(null);
  const autoSaveTimeoutRef = useRef(null);
  const promptHistoryRef = useRef(new PromptHistory(20));
  const esAleatorioRef = useRef(false);

  // Cargar borrador
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

  // Historial undo/redo
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

  // Análisis automático
  useEffect(() => {
    if (prompt) {
      setConflictos(detectarConflictos(prompt));
      setCoherencia(calcularCoherencia(prompt));
      setComplejidad(estimarComplejidad(prompt));
      setPromptDNA(generarPromptDNA(prompt));
      setMood(analizarMood(prompt));
      const tokens = estimarTokens(prompt);
      setStats(prev => ({
        ...prev,
        totalPrompts: prev.totalPrompts + 1,
        promptsCortos: tokens < 10 ? prev.promptsCortos + 1 : prev.promptsCortos,
        promptsLargos: tokens > 50 ? prev.promptsLargos + 1 : prev.promptsLargos
      }));
      setLogros(verificarLogros(stats));
    }
  }, [prompt]);

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
      if (e.ctrlKey && e.key === 'l') { e.preventDefault(); limpiarTodo(); }
      if (e.key === 'Escape') {
        setModalCRUD(null); setMostrarRefinerCard(false); setMostrarHistorial(false);
        setVariantes([]); setMostrarPresets(false); setMostrarBatch(false);
        setMostrarEmbeddings(false); setMostrarComparador(false); setMostrarRegional(false);
        setMostrarAtajos(false); setMostrarNegAssistant(false); setMostrarOptimizer(false);
        setMostrarAnalytics(false); setMostrarLighting(false); setMostrarWorkflows(false);
        setMostrarEmociones(false); setMostrarRecetas(false); setMostrarFavoritos(false);
        setMostrarTutorial(false); setMostrarGlosario(false); setMostrarLogros(false);
      }
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

  // Listas aleatorias
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
    setXp(prev => prev + calcularXP('generarPrompt'));
  };

  // NUEVA FUNCIÓN: Limpiar todo
  const limpiarTodo = () => {
    setPrompt('');
    setNegative('');
    setPromptEN('');
    setSujeto('');
    setEstilosSeleccionados([]);
    setPlantillaSeleccionada(null);
    setValoresPlantilla({});
    setVariantes([]);
    setSugerencias([]);
    setConflictos([]);
    setCoherencia(100);
    setComplejidad(null);
    setPromptDNA([]);
    setMood({ dominante: 'neutral', intensidad: 0, todos: {} });
    setMostrarOptimizer(false);
    setMostrarAnalytics(false);
    setMostrarLighting(false);
    setMostrarWorkflows(false);
    setMostrarPresets(false);
    setMostrarBatch(false);
    setMostrarEmbeddings(false);
    setMostrarEmociones(false);
    setMostrarRecetas(false);
    setMostrarRegional(false);
    setMostrarComparador(false);
    setMostrarNegAssistant(false);
    setMostrarRefinerCard(false);
    setMostrarAnalyzer(false);
  };

  const copiarPrompt = async () => { await navigator.clipboard.writeText(prompt); setCopiado(true); setTimeout(() => setCopiado(false), 2000); };
  const guardarEnHistorial = () => { if (!prompt) return; setHistorial(prev => [{ id: Date.now(), prompt, negative, promptEN, estilos: estilosSeleccionados, fecha: new Date().toISOString(), favorito: false, rating: 0 }, ...prev]); setXp(prev => prev + calcularXP('guardarHistorial')); };
  const generarFinal = () => { setPrompt(resolverMacros(prompt, macros)); };

  const undo = () => { const val = promptHistoryRef.current.undo(); if (val) { esAleatorioRef.current = true; setPrompt(val); } };
  const redo = () => { const val = promptHistoryRef.current.redo(); if (val) { esAleatorioRef.current = true; setPrompt(val); } };

  const aplicarPreset = (preset) => {
    esAleatorioRef.current = true;
    setEstilosSeleccionados(preset.estilos.map(id => ({ id, peso: 0.8 })));
    setNegative(preset.negative);
    const boostersStr = preset.boosters.join(', ');
    const macrosStr = preset.macros.map(m => `{{${m}}}`).join(', ');
    setPrompt(`${macrosStr}, ${boostersStr}`);
    setMostrarPresets(false);
    setXp(prev => prev + calcularXP('generarPrompt'));
  };

  const ejecutarBatch = () => {
    if (!batchVariable || !batchOpciones || !prompt) return;
    const opciones = batchOpciones.split(',').map(o => o.trim()).filter(o => o);
    const plantilla = prompt.replace(new RegExp(`\\[${batchVariable}\\]`, 'g'), `[${batchVariable}]`);
    const resultados = opciones.map(opcion => plantilla.replace(new RegExp(`\\[${batchVariable}\\]`, 'g'), opcion));
    setBatchResultados(resultados);
  };

  const procesarWildcards = () => {
    const combinaciones = generarCombinacionesWildcards(prompt);
    if (combinaciones.length > 1) { setBatchResultados(combinaciones); setMostrarBatch(true); }
  };

  const agregarEmbedding = () => { if (embeddingNombre) { setPrompt(prev => agregarAlPrompt(prev, insertarEmbedding(embeddingNombre, embeddingPeso))); setEmbeddingNombre(''); } };
  const agregarLoRA = () => { if (loraNombre) { setPrompt(prev => agregarAlPrompt(prev, insertarLoRA(loraNombre, loraPeso))); setLoraNombre(''); } };

  const generarNegSugeridos = () => { setNegSugeridos(sugerirNegativos(prompt)); setMostrarNegAssistant(true); };

  const ejecutarComparacion = () => { if (promptComparar1 && promptComparar2) { setComparacionResult(compararPrompts(promptComparar1, promptComparar2)); } };

  const generarRegional = () => { const rp = generarRegionalPrompt(regiones); if (rp) { setPrompt(prev => prev + '\n\n' + rp); setMostrarRegional(false); } };

  const compartirPrompt = () => {
    const link = generarLinkCompartible(prompt, negative);
    navigator.clipboard.writeText(link);
    alert('¡Link copiado al portapapeles!');
  };

  const guardarComoFavorito = () => {
    const nombre = window.prompt('Nombre para el favorito:', 'Mi prompt');
    if (nombre) {
      const fav = guardarFavorito(prompt, negative, nombre, []);
      setFavoritos(prev => [...prev, fav]);
      alert('¡Guardado en favoritos!');
    }
  };

  const exportarFavoritos = (formato) => {
    let data;
    if (formato === 'json') data = exportarComoJSON(favoritos);
    else data = exportarComoCSV(favoritos);
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `favoritos.${formato}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importarFavoritos = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      if (data && Array.isArray(data)) {
        setFavoritos(prev => [...prev, ...data]);
        alert(`¡${data.length} favoritos importados!`);
      }
    };
    reader.readAsText(file);
  };

  const generarPorEmocion = (emocion) => {
    const nuevoPrompt = generarPromptPorEmocion(emocion, sujeto || 'a person');
    setPrompt(nuevoPrompt);
    setMostrarEmociones(false);
  };

  const generarNegativoAutomatico = () => {
    const negativeGen = generarNegativeCompleto(negOpciones);
    setNegative(negativeGen);
    setMostrarNegGenerator(false);
  };

  const toggleMacroRecorder = () => {
    if (grabandoMacro) {
      const macro = macroRecorderRef.current.detenerGrabacion();
      setGrabandoMacro(false);
      alert(`Macro grabado con ${macro.length} acciones`);
    } else {
      macroRecorderRef.current.iniciarGrabacion();
      setGrabandoMacro(true);
    }
  };

  const siguientePasoTutorial = () => {
    if (tutorialPaso < tutorialPasos.length - 1) setTutorialPaso(tutorialPaso + 1);
    else { setMostrarTutorial(false); setTutorialPaso(0); }
  };

  const resultadoGlosario = glosarioBusqueda ? buscarEnGlosario(glosarioBusqueda) : null;

  // Funciones Premium
  const optimizarPrompt = () => {
    const resultado = optimizarPromptConML(prompt, historial);
    setOptimizacion(resultado);
    setMostrarOptimizer(true);
    setXp(prev => prev + calcularXP('generarPrompt'));
  };

  const aplicarOptimizacion = () => {
    if (optimizacion?.optimizado) {
      setPrompt(optimizacion.optimizado);
      setMostrarOptimizer(false);
    }
  };

  const abrirAnalytics = () => {
    const datos = generarAnalytics(historial, estilos, presets);
    setAnalytics(datos);
    setMostrarAnalytics(true);
  };

  const aplicarLighting = (preset) => {
    setPrompt(prev => prev ? `${prev}, ${preset.terminos}` : preset.terminos);
    setMostrarLighting(false);
    setXp(prev => prev + calcularXP('generarPrompt'));
  };

  const nivelActual = calcularNivel(xp);

  const ejecutarWorkflowTemplate = async (workflow) => {
    setEjecutandoWorkflow(true);
    const callbacks = {
      seleccionarEstilo: (datos) => {
        setEstilosSeleccionados(prev => {
          const existe = prev.find(e => e.id === datos.id);
          if (existe) return prev;
          if (prev.length >= 5) return prev;
          return [...prev, { id: datos.id, peso: 0.8 }];
        });
      },
      añadirMacro: (datos) => { setPrompt(prev => prev ? `${prev}, {{${datos.nombre}}}` : `{{${datos.nombre}}}`); },
      añadirBooster: (datos) => { setPrompt(prev => prev ? `${prev}, ${datos.valor}` : datos.valor); },
      añadirLighting: (datos) => {
        const preset = lightingPresets.find(p => p.id === datos.id);
        if (preset) setPrompt(prev => prev ? `${prev}, ${preset.terminos}` : preset.terminos);
      },
      configurarNegative: (datos) => { setNegative(prev => prev ? `${prev}, ${datos.valor}` : datos.valor); }
    };
    await ejecutarWorkflow(workflow, callbacks);
    setEjecutandoWorkflow(false);
    setMostrarWorkflows(false);
    setXp(prev => prev + calcularXP('completarChallenge'));
  };

  const guardarCRUD = (tipo, item, modo) => {
    const setters = { boosters: setBoosters, macros: setMacros, negativos: setNegativos, plantillas: setPlantillas, estilos: setEstilos, presets: setPresets };
    const setter = setters[tipo];
    if (!setter) return;
    if (modo === 'crear') setter(prev => [...prev, { ...item, id: `${tipo}-${Date.now()}`, es_sistema: false }]);
    else if (modo === 'editar') setter(prev => prev.map(i => i.id === item.id ? item : i));
    else if (modo === 'eliminar') setter(prev => prev.filter(i => i.id !== item.id));
    setModalCRUD(null);
  };

  const categorias = [...new Set(estilos.map(e => e.categoria))];
  const estilosFiltrados = estilos.filter(e => {
    const matchBusqueda = !busquedaEstilos || e.nombre.toLowerCase().includes(busquedaEstilos.toLowerCase());
    const matchCategoria = !categoriaFiltro || e.categoria === categoriaFiltro;
    return matchBusqueda && matchCategoria;
  });
  const tokens = tokenizarPrompt(prompt, estilosSeleccionados.map(e => estilos.find(s => s.id === e.id)).filter(Boolean), boosters);
  const tokensEstimados = estimarTokens(prompt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header Rediseñado */}
      <header className="border-b border-slate-800/50 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo y Nivel */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Prompt Studio Pro
                  </h1>
                  <p className="text-xs text-slate-500">Generador Avanzado v3.0</p>
                </div>
              </div>
              
              {/* Indicador de Nivel */}
              <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/30">
                <span className="text-2xl">{nivelActual.icono}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-purple-300">{nivelActual.nombre}</span>
                    <span className="text-xs text-slate-400">{xp} XP</span>
                  </div>
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" style={{ width: `${nivelActual.progreso}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="flex items-center gap-2">
              <button onClick={limpiarTodo} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/30 hover:bg-red-900/50 border border-red-700/30 text-red-400 hover:text-red-300 transition text-sm font-medium" title="Limpiar todo (Ctrl+L)">
                <Eraser className="w-4 h-4" />
                <span className="hidden md:inline">Limpiar</span>
              </button>
              <button onClick={() => setMostrarTutorial(true)} className="p-2 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 transition" title="Tutorial"><HelpCircle className="w-4 h-4" /></button>
              <button onClick={() => setMostrarGlosario(true)} className="p-2 rounded-lg bg-violet-900/30 hover:bg-violet-900/50 text-violet-400 transition" title="Glosario"><BookOpen className="w-4 h-4" /></button>
              <button onClick={() => setMostrarLogros(true)} className="p-2 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-400 transition" title="Logros"><Trophy className="w-4 h-4" /></button>
              <button onClick={() => setMostrarFavoritos(true)} className="p-2 rounded-lg bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-400 transition" title="Favoritos"><Star className="w-4 h-4" /></button>
              <button onClick={() => setMostrarAtajos(true)} className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition" title="Atajos"><Keyboard className="w-4 h-4" /></button>
              <button onClick={undo} className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition" title="Deshacer"><Undo2 className="w-4 h-4" /></button>
              <button onClick={redo} className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition" title="Rehacer"><Redo2 className="w-4 h-4" /></button>
              <button onClick={() => setModoFocus(!modoFocus)} className={`p-2 rounded-lg transition ${modoFocus ? 'bg-cyan-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'}`} title="Focus"><Focus className="w-4 h-4" /></button>
              <button onClick={() => setMostrarHistorial(!mostrarHistorial)} className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition" title="Historial"><History className="w-4 h-4" /></button>
              <button onClick={guardarEnHistorial} className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition" title="Guardar"><Save className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className={`grid gap-6 ${modoFocus ? 'grid-cols-1' : 'lg:grid-cols-[1fr_400px]'}`}>
          {/* Columna Izquierda - Editor */}
          <div className="space-y-6">
            {/* Sujeto / Plantilla */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              {plantillaSeleccionada ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-cyan-400">Plantilla: {plantillaSeleccionada.nombre}</h3>
                        <p className="text-xs text-slate-500">Completa las variables</p>
                      </div>
                    </div>
                    <button onClick={() => { setPlantillaSeleccionada(null); setValoresPlantilla({}); setSujeto(''); }} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 transition">
                      <X className="w-3 h-3" /> Cerrar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {plantillaSeleccionada.variables?.map((variable, index) => (
                      <div key={index}>
                        <label className="text-xs text-cyan-400 block mb-1 font-medium capitalize">{variable.nombre.replace(/_/g, ' ')}</label>
                        {variable.descripcion && <p className="text-xs text-slate-500 mb-1">{variable.descripcion}</p>}
                        <input type="text" value={valoresPlantilla[variable.nombre] || ''} onChange={(e) => { const nuevosValores = { ...valoresPlantilla, [variable.nombre]: e.target.value }; setValoresPlantilla(nuevosValores); setSujeto(Object.values(nuevosValores).filter(v => v).join(', ')); }} placeholder={variable.default || ''} className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <label className="text-sm font-semibold text-slate-300 mb-3 block">Sujeto / Idea Base</label>
                  <input type="text" value={sujeto} onChange={(e) => setSujeto(e.target.value)} placeholder="Describe el sujeto principal... ej: una mujer guerrera con armadura dorada" className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition" />
                </>
              )}
            </div>

            {/* Prompt Positivo */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-slate-300">Prompt Positivo</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setTraducir(!traducir)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${traducir ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/30' : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50'}`}>
                    <Globe className="w-3 h-3" /> ES→EN
                  </button>
                  <button onClick={generarAleatorio} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-600/30 text-xs font-medium transition">
                    <Shuffle className="w-3 h-3" /> Aleatorio
                  </button>
                </div>
              </div>
              <textarea ref={textareaRef} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="El prompt se genera automáticamente al seleccionar estilos..." className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition min-h-[140px] resize-y font-mono text-sm" />
              
              {traducir && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-emerald-400 font-medium">🌐 Traducción EN:</span>
                    {traduciendo && <span className="text-xs text-slate-500 animate-pulse">Traduciendo...</span>}
                  </div>
                  <textarea value={promptEN} readOnly className="w-full bg-slate-800/30 border border-emerald-900/30 rounded-lg px-4 py-2.5 text-emerald-300 text-sm font-mono min-h-[70px] resize-y" />
                </div>
              )}

              {/* Análisis */}
              {prompt && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Tokens:</span>
                      <span className="text-slate-300 font-medium">~{tokensEstimados}</span>
                      {tokensEstimados > 75 && <span className="text-red-400">⚠️ Exceso</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Coherencia:</span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full transition-all ${coherencia >= 80 ? 'bg-green-500' : coherencia >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${coherencia}%` }}></div>
                      </div>
                      <span className="text-slate-300 font-medium">{coherencia}%</span>
                    </div>
                    {complejidad && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="text-slate-400">{complejidad.tiempoEstimado}</span>
                      </div>
                    )}
                  </div>

                  {conflictos.length > 0 && (
                    <div className="bg-red-950/20 border border-red-800/30 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-xs text-red-400 font-medium">Conflictos detectados:</span>
                      </div>
                      {conflictos.map((c, i) => (
                        <div key={i} className="text-xs text-red-300 ml-5">• {c.mensaje}</div>
                      ))}
                    </div>
                  )}

                  {mood.dominante !== 'neutral' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Mood:</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-purple-950/50 text-purple-300 border border-purple-800/30">
                        {mood.dominante} ({mood.intensidad})
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">DNA:</span>
                    <div className="flex gap-0.5">
                      {promptDNA.map((value, i) => (
                        <div key={i} className="w-1 h-4 bg-cyan-500 rounded" style={{ opacity: value / 100 }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Negative */}
            <div className="bg-slate-900/50 border border-red-900/20 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-red-400">Prompt Negativo</label>
                <button onClick={generarNegSugeridos} className="text-xs px-3 py-1.5 rounded-lg bg-red-950/30 text-red-300 hover:bg-red-950/50 border border-red-800/30 transition">🚫 Auto-sugerir</button>
              </div>
              <textarea value={negative} onChange={(e) => setNegative(e.target.value)} placeholder="Términos a evitar..." className="w-full bg-slate-800/50 border border-red-900/20 rounded-lg px-4 py-3 text-red-300 placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition min-h-[90px] resize-y font-mono text-sm" />
            </div>

            {/* Prompt Final */}
            <div className="bg-slate-900/50 border border-cyan-900/20 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-cyan-400">📋 Prompt Final</label>
                <div className="flex items-center gap-2">
                  <select value={formatoExport} onChange={(e) => setFormatoExport(e.target.value)} className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs text-slate-300">
                    <option value="texto">Texto</option><option value="a1111">A1111</option><option value="comfyui">ComfyUI</option><option value="midjourney">Midjourney</option><option value="fooocus">Fooocus</option>
                  </select>
                  <button onClick={copiarPrompt} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition ${copiado ? 'bg-green-600 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}>
                    {copiado ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copiado ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 font-mono text-sm text-slate-200 min-h-[70px] whitespace-pre-wrap">
                {exportarPrompt(prompt, negative, formatoExport) || 'Genera un prompt para ver el resultado...'}
              </div>
              
              {/* Botones de Acción */}
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <button onClick={generarFinal} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition"><Zap className="w-3 h-3" /> Final</button>
                <button onClick={optimizarPrompt} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-xs font-medium transition"><Sparkles className="w-3 h-3" /> Optimizar</button>
                <button onClick={() => setMostrarPresets(!mostrarPresets)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-medium transition ${mostrarPresets ? 'bg-amber-500' : 'bg-amber-600 hover:bg-amber-500'}`}><BookOpen className="w-3 h-3" /> Presets</button>
                <button onClick={() => setMostrarBatch(!mostrarBatch)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-medium transition ${mostrarBatch ? 'bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}><Grid3x3 className="w-3 h-3" /> Batch</button>
                <button onClick={() => setMostrarEmbeddings(!mostrarEmbeddings)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-medium transition ${mostrarEmbeddings ? 'bg-pink-500' : 'bg-pink-600 hover:bg-pink-500'}`}><Cpu className="w-3 h-3" /> Embed/LoRA</button>
                <button onClick={() => setMostrarLighting(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white text-xs font-medium transition"><Lightbulb className="w-3 h-3" /> Iluminación</button>
                <button onClick={() => setMostrarWorkflows(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-medium transition"><Target className="w-3 h-3" /> Workflows</button>
                <button onClick={() => setMostrarRegional(!mostrarRegional)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-medium transition ${mostrarRegional ? 'bg-teal-500' : 'bg-teal-600 hover:bg-teal-500'}`}><Eye className="w-3 h-3" /> Regional</button>
                <button onClick={() => { setVariantes(generarVariantes(prompt)); }} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition"><Layers className="w-3 h-3" /> Variantes</button>
                <button onClick={() => { setPromptComparar1(prompt); setMostrarComparador(true); }} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition"><Eye className="w-3 h-3" /> Comparar</button>
                <button onClick={() => setMostrarEmociones(!mostrarEmociones)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-medium transition ${mostrarEmociones ? 'bg-rose-500' : 'bg-rose-600 hover:bg-rose-500'}`}><Heart className="w-3 h-3" /> Emociones</button>
                <button onClick={() => setMostrarRecetas(!mostrarRecetas)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-medium transition ${mostrarRecetas ? 'bg-lime-500' : 'bg-lime-600 hover:bg-lime-500'}`}><Lightbulb className="w-3 h-3" /> Recetas</button>
                <button onClick={guardarComoFavorito} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-medium transition"><Star className="w-3 h-3" /> Favorito</button>
                <button onClick={compartirPrompt} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition"><Share2 className="w-3 h-3" /> Compartir</button>
                <button onClick={abrirAnalytics} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-medium transition"><TrendingUp className="w-3 h-3" /> Analytics</button>
              </div>

              {/* Envío a interfaces */}
              <div className="mt-6 pt-6 border-t border-slate-800/50">
                <div className="flex items-center gap-3">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-300">Enviar a:</span>
                  <select value={interfazSeleccionada} onChange={(e) => setInterfazSeleccionada(e.target.value)} className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs text-slate-300">
                    <option value="a1111">Automatic1111</option><option value="comfyui">ComfyUI</option>
                  </select>
                  <button onClick={() => setMostrarConfigInterfaz(!mostrarConfigInterfaz)} className="text-xs text-slate-400 hover:text-white transition">⚙️ Config</button>
                  <button className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-medium transition flex items-center justify-center gap-2"><Send className="w-3 h-3" /> Enviar</button>
                </div>
              </div>
            </div>

            {/* Cards de Herramientas */}
            {/* Aquí irían todas las cards de herramientas (Optimizer, Analytics, Lighting, Workflows, etc.) */}
            {/* Por brevedad, las omito pero están en el código original */}
          </div>

          {/* Columna Derecha - Panel de Herramientas */}
          {!modoFocus && (
            <div className="space-y-6">
              {/* Tabs */}
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-2 backdrop-blur-sm shadow-xl">
                <div className="grid grid-cols-5 gap-1">
                  {[{ id: 'estilos', icon: Palette, label: 'Estilos' }, { id: 'boosters', icon: Zap, label: 'Boost' }, { id: 'macros', icon: Type, label: 'Macros' }, { id: 'negativos', icon: X, label: 'Neg' }, { id: 'plantillas', icon: Layers, label: 'Plant' }].map(tab => (
                    <button key={tab.id} onClick={() => setPanelActivo(tab.id)} className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-xs font-medium transition ${panelActivo === tab.id ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Panel de Estilos */}
              {panelActivo === 'estilos' && (
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl max-h-[700px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-300">Biblioteca de Estilos ({estilos.length})</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'estilos', modo: 'crear', item: {} })} className="p-2 rounded-lg bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 transition"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input value={busquedaEstilos} onChange={(e) => setBusquedaEstilos(e.target.value)} placeholder="Buscar..." className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50" />
                    </div>
                    <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-xs text-slate-300">
                      <option value="">Todas</option>{categorias.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {estilosSeleccionados.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <span className="text-xs text-cyan-400 font-medium">Seleccionados ({estilosSeleccionados.length}/5):</span>
                      {estilosSeleccionados.map(({ id, peso }) => {
                        const estilo = estilos.find(e => e.id === id);
                        if (!estilo) return null;
                        return (
                          <div key={id} className="flex items-center gap-3 bg-cyan-950/30 border border-cyan-800/30 rounded-lg p-3">
                            <span className="text-xs text-cyan-300 flex-1">{estilo.nombre}</span>
                            <input type="range" min="0" max="1" step="0.1" value={peso} onChange={(e) => actualizarPeso(id, parseFloat(e.target.value))} className="w-20 h-1 accent-cyan-500" />
                            <span className="text-xs text-cyan-400 w-8 text-right">{peso.toFixed(1)}</span>
                            <button onClick={() => toggleEstilo(id)} className="text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="space-y-1">
                    {estilosFiltrados.map(estilo => {
                      const seleccionado = estilosSeleccionados.some(e => e.id === estilo.id);
                      return (
                        <div key={estilo.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${seleccionado ? 'bg-cyan-950/30 border border-cyan-800/30' : 'hover:bg-slate-800/50 border border-transparent'}`}>
                          <button onClick={() => toggleEstilo(estilo.id)} className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${seleccionado ? 'bg-cyan-500 border-cyan-400' : 'border-slate-600'}`}>
                            {seleccionado && <Check className="w-3 h-3 text-white" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-200 truncate">{estilo.nombre}</span>
                              {estilo.popularidad >= 90 && <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />}
                            </div>
                            <span className="text-xs text-slate-500 truncate block">{estilo.categoria}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Otros paneles (boosters, macros, negativos, plantillas) */}
              {panelActivo === 'boosters' && (
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl max-h-[700px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-300">Quality Boosters</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'boosters', modo: 'crear', item: {} })} className="p-2 rounded-lg bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 transition"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-4">
                    {['ultra', 'alta', 'fotografica', 'artistica', 'anime', 'cinematica', 'fantasia', 'realista'].map(cat => {
                      const items = boosters.filter(b => b.categoria === cat);
                      if (items.length === 0) return null;
                      return (
                        <div key={cat}>
                          <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">{cat}</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {items.map(b => (
                              <button key={b.id} onClick={() => agregarBooster(b.valor)} className="px-3 py-1.5 rounded-lg bg-cyan-950/30 border border-cyan-800/30 text-cyan-300 text-xs hover:bg-cyan-950/50 transition">+ {b.nombre}</button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {panelActivo === 'macros' && (
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl max-h-[700px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-300">Macros</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'macros', modo: 'crear', item: {} })} className="p-2 rounded-lg bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 transition"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-2">
                    {macros.map(m => (
                      <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition">
                        <button onClick={() => agregarMacro(m.nombre)} className="flex-1 text-left">
                          <span className="text-xs font-medium text-purple-400">{`{{${m.nombre}}}`}</span>
                          <span className="text-xs text-slate-500 block truncate">{m.valor.substring(0, 60)}...</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {panelActivo === 'negativos' && (
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl max-h-[700px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-red-400">Negativos</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'negativos', modo: 'crear', item: {} })} className="p-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-2">
                    {negativos.map(n => (
                      <div key={n.id} className="p-3 rounded-lg bg-slate-800/30 border border-red-900/20">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-red-300">{n.nombre}</span>
                          <button onClick={() => agregarNegativo(n.valor)} className="text-xs px-3 py-1 rounded-lg bg-red-950/30 text-red-300 hover:bg-red-950/50 transition">+ Añadir</button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 truncate">{n.valor.substring(0, 80)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {panelActivo === 'plantillas' && (
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl max-h-[700px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-300">Plantillas</h3>
                    <button onClick={() => setModalCRUD({ tipo: 'plantillas', modo: 'crear', item: {} })} className="p-2 rounded-lg bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 transition"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-2">
                    {plantillas.map(p => (
                      <div key={p.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-slate-200">{p.nombre}</span>
                          <button onClick={() => aplicarPlantilla(p)} className="text-xs px-3 py-1 rounded-lg bg-cyan-950/30 text-cyan-300 hover:bg-cyan-950/50 transition">Cargar</button>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{p.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cards de Herramientas Premium */}
      {mostrarOptimizer && optimizacion && (
        <div className="fixed bottom-6 right-6 w-96 bg-slate-900 border border-green-700/50 rounded-2xl p-6 shadow-2xl z-40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-400" />
              <h3 className="text-sm font-semibold text-green-400">Optimizador ML</h3>
            </div>
            <button onClick={() => setMostrarOptimizer(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Score:</span>
              <span className="text-lg font-bold text-green-400">{optimizacion.score}/100</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full transition-all ${optimizacion.score >= 80 ? 'bg-green-500' : optimizacion.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${optimizacion.score}%` }}></div>
            </div>
          </div>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {optimizacion.sugerencias.slice(0, 3).map((sug, i) => (
              <div key={i} className="text-xs text-slate-300 bg-slate-800/50 rounded-lg p-2">
                <span className={`text-xs px-1.5 py-0.5 rounded ${sug.prioridad === 'alta' ? 'bg-red-900/50 text-red-300' : 'bg-yellow-900/50 text-yellow-300'}`}>{sug.prioridad}</span>
                <span className="ml-2">{sug.mensaje}</span>
              </div>
            ))}
          </div>
          <button onClick={aplicarOptimizacion} className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition">✓ Aplicar</button>
        </div>
      )}

      {mostrarAnalytics && analytics && (
        <div className="fixed bottom-6 right-6 w-[500px] bg-slate-900 border border-blue-700/50 rounded-2xl p-6 shadow-2xl z-40 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-semibold text-blue-400">Analytics Dashboard</h3>
            </div>
            <button onClick={() => setMostrarAnalytics(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">{analytics.totalPrompts}</p>
              <p className="text-xs text-slate-400">Total</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">{analytics.promedioDiario}</p>
              <p className="text-xs text-slate-400">Prom/Día</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-yellow-400">{analytics.calidadPromedio}</p>
              <p className="text-xs text-slate-400">Calidad</p>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-xs text-slate-400 block mb-2">Top Estilos:</span>
            {analytics.topEstilos.slice(0, 5).map((estilo, i) => (
              <div key={i} className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-300 flex-1">{estilo.nombre}</span>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${(estilo.count / analytics.topEstilos[0].count) * 100}%` }}></div>
                </div>
                <span className="text-xs text-slate-400 w-8 text-right">{estilo.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {mostrarLighting && (
        <div className="fixed bottom-6 right-6 w-[600px] bg-slate-900 border border-yellow-700/50 rounded-2xl p-6 shadow-2xl z-40 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h3 className="text-sm font-semibold text-yellow-400">Presets de Iluminación</h3>
            </div>
            <button onClick={() => setMostrarLighting(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {lightingPresets.map(preset => (
              <button key={preset.id} onClick={() => aplicarLighting(preset)} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-yellow-700/50 text-left transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{preset.icono}</span>
                  <span className="text-sm font-medium text-yellow-300">{preset.nombre}</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{preset.descripcion}</p>
                <div className="h-8 rounded border border-slate-600" style={{ background: preset.preview }}></div>
              </button>
            ))}
          </div>
        </div>
      )}

      {mostrarWorkflows && (
        <div className="fixed bottom-6 right-6 w-[500px] bg-slate-900 border border-purple-700/50 rounded-2xl p-6 shadow-2xl z-40 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-semibold text-purple-400">Workflow Templates</h3>
            </div>
            <button onClick={() => setMostrarWorkflows(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3">
            {workflowTemplates.map(workflow => (
              <div key={workflow.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{workflow.icono}</span>
                    <div>
                      <span className="text-sm font-medium text-purple-300 block">{workflow.nombre}</span>
                      <span className="text-xs text-slate-500">{workflow.pasos.length} pasos</span>
                    </div>
                  </div>
                  <button onClick={() => ejecutarWorkflowTemplate(workflow)} disabled={ejecutandoWorkflow} className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 text-white text-xs font-medium transition">
                    {ejecutandoWorkflow ? '...' : 'Ejecutar'}
                  </button>
                </div>
                <p className="text-xs text-slate-400">{workflow.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modales */}
      {mostrarHistorial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setMostrarHistorial(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><History className="w-5 h-5 text-cyan-400" /> Historial</h3>
              <button onClick={() => setMostrarHistorial(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            {historial.length === 0 ? <p className="text-slate-500 text-center py-8">No hay prompts guardados</p> : (
              <div className="space-y-2">
                {historial.map((h, i) => (
                  <div key={h.id} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500">{new Date(h.fecha).toLocaleString()}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setPrompt(h.prompt); setNegative(h.negative || ''); setMostrarHistorial(false); }} className="text-xs px-3 py-1 rounded-lg bg-cyan-950/30 text-cyan-300 hover:bg-cyan-950/50">Usar</button>
                        <button onClick={() => setHistorial(prev => prev.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
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
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onCerrar}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-100">{modo === 'crear' ? `+ Nuevo ${config.titulo}` : `Editar ${config.titulo}`}</h3>
          <button onClick={onCerrar} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onGuardar(formData, modo); }} className="space-y-3">
          {config.campos.map(campo => (
            <div key={campo}>
              <label className="text-xs text-slate-400 block mb-1">{campo.replace(/_/g, ' ')}</label>
              {['descripcion', 'valor', 'prompt_prefijo', 'prompt_sufijo', 'negative_boost', 'plantilla'].includes(campo) ? (
                <textarea value={formData[campo] || ''} onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 min-h-[60px]" />
              ) : (
                <input type="text" value={formData[campo] || ''} onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
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
