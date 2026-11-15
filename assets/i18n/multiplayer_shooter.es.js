window.I18N_ES = {
  "meta.title": "Shooter Multijugador Cross-Engine — Jaume Berbel",
  "meta.desc": "Shooter multijugador UDP/ENet cross-engine: servidor autoritativo independiente en C# conectando clientes de Unity (C#) y Unreal Engine (C++) en la misma partida.",
  "a11y.skip": "Saltar al contenido",

  "hero.crumb": "REDES · 2024/25",
  "hero.title": "Shooter<br><span class=\"serif\">Multijugador</span>",
  "hero.lede": "Juego cross-engine de captura la bandera donde clientes en Unity (C#) y Unreal Engine (C++) se conectan al mismo servidor independiente en C# sobre ENet/UDP en tiempo real.",
  "badge.cross": "Unity ⇄ Unreal",
  "badge.auth": "Servidor Autoritativo",

  "fact.srv.k": "Servidor",
  "fact.srv.v": "C# independiente · ENet / UDP",
  "fact.cli.k": "Clientes",
  "fact.mode.k": "Modo",
  "fact.mode.v": "Captura la bandera · Sincronía en tiempo real",

  "ov.title": "Resumen",
  "ov.p1": "Desarrollado en Coventry University, el proyecto desacopla la simulación multijugador de la replicación propietaria de un único motor. Un <strong>servidor autoritativo en C#</strong> sobre ENet/UDP actúa como fuente única de verdad para conexiones, equipos, banderas, pickups y puntuación.",
  "ov.p2": "Dos clientes independientes —uno en <strong>Unity (C#)</strong> y otro en <strong>Unreal Engine (C++)</strong>— implementan exactamente el mismo protocolo ligero de paquetes para compartir partida sin barreras entre motores.",

  "feat.eyebrow": "Arquitectura de red",
  "feat.title": "Servidor, protocolo y <span class=\"serif\">sincronización.</span>",

  "f1.title": "Conexiones, UIDs y Tick de Difusión",
  "f1.p": "Al conectarse, el servidor C# asigna un UID único, balancea equipos y envía el marcador y estado actual. Las desconexiones limpian transformaciones y membresía de forma ordenada en todos los clientes.",
  "f1.b1": "<strong>Registros de equipos y UIDs:</strong> Búsquedas rápidas para enrutado de entidades y limpieza segura al desconectar.",
  "f1.b2": "<strong>Enrutador de paquetes dedicado:</strong> Manejadores separados para movimiento, disparos, banderas y pickups.",
  "f1.c1": "Desconexión limpia",
  "f1.cap": "Gestión en vivo de conexiones y desconexiones",

  "f2.title": "Clientes Espejo en Unity y Unreal",
  "f2.p": "Ambos clientes replican exactamente la misma arquitectura —<strong>NetworkManager</strong> y <strong>GameManager</strong>— sobre un contrato de paquetes agnóstico al motor.",
  "f2.b1": "<strong>Contrato determinista de paquetes:</strong> Formato de mensajes y mapeo de coordenadas idéntico entre Unity C# y Unreal C++.",
  "f2.b2": "<strong>Ciclo de vida simétrico:</strong> Spawn, interpolación y sincronización periódica con corrutinas y timers nativos de cada motor.",
  "f2.c1": "Protocolo agnóstico",
  "f2.cap": "Sincronización de movimiento entre motores",

  "f3.title": "Combate, Daño y Máquina de Estados de Bandera",
  "f3.p": "Un raycast define la puntería para proyectiles físicos mientras ambas banderas transitan estrictamente entre los estados <code>Picked</code>, <code>Lost</code>, <code>Returned</code> y <code>Captured</code>.",
  "f3.b1": "<strong>Daño y caída de bandera:</strong> Fuego amigo desactivado; al llegar a 0 HP el jugador suelta la bandera y reaparece.",
  "f3.b2": "<strong>Reglas de captura:</strong> Solo se puntúa si la bandera propia permanece en la base.",
  "f3.c1": "Máquina de estados CTF",
  "f3.c2": "Relé de impactos",
  "f3.cap": "Combate, daño e interacciones con banderas",

  "f4.title": "Capturas y Pickups Sincronizados",
  "f4.p": "Los pickups de Salud y Velocidad heredan de una clase base común; solo el propietario local envía el evento de recogida y el servidor difunde ocultación y respawn.",
  "f4.b1": "<strong>Autoridad del propietario local:</strong> Evita disparos duplicados desde avatares proxy remotos.",
  "f4.b2": "<strong>Respawn temporizado por servidor:</strong> Marcador y cooldowns sincronizados en ambos motores.",
  "f4.c1": "Marcador sincronizado",
  "f4.c2": "Pickups compartidos",
  "f4.cap": "Captura de bandera y actualización global del marcador",

  "f5.title": "Pickups de Salud y Velocidad en Acción",
  "f5.p": "La lógica base compartida en ambos clientes garantiza colisiones idénticas, ocultación inmediata y reactivación sincronizada tras el tiempo de espera.",
  "f5.c1": "Estado replicado",
  "f5.cap": "Pickups ocultándose y reapareciendo entre clientes",

  "sec.eyebrow": "Seguridad",
  "sec.title": "Seguridad y <span class=\"serif\">mitigación de exploits.</span>",
  "sec.1.t": "Validación de posición",
  "sec.1.p": "Comprueba umbrales de velocidad y distancia entre frames para rechazar teletransportes o speed hacks.",
  "sec.2.t": "Propiedad de UID",
  "sec.2.p": "Vincula cada UID a su endpoint IP/puerto de origen y descarta paquetes suplantados.",
  "sec.3.t": "Validación de acciones",
  "sec.3.p": "Verifica en el servidor las precondiciones de captura, bandera y pickups en lugar de confiar en el cliente.",
  "sec.4.t": "Limitación de tasa y baneos",
  "sec.4.p": "Limita ráfagas de paquetes y marca o bloquea emisores con tráfico malformado.",

  "next.title": "Salamandra Procedural"
};
