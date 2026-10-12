// Datos del sistema: Negativos, Boosters, Macros y Plantillas

// ========== NEGATIVOS POR CATEGORÍA ==========
export const negativesSistema = [
  { id: 'neg-general', nombre: 'General', categoria: 'general', valor: 'worst quality, low quality, normal quality, lowres, blurry, jpeg artifacts, watermark, text, signature, username, artist name', es_sistema: true },
  { id: 'neg-retratos', nombre: 'Retratos', categoria: 'retratos', valor: 'deformed, ugly, disfigured, mutated, extra limbs, extra fingers, missing fingers, bad anatomy, bad hands, cropped, poorly drawn face, mutation', es_sistema: true },
  { id: 'neg-paisajes', nombre: 'Paisajes', categoria: 'paisajes', valor: 'urban, city, buildings, people, cars, text, watermark, frame, border, oversaturated, underexposed', es_sistema: true },
  { id: 'neg-anime', nombre: 'Anime', categoria: 'anime', valor: 'realistic, photo, 3d, western, deformed, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality', es_sistema: true },
  { id: 'neg-fotorrealismo', nombre: 'Fotorrealismo', categoria: 'fotorrealismo', valor: 'cartoon, anime, painting, illustration, 3d render, cgi, drawing, sketch, unrealistic, artificial, plastic, doll', es_sistema: true },
  { id: 'neg-fantasia', nombre: 'Fantasía', categoria: 'fantasia', valor: 'modern, urban, realistic photo, cartoon, chibi, cute, bright, cheerful, mundane, ordinary', es_sistema: true },
  { id: 'neg-cyberpunk', nombre: 'Cyberpunk', categoria: 'cyberpunk', valor: 'nature, forest, medieval, bright, cheerful, clean, minimalist, cartoon, cute, anime chibi', es_sistema: true },
  { id: 'neg-horror', nombre: 'Horror', categoria: 'horror', valor: 'bright, cheerful, cute, kawaii, happy, colorful, cartoon, children, innocent, pastel', es_sistema: true },
  { id: 'neg-3d-render', nombre: '3D Render', categoria: '3d_render', valor: '2d, flat, sketch, drawing, painting, cartoon, anime, low poly, wireframe, unfinished', es_sistema: true },
  { id: 'neg-pixel-art', nombre: 'Pixel Art', categoria: 'pixel_art', valor: 'realistic, photo, smooth, high resolution, 3d, organic, detailed, modern, clean', es_sistema: true },
  { id: 'neg-nsfw', nombre: 'NSFW Block', categoria: 'nsfw', valor: 'nsfw, nude, naked, sexual, explicit, pornography, erotic, lewd, hentai, uncensored', es_sistema: true },
];

