const ranks = [
  "Рядовой", "Ефрейтор", "Младший сержант", "Сержант", "Старший сержант",
  "Старшина", "Прапорщик", "Старший прапорщик", "Младший лейтенант",
  "Лейтенант", "Старший лейтенант", "Капитан", "Майор", "Подполковник",
  "Полковник", "Генерал-майор", "Генерал-лейтенант", "Генерал-полковник", "Генерал армии"
];

const posts = {
  passage: {
    name: "КПП-1 проходная",
    image: "post-passage.png",
    description: "Пешая проходная воинской части. Пост предназначен для контроля прохода и выхода с охраняемой территории.",
    uniform: "Полевая форма №2",
    weapon: "Без оружия в руках",
    position: "У входа в проходную",
    capacity: "1 военнослужащий",
    steps: [
      "Занять место у проходной, сохранять концентрацию и контролировать вход и выход.",
      "При приближении посетителя представиться: назвать звание, фамилию и сообщить, что воинская часть является охраняемой территорией.",
      "Потребовать паспорт, уточнить цель визита и проверить наличие основания для прохода.",
      "Не пропускать посетителя до подтверждения разрешения или сопровождения.",
      "При прибытии командира бригады, начальника штаба или заместителя командира бригады выполнить воинское приветствие, подать команду «Смирно» и доложить по форме.",
      "Если порядок действий не соблюдается, военнослужащий может быть снят с поста."
    ]
  },
  "kpp-1": {
    name: "КПП-1",
    image: "post-kpp1.png",
    description: "Основной пропускной пункт на территорию воинской части. Обеспечение безопасности проезда, выезда и прилегающей территории.",
    uniform: "Форма №2",
    weapon: "С оружием в руках",
    position: "Одному постовому — у кнопки",
    capacity: "До 4 военнослужащих",
    steps: [
      "Занять обозначенную позицию. Если на КПП один постовой, находиться у кнопки.",
      "Контролировать въезд, выезд и прилегающую территорию.",
      "При приближении лица представиться, сообщить об охраняемом статусе ВЧ, потребовать паспорт и уточнить цель визита.",
      "Проверить право прохода или проезда по действующему порядку допуска.",
      "При прибытии командования выполнить воинское приветствие и доложить обстановку.",
      "При сомнениях вызвать старший состав или Военную полицию."
    ]
  },
  "kpp-2": {
    name: "КПП-2",
    image: "post-kpp2.png",
    description: "Стационарный КПП со стороны Берёзовки. Контроль специальных колонн, конвоев и разрешённых подразделений.",
    uniform: "Форма №2",
    weapon: "С оружием в руках",
    position: "У въезда со стороны Берёзовки",
    capacity: "До 4 военнослужащих",
    steps: [
      "Проверить въезд и занять обозначенную позицию.",
      "Контролировать колонны правительства, конвои и разрешённые подразделения.",
      "При остановке лица или транспорта представиться, потребовать паспорт и уточнить цель визита.",
      "Не пропускать гражданских и личный транспорт без подтверждённого основания.",
      "При прибытии командования выполнить воинское приветствие и доложить обстановку.",
      "При сомнениях вызвать старший состав или Военную полицию."
    ]
  },
  headquarters: {
    name: "Штаб",
    image: "post-headquarters.png",
    description: "Дневальный по штабу. Охрана комнат штаба и контроль порядка внутри служебного здания.",
    uniform: "Форма №1",
    weapon: "Без оружия в руках",
    position: "Внутри штаба у входной зоны",
    capacity: "1 военнослужащий",
    steps: [
      "Занять место дневального и доложить о заступлении.",
      "Охранять комнаты штаба и выполнять воинское приветствие каждому входящему офицеру от младшего лейтенанта.",
      "У посетителей без сопровождения представиться, потребовать паспорт и уточнить цель визита.",
      "При прибытии командира бригады, начальника штаба или заместителя командира бригады подать команду «Смирно» и доложить по форме.",
      "О нарушениях и попытках пройти без разрешения сообщить дежурному по части."
    ]
  }
};

const commonAccessRules = [
  "Сначала представьтесь: назовите звание и фамилию.",
  "Сообщите, что воинская часть является охраняемой территорией.",
  "Потребуйте паспорт и уточните цель визита.",
  "КПП-1: разрешён служебный транспорт, Премьер-министр и заместители, надзорные органы по служебным делам, Военная полиция, лица с действующим пропуском и подтверждённый старший состав.",
  "КПП-2: разрешены колонна правительства, военный и призывной конвой, Военная полиция и мобильная группа ССО.",
  "При сомнениях не открывайте доступ — вызывайте старший состав или Военную полицию."
];

const commonProhibitions = [
  "Терять концентрацию, отвлекаться на телефон и посторонние разговоры.",
  "Оставлять вооружение без контроля или убирать его из рук на вооружённом посту.",
  "Нарушать законодательство и нормы служебной этики.",
  "Игнорировать запросы о состоянии поста в рацию.",
  "Несвоевременно докладывать о состоянии поста.",
  "Нарушать требования устава пропускного режима.",
  "Бездействовать при преступлении, правонарушении или просьбе о помощи.",
  "Заступать на КПП рядовому; ефрейтору — до сдачи экзамена. Исключение: КПП-1 проходная."
];

const codes = [
  { id: 1, title: "Состояние стабильное", description: "На посту всё спокойно, происшествий нет." },
  { id: 2, title: "Вижу подозрительных личностей", description: "Рядом с постом замечены подозрительные лица." },
  { id: 3, title: "Проникновение / нападение / стрельба", description: "На территории или у поста происходит опасное происшествие." },
  { id: 4, title: "Боевая тревога", description: "Объявляется только Комбригом, Полковником или МО." }
];

const tenCodes = [
  { id: "10-0", title: "Отмена", description: "Отменить предыдущую информацию или действие.", important: true },
  { id: "10-4", title: "Понял, принял", description: "Информация получена и принята к исполнению.", important: true },
  { id: "10-7", title: "Конец связи", description: "Переговоры завершены.", important: true },
  { id: "10-20", title: "Местоположение", description: "Запрос или передача текущего местоположения.", important: true },
  { id: "10-1", title: "Плохой сигнал / не слышу", description: "Связь нестабильна, повторите сообщение." },
  { id: "10-2", title: "Слышу / на связи", description: "Связь установлена, сообщение слышно." },
  { id: "10-6", title: "Занят, ожидайте", description: "Сейчас не могу ответить, оставайтесь на связи." },
  { id: "10-9", title: "Повторите сообщение", description: "Запрос повторной передачи информации." },
  { id: "10-10", title: "Перестрелка", description: "Происходит вооружённое столкновение." },
  { id: "10-13", title: "Требуется медпомощь", description: "Необходима медицинская помощь." },
  { id: "10-22", title: "Отмена вызова / игнорирование", description: "Предыдущий вызов отменён." },
  { id: "10-23", title: "Прибыл на место", description: "Подразделение достигло указанной точки." },
  { id: "10-26", title: "Подозреваемый задержан", description: "Лицо задержано и находится под контролем." },
  { id: "10-30", title: "Без нарушений", description: "Обстановка штатная, нарушений нет." },
  { id: "10-32", title: "Запрос вооружённой поддержки", description: "Требуется помощь вооружённого подразделения." },
  { id: "10-33", title: "Экстренная ситуация", description: "Критическая ситуация, требуется срочная реакция." },
  { id: "10-57", title: "Побег", description: "Подозреваемый пытается скрыться." },
  { id: "10-76", title: "В пути", description: "Следую к указанному месту." },
  { id: "10-80", title: "Погоня", description: "Ведётся преследование." },
  { id: "10-99", title: "Требуется немедленная помощь", description: "Высший приоритет, нужна срочная поддержка." }
];

