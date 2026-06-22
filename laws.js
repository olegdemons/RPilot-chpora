/* ============================================================
   Модуль «Законодательство» (встроенная шпаргалка)
   Источник статей: laws-data.js (window.LAWS_DATA)
   Разделы: КоАП, УК РФ, Процессуальный кодекс.
   ФЗ «О полиции» НЕ включён (только для гос. структур полиции:
   полиция, ГИБДД, ЦОДД). ВСРФ — ФЗ об обороне добавим после
   получения файлов.
   ============================================================ */
(function () {
  const D = window.LAWS_DATA;
  if (!D) return;

  const sections = [
    { id: "koap", title: "КоАП — Административные нарушения", type: "law", items: D.koap },
    { id: "uk",   title: "УК РФ — Уголовный кодекс",          type: "law", items: D.uk },
    { id: "proc", title: "Процессуальный кодекс — задержание, арест, обыск, остановка", type: "proc", items: D.proc },
  ];

  function plural(n) {
    return n + " " + (n % 10 === 1 && n % 100 !== 11 ? "день"
      : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "дня" : "дней"));
  }

  function punHTML(p) {
    if (!p) return "";
    if (p.complex) return `<span class="badge-text">${p.raw}</span>`;
    const alts = [];
    if (p.fine) alts.push(`<span class="badge-fine">${p.fine}</span>`);
    if (p.license) alts.push(`<span class="badge-lic">лишение</span>`);
    if (p.stars > 0) {
      const lbl = (p.years ? p.years + " · " : "") + plural(p.stars * 7);
      alts.push(`<span class="badge-jail"><span class="stars">${"★".repeat(p.stars)}</span><span class="days">${lbl}</span></span>`);
    }
    if (!alts.length && p.raw) return `<span class="badge-text">${p.raw}</span>`;
    return alts.join('<span class="b-or">или</span>');
  }

  function rowHTML(sec, it) {
    if (sec.type === "law") {
      const pdd = it.pdd ? `<span class="pdd">ПДД ${it.pdd}</span>` : "";
      return `<div class="law-row" data-s="${(it.n + ' ' + it.name).toLowerCase()}">
        <span class="law-num">${it.n}</span>
        <span class="law-name">${it.name}${pdd}</span>
        <span class="law-pun">${punHTML(it.pun)}</span>
      </div>`;
    }
    const items = it.items.map(x => `<li>${x}</li>`).join("");
    return `<div class="proc-block" data-s="${(it.n + ' ' + it.title + ' ' + it.items.join(' ')).toLowerCase()}">
      <div class="proc-head"><span class="proc-num">ст. ${it.n}</span><span class="proc-title">${it.title}</span></div>
      <ul class="proc-list">${items}</ul>
    </div>`;
  }

  const content = document.getElementById("laws-content");
  content.innerHTML = sections.map(sec => {
    const cls = sec.type === "proc" ? "proc-grid" : "law-grid";
    const body = `<div class="${cls}">${sec.items.map(it => rowHTML(sec, it)).join("")}</div>`;
    return `<section data-section="${sec.id}">
      <div class="section-head"><h2>${sec.title}</h2><span class="count">${sec.items.length}</span><span class="line"></span></div>
      ${body}
    </section>`;
  }).join("");

  // ===== ПОИСК =====
  const search = document.getElementById("laws-search");
  const noresult = document.getElementById("laws-noresult");
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    let total = 0;
    content.querySelectorAll("section[data-section]").forEach(sec => {
      let shown = 0;
      sec.querySelectorAll("[data-s]").forEach(r => {
        const m = !q || r.dataset.s.includes(q);
        r.classList.toggle("hide", !m);
        if (m) shown++;
      });
      total += shown;
      sec.classList.toggle("hide", q && shown === 0);
    });
    noresult.hidden = total > 0 || !q;
    if (currentMode !== "list") applyFit();
  });

  // ===== РЕЖИМЫ ЭКРАНА (всё на одном экране) =====
  let currentMode = "list";
  const MODES = {
    rect:   { cols: [5, 6, 7, 8, 9, 10], colW: 240 },
    square: { cols: [3, 4, 5, 6, 7],     colW: 250 },
  };
  const lawsSection = document.getElementById("laws");
  const fitwrap = document.getElementById("laws-fitwrap");

  function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll(".laws-mode-btn").forEach(b => b.classList.toggle("active", b.dataset.lmode === mode));
    lawsSection.classList.toggle("laws-fit", mode !== "list");
    if (mode === "list") {
      content.style.transform = "";
      content.style.width = "";
      content.style.marginLeft = "";
      fitwrap.style.height = "";
      content.style.removeProperty("--cols");
      return;
    }
    applyFit();
  }

  function applyFit() {
    if (currentMode === "list") return;
    const cfg = MODES[currentMode];
    // доступная область: от верха fitwrap до низа окна
    const top = fitwrap.getBoundingClientRect().top;
    const availH = Math.max(320, window.innerHeight - top - 12);
    const availW = fitwrap.clientWidth - 4;
    fitwrap.style.height = availH + "px";

    let best = { scale: 0, cols: cfg.cols[0], W: 0, cw: 0, ch: 1 };
    for (const cols of cfg.cols) {
      const W = cols * cfg.colW;
      content.style.setProperty("--cols", cols);
      content.style.transform = "none";
      content.style.width = W + "px";
      const cw = content.scrollWidth || W;
      const ch = content.scrollHeight || 1;
      const scale = Math.min(availW / cw, availH / ch, 1.7);
      if (scale > best.scale) best = { scale, cols, W, cw, ch };
    }
    content.style.setProperty("--cols", best.cols);
    content.style.width = best.W + "px";
    content.style.transform = `scale(${best.scale})`;
    const offX = Math.max(0, (availW - best.cw * best.scale) / 2);
    content.style.marginLeft = offX + "px";
  }

  const modeBar = document.getElementById("laws-modes");
  if (modeBar) modeBar.addEventListener("click", e => {
    const btn = e.target.closest(".laws-mode-btn");
    if (btn) setMode(btn.dataset.lmode);
  });
  let _rt;
  window.addEventListener("resize", () => {
    if (currentMode === "list") return;
    clearTimeout(_rt); _rt = setTimeout(applyFit, 120);
  });
})();
