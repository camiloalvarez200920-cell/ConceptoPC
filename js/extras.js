/* =====================================================================
   extras.js — Pixel & Power
   1) Guía ampliada de componentes (ES/EN)  2) Menú + panel de ajustes
   Se carga DESPUÉS de PC.js (usa su objeto `translations` y `setLanguage`).
   Cada componente: [id, imagen, [ES], [EN]]
   y cada idioma:   [título, subtítulo, tipos[], cómo leer[], consejo]
   ===================================================================== */
(function () {
  const T = translations, R = document.documentElement, $ = s => document.querySelector(s);

  // ---------- Textos de interfaz nuevos ----------
  T.es["brand.title"] = T.en["brand.title"] = "Pixel & Power";
  T.es["footer.text"] = "Pixel & Power — Guías simples para que la tecnología trabaje para ti, no al revés.";
  T.en["footer.text"] = "Pixel & Power — Simple guides so technology works for you, not the other way around.";
  Object.assign(T.es, {
    "nav.components": "Componentes", "nav.settings": "⚙ Ajustes",
    "set.title": "Ajustes", "set.lang": "Idioma", "set.theme": "Modo de visualización",
    "set.dark": "Oscuro", "set.light": "Claro", "set.auto": "Sistema",
    "set.size": "Tamaño del texto", "set.view": "Diseño de tarjetas", "set.grid": "Cuadrícula", "set.list": "Lista",
    "set.contrast": "Contraste", "set.normal": "Normal", "set.high": "Alto",
    "set.motion": "Animaciones", "set.open": "Abrir todos los detalles", "set.yes": "Sí", "set.no": "No",
    "set.reset": "Restablecer ajustes", "set.hint": "Tus preferencias se guardan en este navegador.",
    "comp.types": "Tipos / Familias", "comp.read": "Cómo leer los nombres",
    "compdet.text": "Para cada componente: tipos, qué significan las letras y números de los modelos, y un consejo antes de comprar."
  });
  Object.assign(T.en, {
    "nav.components": "Components", "nav.settings": "⚙ Settings",
    "set.title": "Settings", "set.lang": "Language", "set.theme": "Display mode",
    "set.dark": "Dark", "set.light": "Light", "set.auto": "System",
    "set.size": "Text size", "set.view": "Card layout", "set.grid": "Grid", "set.list": "List",
    "set.contrast": "Contrast", "set.normal": "Normal", "set.high": "High",
    "set.motion": "Animations", "set.open": "Expand all details", "set.yes": "Yes", "set.no": "No",
    "set.reset": "Reset settings", "set.hint": "Your preferences are saved in this browser.",
    "comp.types": "Types / Families", "comp.read": "How to read the names",
    "compdet.text": "For each component: types, what the letters and numbers in model names mean, and a tip before buying."
  });

  // ---------- Guía de componentes ----------
  const COMP = [
    ["cpu", "CPU.jpg",
      ["CPU (Procesador)", "Familias, generaciones y cómo descifrar el nombre.",
        ["<b>AMD Ryzen</b> 3/5/7/9: socket AM5 en los modelos actuales, AM4 en los anteriores.",
         "<b>Intel Core</b> i3/i5/i7/i9 y la línea nueva <b>Core Ultra</b>.",
         "<b>APU / gráficos integrados</b>: sirven para oficina sin tarjeta gráfica."],
        ["<b>Ryzen 7 7800X3D</b>: 7 = gama, 7800 = serie 7000 (Zen 4), X3D = caché 3D (excelente en juegos).",
         "<b>Core i5-14600K</b>: 14 = generación, 600 = posición en la gama, K = desbloqueado para overclock.",
         "<b>Sufijos</b>: F = sin gráficos integrados (Intel), G = con gráficos (AMD), T = bajo consumo."],
        "Verifica que el socket coincida con la placa y que esta soporte ese modelo (a veces pide actualizar BIOS). Para juegos pesa más la velocidad por núcleo que la cantidad de núcleos."],
      ["CPU (Processor)", "Families, generations and how to decode the name.",
        ["<b>AMD Ryzen</b> 3/5/7/9: AM5 socket on current models, AM4 on older ones.",
         "<b>Intel Core</b> i3/i5/i7/i9 and the newer <b>Core Ultra</b> line.",
         "<b>APU / integrated graphics</b>: fine for office work without a graphics card."],
        ["<b>Ryzen 7 7800X3D</b>: 7 = tier, 7800 = 7000 series (Zen 4), X3D = 3D cache (great for gaming).",
         "<b>Core i5-14600K</b>: 14 = generation, 600 = position in the lineup, K = unlocked for overclocking.",
         "<b>Suffixes</b>: F = no integrated graphics (Intel), G = with graphics (AMD), T = low power."],
        "Check that the socket matches the motherboard and that the board supports that model (it may need a BIOS update). For gaming, per-core speed matters more than core count."]],

    ["gpu", "GPU.jpg",
      ["GPU (Tarjeta gráfica)", "Series, VRAM y significado de los sufijos.",
        ["<b>NVIDIA GeForce</b>: GTX (antiguas) y RTX 20/30/40/50 con ray tracing y DLSS.",
         "<b>AMD Radeon</b>: RX 6000/7000/9000, con escalado FSR.",
         "<b>Intel Arc</b>: alternativa económica de gama media."],
        ["<b>RTX 4070 Super</b>: 40 = generación, 70 = gama (60 media, 70 alta, 80/90 tope), Super/Ti = versión mejorada.",
         "<b>RX 7800 XT</b>: XT sube un escalón sobre el modelo base; XTX es el tope de la serie.",
         "<b>VRAM</b>: 8 GB para 1080p, 12 GB o más recomendable para 1440p y 4K."],
        "Compara FPS en reseñas con los juegos que usarás. Revisa el largo de la tarjeta, los conectores de alimentación y la fuente mínima recomendada."],
      ["GPU (Graphics card)", "Series, VRAM and what the suffixes mean.",
        ["<b>NVIDIA GeForce</b>: GTX (older) and RTX 20/30/40/50 with ray tracing and DLSS.",
         "<b>AMD Radeon</b>: RX 6000/7000/9000, with FSR upscaling.",
         "<b>Intel Arc</b>: budget-friendly mid-range alternative."],
        ["<b>RTX 4070 Super</b>: 40 = generation, 70 = tier (60 mid, 70 high, 80/90 top), Super/Ti = improved version.",
         "<b>RX 7800 XT</b>: XT is a step above the base model; XTX is the series top.",
         "<b>VRAM</b>: 8 GB for 1080p, 12 GB or more recommended for 1440p and 4K."],
        "Compare FPS in reviews using the games you play. Check card length, power connectors and the recommended minimum PSU."]],

    ["ram", "RAM.jpg",
      ["RAM (Memoria)", "Tipos, velocidad, latencia y capacidad.",
        ["<b>DDR4</b>: económica y aún muy usada. <b>DDR5</b>: la actual, en plataformas nuevas.",
         "<b>No intercambiables</b>: DDR4 y DDR5 no caben en el mismo zócalo.",
         "<b>DIMM</b> (escritorio) vs <b>SO-DIMM</b> (portátil)."],
        ["<b>DDR5-6000 CL30 2x16GB</b>: 6000 MT/s de velocidad, latencia CL30, kit de 2 módulos = 32 GB.",
         "<b>CL</b>: a igual velocidad, menor CL = más rápida.",
         "<b>EXPO / XMP</b>: perfil que se activa en la BIOS para alcanzar la velocidad anunciada."],
        "Compra kits de 2 módulos (dual channel) y activa EXPO/XMP; si no, corre a velocidad base. 16 GB es el mínimo para gaming hoy y 32 GB para edición."],
      ["RAM (Memory)", "Types, speed, latency and capacity.",
        ["<b>DDR4</b>: affordable and still common. <b>DDR5</b>: the current standard on new platforms.",
         "<b>Not interchangeable</b>: DDR4 and DDR5 don't fit the same slot.",
         "<b>DIMM</b> (desktop) vs <b>SO-DIMM</b> (laptop)."],
        ["<b>DDR5-6000 CL30 2x16GB</b>: 6000 MT/s speed, CL30 latency, 2-module kit = 32 GB.",
         "<b>CL</b>: at the same speed, lower CL = faster.",
         "<b>EXPO / XMP</b>: profile enabled in BIOS to reach the advertised speed."],
        "Buy 2-module kits (dual channel) and enable EXPO/XMP; otherwise it runs at base speed. 16 GB is the gaming minimum today, 32 GB for editing."]],

    ["storage", "ALMACENAMIENTO.jpg",
      ["Almacenamiento (SSD / HDD)", "Tipos, interfaces y durabilidad.",
        ["<b>HDD</b>: mecánico, barato por GB; ideal para archivos y respaldos.",
         "<b>SSD SATA</b>: ~550 MB/s, gran salto frente al HDD.",
         "<b>SSD NVMe (M.2)</b>: PCIe 3.0 ~3.500 MB/s, 4.0 ~7.000 MB/s, 5.0 12.000+ MB/s."],
        ["<b>Samsung 990 Pro 1TB</b>: marca y serie + capacidad.",
         "<b>TBW</b>: terabytes que puede escribir antes de desgastarse; más alto = más durable.",
         "<b>TLC / QLC</b>: TLC es más durable y rápido de forma sostenida, QLC es más barato. Busca modelos con <b>caché DRAM</b>."],
        "Para sistema y juegos, un NVMe Gen4 de 1 TB es el punto dulce; Gen5 rara vez se nota en el uso diario. Confirma cuántas ranuras M.2 tiene tu placa."],
      ["Storage (SSD / HDD)", "Types, interfaces and endurance.",
        ["<b>HDD</b>: mechanical, cheap per GB; ideal for files and backups.",
         "<b>SATA SSD</b>: ~550 MB/s, big jump over an HDD.",
         "<b>NVMe SSD (M.2)</b>: PCIe 3.0 ~3,500 MB/s, 4.0 ~7,000 MB/s, 5.0 12,000+ MB/s."],
        ["<b>Samsung 990 Pro 1TB</b>: brand and series + capacity.",
         "<b>TBW</b>: terabytes it can write before wearing out; higher = more durable.",
         "<b>TLC / QLC</b>: TLC is more durable and faster when sustained, QLC is cheaper. Look for <b>DRAM cache</b> models."],
        "For system and games, a 1 TB Gen4 NVMe is the sweet spot; Gen5 is rarely noticeable day to day. Check how many M.2 slots your board has."]],

    ["board", "PLACA.png",
      ["Placa base (Motherboard)", "Sockets, chipsets y formatos.",
        ["<b>Formato</b>: ATX, Micro-ATX (mATX), Mini-ITX; debe caber en el gabinete.",
         "<b>Sockets</b>: AM4/AM5 (AMD), LGA1700/LGA1851 (Intel).",
         "<b>Chipset</b>: define puertos, líneas PCIe y si permite overclock."],
        ["<b>AMD AM5</b>: A620 (básica), B650/B850 (equilibrada), X670/X870 (completa).",
         "<b>Intel</b>: H610/B760/B860 (económicas), Z790/Z890 (permiten overclock en CPU K).",
         "<b>Sufijos</b>: WiFi = red inalámbrica incluida, D4 = usa DDR4, Gaming/Pro/Strix = gamas del fabricante."],
        "Confirma socket + tipo de RAM + versión de BIOS. Con una CPU potente, busca una placa con buena alimentación (VRM) y disipadores."],
      ["Motherboard", "Sockets, chipsets and form factors.",
        ["<b>Form factor</b>: ATX, Micro-ATX (mATX), Mini-ITX; must fit the case.",
         "<b>Sockets</b>: AM4/AM5 (AMD), LGA1700/LGA1851 (Intel).",
         "<b>Chipset</b>: defines ports, PCIe lanes and overclocking support."],
        ["<b>AMD AM5</b>: A620 (basic), B650/B850 (balanced), X670/X870 (full-featured).",
         "<b>Intel</b>: H610/B760/B860 (budget), Z790/Z890 (allow overclocking on K CPUs).",
         "<b>Suffixes</b>: WiFi = wireless included, D4 = uses DDR4, Gaming/Pro/Strix = vendor tiers."],
        "Confirm socket + RAM type + BIOS version. With a powerful CPU, look for a board with solid power delivery (VRM) and heatsinks."]],

    ["psu", "FUENTE-DE-PODER.jpg",
      ["Fuente de poder (PSU)", "Vatios, eficiencia y modularidad.",
        ["<b>Potencia</b>: de 550 a 1000 W según tu CPU y GPU.",
         "<b>80 PLUS</b>: Bronze, Silver, Gold, Platinum y Titanium miden la eficiencia.",
         "<b>Modularidad</b>: no modular, semi o full modular (cables desmontables)."],
        ["<b>Corsair RM750x</b>: 750 = vatios, x = variante de mayor calidad dentro de la serie.",
         "<b>ATX 3.x</b>: estándar actual, con conector 12V-2x6 para GPUs recientes.",
         "<b>Rail de 12 V</b>: casi toda la potencia útil debe estar en 12 V."],
        "Suma el consumo de CPU + GPU y deja 20–30% de margen. Elige marcas con buenas reseñas y garantía larga (7–10 años); evita fuentes sin certificación."],
      ["Power supply (PSU)", "Wattage, efficiency and modularity.",
        ["<b>Wattage</b>: 550 to 1000 W depending on your CPU and GPU.",
         "<b>80 PLUS</b>: Bronze, Silver, Gold, Platinum and Titanium rate efficiency.",
         "<b>Modularity</b>: non-modular, semi or fully modular (detachable cables)."],
        ["<b>Corsair RM750x</b>: 750 = watts, x = higher-quality variant within the series.",
         "<b>ATX 3.x</b>: current standard, with the 12V-2x6 connector for recent GPUs.",
         "<b>12 V rail</b>: nearly all usable power should be on 12 V."],
        "Add CPU + GPU consumption and leave a 20–30% margin. Choose well-reviewed brands with long warranties (7–10 years); avoid uncertified units."]],

    ["case", "GABINETE.jpg",
      ["Gabinete (Case)", "Formatos, flujo de aire y compatibilidad.",
        ["<b>Tamaños</b>: Full tower, Mid tower y compactos (ATX, mATX, ITX).",
         "<b>Frente de malla</b> = mejor flujo de aire; <b>vidrio templado</b> = más estética pero más calor.",
         "<b>Ventiladores incluidos</b>: ahorran dinero; ideal que vengan 2–3."],
        ["<b>Máx. GPU (mm)</b>: largo máximo de la tarjeta gráfica.",
         "<b>Altura máx. del cooler (mm)</b>: límite para disipadores de aire.",
         "<b>Radiadores</b>: busca soporte 240/280/360 mm en frente o techo si quieres refrigeración líquida."],
        "Mide tu GPU y tu cooler contra las especificaciones del gabinete, y prefiere frente de malla en equipos potentes."],
      ["Case", "Form factors, airflow and compatibility.",
        ["<b>Sizes</b>: Full tower, Mid tower and compact (ATX, mATX, ITX).",
         "<b>Mesh front</b> = better airflow; <b>tempered glass</b> = nicer looks but more heat.",
         "<b>Included fans</b>: save money; ideally 2–3 come in the box."],
        ["<b>Max GPU (mm)</b>: maximum graphics card length.",
         "<b>Max cooler height (mm)</b>: limit for air coolers.",
         "<b>Radiators</b>: look for 240/280/360 mm support on front or top for liquid cooling."],
        "Check your GPU and cooler against the case specs, and prefer a mesh front on powerful builds."]],

    ["cooling", "REFRIGERACION.jpg",
      ["Refrigeración", "Aire vs líquida y qué mirar al elegir.",
        ["<b>Aire</b>: simple, fiable y con muy buena relación precio/rendimiento.",
         "<b>AIO</b>: líquida cerrada de 120/240/280/360 mm.",
         "<b>Custom loop</b>: líquida a medida; más cara y con mantenimiento."],
        ["<b>TDP</b>: calor que debe disipar; el cooler debe cubrir el de tu CPU.",
         "<b>Radiador 240/360</b>: a mayor tamaño, mejor disipación.",
         "<b>Compatibilidad</b>: socket (AM5, LGA1700/1851), altura y espacio junto a la RAM."],
        "Para CPUs de gama media basta un buen cooler de aire; la AIO conviene en CPUs de alto consumo o por estética. Aplica pasta térmica solo si el cooler no la trae."],
      ["Cooling", "Air vs liquid and what to look for.",
        ["<b>Air</b>: simple, reliable and great value for performance.",
         "<b>AIO</b>: closed-loop liquid, 120/240/280/360 mm.",
         "<b>Custom loop</b>: bespoke liquid cooling; pricier and needs maintenance."],
        ["<b>TDP</b>: heat it must dissipate; the cooler must cover your CPU's.",
         "<b>240/360 radiator</b>: larger size = better dissipation.",
         "<b>Compatibility</b>: socket (AM5, LGA1700/1851), height and clearance near the RAM."],
        "For mid-range CPUs a good air cooler is enough; an AIO suits high-power CPUs or aesthetics. Apply thermal paste only if the cooler doesn't ship with it."]]
  ];

  function renderComp() {
    const box = $("#componentes-list"); if (!box) return;
    const L = localStorage.getItem("siteLang") === "en" ? "en" : "es", i = L === "en" ? 3 : 2;
    const op = S.open === "on" ? " open" : "", li = a => a.map(x => `<li>${x}</li>`).join("");
    box.innerHTML = COMP.map(c => { const d = c[i]; return `<article class="component-card">
      <div class="componente-img"><img src="img/${c[1]}" alt="${d[0]}"></div>
      <h4>${d[0]}</h4><p class="muted">${d[1]}</p>
      <details${op}><summary>${T[L]["comp.types"]}</summary><ul>${li(d[2])}</ul></details>
      <details${op}><summary>${T[L]["comp.read"]}</summary><ul>${li(d[3])}</ul></details>
      <p class="mini muted">💡 ${d[4]}</p></article>`; }).join("");
  }

  // ---------- Ajustes ----------
  const D = { theme: "dark", fs: "md", view: "grid", contrast: "normal", motion: "on", open: "off" };
  let S; try { S = { ...D, ...JSON.parse(localStorage.getItem("pp-settings")) }; } catch (e) { S = { ...D }; }
  const save = () => { try { localStorage.setItem("pp-settings", JSON.stringify(S)); } catch (e) {} };

  const G = [
    ["lang", "set.lang", [["es", "Español"], ["en", "English"]]],
    ["theme", "set.theme", [["dark", "set.dark"], ["light", "set.light"], ["auto", "set.auto"]]],
    ["fs", "set.size", [["sm", "A-"], ["md", "A"], ["lg", "A+"]]],
    ["view", "set.view", [["grid", "set.grid"], ["list", "set.list"]]],
    ["contrast", "set.contrast", [["normal", "set.normal"], ["high", "set.high"]]],
    ["motion", "set.motion", [["on", "set.yes"], ["off", "set.no"]]],
    ["open", "set.open", [["off", "set.no"], ["on", "set.yes"]]]
  ];
  document.body.insertAdjacentHTML("beforeend",
    `<div id="set-ov" class="set-ov"></div>
     <aside id="settings" class="settings" aria-hidden="true">
       <div class="set-h"><h3 data-i18n="set.title">Ajustes</h3><button class="ghost" id="set-x" aria-label="Close">✕</button></div>
       ${G.map(([k, lab, opts]) => `<div class="set-row"><span data-i18n="${lab}"></span><div class="seg">${
         opts.map(([v, l]) => `<button data-key="${k}" data-val="${v}"${l.includes(".") ? ` data-i18n="${l}"` : ""}>${l.includes(".") ? "" : l}</button>`).join("")
       }</div></div>`).join("")}
       <button class="ghost" id="set-reset" data-i18n="set.reset"></button>
       <p class="muted mini" data-i18n="set.hint"></p>
     </aside>`);

  const mq = matchMedia("(prefers-color-scheme: light)");
  function apply() {
    R.dataset.theme = S.theme === "auto" ? (mq.matches ? "light" : "dark") : S.theme;
    ["fs", "view", "contrast", "motion"].forEach(k => R.dataset[k] = S[k]);
    const lang = localStorage.getItem("siteLang") === "en" ? "en" : "es";
    document.querySelectorAll(".seg button").forEach(b => b.classList.toggle("active",
      b.dataset.key === "lang" ? b.dataset.val === lang : S[b.dataset.key] === b.dataset.val));
    renderComp();
  }
  mq.addEventListener("change", apply);

  const panel = $("#settings"), ov = $("#set-ov");
  const toggle = on => { panel.classList.toggle("open", on); ov.classList.toggle("open", on); panel.setAttribute("aria-hidden", !on); };

  document.addEventListener("click", e => {
    const b = e.target.closest(".seg button");
    if (b) {
      if (b.dataset.key === "lang") setLanguage(b.dataset.val);
      else { S[b.dataset.key] = b.dataset.val; save(); apply(); }
      return;
    }
    const g = e.target.closest("[data-goto]");
    if (g) { toggle(false); document.getElementById(g.dataset.goto)?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (e.target.closest("#set-open")) toggle(true);
    else if (e.target.closest("#set-x") || e.target === ov) toggle(false);
    else if (e.target.closest("#set-reset")) { S = { ...D }; save(); apply(); }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });

  // Idioma: reutiliza setLanguage de PC.js y además actualiza <html lang>, ajustes y componentes
  const baseSetLang = window.setLanguage;
  window.setLanguage = function (l) { baseSetLang(l); R.lang = localStorage.getItem("siteLang") || "es"; apply(); };

  // Sin animaciones: también desactiva el scroll suave que PC.js pide por código
  const si = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function (a) {
    if (S.motion === "off" && a && a.behavior) a = { ...a, behavior: "auto" };
    return si.call(this, a);
  };

  apply();
})();