const OWNER_STATIC = "946-447";
const OWNER_FIRST_NAME = "Дмитрий";
const OWNER_LAST_NAME = "Смирнов";
const SUPABASE_URL = "https://rlcdhzignmmsmgjngqxg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_We_-wlFl2FHokpyk_IHrwg_K6fzudz6";
const cloud = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
const ACCOUNTS_KEY = "postovoy-accounts-v1";
const DB_NAME = "rpilot-database";
const DB_VERSION = 1;
const ACCOUNT_STORE = "accounts";
let accountCache = {};
const translations = {
  ru: {
    brandSubtitle: "помощник армии RMRP", shift: "Смена", codes: "Коды", optimization: "Оптимизация ПК",
    earnings: "Способы заработка", settings: "Настройки", moscow: "Москва", nextReport: "До доклада",
    currentStatus: "Текущий статус", finish: "Завершить пост", notStarted: "Смена не начата",
    choosePost: "Выберите пост и нажмите «Заступить»", activeShift: "Смена активна",
    postControlled: "Пост под контролем.", reportOnTime: "Доклад вовремя.",
    start: "Заступить на пост", guide: "Открыть инструкцию поста"
  },
  en: {
    brandSubtitle: "RMRP army assistant", shift: "Shift", codes: "Codes", optimization: "PC Optimization",
    earnings: "Earning methods", settings: "Settings", moscow: "Moscow", nextReport: "Next report",
    currentStatus: "Current status", finish: "Finish post", notStarted: "Shift not started",
    choosePost: "Choose a post and press Start", activeShift: "Shift active",
    postControlled: "Post under control.", reportOnTime: "Report on time.",
    start: "Start post", guide: "Open post guide"
  },
  de: {
    brandSubtitle: "RMRP Armeeassistent", shift: "Schicht", codes: "Codes", optimization: "PC-Optimierung",
    earnings: "Verdienstmöglichkeiten", settings: "Einstellungen", moscow: "Moskau", nextReport: "Nächster Bericht",
    currentStatus: "Aktueller Status", finish: "Posten beenden", notStarted: "Schicht nicht gestartet",
    choosePost: "Posten wählen und Start drücken", activeShift: "Schicht aktiv",
    postControlled: "Posten unter Kontrolle.", reportOnTime: "Bericht pünktlich.",
    start: "Posten starten", guide: "Postenanleitung öffnen"
  },
  uk: {
    brandSubtitle: "помічник армії RMRP", shift: "Зміна", codes: "Коди", optimization: "Оптимізація ПК",
    earnings: "Способи заробітку", settings: "Налаштування", moscow: "Москва", nextReport: "До доповіді",
    currentStatus: "Поточний статус", finish: "Завершити пост", notStarted: "Зміну не розпочато",
    choosePost: "Оберіть пост і натисніть «Заступити»", activeShift: "Зміна активна",
    postControlled: "Пост під контролем.", reportOnTime: "Доповідь вчасно.",
    start: "Заступити на пост", guide: "Відкрити інструкцію поста"
  },
  be: {
    brandSubtitle: "памочнік арміі RMRP", shift: "Змена", codes: "Коды", optimization: "Аптымізацыя ПК",
    earnings: "Спосабы заробку", settings: "Налады", moscow: "Масква", nextReport: "Да дакладу",
    currentStatus: "Бягучы статус", finish: "Завяршыць пост", notStarted: "Змена не пачата",
    choosePost: "Абярыце пост і націсніце «Заступіць»", activeShift: "Змена актыўная",
    postControlled: "Пост пад кантролем.", reportOnTime: "Даклад своечасова.",
    start: "Заступіць на пост", guide: "Адкрыць інструкцыю поста"
  },
  pl: {
    brandSubtitle: "asystent armii RMRP", shift: "Zmiana", codes: "Kody", optimization: "Optymalizacja PC",
    earnings: "Sposoby zarobku", settings: "Ustawienia", moscow: "Moskwa", nextReport: "Do raportu",
    currentStatus: "Aktualny status", finish: "Zakończ posterunek", notStarted: "Zmiana nierozpoczęta",
    choosePost: "Wybierz posterunek i naciśnij Start", activeShift: "Zmiana aktywna",
    postControlled: "Posterunek pod kontrolą.", reportOnTime: "Raport na czas.",
    start: "Rozpocznij posterunek", guide: "Otwórz instrukcję"
  }
};

const state = {
  profile: null,
  currentStatic: null,
  server: "arbat",
  language: "ru",
  theme: "dark",
  accent: "green",
  ringtone: "radio",
  repeatRing: false,
  interfaceSounds: true,
  postId: "passage",
  squad: 1,
  selectedCode: 1,
  startedAt: null,
  completedReports: []
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let toastTimer;
let lastAlertCycle = -1;
let uiAudioContext;
let lastHoverSoundAt = 0;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("postovoy-v2") || "{}");
    Object.assign(state, saved);
  } catch {}
  if (!posts[state.postId]) state.postId = "passage";
  state.completedReports = Array.isArray(state.completedReports) ? state.completedReports : [];
}

function saveState() {
  localStorage.setItem("postovoy-v2", JSON.stringify(state));
}

function getAccounts() {
  if (cloud) return accountCache;
  try {
    const localAccounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "{}");
    Object.values(localAccounts).forEach((account) => {
      const normalized = normalizeAccount(account);
      accountCache[normalized.staticId] = {
        ...(accountCache[normalized.staticId] || {}),
        ...normalized
      };
    });
  } catch {}
  return accountCache;
}

function saveAccounts(accounts) {
  accountCache = { ...accounts };
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accountCache));
  openAccountsDatabase().then((database) => {
    const transaction = database.transaction(ACCOUNT_STORE, "readwrite");
    const store = transaction.objectStore(ACCOUNT_STORE);
    store.clear();
    Object.values(accountCache).forEach((account) => store.put(account));
  }).catch(() => {});
}

function openAccountsDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(ACCOUNT_STORE)) {
        database.createObjectStore(ACCOUNT_STORE, { keyPath: "staticId" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function normalizeAccount(account) {
  const staticId = formatStaticId(account.staticId);
  const role = staticId === OWNER_STATIC
    ? "creator"
    : account.role === "donater" || account.earningsAccess ? "donater" : "user";
  return {
    ...account,
    firstName: staticId === OWNER_STATIC ? OWNER_FIRST_NAME : account.firstName,
    lastName: staticId === OWNER_STATIC ? OWNER_LAST_NAME : account.lastName,
    staticId,
    role,
    isOwner: role === "creator",
    earningsAccess: role === "creator" || role === "donater"
  };
}

async function loadAccountsDatabase() {
  let storedAccounts = {};
  try {
    const database = await openAccountsDatabase();
    const records = await new Promise((resolve, reject) => {
      const request = database.transaction(ACCOUNT_STORE, "readonly").objectStore(ACCOUNT_STORE).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
    records.forEach((account) => {
      const normalized = normalizeAccount(account);
      storedAccounts[normalized.staticId] = normalized;
    });
  } catch {}

  try {
    const legacyAccounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "{}");
    Object.values(legacyAccounts).forEach((account) => {
      const normalized = normalizeAccount(account);
      storedAccounts[normalized.staticId] = {
        ...(storedAccounts[normalized.staticId] || {}),
        ...normalized
      };
    });
  } catch {}

  accountCache = storedAccounts;
  saveAccounts(accountCache);
}

function migrateLegacyProfile() {
  if (!state.profile?.staticId || !state.profile?.passwordHash) return;
  const staticId = formatStaticId(state.profile.staticId);
  const accounts = getAccounts();
  if (!accounts[staticId]) {
    accounts[staticId] = normalizeAccount({
      ...state.profile,
      staticId
    });
    saveAccounts(accounts);
  }
  state.currentStatic = staticId;
}

function formatStaticId(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 6);
  return digits.length > 3 ? `${digits.slice(0, 3)}-${digits.slice(3)}` : digits;
}

function currentAccount() {
  if (!state.currentStatic) return null;
  return getAccounts()[state.currentStatic] || null;
}

function hasEarningsAccess() {
  const account = currentAccount();
  return Boolean(account && (account.role === "creator" || account.role === "donater"));
}

function roleLabel(role) {
  return {
    creator: "Создатель",
    donater: "Донатер",
    user: "Пользователь"
  }[role] || "Пользователь";
}

function roleIcon(role) {
  return role === "creator" ? "👑" : role === "donater" ? "💰" : "";
}

function staticEmail(staticId) {
  return `${formatStaticId(staticId).replace("-", "")}@accounts.rpilot.app`;
}

function mapCloudAccount(profile) {
  if (!profile) return null;
  return normalizeAccount({
    userId: profile.id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    rank: profile.rank,
    staticId: profile.static_id,
    callsign: profile.callsign || "",
    role: profile.role
  });
}

async function loadCloudAccounts() {
  if (!cloud) return false;
  const { data: { session } } = await cloud.auth.getSession();
  if (!session) return false;
  const { data, error } = await cloud
    .from("profiles")
    .select("id, static_id, first_name, last_name, rank, callsign, role");
  if (error) throw error;
  const cloudAccounts = {};
  (data || []).forEach((profile) => {
    const account = mapCloudAccount(profile);
    cloudAccounts[account.staticId] = account;
  });
  accountCache = cloudAccounts;
  const ownAccount = Object.values(cloudAccounts).find((account) => account.userId === session.user.id);
  if (ownAccount) {
    state.currentStatic = ownAccount.staticId;
    state.profile = ownAccount;
    saveState();
  }
  return Boolean(ownAccount);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function applyAppearance() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.dataset.accent = state.accent;
  $$("[data-theme-choice]").forEach((button) => button.classList.toggle("active", button.dataset.themeChoice === state.theme));
  $$("[data-accent-choice]").forEach((button) => button.classList.toggle("active", button.dataset.accentChoice === state.accent));
  const themeColor = state.theme === "dark" ? "#090c08" : "#e9ebe5";
  $('meta[name="theme-color"]').setAttribute("content", themeColor);
  $("#theme-icon").textContent = state.theme === "dark" ? "☀" : "☾";
}

function t(key) {
  return translations[state.language]?.[key] || translations.ru[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  $("[data-i18n='brandSubtitle']").textContent = t("brandSubtitle");
  $("[data-tab='shift']").textContent = t("shift");
  $("[data-tab='codes']").textContent = t("codes");
  $("[data-tab='optimization']").textContent = t("optimization");
  $("#earnings-tab-button").textContent = t("earnings");
  $("[data-tab='settings']").textContent = t("settings");
  $(".moscow-time small").textContent = t("moscow");
  $(".header-countdown small").textContent = t("nextReport");
  $(".active-card small").textContent = t("currentStatus");
  $("#finish-post").textContent = t("finish");
  $("#start-post").textContent = t("start");
  $("#guide-button").textContent = t("guide");
  $(".hero-copy h1").innerHTML = `${t("postControlled")}<br><span>${t("reportOnTime")}</span>`;
  updatePostUI();
}

function populateStaticControls() {
  $("#rank").innerHTML = ranks.map((rank) => `<option value="${rank}">${rank}</option>`).join("");
  const postOptions = Object.entries(posts).map(([id, post]) => `<option value="${id}">${post.name}</option>`).join("");
  $("#post-select").innerHTML = postOptions;
  $("#code-post-select").innerHTML = postOptions;
  $("#post-select").value = state.postId;
  $("#code-post-select").value = state.postId;
  $("#squad").value = state.squad;
  $("#main-code-select").value = String(state.selectedCode || 1);
  $("#ringtone").value = state.ringtone;
  $("#language-select").value = state.language;
  $("#repeat-ring").checked = state.repeatRing;
  $("#interface-sounds").checked = state.interfaceSounds !== false;
}

function syncCustomSelect(select) {
  const wrapper = select.closest(".custom-select");
  if (!wrapper) return;
  const selected = select.options[select.selectedIndex];
  wrapper.querySelector(".select-trigger span").textContent = selected?.textContent || "Выберите";
  wrapper.querySelectorAll(".select-option").forEach((option) => {
    option.classList.toggle("selected", option.dataset.value === select.value);
  });
  wrapper.querySelector(".select-trigger").disabled = select.disabled;
}

function closeCustomSelects(except) {
  $$(".custom-select.open").forEach((wrapper) => {
    if (wrapper !== except) {
      wrapper.classList.remove("open");
      wrapper.querySelector(".select-trigger").setAttribute("aria-expanded", "false");
    }
  });
}

function enhanceSelects() {
  $$("select").forEach((select) => {
    if (select.closest(".custom-select")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "custom-select";
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "select-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML = "<span></span>";

    const popover = document.createElement("div");
    popover.className = "select-popover";

    const enabledOptions = [...select.options].filter((option) => !option.disabled);
    let searchInput = null;
    if (enabledOptions.length > 7) {
      searchInput = document.createElement("input");
      searchInput.className = "select-search";
      searchInput.type = "search";
      searchInput.placeholder = "Найти вариант...";
      searchInput.autocomplete = "off";
      popover.appendChild(searchInput);
    }

    const optionsList = document.createElement("div");
    optionsList.className = "select-options";
    optionsList.setAttribute("role", "listbox");

    [...select.options].forEach((nativeOption) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "select-option";
      option.dataset.value = nativeOption.value;
      option.textContent = nativeOption.textContent;
      option.disabled = nativeOption.disabled;
      option.setAttribute("role", "option");
      option.addEventListener("click", () => {
        select.value = nativeOption.value;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        syncCustomSelect(select);
        wrapper.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.animate([
          { transform: "scale(1)" },
          { transform: "scale(.975)" },
          { transform: "scale(1)" }
        ], { duration: 240 });
      });
      optionsList.appendChild(option);
    });

    const empty = document.createElement("div");
    empty.className = "select-empty";
    empty.textContent = "Ничего не найдено";
    popover.append(optionsList, empty);
    wrapper.append(trigger, popover);

    trigger.addEventListener("click", () => {
      const willOpen = !wrapper.classList.contains("open");
      closeCustomSelects(wrapper);
      wrapper.classList.toggle("open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
      if (willOpen && searchInput) {
        searchInput.value = "";
        optionsList.querySelectorAll(".select-option").forEach((option) => option.hidden = false);
        empty.classList.remove("show");
        setTimeout(() => searchInput.focus(), 80);
      }
    });

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLocaleLowerCase("ru");
        let visible = 0;
        optionsList.querySelectorAll(".select-option").forEach((option) => {
          const matches = option.textContent.toLocaleLowerCase("ru").includes(query);
          option.hidden = !matches;
          if (matches) visible += 1;
        });
        empty.classList.toggle("show", visible === 0);
      });
      searchInput.addEventListener("click", (event) => event.stopPropagation());
    }

    select.addEventListener("change", () => syncCustomSelect(select));
    syncCustomSelect(select);
  });
}

function updateProfileUI() {
  if (!state.profile) {
    $("#profile-initials").textContent = "?";
    $("#profile-short-name").textContent = "Профиль";
    $("#profile-static").textContent = "не настроен";
    $("#profile-summary").innerHTML = '<p class="modal-description">Профиль ещё не заполнен.</p>';
    $("#earnings-tab-button").hidden = true;
    $("#access-manager").hidden = true;
    return;
  }
  const account = currentAccount() || state.profile;
  state.profile = account;
  const { firstName, lastName, rank, staticId, callsign } = account;
  const roleIcons = roleIcon(account.role) ? ` ${roleIcon(account.role)}` : "";
  $("#profile-initials").textContent = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  $("#profile-short-name").textContent = `${rank} ${lastName}${roleIcons}`;
  $("#profile-static").textContent = `Static ${staticId}`;
  $("#earnings-tab-button").hidden = !hasEarningsAccess();
  $("#access-manager").hidden = !account.isOwner;
  $("#profile-summary").innerHTML = `
    <div class="profile-summary-grid">
      <div><small>Военнослужащий</small><strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}${roleIcons}</strong></div>
      <div><small>Звание</small><strong>${escapeHtml(rank)}</strong></div>
      <div><small>Статик ID</small><strong>${escapeHtml(staticId)}</strong></div>
      <div><small>Роль</small><strong>${roleLabel(account.role)} ${roleIcon(account.role)}</strong></div>
    </div>`;
  renderAccountList();
}

function reportText(index) {
  const profile = state.profile || { rank: "Рядовой", lastName: "Военнослужащий" };
  const post = posts[state.postId].name;
  const prefix = `Докладывает: ${profile.rank} ${profile.lastName} | Пост ${post}`;
  const currentCode = state.selectedCode || 1;
  const messages = [
    `${prefix} заступил | Состав ${state.squad} | Код ${currentCode} | Доклад окончен`,
    `${prefix} | Минуты: 20 | Состав ${state.squad} | Код ${currentCode} | Доклад окончен`,
    `${prefix} | Минуты: 40 | Состав ${state.squad} | Код ${currentCode} | Доклад окончен`,
    `${prefix} | Минуты: 60 | Состав ${state.squad} | Код ${currentCode} | Доклад окончен`,
    `${prefix} сдал | Состав ${state.squad} | Код ${currentCode} | Доклад окончен`
  ];
  return messages[index];
}

function renderAccountList() {
  const container = $("#account-list");
  if (!container) return;
  const account = currentAccount();
  if (!account?.isOwner) {
    container.innerHTML = "";
    return;
  }
  const accounts = Object.values(getAccounts()).sort((a, b) => a.staticId.localeCompare(b.staticId));
  container.innerHTML = accounts.map((item) => `
    <div class="account-row">
      <div><strong>${escapeHtml(item.rank)} ${escapeHtml(item.firstName)} ${escapeHtml(item.lastName)} ${roleIcon(item.role)}</strong><small>Static ${escapeHtml(item.staticId)}</small></div>
      <span class="${item.role !== "user" ? "has-access" : ""}">${roleLabel(item.role)}</span>
    </div>`).join("") || '<p class="modal-description">Зарегистрированных аккаунтов пока нет.</p>';
}

function renderReports() {
  $("#report-list").innerHTML = Array.from({ length: 5 }, (_, index) => {
    const done = state.completedReports.includes(index);
    const labels = ["Заступление", "20 минут", "40 минут", "60 минут", "Сдача поста"];
    return `
      <article class="report ${done ? "is-complete" : ""}">
        <div class="report-index">${String(index + 1).padStart(2, "0")}</div>
        <div class="report-body">
          <p class="report-text">${escapeHtml(reportText(index))}</p>
          <div class="report-meta"><span>${labels[index]}</span><span>Арбат</span><span>${done ? "Доклад подан" : "Готов к отправке"}</span></div>
        </div>
        <button class="copy-button ${done ? "done" : ""}" data-report="${index}" type="button">${done ? "Скопировано ✓" : "Копировать"}</button>
      </article>`;
  }).join("");
  $("#reports-progress").textContent = `${state.completedReports.length} из 5 подано`;
  $$("[data-report]").forEach((button) => button.addEventListener("click", () => copyReport(Number(button.dataset.report))));
}

function renderCodes() {
  $("#code-grid").innerHTML = codes.map((code) => `
    <button class="code-card ${state.selectedCode === code.id ? "active" : ""}" data-code="${code.id}" type="button">
      <b>Код ${code.id}</b><strong>${code.title}</strong><span>${code.description}</span>
    </button>`).join("");
  $$("[data-code]").forEach((button) => button.addEventListener("click", () => {
    state.selectedCode = Number(button.dataset.code);
    $("#main-code-select").value = String(state.selectedCode);
    syncCustomSelect($("#main-code-select"));
    saveState();
    renderCodes();
    renderReports();
    updateCodePreview();
    button.classList.add("picked");
  }));
}

function renderTenCodes() {
  const renderGroup = (selector, items) => {
    $(selector).innerHTML = items.map((code) => `
    <button class="ten-code-card" data-ten-code="${code.id}" type="button">
      <b>${code.id}</b><div><strong>${code.title}</strong><span>${code.description}</span></div>
      <i>Копировать</i>
    </button>`).join("");
  };
  renderGroup("#important-ten-code-grid", tenCodes.filter((code) => code.important));
  renderGroup("#other-ten-code-grid", tenCodes.filter((code) => !code.important));
  $$("[data-ten-code]").forEach((button) => button.addEventListener("click", async () => {
    const code = tenCodes.find((item) => item.id === button.dataset.tenCode);
    await copyText(`${code.id} - ${code.title}`);
    button.classList.add("copied");
    setTimeout(() => button.classList.remove("copied"), 900);
    showToast(`${code.id} скопирован`, code.title);
  }));
}

function updateCodePreview() {
  const postId = $("#code-post-select").value || state.postId;
  $("#code-preview").textContent = `${posts[postId].name} | Код - ${state.selectedCode}`;
}

function updatePostUI() {
  const active = Boolean(state.startedAt);
  $("#active-card").classList.toggle("is-active", active);
  $("#hero-timer").classList.toggle("running", active);
  $("#start-post").disabled = active;
  $("#finish-post").disabled = !active;
  $("#post-select").disabled = active;
  syncCustomSelect($("#post-select"));
  if (active) {
    const profile = state.profile || { rank: "Рядовой", lastName: "Военнослужащий" };
    $("#post-status").textContent = `${posts[state.postId].name} · ${profile.rank} ${profile.lastName}`;
    $("#post-substatus").textContent = `Состав ${state.squad} · Сервер Арбат · ${t("activeShift")}`;
    $("#timer-caption").textContent = "Сигнал прозвучит при наступлении доклада";
  } else {
    $("#post-status").textContent = t("notStarted");
    $("#post-substatus").textContent = t("choosePost");
    $("#timer-caption").textContent = "Таймер запустится после начала поста";
  }
}

function updateClockAndTimer() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(now);
  const date = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow", day: "2-digit", month: "2-digit", year: "numeric"
  }).format(now);
  $("#clock").textContent = time;
  $("#date").textContent = date;

  let value = "20:00";
  let postProgress = 0;
  if (state.startedAt) {
    const interval = 20 * 60 * 1000;
    const elapsed = Math.max(0, Date.now() - state.startedAt);
    const remaining = interval - (elapsed % interval);
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    value = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    postProgress = Math.min(elapsed / (60 * 60 * 1000), 1);
    const cycle = Math.floor(elapsed / interval);
    if (remaining <= 1000 && cycle !== lastAlertCycle) {
      lastAlertCycle = cycle;
      playRingtone();
      showToast("Время доклада", "Подготовленный текст уже ждёт в списке");
    }
  }
  $("#countdown").textContent = value;
  $("#header-countdown").textContent = value;
  $("#post-progress").style.setProperty("--progress", postProgress.toFixed(4));
}

