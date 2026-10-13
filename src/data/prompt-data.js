// Datos del sistema: Negativos, Boosters, Macros y Plantillas

export const negativesSistema = [
  { id: 'neg-general', nombre: 'General', categoria: 'general', valor: 'worst quality, low quality, normal quality, lowres, blurry, jpeg artifacts, watermark, text, signature', es_sistema: true },
  { id: 'neg-retratos', nombre: 'Retratos', categoria: 'retratos', valor: 'deformed, ugly, disfigured, mutated, extra limbs, extra fingers, bad anatomy, bad hands, cropped, poorly drawn face', es_sistema: true },
  { id: 'neg-paisajes', nombre: 'Paisajes', categoria: 'paisajes', valor: 'urban, city, buildings, people, cars, text, watermark, frame, border, oversaturated', es_sistema: true },
  { id: 'neg-anime', nombre: 'Anime', categoria: 'anime', valor: 'realistic, photo, 3d, western, deformed, bad anatomy, bad hands, missing fingers, extra digit, worst quality', es_sistema: true },
  { id: 'neg-fotorrealismo', nombre: 'Fotorrealismo', categoria: 'fotorrealismo', valor: 'cartoon, anime, painting, illustration, 3d render, cgi, drawing, sketch, unrealistic, plastic', es_sistema: true },
  { id: 'neg-fantasia', nombre: 'Fantasía', categoria: 'fantasia', valor: 'modern, urban, realistic photo, cartoon, chibi, cute, bright, cheerful, mundane', es_sistema: true },
  { id: 'neg-cyberpunk', nombre: 'Cyberpunk', categoria: 'cyberpunk', valor: 'nature, forest, medieval, bright, cheerful, clean, minimalist, cartoon, cute', es_sistema: true },
  { id: 'neg-horror', nombre: 'Horror', categoria: 'horror', valor: 'bright, cheerful, cute, kawaii, happy, colorful, cartoon, children, innocent', es_sistema: true },
  { id: 'neg-3d-render', nombre: '3D Render', categoria: '3d_render', valor: '2d, flat, sketch, drawing, painting, cartoon, anime, low poly, wireframe', es_sistema: true },
  { id: 'neg-pixel-art', nombre: 'Pixel Art', categoria: 'pixel_art', valor: 'realistic, photo, smooth, high resolution, 3d, organic, detailed, modern', es_sistema: true },
  { id: 'neg-nsfw', nombre: 'NSFW Block', categoria: 'nsfw', valor: 'nsfw, nude, naked, sexual, explicit, pornography, erotic, lewd, hentai', es_sistema: true },
];

