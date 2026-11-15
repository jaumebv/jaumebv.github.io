window.I18N_ES = {
  "meta.title": "Simulación de Partículas Dipolares — CUDA y OpenCL · Jaume Berbel",
  "meta.desc": "Simulación 3D en GPU de hasta 1 millón de partículas cargadas en tiempo real, implementada en CUDA y OpenCL con interoperabilidad zero-copy con OpenGL.",
  "a11y.skip": "Saltar al contenido",

  "hero.crumb": "CÓMPUTO GPU · 2023/24",
  "hero.title": "Partículas<br><span class=\"serif\">Dipolares</span>",
  "hero.lede": "Simulación 3D en tiempo real de un campo eléctrico dipolar en C++, implementada dos veces —en CUDA y en OpenCL— con interoperabilidad zero-copy GPU/OpenGL hasta 1.000.000 de partículas.",
  "badge.1m": "1M Partículas en Tiempo Real",
  "badge.interop": "Zero-Copy GL Interop",

  "fact.lang.k": "Lenguaje",
  "fact.api.k": "APIs de cómputo",
  "fact.ren.k": "Renderizado",
  "fact.scale.k": "Escala",
  "fact.scale.v": "5K – 1.000.000 partículas",

  "ov.title": "Resumen",
  "ov.p1": "<strong>Simulación de Partículas Dipolares</strong> calcula el movimiento de partículas cargadas dentro de un campo eléctrico 3D íntegramente en la GPU, eliminando copias CPU–GPU gracias a la interoperabilidad directa de buffers con OpenGL.",
  "ov.p2": "Al implementar exactamente la misma simulación en <strong>CUDA</strong> y en <strong>OpenCL</strong> —con Raylib para ventana y cámara y OpenGL para dibujar los buffers de partículas—, el proyecto funciona como comparativa directa de ergonomía, rendimiento y portabilidad.",

  "m.1": "Partículas cargadas integradas y renderizadas por frame en tiempo real",
  "m.2.u": "copias CPU",
  "m.2": "Simulación y render comparten memoria GPU mediante buffers interop con OpenGL",
  "m.3.u": "APIs",
  "m.3": "Mismos kernels de física medidos y comparados en CUDA y OpenCL",

  "feat.eyebrow": "Implementaciones",
  "feat.title": "Dos backends <span class=\"serif\">paralelos.</span>",

  "f1.title": "Kernel CUDA y RNG propio por índice de hilo",
  "f1.p": "Cada hilo CUDA calcula las fuerzas del campo dipolar y actualiza las posiciones directamente sobre los vertex buffer objects mapeados mediante interoperabilidad CUDA–OpenGL.",
  "f1.b1": "<strong>Sustitución de cuRAND:</strong> Un generador pseudoaleatorio ligero basado en el índice de hilo redujo la presión de registros y estabilizó el frametime con 1.000.000 de partículas.",
  "f1.b2": "<strong>Escalado fluido:</strong> Probado con estabilidad desde nubes densas de 1M hasta trazas detalladas de 5.000 partículas.",
  "f1.c1": "RNG propio",
  "f1.c2": "Interop GL",
  "f1.cap": "1.000.000 de partículas simuladas en vivo con CUDA",

  "f2.title": "Kernel OpenCL y Buffers Compartidos con GL",
  "f2.p": "Replica la arquitectura de CUDA sobre el runtime de OpenCL, vinculando los VBOs de OpenGL como objetos de memoria compartida (<code>clCreateFromGLBuffer</code>) sin salir de la GPU.",
  "f2.b1": "<strong>Sin transferencia al host:</strong> La sincronización acquire/release bloquea el buffer GL para las pasadas de cómputo sin tocar la RAM del sistema.",
  "f2.b2": "<strong>Rendimiento equivalente:</strong> Iguala la eficiencia de memoria y fluidez de CUDA tanto en configuraciones de 5K como de 1M de partículas.",
  "f2.c1": "Multi-fabricante",
  "f2.c2": "VBOs compartidos",
  "f2.cap": "Modo de trazado con 5.000 partículas",

  "cmp.eyebrow": "Conclusiones del benchmark",
  "cmp.title": "CUDA frente a <span class=\"serif\">OpenCL.</span>",
  "cmp.cuda.p": "Ofreció una velocidad pico ligeramente superior e iteración más ágil gracias a las optimizaciones de su compilador y herramientas integradas de NVIDIA.",
  "cmp.cuda.b1": "Sintaxis de lanzamiento de kernels más directa y menos código auxiliar",
  "cmp.cuda.b2": "El PRNG propio por índice de hilo eliminó la sobrecarga de cuRAND y suavizó el frame pacing",
  "cmp.cuda.b3": "Mejor relación rendimiento/desarrollo sobre hardware NVIDIA",
  "cmp.cl.p": "Igualó el escalado a 1M de partículas de CUDA abriendo la ejecución a GPUs no NVIDIA y dispositivos heterogéneos.",
  "cmp.cl.b1": "Portabilidad independiente de fabricante entre drivers y GPUs",
  "cmp.cl.b2": "La inicialización explícita de plataforma, dispositivo y contexto requiere mayor gestión de errores",
  "cmp.cl.b3": "Consumo de memoria equivalente usando objetos de buffer compartidos con OpenGL",

  "next.title": "Shooter Multijugador Cross-Engine"
};