function openProfileModal() {
  if (state.profile) {
    $(".auth-tabs").hidden = true;
    $("#signed-in-banner").hidden = false;
    $("#signed-in-icon").textContent = roleIcon(state.profile.role) || "●";
    $("#signed-in-name").textContent = `${state.profile.rank} ${state.profile.firstName} ${state.profile.lastName} · ${roleLabel(state.profile.role)}`;
    $("#session-account-details").innerHTML = `
      <div><span>Имя и фамилия</span><strong>${escapeHtml(state.profile.firstName)} ${escapeHtml(state.profile.lastName)}</strong></div>
      <div><span>Звание</span><strong>${escapeHtml(state.profile.rank)}</strong></div>
      <div><span>Статик ID</span><strong>${escapeHtml(state.profile.staticId)}</strong></div>
      <div><span>Роль</span><strong>${escapeHtml(roleLabel(state.profile.role))}</strong></div>
      <div><span>Позывной</span><strong>${escapeHtml(state.profile.callsign || "Не указан")}</strong></div>
      <div><span>Сервер</span><strong>${escapeHtml(state.server || "Арбат")}</strong></div>`;
    $("#login-form").hidden = true;
    $("#profile-form").hidden = true;
    $("#account-session").hidden = false;
    $("#logout-button").hidden = false;
  } else {
    $("#static-id").disabled = false;
    $(".auth-tabs").hidden = false;
    $("#signed-in-banner").hidden = true;
    $("#account-session").hidden = true;
    showAuthMode("login");
    $("#logout-button").hidden = true;
  }
  $("#password").value = "";
  $("#password-confirm").value = "";
  toggleModal("profile-modal", true);
}