// ========== QUALITY BOOSTERS POR CATEGORÍA ==========
export const boostersSistema = [
  // Ultra calidad
  { id: 'b-masterpiece', nombre: 'Masterpiece', categoria: 'ultra', valor: 'masterpiece', es_sistema: true },
  { id: 'b-best-quality', nombre: 'Best Quality', categoria: 'ultra', valor: 'best quality', es_sistema: true },
  { id: 'b-ultra-detailed', nombre: 'Ultra Detailed', categoria: 'ultra', valor: 'ultra detailed', es_sistema: true },
  { id: 'b-8k', nombre: '8K Resolution', categoria: 'ultra', valor: '8k resolution', es_sistema: true },
  { id: 'b-hdr', nombre: 'HDR', categoria: 'ultra', valor: 'HDR, high dynamic range', es_sistema: true },
  { id: 'b-award', nombre: 'Award Winning', categoria: 'ultra', valor: 'award winning, professional', es_sistema: true },
  // Alta calidad
  { id: 'b-highly-detailed', nombre: 'Highly Detailed', categoria: 'alta', valor: 'highly detailed', es_sistema: true },
  { id: 'b-sharp-focus', nombre: 'Sharp Focus', categoria: 'alta', valor: 'sharp focus, in focus', es_sistema: true },
  { id: 'b-intricate', nombre: 'Intricate Details', categoria: 'alta', valor: 'intricate details', es_sistema: true },
  { id: 'b-4k', nombre: '4K', categoria: 'alta', valor: '4k, high resolution', es_sistema: true },
  { id: 'b-professional', nombre: 'Professional', categoria: 'alta', valor: 'professional photography', es_sistema: true },
  // Fotográfica
  { id: 'b-photorealistic', nombre: 'Fotorrealista', categoria: 'fotografica', valor: 'photorealistic, realistic', es_sistema: true },
  { id: 'b-dslr', nombre: 'DSLR', categoria: 'fotografica', valor: 'DSLR, Canon EOS 5D', es_sistema: true },
  { id: 'b-film-grain', nombre: 'Film Grain', categoria: 'fotografica', valor: 'film grain, analog', es_sistema: true },
  { id: 'b-depth-of-field', nombre: 'Depth of Field', categoria: 'fotografica', valor: 'depth of field, bokeh', es_sistema: true },
  { id: 'b-natural-light', nombre: 'Luz Natural', categoria: 'fotografica', valor: 'natural lighting, soft light', es_sistema: true },
  // Artística
  { id: 'b-fine-art', nombre: 'Fine Art', categoria: 'artistica', valor: 'fine art, artistic', es_sistema: true },
  { id: 'b-museum', nombre: 'Museum Quality', categoria: 'artistica', valor: 'museum quality, gallery', es_sistema: true },
  { id: 'b-brushstrokes', nombre: 'Brushstrokes', categoria: 'artistica', valor: 'visible brushstrokes, textured', es_sistema: true },
  { id: 'b-palette', nombre: 'Color Palette', categoria: 'artistica', valor: 'rich color palette, vibrant colors', es_sistema: true },
  // Anime
  { id: 'b-anime-key', nombre: 'Anime Key Visual', categoria: 'anime', valor: 'anime key visual, official art', es_sistema: true },
  { id: 'b-beautiful-eyes', nombre: 'Beautiful Eyes', categoria: 'anime', valor: 'beautiful detailed eyes, expressive eyes', es_sistema: true },
  { id: 'b-anime-coloring', nombre: 'Anime Coloring', categoria: 'anime', valor: 'vivid colors, anime coloring', es_sistema: true },
  { id: 'b-cel-shaded', nombre: 'Cel Shaded', categoria: 'anime', valor: 'cel shaded, clean lineart', es_sistema: true },
  // Cinemática
  { id: 'b-cinematic-light', nombre: 'Cinematic Lighting', categoria: 'cinematica', valor: 'cinematic lighting, dramatic', es_sistema: true },
  { id: 'b-anamorphic', nombre: 'Anamorphic', categoria: 'cinematica', valor: 'anamorphic lens, lens flare', es_sistema: true },
  { id: 'b-movie-still', nombre: 'Movie Still', categoria: 'cinematica', valor: 'movie still, film frame', es_sistema: true },
  { id: 'b-color-grade', nombre: 'Color Grading', categoria: 'cinematica', valor: 'professional color grading', es_sistema: true },
  // Fantasía
  { id: 'b-magical', nombre: 'Magical', categoria: 'fantasia', valor: 'magical atmosphere, ethereal glow', es_sistema: true },
  { id: 'b-epic', nombre: 'Epic', categoria: 'fantasia', valor: 'epic composition, grand scale', es_sistema: true },
  { id: 'b-ethereal', nombre: 'Ethereal', categoria: 'fantasia', valor: 'ethereal, otherworldly', es_sistema: true },
  { id: 'b-mystical', nombre: 'Mystical', categoria: 'fantasia', valor: 'mystical, enchanted', es_sistema: true },
  // Realista
  { id: 'b-skin-texture', nombre: 'Skin Texture', categoria: 'realista', valor: 'detailed skin texture, skin pores', es_sistema: true },
  { id: 'b-hair-detail', nombre: 'Hair Detail', categoria: 'realista', valor: 'detailed hair, individual strands', es_sistema: true },
  { id: 'b-material', nombre: 'Materials', categoria: 'realista', valor: 'realistic materials, PBR textures', es_sistema: true },
  { id: 'b-subsurface', nombre: 'Subsurface', categoria: 'realista', valor: 'subsurface scattering, translucent', es_sistema: true },
];

