// Estilos iniciales del sistema - 50+ estilos organizados por categoría
export const estilosIniciales = [
  // ========== FOTORREALISMO (10) ==========
  {
    id: 'retrato-estudio', nombre: 'Retrato Estudio', categoria: 'Fotorrealismo',
    descripcion: 'Retrato profesional en estudio con iluminación controlada',
    prompt_prefijo: 'professional studio portrait, softbox lighting, sharp focus, 85mm lens, shallow depth of field',
    prompt_sufijo: 'high resolution, detailed skin texture, natural skin pores',
    negative_boost: 'cartoon, anime, painting, illustration, blurry, deformed',
    quality_boosters: ['masterpiece', 'best quality', 'ultra detailed'],
    artistas_referencia: ['Peter Lindbergh', 'Annie Leibovitz'],
    modelos_recomendados: ['RealisticVision', 'DreamShaper'],
    tags: ['retrato', 'estudio', 'profesional'], popularidad: 98, es_sistema: true
  },
  {
    id: 'paisaje-natural', nombre: 'Paisaje Natural', categoria: 'Fotorrealismo',
    descripcion: 'Fotografía de paisaje natural con gran detalle',
    prompt_prefijo: 'stunning natural landscape, golden hour lighting, dramatic clouds, wide angle photography',
    prompt_sufijo: '8k resolution, hyperdetailed, nature photography',
    negative_boost: 'urban, city, people, cartoon, anime',
    quality_boosters: ['masterpiece', 'best quality', 'ultra detailed'],
    artistas_referencia: ['Ansel Adams', 'Galen Rowell'],
    modelos_recomendados: ['RealisticVision', 'SDXL'],
    tags: ['paisaje', 'naturaleza', 'fotografía'], popularidad: 95, es_sistema: true
  },
  {
    id: 'macro-fotografia', nombre: 'Macro Fotografía', categoria: 'Fotorrealismo',
    descripcion: 'Fotografía macro con detalle extremo',
    prompt_prefijo: 'extreme macro photography, incredible detail, shallow depth of field, ring flash lighting',
    prompt_sufijo: 'microscopic detail, sharp focus, high magnification',
    negative_boost: 'blurry, out of focus, cartoon, anime',
    quality_boosters: ['masterpiece', 'best quality', 'ultra detailed'],
    artistas_referencia: ['Levón Biss', 'Thomas Shahan'],
    modelos_recomendados: ['RealisticVision'],
    tags: ['macro', 'detalle', 'naturaleza'], popularidad: 82, es_sistema: true
  },
  {
    id: 'nocturna', nombre: 'Fotografía Nocturna', categoria: 'Fotorrealismo',
    descripcion: 'Escenas nocturnas con iluminación artificial',
    prompt_prefijo: 'night photography, city lights, neon reflections, long exposure, moody atmosphere',
    prompt_sufijo: 'high ISO, dramatic lighting, cinematic night',
    negative_boost: 'daylight, bright, sunny, cartoon',
    quality_boosters: ['masterpiece', 'best quality', 'ultra detailed'],
    artistas_referencia: ['Trevor Williams', 'Gabriel Shahnazari'],
    modelos_recomendados: ['RealisticVision', 'SDXL'],
    tags: ['noche', 'ciudad', 'neon'], popularidad: 89, es_sistema: true
  },
  {
    id: 'cinematografica', nombre: 'Cinematográfica', categoria: 'Fotorrealismo',
    descripcion: 'Estilo cinematográfico con color grading profesional',
    prompt_prefijo: 'cinematic shot, movie still, anamorphic lens, film grain, color grading, dramatic lighting',
    prompt_sufijo: '35mm film, professional color correction, Hollywood quality',
    negative_boost: 'cartoon, anime, amateur, low quality',
    quality_boosters: ['masterpiece', 'best quality', 'cinematic lighting'],
    artistas_referencia: ['Roger Deakins', 'Emmanuel Lubezki'],
    modelos_recomendados: ['CinematicRedmond', 'SDXL'],
    tags: ['cine', 'película', 'dramático'], popularidad: 96, es_sistema: true
  },
  {
    id: 'vintage-foto', nombre: 'Vintage Fotografía', categoria: 'Fotorrealismo',
    descripcion: 'Estilo fotográfico vintage/retro',
    prompt_prefijo: 'vintage photograph, faded colors, film grain, retro aesthetic, 1970s style, warm tones',
    prompt_sufijo: 'analog film, light leaks, nostalgic mood',
    negative_boost: 'modern, digital, clean, sharp, anime',
    quality_boosters: ['masterpiece', 'best quality', 'film grain'],
    artistas_referencia: ['William Eggleston', 'Saul Leiter'],
    modelos_recomendados: ['RealisticVision'],
    tags: ['vintage', 'retro', 'analógico'], popularidad: 84, es_sistema: true
  },
  {
    id: 'polaroid', nombre: 'Polaroid', categoria: 'Fotorrealismo',
    descripcion: 'Estilo instantáneo tipo Polaroid',
    prompt_prefijo: 'polaroid photo, instant film, slight blur, warm color cast, white border, casual composition',
    prompt_sufijo: 'authentic polaroid look, soft focus, nostalgic',
    negative_boost: 'digital, sharp, modern, anime, cartoon',
    quality_boosters: ['best quality', 'film texture'],
    artistas_referencia: ['Andy Warhol', 'Walker Evans'],
    modelos_recomendados: ['RealisticVision'],
    tags: ['polaroid', 'instantáneo', 'retro'], popularidad: 78, es_sistema: true
  },
  {
    id: 'drone-aereo', nombre: 'Vista Aérea Drone', categoria: 'Fotorrealismo',
    descripcion: 'Fotografía aérea con drone',
    prompt_prefijo: 'aerial photography, drone shot, birds eye view, stunning landscape from above, DJI quality',
    prompt_sufijo: '4k resolution, ultra wide, breathtaking view',
    negative_boost: 'ground level, cartoon, anime, low quality',
    quality_boosters: ['masterpiece', 'best quality', 'ultra detailed'],
    artistas_referencia: ['George Steinmetz', 'Benjamin Grant'],
    modelos_recomendados: ['SDXL', 'RealisticVision'],
    tags: ['aéreo', 'drone', 'paisaje'], popularidad: 86, es_sistema: true
  },
  {
    id: 'blanco-negro', nombre: 'Blanco y Negro', categoria: 'Fotorrealismo',
    descripcion: 'Fotografía en blanco y negro con alto contraste',
    prompt_prefijo: 'black and white photography, high contrast, dramatic shadows, monochrome, fine art photography',
    prompt_sufijo: 'rich tonal range, deep blacks, bright highlights',
    negative_boost: 'color, rainbow, vibrant, cartoon, anime',
    quality_boosters: ['masterpiece', 'best quality', 'fine art'],
    artistas_referencia: ['Sebastião Salgado', 'Henri Cartier-Bresson'],
    modelos_recomendados: ['RealisticVision'],
    tags: ['bn', 'monocromo', 'arte'], popularidad: 88, es_sistema: true
  },
  {
    id: 'producto', nombre: 'Fotografía de Producto', categoria: 'Fotorrealismo',
    descripcion: 'Fotografía comercial de producto',
    prompt_prefijo: 'product photography, clean background, studio lighting, commercial quality, sharp details',
    prompt_sufijo: 'high-end commercial, advertising quality, perfect lighting',
    negative_boost: 'messy, dirty, blurry, cartoon, anime, amateur',
    quality_boosters: ['masterpiece', 'best quality', 'commercial quality'],
    artistas_referencia: ['Product photographers'],
    modelos_recomendados: ['RealisticVision', 'SDXL'],
    tags: ['producto', 'comercial', 'publicidad'], popularidad: 91, es_sistema: true
  },

  // ========== ANIME (8) ==========
  {
    id: 'shonen', nombre: 'Shonen', categoria: 'Anime',
    descripcion: 'Estilo anime shonen - acción y aventura',
    prompt_prefijo: 'shonen anime style, dynamic action pose, bold lines, vibrant colors, energetic atmosphere',
    prompt_sufijo: 'anime key visual, high quality anime art, detailed anime',
    negative_boost: 'realistic, photo, 3d, western cartoon',
    quality_boosters: ['masterpiece', 'best quality', 'anime key visual'],
    artistas_referencia: ['Akira Toriyama', 'Eiichiro Oda'],
    modelos_recomendados: ['AnythingV5', 'Counterfeit'],
    tags: ['anime', 'acción', 'shonen'], popularidad: 94, es_sistema: true
  },
  {
    id: 'shojo', nombre: 'Shojo', categoria: 'Anime',
    descripcion: 'Estilo anime shojo - romántico y delicado',
    prompt_prefijo: 'shojo anime style, soft pastel colors, sparkles, flowers, delicate features, romantic atmosphere',
    prompt_sufijo: 'beautiful anime girl, soft lighting, dreamy',
    negative_boost: 'realistic, dark, horror, muscular, 3d',
    quality_boosters: ['masterpiece', 'best quality', 'beautiful detailed eyes'],
    artistas_referencia: ['CLAMP', 'Natsuki Takaya'],
    modelos_recomendados: ['AnythingV5', 'Counterfeit'],
    tags: ['anime', 'romance', 'delicado'], popularidad: 85, es_sistema: true
  },
  {
    id: 'mecha', nombre: 'Mecha', categoria: 'Anime',
    descripcion: 'Estilo mecha - robots gigantes',
    prompt_prefijo: 'mecha anime style, giant robot, detailed mechanical parts, metallic surfaces, sci-fi battlefield',
    prompt_sufijo: 'gunpla quality, intricate mechanical details, dynamic pose',
    negative_boost: 'organic, soft, nature, cartoon, chibi',
    quality_boosters: ['masterpiece', 'best quality', 'detailed machinery'],
    artistas_referencia: ['Hajime Katoki', 'Yutaka Izubuchi'],
    modelos_recomendados: ['AnythingV5', 'Gundam'],
    tags: ['anime', 'mecha', 'robot'], popularidad: 80, es_sistema: true
  },
  {
    id: 'chibi', nombre: 'Chibi', categoria: 'Anime',
    descripcion: 'Estilo chibi - personajes pequeños y adorables',
    prompt_prefijo: 'chibi style, cute small character, big head small body, adorable expression, simple background',
    prompt_sufijo: 'kawaii, super deformed, cute anime',
    negative_boost: 'realistic, dark, horror, detailed body, proportional',
    quality_boosters: ['best quality', 'cute', 'adorable'],
    artistas_referencia: ['Sanrio artists', 'Nendoroid'],
    modelos_recomendados: ['AnythingV5'],
    tags: ['anime', 'chibi', 'kawaii'], popularidad: 83, es_sistema: true
  },
  {
    id: 'seinen', nombre: 'Seinen', categoria: 'Anime',
    descripcion: 'Estilo anime seinen - maduro y detallado',
    prompt_prefijo: 'seinen anime style, mature art, detailed shading, realistic proportions, dark atmosphere',
    prompt_sufijo: 'high quality seinen manga art, detailed illustration',
    negative_boost: 'chibi, cute, cartoon, bright colors, childish',
    quality_boosters: ['masterpiece', 'best quality', 'detailed'],
    artistas_referencia: ['Kentaro Miura', 'Takehiko Inoue'],
    modelos_recomendados: ['AnythingV5', 'Counterfeit'],
    tags: ['anime', 'maduro', 'detallado'], popularidad: 87, es_sistema: true
  },
  {
    id: 'ghibli', nombre: 'Studio Ghibli', categoria: 'Anime',
    descripcion: 'Estilo Studio Ghibli - cálido y nostálgico',
    prompt_prefijo: 'Studio Ghibli style, warm colors, hand-painted look, whimsical atmosphere, detailed backgrounds, peaceful',
    prompt_sufijo: 'Hayao Miyazaki inspired, beautiful scenery, nostalgic mood',
    negative_boost: 'dark, horror, realistic, 3d, gritty',
    quality_boosters: ['masterpiece', 'best quality', 'beautiful background'],
    artistas_referencia: ['Hayao Miyazaki', 'Kazuo Oga'],
    modelos_recomendados: ['AnythingV5', 'Ghibli'],
    tags: ['anime', 'ghibli', 'nostálgico'], popularidad: 96, es_sistema: true
  },
  {
    id: 'anime-cyberpunk', nombre: 'Anime Cyberpunk', categoria: 'Anime',
    descripcion: 'Estilo anime cyberpunk futurista',
    prompt_prefijo: 'cyberpunk anime, neon lights, futuristic city, holographic displays, rain-soaked streets, dark atmosphere',
    prompt_sufijo: 'Ghost in the Shell style, Akira inspired, high tech',
    negative_boost: 'nature, medieval, bright, cheerful, cartoon',
    quality_boosters: ['masterpiece', 'best quality', 'neon lighting'],
    artistas_referencia: ['Masamune Shirow', 'Katsuhiro Otomo'],
    modelos_recomendados: ['Counterfeit', 'AnythingV5'],
    tags: ['anime', 'cyberpunk', 'futurista'], popularidad: 92, es_sistema: true
  },
  {
    id: 'retro-90s-anime', nombre: 'Anime Retro 90s', categoria: 'Anime',
    descripcion: 'Estilo anime de los años 90',
    prompt_prefijo: '90s anime style, retro anime aesthetic, cel shading, VHS quality, nostalgic 90s anime',
    prompt_sufijo: 'retro anime screencap, vintage anime look, classic anime art',
    negative_boost: 'modern, 3d, realistic, digital art, smooth',
    quality_boosters: ['best quality', 'retro aesthetic', 'cel shaded'],
    artistas_referencia: ['Sailor Moon artists', 'Evangelion staff'],
    modelos_recomendados: ['AnythingV5'],
    tags: ['anime', 'retro', '90s'], popularidad: 88, es_sistema: true
  },

  // ========== FANTASÍA (8) ==========
  {
    id: 'dark-fantasy', nombre: 'Dark Fantasy', categoria: 'Fantasía',
    descripcion: 'Fantasía oscura con atmósfera tenebrosa',
    prompt_prefijo: 'dark fantasy art, gothic atmosphere, ominous lighting, dark magical realm, foreboding',
    prompt_sufijo: 'dark and moody, epic dark fantasy, grimdark',
    negative_boost: 'bright, cheerful, cute, cartoon, anime',
    quality_boosters: ['masterpiece', 'best quality', 'dark atmosphere'],
    artistas_referencia: ['Zdzisław Beksiński', 'HR Giger'],
    modelos_recomendados: ['DreamShaper', 'SDXL'],
    tags: ['fantasía', 'oscuro', 'gótico'], popularidad: 90, es_sistema: true
  },
  {
    id: 'high-fantasy', nombre: 'High Fantasy', categoria: 'Fantasía',
    descripcion: 'Alta fantasía épica tipo Tolkien',
    prompt_prefijo: 'high fantasy art, epic landscape, magical kingdom, majestic castles, ethereal lighting',
    prompt_sufijo: 'Lord of the Rings inspired, epic scale, magical atmosphere',
    negative_boost: 'modern, urban, sci-fi, realistic photo',
    quality_boosters: ['masterpiece', 'best quality', 'epic composition'],
    artistas_referencia: ['Alan Lee', 'John Howe'],
    modelos_recomendados: ['DreamShaper', 'SDXL'],
    tags: ['fantasía', 'épico', 'tolkien'], popularidad: 93, es_sistema: true
  },
  {
    id: 'mitologico', nombre: 'Mitológico', categoria: 'Fantasía',
    descripcion: 'Arte inspirado en mitologías antiguas',
    prompt_prefijo: 'mythological art, ancient gods, divine beings, ethereal glow, classical mythology, epic scene',
    prompt_sufijo: 'Greek/Norse mythology inspired, divine atmosphere, legendary',
    negative_boost: 'modern, urban, cartoon, anime, sci-fi',
    quality_boosters: ['masterpiece', 'best quality', 'divine lighting'],
    artistas_referencia: ['Caravaggio', 'Gustave Moreau'],
    modelos_recomendados: ['DreamShaper', 'SDXL'],
    tags: ['fantasía', 'mitología', 'dioses'], popularidad: 82, es_sistema: true
  },
  {
    id: 'cuento-hadas', nombre: 'Cuento de Hadas', categoria: 'Fantasía',
    descripcion: 'Ilustración de cuento de hadas',
    prompt_prefijo: 'fairy tale illustration, enchanted forest, magical creatures, soft ethereal light, whimsical',
    prompt_sufijo: 'storybook art, magical and dreamy, fairy tale atmosphere',
    negative_boost: 'dark, horror, realistic, gritty, modern',
    quality_boosters: ['masterpiece', 'best quality', 'magical atmosphere'],
    artistas_referencia: ['Brian Froud', 'Arthur Rackham'],
    modelos_recomendados: ['DreamShaper'],
    tags: ['fantasía', 'cuento', 'mágico'], popularidad: 84, es_sistema: true
  },
  {
    id: 'dragones', nombre: 'Dragones y Criaturas', categoria: 'Fantasía',
    descripcion: 'Arte de dragones y criaturas fantásticas',
    prompt_prefijo: 'epic dragon, fantasy creature, massive scales, fire breathing, dramatic pose, detailed scales',
    prompt_sufijo: 'creature design, fantasy beast, awe-inspiring',
    negative_boost: 'cute, small, cartoon, simple, modern',
    quality_boosters: ['masterpiece', 'best quality', 'detailed creature'],
    artistas_referencia: ['Terryl Whitlatch', 'Wayne Barlowe'],
    modelos_recomendados: ['DreamShaper', 'SDXL'],
    tags: ['fantasía', 'dragones', 'criaturas'], popularidad: 89, es_sistema: true
  },
  {
    id: 'art-nouveau-fantasy', nombre: 'Art Nouveau Fantasy', categoria: 'Fantasía',
    descripcion: 'Fantasía con estilo Art Nouveau',
    prompt_prefijo: 'art nouveau fantasy, ornamental borders, flowing organic lines, decorative patterns, elegant',
    prompt_sufijo: 'Mucha inspired, decorative fantasy art, ornate',
    negative_boost: 'minimalist, modern, geometric, sci-fi',
    quality_boosters: ['masterpiece', 'best quality', 'ornate details'],
    artistas_referencia: ['Alphonse Mucha', 'Gustav Klimt'],
    modelos_recomendados: ['DreamShaper'],
    tags: ['fantasía', 'art nouveau', 'decorativo'], popularidad: 81, es_sistema: true
  },
  {
    id: 'celta', nombre: 'Fantasía Celta', categoria: 'Fantasía',
    descripcion: 'Arte fantástico con influencias celtas',
    prompt_prefijo: 'celtic fantasy art, knotwork patterns, ancient druidic, misty highlands, mystical runes',
    prompt_sufijo: 'celtic mythology, ancient magic, enchanted',
    negative_boost: 'modern, urban, sci-fi, cartoon',
    quality_boosters: ['masterpiece', 'best quality', 'mystical atmosphere'],
    artistas_referencia: ['Jim Fitzpatrick', 'Ian Miller'],
    modelos_recomendados: ['DreamShaper'],
    tags: ['fantasía', 'celta', 'místico'], popularidad: 76, es_sistema: true
  },
  {
    id: 'steampunk', nombre: 'Steampunk', categoria: 'Fantasía',
    descripcion: 'Estilo steampunk victoriano con tecnología a vapor',
    prompt_prefijo: 'steampunk art, victorian era, brass gears, steam powered machines, clockwork, goggles, airships',
    prompt_sufijo: 'detailed machinery, industrial revolution fantasy, retro-futuristic',
    negative_boost: 'modern, digital, clean, anime, minimalist',
    quality_boosters: ['masterpiece', 'best quality', 'detailed machinery'],
    artistas_referencia: ['Victorian illustrators'],
    modelos_recomendados: ['DreamShaper', 'SDXL'],
    tags: ['fantasía', 'steampunk', 'victoriano'], popularidad: 86, es_sistema: true
  },

  // ========== SCI-FI (6) ==========
  {
    id: 'cyberpunk', nombre: 'Cyberpunk', categoria: 'Sci-Fi',
    descripcion: 'Estilo cyberpunk - alta tecnología, baja vida',
    prompt_prefijo: 'cyberpunk city, neon lights, rain, holographic advertisements, dark streets, futuristic dystopia',
    prompt_sufijo: 'Blade Runner inspired, high tech low life, atmospheric',
    negative_boost: 'nature, medieval, bright, cheerful, cartoon',
    quality_boosters: ['masterpiece', 'best quality', 'neon lighting'],
    artistas_referencia: ['Syd Mead', 'Simon Stålenhag'],
    modelos_recomendados: ['CyberpunkAnime', 'SDXL'],
    tags: ['sci-fi', 'cyberpunk', 'neon'], popularidad: 95, es_sistema: true
  },
  {
    id: 'space-opera', nombre: 'Space Opera', categoria: 'Sci-Fi',
    descripcion: 'Ópera espacial épica',
    prompt_prefijo: 'epic space scene, massive starships, nebula background, alien worlds, cosmic battle',
    prompt_sufijo: 'Star Wars inspired, galactic scale, space opera',
    negative_boost: 'earth, nature, medieval, cartoon, anime',
    quality_boosters: ['masterpiece', 'best quality', 'epic scale'],
    artistas_referencia: ['John Berkey', 'Ralph McQuarrie'],
    modelos_recomendados: ['SDXL', 'DreamShaper'],
    tags: ['sci-fi', 'espacio', 'épico'], popularidad: 88, es_sistema: true
  },
  {
    id: 'post-apocaliptico', nombre: 'Post-Apocalíptico', categoria: 'Sci-Fi',
    descripcion: 'Mundo post-apocalíptico desolado',
    prompt_prefijo: 'post-apocalyptic scene, ruined city, overgrown vegetation, desolate landscape, survival',
    prompt_sufijo: 'Mad Max inspired, wasteland, atmospheric decay',
    negative_boost: 'pristine, clean, modern city, bright, cheerful',
    quality_boosters: ['masterpiece', 'best quality', 'atmospheric'],
    artistas_referencia: ['Simon Stålenhag'],
    modelos_recomendados: ['SDXL', 'DreamShaper'],
    tags: ['sci-fi', 'apocalipsis', 'desolación'], popularidad: 84, es_sistema: true
  },
  {
    id: 'retrofuturismo', nombre: 'Retrofuturismo', categoria: 'Sci-Fi',
    descripcion: 'Futuro visto desde el pasado - años 50-60',
    prompt_prefijo: 'retrofuturism, 1950s future vision, atomic age, flying cars, chrome, bubble helmets, ray guns',
    prompt_sufijo: 'mid-century modern future, vintage sci-fi, optimistic',
    negative_boost: 'modern, dark, gritty, realistic, anime',
    quality_boosters: ['best quality', 'retro aesthetic', 'vintage sci-fi'],
    artistas_referencia: ['Frank R. Paul', 'Chesley Bonestell'],
    modelos_recomendados: ['DreamShaper'],
    tags: ['sci-fi', 'retro', 'futurismo'], popularidad: 79, es_sistema: true
  },
  {
    id: 'alien', nombre: 'Mundo Alien', categoria: 'Sci-Fi',
    descripcion: 'Paisajes y criaturas alienígenas',
    prompt_prefijo: 'alien world, exotic planet, bioluminescent flora, strange creatures, multiple moons, purple sky',
    prompt_sufijo: 'otherworldly, extraterrestrial landscape, alien ecosystem',
    negative_boost: 'earth, human, normal, cartoon, anime',
    quality_boosters: ['masterpiece', 'best quality', 'exotic'],
    artistas_referencia: ['Wayne Barlowe', 'John Berkey'],
    modelos_recomendados: ['SDXL', 'DreamShaper'],
    tags: ['sci-fi', 'alien', 'extraterrestre'], popularidad: 81, es_sistema: true
  },
  {
    id: 'solarpunk', nombre: 'Solarpunk', categoria: 'Sci-Fi',
    descripcion: 'Futuro optimista con energía solar y naturaleza',
    prompt_prefijo: 'solarpunk, green futuristic city, solar panels, vertical gardens, sustainable architecture, bright',
    prompt_sufijo: 'utopian future, harmony with nature, clean energy',
    negative_boost: 'dark, dystopian, polluted, gritty, industrial',
    quality_boosters: ['masterpiece', 'best quality', 'bright and hopeful'],
    artistas_referencia: ['Solarpunk artists'],
    modelos_recomendados: ['SDXL'],
    tags: ['sci-fi', 'solarpunk', 'utopía'], popularidad: 77, es_sistema: true
  },

  // ========== ARTE CLÁSICO (6) ==========
  {
    id: 'oil-painting', nombre: 'Óleo Clásico', categoria: 'Arte Clásico',
    descripcion: 'Pintura al óleo clásica',
    prompt_prefijo: 'oil painting, classical technique, rich brushstrokes, canvas texture, masterful composition',
    prompt_sufijo: 'museum quality, fine art oil painting, classical mastery',
    negative_boost: 'photo, digital, anime, cartoon, modern',
    quality_boosters: ['masterpiece', 'best quality', 'fine art'],
    artistas_referencia: ['Rembrandt', 'Vermeer'],
    modelos_recomendados: ['DreamShaper', 'SDXL'],
    tags: ['arte', 'óleo', 'clásico'], popularidad: 87, es_sistema: true
  },
  {
    id: 'watercolor', nombre: 'Acuarela', categoria: 'Arte Clásico',
    descripcion: 'Pintura en acuarela con transparencias',
    prompt_prefijo: 'watercolor painting, soft washes, paper texture, bleeding colors, delicate brushwork, transparent',
    prompt_sufijo: 'beautiful watercolor art, fluid colors, artistic',
    negative_boost: 'photo, digital, sharp, anime, 3d',
    quality_boosters: ['masterpiece', 'best quality', 'artistic'],
    artistas_referencia: ['J.M.W. Turner', 'John Singer Sargent'],
    modelos_recomendados: ['DreamShaper'],
    tags: ['arte', 'acuarela', 'delicado'], popularidad: 85, es_sistema: true
  },
  {
    id: 'impresionista', nombre: 'Impresionista', categoria: 'Arte Clásico',
    descripcion: 'Estilo impresionista con pinceladas sueltas',
    prompt_prefijo: 'impressionist painting, visible brushstrokes, light effects, vibrant colors, plein air, soft edges',
    prompt_sufijo: 'Monet inspired, beautiful light play, artistic masterpiece',
    negative_boost: 'photo, digital, sharp, anime, geometric',
    quality_boosters: ['masterpiece', 'best quality', 'beautiful light'],
    artistas_referencia: ['Claude Monet', 'Pierre-Auguste Renoir'],
    modelos_recomendados: ['DreamShaper'],
    tags: ['arte', 'impresionismo', 'luz'], popularidad: 89, es_sistema: true
  },
  {
    id: 'art-nouveau', nombre: 'Art Nouveau', categoria: 'Arte Clásico',
    descripcion: 'Estilo Art Nouveau con líneas orgánicas',
    prompt_prefijo: 'art nouveau style, ornamental, flowing organic lines, decorative patterns, elegant, Mucha inspired',
    prompt_sufijo: 'decorative art, beautiful borders, sophisticated',
    negative_boost: 'minimalist, modern, geometric, rough, anime',
    quality_boosters: ['masterpiece', 'best quality', 'ornate'],
    artistas_referencia: ['Alphonse Mucha', 'Gustav Klimt'],
    modelos_recomendados: ['DreamShaper'],
    tags: ['arte', 'nouveau', 'decorativo'], popularidad: 83, es_sistema: true
  },
  {
    id: 'surrealista', nombre: 'Surrealista', categoria: 'Arte Clásico',
    descripcion: 'Arte surrealista con elementos oníricos',
    prompt_prefijo: 'surrealist art, dreamlike, impossible geometry, melting forms, subconscious imagery, bizarre',
    prompt_sufijo: 'Dali inspired, mind-bending, artistic surrealism',
    negative_boost: 'realistic, normal, photo, anime, cartoon',
    quality_boosters: ['masterpiece', 'best quality', 'surreal'],
    artistas_referencia: ['Salvador Dalí', 'René Magritte'],
    modelos_recomendados: ['DreamShaper', 'SDXL'],
    tags: ['arte', 'surrealismo', 'onírico'], popularidad: 86, es_sistema: true
  },
  {
    id: 'art-deco', nombre: 'Art Deco', categoria: 'Arte Clásico',
    descripcion: 'Estilo Art Deco geométrico y elegante',
    prompt_prefijo: 'art deco style, geometric patterns, gold accents, symmetrical, luxurious, 1920s elegance',
    prompt_sufijo: 'Great Gatsby era, sophisticated design, ornamental',
    negative_boost: 'organic, rough, messy, anime, cartoon',
    quality_boosters: ['best quality', 'elegant', 'luxurious'],
    artistas_referencia: ['Tamara de Lempicka', 'Erté'],
    modelos_recomendados: ['DreamShaper'],
    tags: ['arte', 'deco', 'elegante'], popularidad: 80, es_sistema: true
  },

  // ========== 3D RENDER (4) ==========
  {
    id: 'octane-render', nombre: 'Octane Render', categoria: '3D Render',
    descripcion: 'Render 3D estilo Octane - fotorrealista',
    prompt_prefijo: 'octane render, 3D, photorealistic, ray tracing, global illumination, subsurface scattering',
    prompt_sufijo: 'high-end 3D render, physically based rendering, stunning',
    negative_boost: '2d, flat, sketch, cartoon, anime, painting',
    quality_boosters: ['masterpiece', 'best quality', 'octane render'],
    artistas_referencia: ['3D artists'],
    modelos_recomendados: ['SDXL', 'RealisticVision'],
    tags: ['3d', 'render', 'octane'], popularidad: 91, es_sistema: true
  },
  {
    id: 'unreal-engine', nombre: 'Unreal Engine', categoria: '3D Render',
    descripcion: 'Render estilo Unreal Engine 5',
    prompt_prefijo: 'unreal engine 5 render, real-time rendering, nanite geometry, lumen lighting, game quality',
    prompt_sufijo: 'next-gen graphics, ultra realistic 3D, AAA game quality',
    negative_boost: '2d, flat, sketch, low poly, cartoon',
    quality_boosters: ['masterpiece', 'best quality', 'unreal engine'],
    artistas_referencia: ['Epic Games artists'],
    modelos_recomendados: ['SDXL'],
    tags: ['3d', 'unreal', 'gaming'], popularidad: 88, es_sistema: true
  },
  {
    id: 'blender', nombre: 'Blender 3D', categoria: '3D Render',
    descripcion: 'Render 3D estilo Blender',
    prompt_prefijo: 'blender 3D render, cycles render, detailed modeling, professional 3D art, clean render',
    prompt_sufijo: 'high quality 3D, detailed mesh, professional lighting',
    negative_boost: '2d, flat, sketch, low quality, cartoon',
    quality_boosters: ['masterpiece', 'best quality', '3D render'],
    artistas_referencia: ['Blender artists'],
    modelos_recomendados: ['SDXL'],
    tags: ['3d', 'blender', 'modelado'], popularidad: 84, es_sistema: true
  },
  {
    id: 'isometrico', nombre: 'Isométrico', categoria: '3D Render',
    descripcion: 'Vista isométrica estilo diorama 3D',
    prompt_prefijo: 'isometric view, 3D diorama, cute miniature, isometric art, detailed tiny world, game asset style',
    prompt_sufijo: 'isometric render, clean background, adorable 3D',
    negative_boost: 'perspective, realistic photo, anime, dark',
    quality_boosters: ['best quality', 'detailed', 'cute'],
    artistas_referencia: ['Isometric artists'],
    modelos_recomendados: ['SDXL'],
    tags: ['3d', 'isométrico', 'diorama'], popularidad: 82, es_sistema: true
  },

  // ========== PIXEL ART (2) ==========
  {
    id: 'pixel-8bit', nombre: 'Pixel Art 8-bit', categoria: 'Pixel Art',
    descripcion: 'Pixel art estilo 8-bit retro',
    prompt_prefijo: '8-bit pixel art, retro game sprite, limited color palette, pixelated, NES style',
    prompt_sufijo: 'classic retro gaming, nostalgic pixel art, 8-bit era',
    negative_boost: 'realistic, 3d, smooth, high resolution, photo',
    quality_boosters: ['best quality', 'pixel perfect', 'retro'],
    artistas_referencia: ['Retro game artists'],
    modelos_recomendados: ['PixelArt'],
    tags: ['pixel', 'retro', '8bit'], popularidad: 79, es_sistema: true
  },
  {
    id: 'pixel-16bit', nombre: 'Pixel Art 16-bit', categoria: 'Pixel Art',
    descripcion: 'Pixel art estilo 16-bit SNES/Genesis',
    prompt_prefijo: '16-bit pixel art, SNES era, detailed sprites, richer palette, retro RPG style',
    prompt_sufijo: 'classic 16-bit gaming, detailed pixel art, nostalgic',
    negative_boost: 'realistic, 3d, smooth, photo, modern',
    quality_boosters: ['best quality', 'pixel perfect', 'detailed pixels'],
    artistas_referencia: ['SNES era artists'],
    modelos_recomendados: ['PixelArt'],
    tags: ['pixel', 'retro', '16bit'], popularidad: 77, es_sistema: true
  },

  // ========== OTROS (6) ==========
  {
    id: 'horror-gothic', nombre: 'Horror Gótico', categoria: 'Otros',
    descripcion: 'Arte de horror gótico y oscuro',
    prompt_prefijo: 'gothic horror art, dark atmosphere, haunted, eerie, shadows, macabre, Victorian horror',
    prompt_sufijo: 'horror masterpiece, terrifying atmosphere, dark art',
    negative_boost: 'bright, cheerful, cute, cartoon, anime, happy',
    quality_boosters: ['masterpiece', 'best quality', 'dark atmosphere'],
    artistas_referencia: ['H.R. Giger', 'Junji Ito'],
    modelos_recomendados: ['DreamShaper', 'SDXL'],
    tags: ['horror', 'gótico', 'oscuro'], popularidad: 83, es_sistema: true
  },
  {
    id: 'minimalista', nombre: 'Minimalista', categoria: 'Otros',
    descripcion: 'Arte minimalista con elementos simples',
    prompt_prefijo: 'minimalist art, clean lines, simple shapes, negative space, elegant simplicity, modern',
    prompt_sufijo: 'less is more, clean design, sophisticated minimalism',
    negative_boost: 'complex, detailed, busy, cluttered, ornate',
    quality_boosters: ['best quality', 'clean', 'elegant'],
    artistas_referencia: ['Donald Judd', 'Agnes Martin'],
    modelos_recomendados: ['SDXL'],
    tags: ['minimalista', 'limpio', 'moderno'], popularidad: 75, es_sistema: true
  },
  {
    id: 'abstracto', nombre: 'Abstracto', categoria: 'Otros',
    descripcion: 'Arte abstracto con formas y colores',
    prompt_prefijo: 'abstract art, bold colors, geometric shapes, expressive brushstrokes, non-representational',
    prompt_sufijo: 'contemporary abstract, artistic expression, dynamic composition',
    negative_boost: 'realistic, photo, figurative, anime, cartoon',
    quality_boosters: ['masterpiece', 'best quality', 'artistic'],
    artistas_referencia: ['Kandinsky', 'Pollock'],
    modelos_recomendados: ['DreamShaper', 'SDXL'],
    tags: ['abstracto', 'arte', 'expresivo'], popularidad: 78, es_sistema: true
  },
  {
    id: 'lowpoly', nombre: 'Low Poly', categoria: 'Otros',
    descripcion: 'Estilo low poly con geometrías simples',
    prompt_prefijo: 'low poly art, geometric shapes, faceted surfaces, minimalist 3D, colorful polygons',
    prompt_sufijo: 'clean low poly style, modern geometric art',
    negative_boost: 'realistic, detailed, smooth, photo, organic',
    quality_boosters: ['best quality', 'clean', 'geometric'],
    artistas_referencia: ['Low poly artists'],
    modelos_recomendados: ['SDXL'],
    tags: ['lowpoly', 'geométrico', 'moderno'], popularidad: 74, es_sistema: true
  },
  {
    id: 'papercraft', nombre: 'Paper Craft', categoria: 'Otros',
    descripcion: 'Arte en papel recortado estilo diorama',
    prompt_prefijo: 'paper craft art, cut paper layers, diorama, paper sculpture, layered paper art, craft',
    prompt_sufijo: 'handmade paper art, beautiful layered paper, artistic craft',
    negative_boost: 'realistic, digital, 3d render, photo, dark',
    quality_boosters: ['best quality', 'detailed', 'craft'],
    artistas_referencia: ['Paper artists', 'Quilling artists'],
    modelos_recomendados: ['SDXL'],
    tags: ['papel', 'craft', 'diorama'], popularidad: 72, es_sistema: true
  },
  {
    id: 'vaporwave', nombre: 'Vaporwave', categoria: 'Otros',
    descripcion: 'Estética vaporwave con colores pastel y retro',
    prompt_prefijo: 'vaporwave aesthetic, pink and purple, retro 80s, neon grid, marble statues, palm trees, sunset',
    prompt_sufijo: 'aesthetic vaporwave, retro digital art, nostalgic 80s',
    negative_boost: 'realistic, dark, horror, natural, anime',
    quality_boosters: ['best quality', 'aesthetic', 'retro'],
    artistas_referencia: ['Vaporwave artists'],
    modelos_recomendados: ['SDXL'],
    tags: ['vaporwave', 'retro', 'estética'], popularidad: 80, es_sistema: true
  },
];

export default estilosIniciales;