function showAuthMode(mode) {
  if (state.profile) {
    $(".auth-tabs").hidden = true;
    $("#login-form").hidden = true;
    $("#profile-form").hidden = true;
    $("#account-session").hidden = false;
    return;
  }
  $("#account-session").hidden = true;
  const login = mode === "login";
  $("#login-form").hidden = !login;
  $("#profile-form").hidden = login;
  $("#show-login").classList.toggle("active", login);
  $("#show-register").classList.toggle("active", !login);
}

function showAuthMessage(id, message = "") {
  const element = $(`#${id}`);
  element.textContent = message;
  element.hidden = !message;
}

function renderGuide() {
  const post = posts[state.postId];
  $("#guide-image").src = post.image;
  $("#guide-image").alt = `Пост ${post.name}`;
  $("#guide-title").textContent = post.name;
  $("#guide-description").textContent = post.description;
  $("#guide-facts").innerHTML = `
    <div><small>Форма</small><strong>${post.uniform}</strong></div>
    <div><small>Вооружение</small><strong>${post.weapon}</strong></div>
    <div><small>Позиция</small><strong>${post.position}</strong></div>
    <div><small>Состав</small><strong>${post.capacity}</strong></div>`;
  $("#guide-steps").innerHTML = post.steps.map((step) => `<li>${step}</li>`).join("");
  $("#guide-access").innerHTML = commonAccessRules.map((rule) => `<li>${rule}</li>`).join("");
  $("#guide-prohibitions").innerHTML = commonProhibitions.map((rule) => `<li>${rule}</li>`).join("");
}