// ========== MACROS DEL SISTEMA ==========
export const macrosSistema = [
  { id: 'm-calidad-max', nombre: 'calidad_max', valor: 'masterpiece, best quality, ultra detailed, 8k, HDR, sharp focus', es_sistema: true },
  { id: 'm-calidad-alta', nombre: 'calidad_alta', valor: 'masterpiece, best quality, highly detailed, 4k', es_sistema: true },
  { id: 'm-fotografico', nombre: 'fotografico', valor: 'photorealistic, DSLR, 85mm lens, natural lighting, depth of field, sharp focus', es_sistema: true },
  { id: 'm-anime', nombre: 'anime', valor: 'anime key visual, beautiful detailed eyes, vivid colors, cel shaded, clean lineart', es_sistema: true },
  { id: 'm-cinematico', nombre: 'cinematico', valor: 'cinematic lighting, dramatic, anamorphic lens, movie still, color grading', es_sistema: true },
  { id: 'm-neg-universal', nombre: 'neg_universal', valor: 'worst quality, low quality, blurry, jpeg artifacts, watermark, text, signature', es_sistema: true },
  { id: 'm-neg-anime', nombre: 'neg_anime', valor: 'realistic, photo, 3d, deformed, bad anatomy, bad hands, missing fingers, extra digit', es_sistema: true },
  { id: 'm-neg-realista', nombre: 'neg_realista', valor: 'cartoon, anime, painting, illustration, 3d render, cgi, drawing, sketch, plastic', es_sistema: true },
  { id: 'm-ilum-estudio', nombre: 'iluminacion_estudio', valor: 'studio lighting, softbox, rim light, professional lighting setup', es_sistema: true },
  { id: 'm-ilum-dramatica', nombre: 'iluminacion_dramatica', valor: 'dramatic lighting, chiaroscuro, strong contrast, volumetric light, god rays', es_sistema: true },
  { id: 'm-ilum-natural', nombre: 'iluminacion_natural', valor: 'natural lighting, golden hour, soft sunlight, warm tones, ambient light', es_sistema: true },
  { id: 'm-comp-retrato', nombre: 'composicion_retrato', valor: 'centered composition, rule of thirds, shallow depth of field, eye level', es_sistema: true },
  { id: 'm-comp-paisaje', nombre: 'composicion_paisaje', valor: 'wide angle, rule of thirds, leading lines, foreground interest, vast sky', es_sistema: true },
  { id: 'm-comp-producto', nombre: 'composicion_producto', valor: 'clean background, centered product, even lighting, commercial composition', es_sistema: true },
  { id: 'm-retrato-pro', nombre: 'retrato_pro', valor: '{{calidad_max}}, {{fotografico}}, {{iluminacion_estudio}}, {{composicion_retrato}}, detailed skin texture, beautiful eyes', es_sistema: true },
];

// ========== PLANTILLAS PREDEFINIDAS ==========
export const plantillasSistema = [
  {
    id: 't-retrato-basico', nombre: 'Retrato Básico',
    plantilla: '{{calidad_max}}, {{fotografico}}, [sujeto], [expresion], {{iluminacion_estudio}}, {{composicion_retrato}}',
    variables: [
      { nombre: 'sujeto', default: 'a young woman with brown hair' },
      { nombre: 'expresion', default: 'smiling gently' }
    ],
    descripcion: 'Plantilla básica para retratos fotográficos', es_sistema: true
  },
  {
    id: 't-paisaje-epico', nombre: 'Paisaje Épico',
    plantilla: '{{calidad_max}}, epic landscape, [ubicacion], [hora_dia], [clima], {{composicion_paisaje}}, {{iluminacion_natural}}',
    variables: [
      { nombre: 'ubicacion', default: 'mountain valley with a crystal lake' },
      { nombre: 'hora_dia', default: 'golden hour sunset' },
      { nombre: 'clima', default: 'dramatic clouds, misty atmosphere' }
    ],
    descripcion: 'Plantilla para paisajes épicos y dramáticos', es_sistema: true
  },
  {
    id: 't-anime-personaje', nombre: 'Personaje Anime',
    plantilla: '{{calidad_alta}}, {{anime}}, [personaje], [pose], [fondo], [emocion]',
    variables: [
      { nombre: 'personaje', default: 'a warrior girl with silver hair and blue eyes, wearing armor' },
      { nombre: 'pose', default: 'dynamic action pose, holding a sword' },
      { nombre: 'fondo', default: 'cherry blossom petals falling, sunset sky' },
      { nombre: 'emocion', default: 'determined expression' }
    ],
    descripcion: 'Plantilla para personajes de anime', es_sistema: true
  },
  {
    id: 't-producto-comercial', nombre: 'Producto Comercial',
    plantilla: '{{calidad_max}}, product photography, [producto], [fondo], {{composicion_producto}}, commercial lighting, advertising quality',
    variables: [
      { nombre: 'producto', default: 'luxury perfume bottle, elegant glass design' },
      { nombre: 'fondo', default: 'clean white background with soft gradient' }
    ],
    descripcion: 'Plantilla para fotografía de producto comercial', es_sistema: true
  },
  {
    id: 't-cyberpunk-ciudad', nombre: 'Ciudad Cyberpunk',
    plantilla: '{{calidad_max}}, {{cinematico}}, cyberpunk city, [escena], [detalles], neon lights, rain, futuristic, Blade Runner atmosphere',
    variables: [
      { nombre: 'escena', default: 'narrow alley with holographic signs' },
      { nombre: 'detalles', default: 'steam rising from vents, puddles reflecting neon' }
    ],
    descripcion: 'Plantilla para escenas cyberpunk urbanas', es_sistema: true
  },
];

// Categorías disponibles para UI
export const categoriasNegativos = ['general', 'retratos', 'paisajes', 'anime', 'fotorrealismo', 'fantasia', 'cyberpunk', 'horror', '3d_render', 'pixel_art', 'nsfw'];
export const categoriasBoosters = ['ultra', 'alta', 'fotografica', 'artistica', 'anime', 'cinematica', 'fantasia', 'realista'];

export default { negativesSistema, boostersSistema, macrosSistema, plantillasSistema, categoriasNegativos, categoriasBoosters };
