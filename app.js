// ФЗ «О полиции» — права полиции (упрощённо), для гос. структур
const police = [
  { ref: "11 п.1",  t: "Требовать прекратить нарушение закона" },
  { ref: "11 п.2",  t: "Проверять документы у подозреваемых, разыскиваемых и нарушителей" },
  { ref: "11 п.3",  t: "Вызывать граждан и должностных лиц по уголовным и адм. делам" },
  { ref: "11 п.4",  t: "Осматривать место происшествия, составлять акт осмотра" },
  { ref: "11 п.5",  t: "Запрашивать и изучать документы и материалы по делу" },
  { ref: "11 п.6",  t: "Патрулировать районы, выставлять КПП" },
  { ref: "11 п.7",  t: "Требовать покинуть место преступления / происшествия" },
  { ref: "11 п.8",  t: "Требовать разойтись при нарушении порядка на мероприятии" },
  { ref: "11 п.9",  t: "Составлять протоколы, собирать доказательства" },
  { ref: "11 п.10", t: "Проводить следственные и процессуальные действия" },
  { ref: "11 п.11", t: "Проводить ОРМ для профилактики и пресечения нарушений" },
  { ref: "11 п.12", t: "Принудительно доставлять граждан в отдел" },
  { ref: "11 п.13", t: "Фотографировать, снимать на видео, дактилоскопировать задержанных" },
  { ref: "11 п.14", t: "Останавливать ТС, проверять документы на машину и груз (ГИБДД)" },
  { ref: "11 п.15", t: "Усиленные меры в период ЧП, военного положения, контртеррора" },
  { ref: "11 п.16", t: "Использовать камеры, аудио-, видео- и фототехнику" },
  { ref: "11 п.17", t: "Привлекать граждан к сотрудничеству с их согласия" },
  { ref: "11 п.18", t: "Перекрывать и блокировать проезды, улицы, площади" },
  { ref: "11 п.19", t: "Разрешать подразделениям СБ использовать форму" },
  { ref: "11 п.20", t: "Проводить личный обыск (досмотр) в установленных случаях" },
  { ref: "12",      t: "Применять физ. силу, спецсредства и огнестрельное оружие по закону" },
];

const D = window.LAW_DATA;
const sections = [
  { id: "koap",   title: "КоАП — Административные нарушения", type: "law",    items: D.koap },
  { id: "uk",     title: "УК РФ — Уголовный кодекс",          type: "law",    items: D.uk },
  { id: "proc",   title: "Процессуальный кодекс — задержание, арест, обыск, остановка", type: "proc", items: D.proc },
  { id: "police", title: "ФЗ «О полиции» — права полиции",     type: "police", items: police, gov: true },
];

function plural(d){ return d + " " + (d%10===1&&d%100!==11?"день":(d%10>=2&&d%10<=4&&(d%100<10||d%100>=20)?"дня":"дней")); }

function punHTML(p){
  if (p.complex) return `<span class="badge-text">${p.raw}</span>`;
  const alts = [];
  if (p.fine) alts.push(`<span class="badge-fine">${p.fine}</span>`);
  if (p.license) alts.push(`<span class="badge-lic">лишение</span>`);
  if (p.stars > 0){
    const lbl = (p.years ? p.years + " · " : "") + plural(p.stars*7);
    alts.push(`<span class="badge-jail"><span class="stars">${"★".repeat(p.stars)}</span><span class="days">${lbl}</span></span>`);
  }
  if (!alts.length && p.raw) return `<span class="badge-text">${p.raw}</span>`;
  return alts.join('<span class="b-or">или</span>');
}

function rowHTML(sec, it){
  if (sec.type === "law"){
    const pdd = it.pdd ? `<span class="pdd">ПДД ${it.pdd}</span>` : "";
    return `<div class="law-row" data-s="${(it.n+' '+it.name).toLowerCase()}">
      <span class="law-num">${it.n}</span>
      <span class="law-name">${it.name}${pdd}</span>
      <span class="law-pun">${punHTML(it.pun)}</span>
    </div>`;
  }
  if (sec.type === "police"){
    return `<div class="law-row police" data-s="${(it.ref+' '+it.t).toLowerCase()}">
      <span class="law-ref">ст. ${it.ref}</span>
      <span class="law-name">${it.t}</span>
    </div>`;
  }
  // proc block
  const items = it.items.map(x => `<li>${x}</li>`).join("");
  return `<div class="proc-block" data-s="${(it.n+' '+it.title+' '+it.items.join(' ')).toLowerCase()}">
    <div class="proc-head"><span class="proc-num">ст. ${it.n}</span><span class="proc-title">${it.title}</span></div>
    <ul class="proc-list">${items}</ul>
  </div>`;
}