function toggleModal(id, open) {
  const modal = $(`#${id}`);
  modal.classList.toggle("open", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

async function copyReport(index) {
  await copyText(reportText(index));
  if (!state.completedReports.includes(index)) state.completedReports.push(index);
  saveState();
  renderReports();
  showToast("Доклад скопирован", "Можно вставлять в рацию");
}

function startPost() {
  if (!state.profile) {
    openProfileModal();
    showToast("Сначала регистрация", "Заполните учётную карточку");
    return;
  }
  state.startedAt = Date.now();
  state.completedReports = [];
  state.postId = $("#post-select").value;
  state.squad = Math.max(1, Number($("#squad").value) || 1);
  $("#code-post-select").value = state.postId;
  syncCustomSelect($("#code-post-select"));
  saveState();
  updatePostUI();
  renderReports();
  renderCodes();
  updateCodePreview();
  playRingtone(true);
  showToast("Пост начат", `${posts[state.postId].name} · таймер запущен`);
}

function finishPost() {
  state.startedAt = null;
  saveState();
  updatePostUI();
  updateClockAndTimer();
  showToast("Пост завершён", "Смена сохранена");
}

function playRingtone(preview = false) {
  if (state.ringtone === "none" && !preview) return;
  const type = state.ringtone === "none" ? "radio" : state.ringtone;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  const patterns = {
    radio: [680, 510],
    alarm: [880, 660, 880],
    soft: [440, 554, 659]
  };
  const frequencies = patterns[type];
  const repeats = state.repeatRing && !preview ? 3 : 1;
  for (let repeat = 0; repeat < repeats; repeat += 1) {
    frequencies.forEach((frequency, index) => {
      const start = context.currentTime + repeat * 1.15 + index * .24;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type === "alarm" ? "square" : "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(.13, start + .02);
      gain.gain.exponentialRampToValueAtTime(.0001, start + .18);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + .2);
    });
  }
}

function playInterfaceSound(type = "tap") {
  if (state.interfaceSounds === false) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  uiAudioContext ||= new AudioContext();
  const context = uiAudioContext;
  if (context.state === "suspended") context.resume().catch(() => {});
  const presets = {
    tap: { frequencies: [520], duration: .055, volume: .025, wave: "sine" },
    select: { frequencies: [440, 660], duration: .07, volume: .026, wave: "sine" },
    theme: { frequencies: [390, 560, 760], duration: .085, volume: .028, wave: "triangle" },
    hover: { frequencies: [740], duration: .035, volume: .012, wave: "sine" },
    success: { frequencies: [520, 690, 860], duration: .08, volume: .03, wave: "sine" }
  };
  const preset = presets[type] || presets.tap;
  preset.frequencies.forEach((frequency, index) => {
    const start = context.currentTime + index * .055;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = preset.wave;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(preset.volume, start + .008);
    gain.gain.exponentialRampToValueAtTime(.0001, start + preset.duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + preset.duration + .01);
  });
}

function showToast(title, subtitle) {
  $("#toast strong").textContent = title;
  $("#toast small").textContent = subtitle;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2600);
}

