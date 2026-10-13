// Integración con APIs de generación (A1111, ComfyUI)
export function exportarPrompt(prompt, negative, formato) {
  switch (formato) {
    case 'a1111': return `PROMPT:\n${prompt}\n\nNEGATIVE:\n${negative}`;
    case 'comfyui': return JSON.stringify({ positive: prompt, negative, steps: 20, cfg: 7, sampler: 'euler_a', width: 1024, height: 1024 }, null, 2);
    case 'midjourney': return prompt.replace(/,\s*/g, ' ') + ' --ar 16:9 --v 6 --q 2';
    case 'fooocus': return JSON.stringify({ prompt, negative_prompt: negative, styles: ['Default'], performance: 'Quality' }, null, 2);
    default: return `${prompt}\n\n---\nNegative: ${negative}`;
  }
}