export const boostersSistema = [
  { id: 'b-masterpiece', nombre: 'Masterpiece', categoria: 'ultra', valor: 'masterpiece', es_sistema: true },
  { id: 'b-best-quality', nombre: 'Best Quality', categoria: 'ultra', valor: 'best quality', es_sistema: true },
  { id: 'b-ultra-detailed', nombre: 'Ultra Detailed', categoria: 'ultra', valor: 'ultra detailed', es_sistema: true },
  { id: 'b-8k', nombre: '8K Resolution', categoria: 'ultra', valor: '8k resolution', es_sistema: true },
  { id: 'b-hdr', nombre: 'HDR', categoria: 'ultra', valor: 'HDR, high dynamic range', es_sistema: true },
  { id: 'b-award', nombre: 'Award Winning', categoria: 'ultra', valor: 'award winning, professional', es_sistema: true },
  { id: 'b-highly-detailed', nombre: 'Highly Detailed', categoria: 'alta', valor: 'highly detailed', es_sistema: true },
  { id: 'b-sharp-focus', nombre: 'Sharp Focus', categoria: 'alta', valor: 'sharp focus, in focus', es_sistema: true },
  { id: 'b-intricate', nombre: 'Intricate Details', categoria: 'alta', valor: 'intricate details', es_sistema: true },
  { id: 'b-4k', nombre: '4K', categoria: 'alta', valor: '4k, high resolution', es_sistema: true },
  { id: 'b-professional', nombre: 'Professional', categoria: 'alta', valor: 'professional photography', es_sistema: true },
  { id: 'b-photorealistic', nombre: 'Fotorrealista', categoria: 'fotografica', valor: 'photorealistic, realistic', es_sistema: true },
  { id: 'b-dslr', nombre: 'DSLR', categoria: 'fotografica', valor: 'DSLR, Canon EOS 5D', es_sistema: true },
  { id: 'b-film-grain', nombre: 'Film Grain', categoria: 'fotografica', valor: 'film grain, analog', es_sistema: true },
  { id: 'b-depth-of-field', nombre: 'Depth of Field', categoria: 'fotografica', valor: 'depth of field, bokeh', es_sistema: true },
  { id: 'b-natural-light', nombre: 'Luz Natural', categoria: 'fotografica', valor: 'natural lighting, soft light', es_sistema: true },
  { id: 'b-fine-art', nombre: 'Fine Art', categoria: 'artistica', valor: 'fine art, artistic', es_sistema: true },
  { id: 'b-museum', nombre: 'Museum Quality', categoria: 'artistica', valor: 'museum quality, gallery', es_sistema: true },
  { id: 'b-brushstrokes', nombre: 'Brushstrokes', categoria: 'artistica', valor: 'visible brushstrokes, textured', es_sistema: true },
  { id: 'b-palette', nombre: 'Color Palette', categoria: 'artistica', valor: 'rich color palette, vibrant colors', es_sistema: true },
  { id: 'b-anime-key', nombre: 'Anime Key Visual', categoria: 'anime', valor: 'anime key visual, official art', es_sistema: true },
  { id: 'b-beautiful-eyes', nombre: 'Beautiful Eyes', categoria: 'anime', valor: 'beautiful detailed eyes, expressive eyes', es_sistema: true },
  { id: 'b-anime-coloring', nombre: 'Anime Coloring', categoria: 'anime', valor: 'vivid colors, anime coloring', es_sistema: true },
  { id: 'b-cel-shaded', nombre: 'Cel Shaded', categoria: 'anime', valor: 'cel shaded, clean lineart', es_sistema: true },
  { id: 'b-cinematic-light', nombre: 'Cinematic Lighting', categoria: 'cinematica', valor: 'cinematic lighting, dramatic', es_sistema: true },
  { id: 'b-anamorphic', nombre: 'Anamorphic', categoria: 'cinematica', valor: 'anamorphic lens, lens flare', es_sistema: true },
  { id: 'b-movie-still', nombre: 'Movie Still', categoria: 'cinematica', valor: 'movie still, film frame', es_sistema: true },
  { id: 'b-color-grade', nombre: 'Color Grading', categoria: 'cinematica', valor: 'professional color grading', es_sistema: true },
  { id: 'b-magical', nombre: 'Magical', categoria: 'fantasia', valor: 'magical atmosphere, ethereal glow', es_sistema: true },
  { id: 'b-epic', nombre: 'Epic', categoria: 'fantasia', valor: 'epic composition, grand scale', es_sistema: true },
  { id: 'b-ethereal', nombre: 'Ethereal', categoria: 'fantasia', valor: 'ethereal, otherworldly', es_sistema: true },
  { id: 'b-mystical', nombre: 'Mystical', categoria: 'fantasia', valor: 'mystical, enchanted', es_sistema: true },
  { id: 'b-skin-texture', nombre: 'Skin Texture', categoria: 'realista', valor: 'detailed skin texture, skin pores', es_sistema: true },
  { id: 'b-hair-detail', nombre: 'Hair Detail', categoria: 'realista', valor: 'detailed hair, individual strands', es_sistema: true },
  { id: 'b-material', nombre: 'Materials', categoria: 'realista', valor: 'realistic materials, PBR textures', es_sistema: true },
  { id: 'b-subsurface', nombre: 'Subsurface', categoria: 'realista', valor: 'subsurface scattering, translucent', es_sistema: true },
];

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