const content = document.getElementById("content");
content.innerHTML = sections.map(sec => {
  const cls = sec.type === "proc" ? "proc-grid" : (sec.type === "police" ? "law-grid police-grid" : "law-grid");
  const body = `<div class="${cls}">${sec.items.map(it => rowHTML(sec, it)).join("")}</div>`;
  const govtag = sec.gov ? `<span class="gov-tag">гос. структуры</span>` : "";
  return `<section data-section="${sec.id}">
    <div class="section-head">
      <h2>${sec.title}</h2><span class="count">${sec.items.length}</span>${govtag}
      <span class="line"></span>
    </div>
    ${body}
  </section>`;
}).join("");

// ===== ПОИСК =====
const search = document.getElementById("search");
const noresult = document.getElementById("noresult");
search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  let total = 0;
  document.querySelectorAll("section[data-section]").forEach(sec => {
    const rows = sec.querySelectorAll("[data-s]");
    let shown = 0;
    rows.forEach(r => {
      const m = !q || r.dataset.s.includes(q);
      r.classList.toggle("hide", !m);
      if (m) shown++;
    });
    total += shown;
    sec.classList.toggle("hide", q && shown === 0);
  });
  noresult.classList.toggle("hidden", total > 0 || !q);
  if (currentMode !== "list") applyFit();
});

// ===== РЕЖИМЫ ЭКРАНА (всё на одном экране) =====
// Авто-подбор числа колонок: перебираем варианты и выбираем тот,
// который даёт максимальный масштаб (а значит — самый читабельный текст),
// при этом весь контент помещается без прокрутки.
let currentMode = "list";
// диапазон колонок и ширина колонки под форму монитора
const MODES = {
  rect:   { cols: [5,6,7,8,9,10], colW: 240 }, // широкий (прямоугольный)
  square: { cols: [3,4,5,6,7],    colW: 250 }, // квадратный
};
const fitwrap = document.getElementById("fitwrap");
const body = document.body;

function setMode(mode){
  currentMode = mode;
  document.querySelectorAll(".mode-btn").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  body.classList.toggle("fit", mode !== "list");
  body.classList.toggle("mode-rect", mode === "rect");
  body.classList.toggle("mode-square", mode === "square");
  if (mode === "list"){
    content.style.transform = "";
    content.style.width = "";
    content.style.marginLeft = "";
    document.documentElement.style.setProperty("--cols", "");
    return;
  }
  applyFit();
}

function applyFit(){
  if (currentMode === "list") return;
  const cfg = MODES[currentMode];
  const availW = fitwrap.clientWidth  - 10;
  const availH = fitwrap.clientHeight - 10;

  let best = { scale: 0, cols: cfg.cols[0], W: 0 };
  // пробуем каждое число колонок и считаем итоговый масштаб
  for (const cols of cfg.cols){
    const W = cols * cfg.colW;
    document.documentElement.style.setProperty("--cols", cols);
    content.style.transform = "none";
    content.style.width = W + "px";
    // принудительный reflow для корректного измерения высоты
    const cw = content.scrollWidth || W;
    const ch = content.scrollHeight || 1;
    const scale = Math.min(availW / cw, availH / ch, 1.7);
    // премируем варианты, реально заполняющие экран по площади
    if (scale > best.scale){
      best = { scale, cols, W, cw, ch };
    }
  }
  // применяем лучший вариант
  document.documentElement.style.setProperty("--cols", best.cols);
  content.style.width = best.W + "px";
  content.style.transform = `scale(${best.scale})`;
  const scaledW = best.cw * best.scale;
  const offX = Math.max(0, (availW - scaledW) / 2);
  content.style.marginLeft = offX + "px";
}

document.getElementById("modes").addEventListener("click", e => {
  const btn = e.target.closest(".mode-btn");
  if (btn) setMode(btn.dataset.mode);
});
let _rt;
window.addEventListener("resize", () => {
  if (currentMode === "list") return;
  clearTimeout(_rt); _rt = setTimeout(applyFit, 120);
});
