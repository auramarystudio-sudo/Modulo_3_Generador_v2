# 🎨 Guía Completa del Generador de Prompts Avanzado

¡Bienvenido! Esta guía te ayudará a usar todas las 35 mejoras integradas en el generador de prompts. No necesitas experiencia previa, todo está diseñado para ser intuitivo y fácil de usar.

---

## 📚 Tabla de Contenidos

1. [Conceptos Básicos](#conceptos-básicos)
2. [Interfaz Principal](#interfaz-principal)
3. [Las 35 Mejoras Explicadas](#las-35-mejoras-explicadas)
4. [Flujo de Trabajo Recomendado](#flujo-de-trabajo-recomendado)
5. [Atajos de Teclado](#atajos-de-teclado)
6. [Consejos para Principiantes](#consejos-para-principiantes)

---

## 🎯 Conceptos Básicos

### ¿Qué es un Prompt?
Un **prompt** es el texto que le dice a la IA qué imagen quieres generar. Es como darle instrucciones detalladas.

**Ejemplo simple:**
```
a beautiful landscape with mountains and a lake
```

**Ejemplo avanzado:**
```
masterpiece, best quality, stunning mountain landscape, crystal clear lake, 
golden hour lighting, dramatic clouds, 8k resolution, photorealistic
```

### ¿Qué es un Negative Prompt?
El **negative prompt** le dice a la IA qué NO quieres ver en la imagen.

**Ejemplo:**
```
blurry, low quality, deformed, ugly, watermark, text
```

### ¿Qué son los Tokens?
Los **tokens** son las unidades que la IA procesa. Como regla general:
- 1 token ≈ 4 caracteres o 0.75 palabras en inglés
- Un prompt de 75 tokens es óptimo
- Más de 100 tokens puede ser demasiado

---

## 🖥️ Interfaz Principal

### Header (Parte Superior)
Aquí encontrarás los botones de acceso rápido:

| Botón | Función |
|-------|---------|
| 📖 **Tutorial** | Guía interactiva paso a paso |
| 📚 **Glosario** | Diccionario de términos técnicos |
| 🏆 **Logros** | Sistema de logros desbloqueables |
| ⭐ **Favoritos** | Tus prompts guardados |
| ⌨️ **Atajos** | Lista de atajos de teclado |
| ↩️ **Undo** | Deshacer último cambio |
| ↪️ **Redo** | Rehacer cambio deshecho |
| 🎯 **Focus** | Modo concentración (oculta panel derecho) |
| 📜 **Historial** | Todos tus prompts anteriores |
| 💾 **Guardar** | Guardar prompt actual |

### Columna Izquierda (Editor Principal)
Aquí es donde creas tus prompts:

1. **Sujeto / Idea Base**: Describe qué quieres generar
2. **Prompt Positivo**: El prompt completo (se genera automáticamente)
3. **Prompt Negativo**: Lo que NO quieres ver
4. **Prompt Final**: Versión optimizada lista para copiar
5. **Cards de Herramientas**: Todas las mejoras adicionales

### Columna Derecha (Panel de Herramientas)
5 pestañas con diferentes herramientas:

- **Estilos**: Biblioteca de 56 estilos visuales
- **Boosters**: Mejoras de calidad y detalles
- **Macros**: Atajos que expanden a múltiples términos
- **Negativos**: Prompts negativos por categoría
- **Plantillas**: Prompts predefinidos con variables

---

## 🚀 Las 35 Mejoras Explicadas

### Mejora #1: Detector de Conflictos ⚠️
**¿Qué hace?** Analiza tu prompt y detecta términos contradictorios.

**Ejemplo:**
- Si escribes "realistic" y "cartoon" → Te avisa del conflicto
- Muestra un porcentaje de coherencia (0-100%)

**Cómo usarlo:**
- Automático: Se muestra debajo del prompt positivo
- Verde = sin conflictos, Amarillo = conflictos menores, Rojo = conflictos graves

---

### Mejora #2: Análisis de Frecuencia 📈
**¿Qué hace?** Te muestra qué términos usas más frecuentemente.

**Cómo usarlo:**
- Automático: Analiza tu historial de prompts
- Útil para identificar tus patrones de uso

---

### Mejora #3: Estimador de Complejidad ⏱️
**¿Qué hace?** Estima el tiempo de generación y nivel de complejidad.

**Niveles:**
- Simple: 5-10 segundos
- Moderada: 10-20 segundos
- Compleja: 20-30 segundos
- Muy compleja: 30-60 segundos

**Cómo usarlo:**
- Automático: Se muestra junto al contador de tokens

---

### Mejora #4: Prompt DNA 🧬
**¿Qué hace?** Genera un "código de barras" visual único para cada prompt.

**Para qué sirve:**
- Identificar prompts similares de un vistazo
- Organizar visualmente tu historial

**Cómo usarlo:**
- Automático: Se muestra como barras verticales de colores

---

### Mejora #5: Mood Board Automático 🎭
**¿Qué hace?** Analiza el "mood" o atmósfera de tu prompt.

**Moods detectados:**
- Oscuro, Alegre, Épico, Misterioso, Romántico, Nostálgico, Futurista, Natural, Minimalista, Caótico

**Cómo usarlo:**
- Automático: Se muestra debajo del análisis de coherencia

---

### Mejora #6: Timeline de Evolución 📅
**¿Qué hace?** Muestra cómo han evolucionado tus prompts en el tiempo.

**Cómo usarlo:**
- Revisa tu historial para ver tu progreso

---

### Mejora #7: Sistema de Logros 🏆
**¿Qué hace?** Desbloquea logros según tu uso.

**Logros disponibles:**
- 🎉 Primer Paso: Genera tu primer prompt
- 🔥 En Racha: Genera 10 prompts
- 💯 Centurión: Genera 100 prompts
- 🤖 Cyberpunk Master: Usa cyberpunk 10 veces
- 🌟 Explorador: Usa 10 estilos diferentes
- ⭐ Perfeccionista: 5 prompts con rating 5
- 📚 Coleccionista: Crea 5 presets
- 🌐 Bilingüe: Traduce 20 prompts
- ✨ Menos es Más: Prompt con <10 tokens
- 🎨 Detalle Total: Prompt con >50 tokens

**Cómo usarlo:**
- Clic en el botón 🏆 del header
- Los logros se desbloquean automáticamente

---

### Mejora #8: Modo Exploración 🧭
**¿Qué hace?** Genera prompts aleatorios temáticamente relacionados.

**Cómo usarlo:**
- Usa el botón "Aleatorio" para explorar variaciones

---

### Mejora #9: Sistema de Favoritos ⭐
**¿Qué hace?** Guarda prompts importantes para acceso rápido.

**Cómo usarlo:**
1. Clic en "⭐ Favorito" en el prompt final
2. Dale un nombre
3. Accede desde el botón ⭐ del header
4. Exporta como JSON o CSV
5. Importa desde archivo

---

### Mejora #10: Importar/Exportar Colecciones 📦
**¿Qué hace?** Exporta e importa tus favoritos.

**Formatos:**
- JSON: Para backup y compartir
- CSV: Para Excel/Google Sheets

**Cómo usarlo:**
- En la card de Favoritos, usa los botones de descarga/subida

---

### Mejora #11: Versionado de Prompts 🔀
**¿Qué hace?** Sistema tipo Git para prompts (usando historial).

**Cómo usarlo:**
- Usa el historial para ver versiones anteriores
- Combina con favoritos para "commits" importantes

---

### Mejora #12: Generador por Emociones 😊😢😠
**¿Qué hace?** Genera prompts optimizados para emociones específicas.

**Emociones disponibles:**
- 😊 Alegría
- 😢 Tristeza
- 🔮 Misterio
- 😱 Terror
- 🥺 Nostalgia
- 💕 Romance
- 🗺️ Aventura
- 😌 Calma

**Cómo usarlo:**
1. Clic en "❤️ Emociones" en el prompt final
2. Selecciona una emoción
3. El prompt se genera automáticamente

---

### Mejora #13: Recetas Probadas 🧪
**¿Qué hace?** Combinaciones pre-validadas que funcionan muy bien.

**Recetas incluidas:**
- Retrato Rembrandt (⭐ 4.8)
- Cyberpunk Noir (⭐ 4.9)
- Paisaje Ghibli (⭐ 4.7)
- Fantasía Épica (⭐ 4.6)
- Anime Shonen (⭐ 4.5)

**Cómo usarlo:**
1. Clic en "💡 Recetas" en el prompt final
2. Revisa las recetas con su rating y dificultad
3. Clic en "Usar" para aplicar

---

### Mejora #14: Negative Prompt Generator 🚫
**¿Qué hace?** Genera negative prompts automáticamente.

**Cómo usarlo:**
1. Clic en "🚫 Auto-sugerir" junto al negative
2. Selecciona lo que NO quieres
3. Se genera automáticamente

---

### Mejora #15: Compartir Prompts 🌐
**¿Qué hace?** Genera un link compartible de tu prompt.

**Cómo usarlo:**
1. Clic en "🔗 Compartir" en el prompt final
2. El link se copia al portapapeles
3. Compártelo con quien quieras

---

### Mejora #16: Reverse Prompt Engineering 🔄
**¿Qué hace?** Genera prompts a partir de imágenes (próximamente).

**Estado:** Requiere configuración de API de visión

---

### Mejora #17: Integración con APIs 🔌
**¿Qué hace?** Conecta con APIs de generación de imágenes.

**APIs soportadas:**
- Stable Diffusion API (disponible)
- DALL-E 3 (próximamente)
- Midjourney API (próximamente)
- Leonardo.ai (próximamente)

**Cómo usarlo:**
- Configura en la sección de envío del prompt final

---

### Mejora #18: Temas Personalizables 🎨
**¿Qué hace?** Cambia el tema visual de la interfaz.

**Temas disponibles:**
- Oscuro (default)
- Claro
- Medianoche

**Cómo usarlo:**
- Próximamente en configuración

---

### Mejora #19: Layout Personalizable 📐
**¿Qué hace?** Cambia el diseño de la interfaz.

**Layouts:**
- Clásico: 2 columnas
- Ancho: Panel derecho más grande
- Estrecho: Panel derecho más pequeño
- Focus: Solo editor

**Cómo usarlo:**
- Usa el botón 🎯 Focus para modo concentración

---

### Mejora #20: Perfiles de Usuario 👤
**¿Qué hace?** Múltiples perfiles para diferentes usos.

**Tipos de perfil:**
- Personal
- Trabajo
- Proyecto

**Cómo usarlo:**
- Próximamente en configuración

---

### Mejora #21: Generación Programada ⏰
**¿Qué hace?** Programa generación automática de prompts.

**Cómo usarlo:**
- Próximamente

---

### Mejora #22: A/B Testing Automático 🧪
**¿Qué hace?** Genera variantes y evalúa cuál funciona mejor.

**Cómo usarlo:**
- Usa "Variantes" para generar A/B testing manual

---

### Mejora #23: Macro Recorder 🎬
**¿Qué hace?** Graba secuencias de acciones para repetirlas.

**Cómo usarlo:**
- Próximamente

---

### Mejora #24: Tutorial Interactivo 🎓
**¿Qué hace?** Guía paso a paso para principiantes.

**Cómo usarlo:**
1. Clic en el botón 📖 del header
2. Sigue los 6 pasos del tutorial
3. Aprende los conceptos básicos

---

### Mejora #25: Glosario de Términos 📖
**¿Qué hace?** Diccionario de términos técnicos con ejemplos.

**Términos incluidos:**
- prompt, negative prompt, masterpiece, best quality
- booster, macro, estilo, token
- CFG Scale, sampler, steps, seed
- checkpoint, LoRA, embedding

**Cómo usarlo:**
1. Clic en el botón 📚 del header
2. Busca cualquier término
3. Lee la definición y ejemplo

---

### Mejoras #26-35: Las 10 Mejoras Originales

#### 26. Presets Rápidos 📚
Combinaciones predefinidas de estilos+boosters+macros.

#### 27. Batch Generator 🔄
Genera múltiples prompts variando parámetros.

#### 28. Wildcard System 🎲
Sintaxis `{a|b|c}` para generar combinaciones.

#### 29. Embedding/LoRA Helper 🧩
Panel para insertar embeddings y LoRAs.

#### 30. Undo/Redo System ↩️↪️
Historial de cambios con Ctrl+Z / Ctrl+Y.

#### 31. Negative Prompt Assistant 🚫
Sugiere negativos automáticamente.

#### 32. Prompt Comparison View 👁️
Compara dos prompts lado a lado.

#### 33. Auto-Save Draft 💾
Guarda automáticamente cada 2 segundos.

#### 34. Regional Prompter 🗺️
Configura prompts por regiones de la imagen.

#### 35. Keyboard Shortcut Cheat Sheet ⌨️
Lista completa de atajos de teclado.

---

## 🔄 Flujo de Trabajo Recomendado

### Para Principiantes:

1. **Inicia el Tutorial** (📖)
2. **Escribe tu idea** en "Sujeto / Idea Base"
3. **Selecciona un estilo** en el panel derecho
4. **Revisa el prompt generado** automáticamente
5. **Copia y usa** el prompt

### Para Usuarios Intermedios:

1. **Escribe tu idea**
2. **Selecciona 2-3 estilos** y ajusta pesos
3. **Añade boosters** específicos
4. **Revisa coherencia** y conflictos
5. **Usa una receta** probada si quieres
6. **Copia y usa**

### Para Usuarios Avanzados:

1. **Usa macros** para prompts complejos
2. **Combina estilos** con pesos específicos
3. **Añade embeddings/LoRAs**
4. **Usa wildcards** para exploración masiva
5. **Genera batch** de variantes
6. **Guarda como preset** para reutilizar

---

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + Enter` | Generar prompt final |
| `Ctrl + S` | Guardar en historial |
| `Ctrl + Shift + C` | Copiar prompt |
| `Ctrl + T` | Toggle traducción ES→EN |
| `Ctrl + Z` | Deshacer |
| `Ctrl + Y` | Rehacer |
| `Ctrl + P` | Abrir presets |
| `Ctrl + B` | Abrir batch generator |
| `Ctrl + R` | Generar aleatorio |
| `Ctrl + F` | Toggle modo focus |
| `Esc` | Cerrar modal/card |

---

## 💡 Consejos para Principiantes

### 1. Empieza Simple
No intentes crear prompts complejos al principio. Comienza con:
```
a beautiful landscape, masterpiece, best quality
```

### 2. Usa Estilos Predefinidos
Los 56 estilos incluidos están probados y funcionan bien. Empieza con:
- **Fotorrealismo**: retrato-estudio, paisaje-natural
- **Anime**: shonen, ghibli
- **Fantasía**: high-fantasy, dark-fantasy

### 3. Añade Términos de Calidad
Siempre incluye:
```
masterpiece, best quality, highly detailed
```

### 4. Especifica la Iluminación
La iluminación es crucial:
```
cinematic lighting, dramatic shadows, golden hour
```

### 5. Usa Negative Prompts
Siempre añade un negative prompt básico:
```
worst quality, low quality, blurry, deformed
```

### 6. Experimenta con Recetas
Las recetas probadas son un excelente punto de partida.

### 7. Guarda tus Favoritos
Cuando encuentres un prompt que funcione bien, guárdalo como favorito.

### 8. Aprende del Glosario
Si no entiendes un término, búscalo en el glosario (📚).

### 9. Usa el Tutorial
Si eres completamente nuevo, el tutorial interactivo te guiará paso a paso.

### 10. No Tengas Miedo de Experimentar
La mejor forma de aprender es probando diferentes combinaciones.

---

## 🎓 Glosario Rápido

**Prompt**: Texto que describe lo que quieres generar

**Negative Prompt**: Texto que describe lo que NO quieres

**Token**: Unidad de texto que la IA procesa (~4 caracteres)

**Booster**: Término que mejora aspectos específicos

**Macro**: Atajo que expande a múltiples términos

**Estilo**: Conjunto de términos que definen el aspecto visual

**CFG Scale**: Controla qué tan fielmente sigue la IA tu prompt (7 es bueno)

**Steps**: Número de iteraciones de refinamiento (20-30 es típico)

**Seed**: Número aleatorio que controla la generación

**Checkpoint**: Modelo de IA entrenado para generar imágenes

**LoRA**: Modelo pequeño que añade estilos específicos

**Embedding**: Representación textual entrenada

---

## 🎯 Ejemplos Prácticos

### Ejemplo 1: Retrato Simple
```
Sujeto: a young woman with brown hair
Estilo: retrato-estudio
Prompt resultante: professional studio portrait, softbox lighting, a young woman with brown hair, sharp focus, 85mm lens, high resolution, detailed skin texture, masterpiece, best quality
```

### Ejemplo 2: Paisaje con Receta
```
Usa la receta "Paisaje Ghibli":
Studio Ghibli style, beautiful landscape, lush green nature, fluffy clouds, peaceful atmosphere, hand-painted, masterpiece
```

### Ejemplo 3: Cyberpunk con Emoción
```
1. Selecciona emoción "Misterio"
2. Añade estilo "cyberpunk"
3. Resultado: cyberpunk city, neon lights, mysterious, fog, shadow, hidden, dark, eerie, masterpiece, best quality
```

### Ejemplo 4: Batch con Wildcards
```
Prompt: {red|blue|green} dragon, epic, masterpiece
Resultado: 3 prompts (uno por cada color)
```

---

## 🚀 Siguientes Pasos

1. **Completa el tutorial** interactivo
2. **Explora el glosario** para entender los términos
3. **Prueba las recetas** probadas
4. **Experimenta con emociones**
5. **Guarda tus favoritos**
6. **Desbloquea logros**
7. **Comparte tus prompts**

---

## 📞 Soporte

Si tienes preguntas o problemas:
- Revisa el glosario (📚)
- Consulta el tutorial (📖)
- Revisa los atajos de teclado (⌨️)
- Experimenta sin miedo, ¡no puedes romper nada!

---

## 🎉 ¡Disfruta Creando!

Este generador de prompts tiene todo lo que necesitas para crear prompts profesionales. No importa si eres principiante o experto, las 35 mejoras te ayudarán a trabajar de manera más eficiente y creativa.

**Recuerda:**
- La práctica hace al maestro
- No tengas miedo de experimentar
- Guarda tus mejores prompts
- Aprende de tus errores
- ¡Diviértete creando!

---

*Versión 2.0 - 35 Mejoras Integradas*
*Última actualización: 2026*
