// Integración con APIs de generación (A1111, ComfyUI) - Placeholder
// En el futuro se conectará a interfaces reales

// Configuración de interfaces
export const interfacesDisponibles = [
  {
    id: 'a1111',
    nombre: 'Automatic1111',
    url: 'http://127.0.0.1:7860',
    endpoint: '/sdapi/v1/txt2img',
    estado: 'desconectado',
    descripcion: 'WebUI de Stable Diffusion'
  },
  {
    id: 'comfyui',
    nombre: 'ComfyUI',
    url: 'http://127.0.0.1:8188',
    endpoint: '/prompt',
    estado: 'desconectado',
    descripcion: 'Interfaz nodal de Stable Diffusion'
  },
  {
    id: 'fooocus',
    nombre: 'Fooocus',
    url: 'http://127.0.0.1:7865',
    endpoint: '/api/generate',
    estado: 'desconectado',
    descripcion: 'Interfaz simplificada tipo Midjourney'
  }
];

// Envía prompt a A1111
export async function enviarAA1111(prompt, negative, config = {}) {
  const { url = 'http://127.0.0.1:7860', sampler = 'Euler a', steps = 20, cfg = 7, width = 512, height = 512 } = config;
  
  try {
    const response = await fetch(`${url}/sdapi/v1/txt2img`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        negative_prompt: negative,
        steps,
        cfg_scale: cfg,
        width,
        height,
        sampler_name: sampler,
        batch_size: 1,
        n_iter: 1,
      }),
      signal: AbortSignal.timeout(60000)
    });
    
    if (response.ok) {
      const data = await response.json();
      return { exito: true, imagenes: data.images, info: data.info };
    }
    return { exito: false, error: `Error ${response.status}` };
  } catch (error) {
    return { exito: false, error: error.message };
  }
}

// Envía prompt a ComfyUI
export async function enviarAComfyUI(prompt, negative, config = {}) {
  const { url = 'http://127.0.0.1:8188' } = config;
  
  // Workflow básico de ComfyUI
  const workflow = {
    prompt: {
      "3": {
        class_type: "KSampler",
        inputs: {
          seed: Math.floor(Math.random() * 999999999),
          steps: config.steps || 20,
          cfg: config.cfg || 7,
          sampler_name: config.sampler || "euler",
          scheduler: "normal",
          denoise: 1,
          model: ["4", 0],
          positive: ["6", 0],
          negative: ["7", 0],
          latent_image: ["5", 0]
        }
      },
      "4": { class_type: "CheckpointLoaderSimple", inputs: { ckpt_name: config.modelo || "sd_xl_base_1.0.safetensors" } },
      "5": { class_type: "EmptyLatentImage", inputs: { width: config.width || 1024, height: config.height || 1024, batch_size: 1 } },
      "6": { class_type: "CLIPTextEncode", inputs: { text: prompt, clip: ["4", 1] } },
      "7": { class_type: "CLIPTextEncode", inputs: { text: negative, clip: ["4", 1] } },
      "8": { class_type: "VAEDecode", inputs: { samples: ["3", 0], vae: ["4", 2] } },
      "9": { class_type: "SaveImage", inputs: { filename_prefix: "PromptGen", images: ["8", 0] } }
    }
  };
  
  try {
    const response = await fetch(`${url}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow),
      signal: AbortSignal.timeout(10000)
    });
    
    if (response.ok) {
      const data = await response.json();
      return { exito: true, promptId: data.prompt_id };
    }
    return { exito: false, error: `Error ${response.status}` };
  } catch (error) {
    return { exito: false, error: error.message };
  }
}

// Verifica estado de interfaces
export async function verificarInterfaces() {
  const resultados = {};
  
  for (const interfaz of interfacesDisponibles) {
    try {
      const response = await fetch(interfaz.url, { signal: AbortSignal.timeout(3000) });
      resultados[interfaz.id] = response.ok ? 'conectado' : 'desconectado';
    } catch {
      resultados[interfaz.id] = 'desconectado';
    }
  }
  
  return resultados;
}

// Formatea prompt para diferentes formatos de exportación
export function exportarPrompt(prompt, negative, formato) {
  switch (formato) {
    case 'a1111':
      return `PROMPT:\n${prompt}\n\nNEGATIVE:\n${negative}`;
    
    case 'comfyui':
      return JSON.stringify({
        positive: prompt,
        negative: negative,
        steps: 20,
        cfg: 7,
        sampler: 'euler_a',
        width: 1024,
        height: 1024
      }, null, 2);
    
    case 'midjourney':
      // Convertir a formato Midjourney
      let mjPrompt = prompt.replace(/,\s*/g, ' ');
      mjPrompt += ' --ar 16:9 --v 6 --q 2';
      return mjPrompt;
    
    case 'fooocus':
      return JSON.stringify({
        prompt: prompt,
        negative_prompt: negative,
        styles: ['Default'],
        performance: 'Quality',
        image_number: 4
      }, null, 2);
    
    case 'texto':
    default:
      return `${prompt}\n\n---\nNegative: ${negative}`;
  }
}