function switchTab(tabId) {
  if (tabId === "earnings" && !hasEarningsAccess()) {
    showToast("Доступ закрыт", "Разрешение выдаёт создатель сайта");
    return;
  }
  const current = $("[data-page].active");
  if (current && current.dataset.page === tabId) return;
  if (current) current.classList.add("leaving");
  $$("[data-page]").forEach((page) => page.classList.toggle("active", page.dataset.page === tabId));
  $$("[data-tab]").forEach((button) => button.classList.toggle("active", button.dataset.tab === tabId));
  setTimeout(() => current && current.classList.remove("leaving"), 300);
  location.hash = tabId;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function bindEvents() {
  window.addEventListener("storage", (event) => {
    if (event.key !== ACCOUNTS_KEY) return;
    getAccounts();
    renderAccountList();
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled) return;
    if (button.id === "theme-toggle" || button.matches("[data-theme-choice], [data-accent-choice]")) {
      playInterfaceSound("theme");
    } else if (button.matches(".select-option, .code-card, .ten-code-card, .server-card")) {
      playInterfaceSound("select");
    } else {
      playInterfaceSound("tap");
    }
  }, true);
  document.addEventListener("pointerover", (event) => {
    if (!event.target.closest(".select-option, .code-card, .ten-code-card")) return;
    const now = Date.now();
    if (now - lastHoverSoundAt < 85) return;
    lastHoverSoundAt = now;
    playInterfaceSound("hover");
  });
  $$("[data-tab]").forEach((button) => button.addEventListener("click", () => switchTab(button.dataset.tab)));
  $("#floating-codes").addEventListener("click", () => switchTab("codes"));
  $$("[data-server-card]").forEach((button) => button.addEventListener("click", () => {
    const server = button.dataset.serverCard;
    if (server !== "arbat") {
      showToast(`${button.querySelector("strong").textContent} — в разработке`, "Пока доступны правила сервера Арбат");
      button.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(5px)" },
        { transform: "translateX(0)" }
      ], { duration: 320 });
      return;
    }
    state.server = "arbat";
    saveState();
    showToast("Сервер Арбат выбран", "Правила и посты готовы к работе");
  }));
  $("#theme-toggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveState();
    document.documentElement.classList.add("theme-changing");
    applyAppearance();
    setTimeout(() => document.documentElement.classList.remove("theme-changing"), 650);
  });
  $("#language-select").addEventListener("change", () => {
    state.language = $("#language-select").value;
    saveState();
    applyLanguage();
    syncCustomSelect($("#language-select"));
    showToast("RPilot", $("#language-select").options[$("#language-select").selectedIndex].textContent);
  });
  $("#floating-feedback").addEventListener("click", () => toggleModal("feedback-modal", true));
  $("#feedback-close").addEventListener("click", () => toggleModal("feedback-modal", false));
  $("#profile-button").addEventListener("click", openProfileModal);
  $("#edit-profile").addEventListener("click", openProfileModal);
  $("#profile-close").addEventListener("click", () => state.profile && toggleModal("profile-modal", false));
  $("#guide-close").addEventListener("click", () => toggleModal("guide-modal", false));
  $("#guide-button").addEventListener("click", () => { renderGuide(); toggleModal("guide-modal", true); });
  $("#profile-modal").addEventListener("click", (event) => {
    if (event.target.id === "profile-modal" && state.profile) toggleModal("profile-modal", false);
  });
  $("#guide-modal").addEventListener("click", (event) => {
    if (event.target.id === "guide-modal") toggleModal("guide-modal", false);
  });
  $("#feedback-modal").addEventListener("click", (event) => {
    if (event.target.id === "feedback-modal") toggleModal("feedback-modal", false);
  });
  $("#show-login").addEventListener("click", () => showAuthMode("login"));
  $("#show-register").addEventListener("click", () => {
    if (state.profile) {
      showToast("Вы уже вошли", "Сначала выйдите из текущего аккаунта");
      return;
    }
    showAuthMode("register");
  });

  ["#static-id", "#login-static", "#access-static"].forEach((selector) => {
    $(selector).addEventListener("input", (event) => {
      event.target.value = formatStaticId(event.target.value);
    });
  });

  $("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    showAuthMessage("login-message");
    if (location.protocol === "file:") {
      const message = "Облачный вход недоступен в локальном файле. Откройте https://olegdemons.github.io/RPILOT/";
      showAuthMessage("login-message", message);
      showToast("Откройте онлайн-сайт", "Авторизация работает через GitHub Pages");
      return;
    }
    const staticId = formatStaticId($("#login-static").value);
    if (cloud) {
      const submitButton = $("#login-form button[type='submit']");
      submitButton.disabled = true;
      submitButton.textContent = "Входим...";
      let error;
      try {
        ({ error } = await cloud.auth.signInWithPassword({
          email: staticEmail(staticId),
          password: $("#login-password").value
        }));
      } catch {
        error = { message: "Нет связи с облачной базой. Проверьте интернет и повторите попытку." };
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Войти в аккаунт";
      }
      if (error) {
        const invalidCredentials = /invalid login credentials/i.test(error.message);
        showToast(
          invalidCredentials ? "Облачный аккаунт не найден" : "Не удалось войти",
          invalidCredentials
            ? "Откройте «Регистрация» и создайте аккаунт в новой базе один раз"
            : error.message
        );
        showAuthMessage("login-message", invalidCredentials
          ? "Аккаунт не найден в новой облачной базе. Если вы уже нажимали регистрацию, выполните восстановительный SQL."
          : error.message);
        return;
      }
      try {
        const restored = await loadCloudAccounts();
        if (!restored) throw new Error("Profile not found");
      } catch {
        await cloud.auth.signOut();
        showToast("База не настроена", "Выполните файл supabase-setup.sql в Supabase");
        return;
      }
      updateProfileUI();
      renderReports();
      toggleModal("profile-modal", false);
      showToast("Вход выполнен", `${state.profile.rank} ${state.profile.lastName}`);
      return;
    }
    const accounts = getAccounts();
    const account = accounts[staticId];
    if (!account || account.passwordHash !== await hashPassword($("#login-password").value)) {
      showToast("Не удалось войти", "Проверьте статик и пароль");
      return;
    }
    state.currentStatic = staticId;
    state.profile = account;
    saveState();
    updateProfileUI();
    renderReports();
    toggleModal("profile-modal", false);
    showToast("Вход выполнен", `${account.rank} ${account.lastName}`);
  });

  $("#profile-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    showAuthMessage("register-message");
    if (location.protocol === "file:") {
      const message = "Облачная регистрация недоступна в локальном файле. Откройте https://olegdemons.github.io/RPILOT/";
      showAuthMessage("register-message", message);
      showToast("Откройте онлайн-сайт", "Регистрация работает через GitHub Pages");
      return;
    }
    const password = $("#password").value;
    const confirmation = $("#password-confirm").value;
    const staticId = formatStaticId($("#static-id").value);
    const accounts = getAccounts();
    const existing = accounts[staticId];
    const signedInAccount = currentAccount();
    if (staticId.length !== 7) {
      showToast("Неверный статик", "Введите 6 цифр в формате 123-456");
      return;
    }
    if (cloud) {
      if (password.length < 6) {
        showToast("Нужен пароль", "Введите не менее 6 символов");
        return;
      }
      if (password !== confirmation) {
        showToast("Пароли не совпадают", "Проверьте оба поля");
        return;
      }
      const { data, error } = await cloud.auth.signUp({
        email: staticEmail(staticId),
        password,
        options: {
          data: {
            static_id: staticId,
            first_name: staticId === OWNER_STATIC ? OWNER_FIRST_NAME : $("#first-name").value.trim(),
            last_name: staticId === OWNER_STATIC ? OWNER_LAST_NAME : $("#last-name").value.trim(),
            rank: $("#rank").value,
            callsign: $("#callsign").value.trim()
          }
        }
      });
      if (error) {
        const duplicate = /already|registered|duplicate|database/i.test(error.message);
        showToast(duplicate ? "Статик уже зарегистрирован" : "Ошибка регистрации", duplicate ? "Войдите в существующий аккаунт" : error.message);
        showAuthMessage("register-message", `${duplicate ? "Аккаунт уже существует или был создан не полностью." : "Supabase отклонил регистрацию."} ${error.message}`);
        return;
      }
      if (!data.session) {
        showToast("Подтверждение включено", "Отключите Confirm email в настройках Supabase Auth");
        return;
      }
      try {
        await loadCloudAccounts();
      } catch {
        showToast("Профиль не создан", "Выполните файл supabase-setup.sql в SQL Editor");
        return;
      }
      updateProfileUI();
      renderReports();
      toggleModal("profile-modal", false);
      showToast("Регистрация завершена", `${state.profile.rank} ${state.profile.lastName}`);
      return;
    }
    if (signedInAccount?.isOwner && staticId !== OWNER_STATIC) {
      showToast("Статик создателя защищён", `Используйте ${OWNER_STATIC}`);
      $("#static-id").value = OWNER_STATIC;
      return;
    }
    if (existing && state.currentStatic !== staticId) {
      showToast("Статик уже зарегистрирован", "Войдите в существующий аккаунт");
      showAuthMode("login");
      $("#login-static").value = staticId;
      return;
    }
    if (!existing?.passwordHash && password.length < 6) {
      showToast("Нужен пароль", "Введите не менее 6 символов");
      $("#password").focus();
      return;
    }
    if (password && password !== confirmation) {
      showToast("Пароли не совпадают", "Проверьте оба поля");
      $("#password-confirm").focus();
      return;
    }
    const passwordHash = password ? await hashPassword(password) : existing?.passwordHash;
    if (!passwordHash) {
      showToast("Нужен пароль", "Введите не менее 6 символов");
      return;
    }
    const account = {
      firstName: staticId === OWNER_STATIC ? OWNER_FIRST_NAME : $("#first-name").value.trim(),
      lastName: staticId === OWNER_STATIC ? OWNER_LAST_NAME : $("#last-name").value.trim(),
      rank: $("#rank").value,
      staticId,
      callsign: $("#callsign").value.trim(),
      passwordHash,
      role: staticId === OWNER_STATIC ? "creator" : existing?.role || "user",
      isOwner: staticId === OWNER_STATIC,
      earningsAccess: staticId === OWNER_STATIC || existing?.role === "donater"
    };
    if (state.currentStatic && state.currentStatic !== staticId) delete accounts[state.currentStatic];
    accounts[staticId] = account;
    saveAccounts(accounts);
    state.currentStatic = staticId;
    state.profile = account;
    saveState();
    updateProfileUI();
    renderReports();
    toggleModal("profile-modal", false);
    showToast("Профиль сохранён", `${state.profile.rank} ${state.profile.lastName}`);
  });

  $("#logout-button").addEventListener("click", async () => {
    if (cloud) await cloud.auth.signOut();
    state.currentStatic = null;
    state.profile = null;
    saveState();
    updateProfileUI();
    renderReports();
    switchTab("shift");
    $("#static-id").disabled = false;
    $(".auth-tabs").hidden = false;
    $("#signed-in-banner").hidden = true;
    $("#account-session").hidden = true;
    showAuthMode("login");
    $("#logout-button").hidden = true;
    showToast("Вы вышли", "Войдите, чтобы продолжить работу");
  });

  $("#access-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const owner = currentAccount();
    if (!owner?.isOwner) return;
    const staticId = formatStaticId($("#access-static").value);
    if (cloud) {
      const { error } = await cloud.rpc("set_rpilot_role", {
        target_static: staticId,
        requested_role: $("#access-role").value
      });
      if (error) {
        const missing = /not found/i.test(error.message);
        showToast(missing ? "Аккаунт не найден" : "Не удалось изменить роль", missing ? "Проверьте введённый Static ID" : error.message);
        return;
      }
      await loadCloudAccounts();
      updateProfileUI();
      renderAccountList();
      showToast("Роль сохранена", `${roleLabel(getAccounts()[staticId].role)} · Static ${staticId}`);
      $("#access-form").reset();
      syncCustomSelect($("#access-role"));
      return;
    }
    const accounts = getAccounts();
    if (!accounts[staticId]) {
      showToast("Аккаунт не найден", "Пользователь должен зарегистрироваться на этом устройстве");
      return;
    }
    if (accounts[staticId].role === "creator") {
      showToast("Роль создателя защищена", OWNER_STATIC);
      return;
    }
    accounts[staticId] = normalizeAccount({
      ...accounts[staticId],
      role: $("#access-role").value
    });
    saveAccounts(accounts);
    renderAccountList();
    showToast("Роль сохранена", `${roleLabel(accounts[staticId].role)} · Static ${staticId}`);
    $("#access-form").reset();
    syncCustomSelect($("#access-role"));
  });

  $("#post-select").addEventListener("change", () => {
    state.postId = $("#post-select").value;
    $("#code-post-select").value = state.postId;
    syncCustomSelect($("#code-post-select"));
    saveState();
    renderReports();
    updateCodePreview();
  });
  $("#squad").addEventListener("input", () => {
    state.squad = Math.max(1, Number($("#squad").value) || 1);
    saveState();
    renderReports();
  });
  $("#main-code-select").addEventListener("change", () => {
    state.selectedCode = Number($("#main-code-select").value);
    saveState();
    renderCodes();
    renderReports();
    updateCodePreview();
    showToast(`Выбран Код ${state.selectedCode}`, codes.find((code) => code.id === state.selectedCode)?.title || "");
  });
  $("#code-post-select").addEventListener("change", updateCodePreview);
  $("#start-post").addEventListener("click", startPost);
  $("#finish-post").addEventListener("click", finishPost);
  $("#copy-code").addEventListener("click", async () => {
    await copyText($("#code-preview").textContent);
    showToast("Код скопирован", "Можно отправлять в рацию");
  });

  $$("[data-theme-choice]").forEach((button) => button.addEventListener("click", () => {
    state.theme = button.dataset.themeChoice;
    saveState();
    applyAppearance();
  }));
  $$("[data-accent-choice]").forEach((button) => button.addEventListener("click", () => {
    state.accent = button.dataset.accentChoice;
    saveState();
    applyAppearance();
  }));
  $("#ringtone").addEventListener("change", () => { state.ringtone = $("#ringtone").value; saveState(); });
  $("#repeat-ring").addEventListener("change", () => { state.repeatRing = $("#repeat-ring").checked; saveState(); });
  $("#interface-sounds").addEventListener("change", () => {
    state.interfaceSounds = $("#interface-sounds").checked;
    saveState();
    if (state.interfaceSounds) playInterfaceSound("success");
  });
  $("#preview-ringtone").addEventListener("click", () => playRingtone(true));
  $("#feedback-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const type = $("#feedback-type").value;
    const message = $("#feedback-message").value.trim();
    const contact = $("#feedback-contact").value.trim() || "не указан";
    const profile = state.profile ? `${state.profile.rank} ${state.profile.firstName} ${state.profile.lastName}, Static ${state.profile.staticId}` : "профиль не заполнен";
    const report = `Тип: ${type}\nПользователь: ${profile}\nКонтакт: ${contact}\nРаздел: ${location.hash || "#shift"}\n\n${message}`;
    await copyText(report);
    const subject = encodeURIComponent(`[Постовой] ${type}`);
    const body = encodeURIComponent(report);
    toggleModal("feedback-modal", false);
    showToast("Обращение скопировано", "Открываем почтовое приложение");
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCustomSelects();
      if (state.profile) toggleModal("profile-modal", false);
      toggleModal("guide-modal", false);
      toggleModal("feedback-modal", false);
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".custom-select")) closeCustomSelects();
  });
}

