/* ==========================================================================
   Site interactions — vanilla JS, progressive enhancement.
   ========================================================================== */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Loaded state (hero entrance) ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("is-loaded")));

  /* ---------- Year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Nav: scrolled state ---------- */
  const nav = $(".nav");
  const onScroll = () => { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 12); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = $(".nav__toggle");
  const menu = $(".mobile-menu");
  const setMenu = (open) => {
    document.documentElement.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    if (menu) { menu.setAttribute("aria-hidden", String(!open)); menu.inert = !open; }
    document.body.style.overflow = open ? "hidden" : "";
  };
  if (menu) menu.inert = true;
  if (toggle) toggle.addEventListener("click", () => setMenu(!document.documentElement.classList.contains("nav-open")));
  if (menu) $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* ---------- Active section in nav ---------- */
  const navLinks = $$(".nav__links a[href^='#']");
  if (navLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    navLinks.forEach((a) => {
      const sec = document.getElementById(a.getAttribute("href").slice(1));
      if (sec) map.set(sec, a);
    });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const link = map.get(en.target);
        if (!link) return;
        if (en.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        } else if (link.classList.contains("is-active")) {
          link.classList.remove("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, sec) => spy.observe(sec));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$("[data-reveal]");
  if (revealEls.length && !reduceMotion && "IntersectionObserver" in window) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach((el) => ro.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Lazy video helpers ---------- */
  function hydrate(video) {
    if (video.dataset.hydrated) return;
    video.dataset.hydrated = "1";
    $$("source[data-src]", video).forEach((s) => { s.src = s.dataset.src; s.removeAttribute("data-src"); });
    if (video.dataset.src) { video.src = video.dataset.src; video.removeAttribute("data-src"); }
    video.load();
  }
  function play(video) {
    hydrate(video);
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  }

  /* ---------- Project cards: spotlight + preview video ---------- */
  const cards = $$(".card");
  cards.forEach((card) => {
    const video = $("video", card);
    if (canHover) {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }
    if (!video || reduceMotion) return;
    video.addEventListener("playing", () => card.classList.add("is-playing"));
    if (canHover) {
      card.addEventListener("pointerenter", () => play(video));
      card.addEventListener("pointerleave", () => { video.pause(); card.classList.remove("is-playing"); });
    }
  });
  if (!canHover && !reduceMotion && "IntersectionObserver" in window) {
    const vo = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const video = $("video", en.target);
        if (!video) return;
        if (en.isIntersecting) play(video);
        else { video.pause(); en.target.classList.remove("is-playing"); }
      });
    }, { threshold: 0.6 });
    cards.forEach((c) => vo.observe(c));
  }

  /* ---------- Autoplay-in-view videos (project pages) ---------- */
  const autoVids = $$("video[data-autoplay]");
  if (autoVids.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      autoVids.forEach((v) => { hydrate(v); v.controls = true; });
    } else {
      const ao = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          const v = en.target;
          if (en.isIntersecting) { if (!v.dataset.userPaused) play(v); }
          else v.pause();
        });
      }, { rootMargin: "200px 0px", threshold: 0.15 });
      autoVids.forEach((v) => ao.observe(v));
    }
  }

  /* ---------- Hero video play/pause ---------- */
  $$("[data-video-toggle]").forEach((btn) => {
    const v = document.getElementById(btn.getAttribute("data-video-toggle"));
    if (!v) return;
    const sync = () => { btn.classList.toggle("is-paused", v.paused); btn.setAttribute("aria-pressed", String(v.paused)); };
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    btn.addEventListener("click", () => {
      if (v.paused) { delete v.dataset.userPaused; play(v); }
      else { v.dataset.userPaused = "1"; v.pause(); }
    });
    sync();
  });

  /* ---------- Copy email ---------- */
  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch {}
        ta.remove();
      }
      btn.classList.add("is-copied");
      clearTimeout(btn._t);
      btn._t = setTimeout(() => btn.classList.remove("is-copied"), 1800);
    });
  });

  /* ---------- Reading progress (project pages) ---------- */
  const progress = $(".progress");
  if (progress) {
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- YouTube facade (no iframe until clicked) ---------- */
  $$("[data-yt]").forEach((el) => {
    const activate = () => {
      const id = el.getAttribute("data-yt");
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = el.getAttribute("aria-label") || "YouTube video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      el.replaceChildren(iframe);
      el.removeAttribute("role");
      el.removeAttribute("tabindex");
    };
    el.addEventListener("click", activate, { once: true });
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } }, { once: true });
  });

  /* ---------- Lightbox gallery ---------- */
  const gallery = $("[data-gallery]");
  const lb = $("#lightbox");
  if (gallery && lb && typeof lb.showModal === "function") {
    const items = $$("button", gallery);
    const img = $(".lightbox__stage img", lb);
    const counter = $("[data-lb-count]", lb);
    let idx = 0;
    const show = (i) => {
      idx = (i + items.length) % items.length;
      const thumb = $("img", items[idx]);
      img.src = items[idx].getAttribute("data-full") || thumb.currentSrc || thumb.src;
      img.alt = thumb.alt || "";
      if (counter) counter.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
    };
    items.forEach((b, i) => b.addEventListener("click", () => { show(i); lb.showModal(); }));
    $("[data-lb-prev]", lb).addEventListener("click", () => show(idx - 1));
    $("[data-lb-next]", lb).addEventListener("click", () => show(idx + 1));
    $("[data-lb-close]", lb).addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lightbox__stage")) lb.close(); });
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    let sx = 0;
    lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    });
  }
})();