export const plantillasSistema = [
  {
    id: 't-retrato-basico', nombre: 'Retrato Fotográfico',
    plantilla: '{{calidad_max}}, {{fotografico}}, [sujeto], [expresion], [vestimenta], {{iluminacion_estudio}}, {{composicion_retrato}}',
    variables: [
      { nombre: 'sujeto', default: 'a young woman with brown hair', descripcion: 'Describe al sujeto principal' },
      { nombre: 'expresion', default: 'smiling gently, looking at camera', descripcion: 'Expresión facial y mirada' },
      { nombre: 'vestimenta', default: 'wearing an elegant white dress', descripcion: 'Ropa o vestimenta' }
    ],
    descripcion: 'Retrato profesional con iluminación de estudio', es_sistema: true
  },
  {
    id: 't-paisaje-epico', nombre: 'Paisaje Épico',
    plantilla: '{{calidad_max}}, epic landscape photography, [ubicacion], [hora_dia], [clima], {{composicion_paisaje}}, {{iluminacion_natural}}, breathtaking vista',
    variables: [
      { nombre: 'ubicacion', default: 'mountain valley with a crystal clear lake', descripcion: 'Describe el lugar' },
      { nombre: 'hora_dia', default: 'golden hour at sunset', descripcion: 'Momento del día' },
      { nombre: 'clima', default: 'dramatic clouds, misty atmosphere, rays of light', descripcion: 'Condiciones climáticas' }
    ],
    descripcion: 'Paisajes épicos con iluminación natural', es_sistema: true
  },
  {
    id: 't-anime-personaje', nombre: 'Personaje Anime',
    plantilla: '{{calidad_alta}}, {{anime}}, [personaje], [pose], [fondo], [emocion], [detalles_extra]',
    variables: [
      { nombre: 'personaje', default: 'a warrior girl with silver hair and blue eyes, wearing ornate armor', descripcion: 'Apariencia del personaje' },
      { nombre: 'pose', default: 'dynamic action pose, holding a glowing sword', descripcion: 'Pose o acción' },
      { nombre: 'fondo', default: 'cherry blossom petals falling against sunset sky', descripcion: 'Fondo o escenario' },
      { nombre: 'emocion', default: 'determined expression with fierce eyes', descripcion: 'Emoción del personaje' },
      { nombre: 'detalles_extra', default: 'wind blowing hair, magical aura surrounding', descripcion: 'Detalles adicionales' }
    ],
    descripcion: 'Personajes de anime con detalles completos', es_sistema: true
  },
  {
    id: 't-producto-comercial', nombre: 'Producto Comercial',
    plantilla: '{{calidad_max}}, professional product photography, [producto], [material], [fondo], [iluminacion], {{composicion_producto}}, advertising quality, sharp details',
    variables: [
      { nombre: 'producto', default: 'luxury perfume bottle with elegant gold cap', descripcion: 'Describe el producto' },
      { nombre: 'material', default: 'crystal glass with golden accents', descripcion: 'Materiales y texturas' },
      { nombre: 'fondo', default: 'clean white background with soft gradient', descripcion: 'Fondo de la imagen' },
      { nombre: 'iluminacion', default: 'soft studio lighting with subtle reflections', descripcion: 'Tipo de iluminación' }
    ],
    descripcion: 'Fotografía de producto profesional', es_sistema: true
  },
  {
    id: 't-cyberpunk-ciudad', nombre: 'Ciudad Cyberpunk',
    plantilla: '{{calidad_max}}, {{cinematico}}, cyberpunk cityscape, [escena], [detalles], [personaje], neon lights, rain, futuristic dystopia',
    variables: [
      { nombre: 'escena', default: 'narrow alley between towering skyscrapers', descripcion: 'Tipo de escena urbana' },
      { nombre: 'detalles', default: 'holographic advertisements, steam rising from vents', descripcion: 'Detalles del ambiente' },
      { nombre: 'personaje', default: 'a lone figure in a trench coat walking through the rain', descripcion: 'Personaje opcional' }
    ],
    descripcion: 'Escenas cyberpunk con ambiente noir', es_sistema: true
  },
];

export default { negativesSistema, boostersSistema, macrosSistema, plantillasSistema };