async function init() {
  loadState();
  try {
    await loadAccountsDatabase();
  } catch {
    accountCache = {};
  }
  migrateLegacyProfile();
  let cloudSessionRestored = false;
  if (cloud) {
    try {
      cloudSessionRestored = await loadCloudAccounts();
    } catch {
      showToast("Облачная база недоступна", "Проверьте настройку Supabase");
    }
    if (!cloudSessionRestored) {
      state.currentStatic = null;
      state.profile = null;
      saveState();
    }
  }
  const accounts = getAccounts();
  if (!cloud && state.currentStatic && accounts[state.currentStatic]) {
    state.profile = accounts[state.currentStatic];
  } else if (!cloud && state.currentStatic && state.profile?.staticId === state.currentStatic) {
    const restoredAccount = normalizeAccount(state.profile);
    accounts[restoredAccount.staticId] = restoredAccount;
    state.profile = restoredAccount;
    saveAccounts(accounts);
  } else if (!cloud && state.currentStatic) {
    state.currentStatic = null;
    state.profile = null;
    saveState();
  }
  applyAppearance();
  populateStaticControls();
  enhanceSelects();
  applyLanguage();
  updateProfileUI();
  renderReports();
  renderCodes();
  renderTenCodes();
  updateCodePreview();
  updatePostUI();
  updateClockAndTimer();
  bindEvents();
  const hash = location.hash.replace("#", "");
  if (["shift", "codes", "optimization", "laws", "settings"].includes(hash)) switchTab(hash);
  if (hash === "earnings") {
    if (hasEarningsAccess()) switchTab("earnings");
    else history.replaceState(null, "", "#shift");
  }
  if (!state.profile) openProfileModal();
  setInterval(updateClockAndTimer, 1000);
}

init();
