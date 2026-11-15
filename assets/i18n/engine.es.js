window.I18N_ES = {
  "meta.title": "Mordibonx — Motor de Renderizado en C++ · Jaume Berbel",
  "meta.desc": "Motor de renderizado propio en C++ y OpenGL con pipelines forward y deferred, G-Buffer, shadow mapping, ECS, job system multihilo y editor ImGui.",
  "a11y.skip": "Saltar al contenido",

  "hero.crumb": "MOTOR GRÁFICO PROPIO · 2023/24",
  "hero.sub": "Motor de Renderizado",
  "hero.lede": "Un motor de renderizado en C++ construido desde cero sobre OpenGL y GLSL: pipelines forward y deferred, arquitectura ECS, job system multihilo y herramientas de depuración en vivo con ImGui.",
  "badge.deferred": "G-Buffer Diferido",
  "badge.jobs": "Job System Multihilo",

  "fact.lang.k": "Lenguaje",
  "fact.api.k": "API Gráfica",
  "fact.arch.k": "Arquitectura",
  "fact.arch.v": "ECS · Job System multihilo",
  "fact.duration": "7+ meses · 2023/24",

  "ov.title": "Resumen",
  "ov.p1": "<strong>Mordibonx</strong> nació desde cero en C++ y OpenGL para implementar técnicas modernas de renderizado en tiempo real y arquitectura de bajo nivel sin apoyarse en motores comerciales.",
  "ov.p2": "Durante más de siete meses de desarrollo junto a <a href=\"https://cervath.github.io/\" target=\"_blank\" rel=\"noopener\">Guillem Llorach</a>, diseñamos un Entity Component System, gestor de recursos con carga asíncrona, job system multihilo, doble pipeline forward y deferred, shadow mapping para todo tipo de luces y editor interactivo en ImGui.",

  "m.1.u": "pipelines",
  "m.1": "Renderizado forward y deferred con G-Buffer intercambiables en tiempo de ejecución",
  "m.2.u": "tipos de luz",
  "m.2": "Luces direccionales, focales y puntuales omnidireccionales con mapas de sombras",
  "m.3.u": "meses",
  "m.3": "Construido desde cero con ECS propio, job system e inspector en vivo con ImGui",

  "feat.eyebrow": "Sistemas centrales",
  "feat.title": "Dentro de la <span class=\"serif\">arquitectura.</span>",

  "f1.title": "ECS, Gestor de Recursos y Job System",
  "f1.p": "Estructurado en torno a un Entity Component System para organizar los datos de forma modular, orquestado por una clase Engine que gestiona ventana, ciclo de vida de shaders y modos de render.",
  "f1.b1": "<strong>Job system multihilo:</strong> Descarga el parseo de modelos y escritura a disco en hilos secundarios para no bloquear el bucle de render.",
  "f1.b2": "<strong>Editor ImGui en vivo:</strong> Permite inspeccionar entidades, cambiar modos de render, ajustar postprocesado y depurar luces en tiempo real.",
  "f1.c1": "Job System",
  "f1.cap": "Inspección de escena en vivo y control de luces",

  "f2.title": "Renderizado Forward y Deferred con Sombras",
  "f2.p": "Soporta tanto iluminación forward por objeto para escenas ligeras como un pipeline deferred multipasada mediante G-Buffer que desacopla la geometría del coste de iluminación.",
  "f2.b1": "<strong>Shadow mapping completo:</strong> Mapas de profundidad para luces direccionales y focales, además de cubemaps para luces puntuales.",
  "f2.b2": "<strong>Iluminación aditiva multipasada:</strong> Acumula cada luz sobre los buffers del G-Buffer en espacio de pantalla.",
  "f2.c1": "Sombras con cubemap",
  "f2.c2": "Pasada aditiva",
  "f2.cap": "Spotlight y mapas de sombras en pipeline diferido",

  "f3.title": "Postprocesado GLSL y Modo Foto Asíncrono",
  "f3.p": "Pasadas sobre framebuffers ejecutan shaders GLSL en quad a pantalla completa —blur, pixelado, contraste, escala de grises, negativo, CRT y cel-shading— seleccionables desde el editor.",
  "f3.b1": "<strong>Modo Foto sin bloqueos:</strong> La utilidad CameraPhoto captura el render target y delega la escritura en disco al job system multihilo.",
  "f3.b2": "<strong>Render-to-texture en escena:</strong> Las capturas pueden proyectarse de vuelta sobre superficies 3D en tiempo real.",
  "f3.c1": "Framebuffer FBO",
  "f3.c2": "Captura asíncrona",
  "f3.cap": "Postprocesado GLSL y Modo Foto en tiempo real",

  "yt.title": "Recorrido completo <span class=\"serif\">del motor.</span>",
  "next.title": "Simulación de Partículas Dipolares"
};
