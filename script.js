/* ============ منيو جرعة خفيفة (54 صنف) يظهر لو الشيت مش متوصل ============ */
/* الأعمدة: القسم | الصنف | السعر | الوصف | متاح */
const FALLBACK = [
  ["قهوة ساخنة","هوت شوكلت",14,"","نعم"],
  ["قهوة ساخنة","اسبريسو",8,"","نعم"],
  ["قهوة ساخنة","فلات وايت",13,"","نعم"],
  ["قهوة ساخنة","لاتيه",14,"","نعم"],
  ["قهوة ساخنة","كابتشينو",14,"","نعم"],
  ["قهوة ساخنة","كورتادو",12,"","نعم"],
  ["قهوة ساخنة","امريكانو",10,"","نعم"],
  ["قهوة ساخنة","موكا",14,"","نعم"],
  ["قهوة ساخنة","اسبريسو ماكياتو",10,"","نعم"],
  ["قهوة ساخنة","قهوة تركيه",12,"","نعم"],
  ["قهوة ساخنة","قهوة فرنسية",12,"","نعم"],
  ["قهوة ساخنة","قهوة ايطالي",14,"","نعم"],
  ["قهوة ساخنة","قهوة عربية",20,"","نعم"],
  ["قهوة ساخنة","شاي",5,"","نعم"],
  ["قهوة ساخنة","ابريق شاي",20,"","نعم"],
  ["قهوة ساخنة","شاي كرك",8,"","نعم"],
  ["قهوة باردة","سبانيش لاتيه",16,"","نعم"],
  ["قهوة باردة","بستاشيو",19,"","نعم"],
  ["قهوة باردة","زعفران",19,"","نعم"],
  ["قهوة باردة","ايس لاتيه",14,"","نعم"],
  ["قهوة باردة","ايس امريكنو",12,"","نعم"],
  ["قهوة باردة","ايس موكا",14,"","نعم"],
  ["قهوة باردة","ايس وايت موكا",17,"","نعم"],
  ["قهوة باردة","ايس تي",15,"","نعم"],
  ["قهوة باردة","كارميل ماكياتو",15,"","نعم"],
  ["قهوة باردة","موهيتو",12,"","نعم"],
  ["قهوة باردة","كركدية",15,"","نعم"],
  ["قهوة باردة","ماتشا",19,"","نعم"],
  ["قهوة باردة","ماء",1,"","نعم"],
  ["قهوة مقطرة","مقطرة V60",13,"","نعم"],
  ["قهوة مقطرة","قهوة اليوم",9,"","نعم"],
  ["قهوة مقطرة","ترمس شاي",35,"","نعم"],
  ["قهوة مقطرة","ترمس قهوة",40,"","نعم"],
  ["حلويات","كوكيز سينامون",15,"","نعم"],
  ["حلويات","كوكيز كيك",9,"","نعم"],
  ["حلويات","سان سباستيان",18,"","نعم"],
  ["حلويات","كيك ماربل",8,"","نعم"],
  ["حلويات","كيكة العسل",14,"","نعم"],
  ["حلويات","كيكة ايس كريم",15,"","نعم"],
  ["حلويات","تشيز كيك لوتس",14,"","نعم"],
  ["حلويات","وافل",6,"","نعم"],
  ["حلويات","كرواسون",8,"","نعم"],
  ["حلويات","سوفلية",12,"","نعم"],
  ["حلويات","كيكة ليمون",8,"","نعم"],
  ["حلويات","كيكة سينابون",12,"","نعم"],
  ["حلويات","كيكة زعفران",12,"","نعم"],
  ["حلويات","كيكة تمر",14,"","نعم"],
  ["حلويات","كيكة جوانش",18,"","نعم"],
  ["حلويات","كيكة شوكوتشيز",18,"","نعم"],
  ["حلويات","تراميسو",16,"","نعم"],
  ["حلويات","بانكيك",10,"","نعم"],
  ["حلويات","بانكيك (2)",20,"","نعم"],
  ["حلويات","دونات",8,"","نعم"],
  ["مكسرات","مكسرات",5,"","نعم"]
];

/* ============ قراءة CSV ============ */
function parseCSV(text) {
  text = text.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [], cur = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') quoted = false;
      else cur += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cur); cur = "";
      if (row.some(v => v.trim() !== "")) rows.push(row);
      row = [];
    } else cur += c;
  }
  row.push(cur);
  if (row.some(v => v.trim() !== "")) rows.push(row);
  return rows;
}

const OUT_RE = /^(لا|no|0|false|خلص|خلصت)$/i;
function isAvailable(v) { return !OUT_RE.test((v || "").toString().trim()); }

/* يشيل .00 من آخر السعر (16.00 -> 16) */
function formatPrice(p) {
  p = (p || "").toString().trim();
  return /^\d+\.0+$/.test(p) ? p.replace(/\.0+$/, "") : p;
}

/* الصيغة القديمة (بالترتيب): القسم | الصنف | السعر | الوصف | متاح */
function toItems(rows) {
  return rows.map(r => ({
    category: (r[0] || "").trim(),
    name: (r[1] || "").trim(),
    price: formatPrice(r[2]),
    desc: (r[3] || "").trim(),
    available: isAvailable(r[4]),
    sort: 9999
  })).filter(i => i.name);
}

/* الصيغة الجديدة (شيت Loyverse): بتتقرا بأسماء الأعمدة في الصف الأول
   sku, name, category, price, description, image_url, available, sort */
function toItemsNamed(rows) {
  const head = rows[0].map(h => h.trim().toLowerCase());
  const get = (r, key) => {
    const i = head.indexOf(key);
    return i < 0 ? "" : (r[i] || "").toString().trim();
  };
  return rows.slice(1).map(r => ({
    category: get(r, "category"),
    name: get(r, "name"),
    price: formatPrice(get(r, "price")),
    desc: get(r, "description"),
    available: isAvailable(get(r, "available")),
    sort: parseFloat(get(r, "sort")) || 9999
  })).filter(i => i.name);
}

function isNamedFormat(rows) {
  const head = (rows[0] || []).map(h => h.trim().toLowerCase());
  return head.includes("sku") && head.includes("name");
}

let usedFallback = false;

async function loadItems() {
  if (CONFIG.sheetApiUrl) {
    try {
      const apiSep = CONFIG.sheetApiUrl.includes("?") ? "&" : "?";
      const res = await fetch(CONFIG.sheetApiUrl + apiSep + "t=" + Date.now(), { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      let items = (data.items || []).map(i => ({
        category: (i.category || "").trim(),
        name: (i.name || "").trim(),
        price: formatPrice(i.price),
        desc: (i.desc || "").trim(),
        available: isAvailable(i.available),
        sort: parseFloat(i.sort) || 9999
      })).filter(i => i.name);
      if (CONFIG.hideUnavailable !== false) items = items.filter(i => i.available);
      if (!items.length) throw new Error("الشيت فاضي");
      return items;
    } catch (err) {
      console.warn("تعذّر قراءة رابط Apps Script، جرّب CSV أو المحفوظ:", err);
    }
  }
  if (!CONFIG.sheetCsvUrl) { usedFallback = true; return toItems(FALLBACK); }
  try {
    const sep = CONFIG.sheetCsvUrl.includes("?") ? "&" : "?";
    const res = await fetch(CONFIG.sheetCsvUrl + sep + "t=" + Date.now());
    if (!res.ok) throw new Error("HTTP " + res.status);
    const rows = parseCSV(await res.text());
    if (!rows.length) throw new Error("الشيت فاضي");

    if (isNamedFormat(rows)) {
      // شيت Loyverse: الأصناف المخفية (available = FALSE) ما بتظهرش في المنيو
      // لو عايزها تظهر مشطوبة "خلص" اكتب hideUnavailable: false في config.js
      let items = toItemsNamed(rows);
      if (CONFIG.hideUnavailable !== false) items = items.filter(i => i.available);
      return items;
    }

    rows.shift(); // صف العناوين (الشيت القديم)
    const items = toItems(rows);
    if (!items.length) throw new Error("الشيت فاضي");
    return items;
  } catch (err) {
    console.warn("تعذّر قراءة الشيت، عرض المنيو المحفوظ:", err);
    usedFallback = true;
    return toItems(FALLBACK);
  }
}

/* ============ العرض ============ */
const menuEl = document.getElementById("menu");
const catsEl = document.getElementById("cats");
let ALL = [];

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

function render(items) {
  menuEl.replaceChildren();
  catsEl.replaceChildren();

  if (!items.length) {
    menuEl.appendChild(el("p", "empty",
      ALL.length ? "لا توجد نتائج. جرّب كلمة أخرى." : "المنيو غير متاح حاليًا."));
    return;
  }

  const groups = new Map();
  items.forEach(i => {
    const key = i.category || "أصناف";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(i);
  });

  let n = 0;
  groups.forEach((list, cat) => {
    list.sort((a, b) => (a.sort || 9999) - (b.sort || 9999)); // ترتيب الأصناف جوه القسم (عمود sort)
    const id = "cat-" + (n++);
    const a = el("a", "", cat);
    a.href = "#" + id;
    catsEl.appendChild(a);

    const sec = el("section");
    sec.id = id;
    sec.appendChild(el("h2", "", cat));

    list.forEach(i => {
      const item = el("div", "item" + (i.available ? "" : " out"));
      const row = el("div", "row");
      const name = el("span", "name", i.name);
      row.appendChild(name);
      if (!i.available) row.appendChild(el("span", "tag", "خلص"));
      row.appendChild(el("span", "leader"));
      if (i.price) {
        const p = el("span", "price", i.price + " ");
        p.appendChild(el("small", "", CONFIG.currency));
        row.appendChild(p);
      }
      item.appendChild(row);
      if (i.desc) item.appendChild(el("p", "desc", i.desc));
      sec.appendChild(item);
    });
    menuEl.appendChild(sec);
  });
  watchSections();
}

/* يلوّن زرار القسم اللي ظاهر على الشاشة دلوقتي */
let observer;
function watchSections() {
  if (observer) observer.disconnect();
  if (!("IntersectionObserver" in window)) return;
  const links = [...catsEl.querySelectorAll("a")];
  observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => {
        const on = a.getAttribute("href") === "#" + e.target.id;
        a.classList.toggle("on", on);
        if (on) {
          a.setAttribute("aria-current", "true");
          a.scrollIntoView({ inline: "center", block: "nearest" });
        } else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-150px 0px -60% 0px" });
  menuEl.querySelectorAll("section").forEach(s => observer.observe(s));
}

document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  render(!q ? ALL : ALL.filter(i =>
    i.name.toLowerCase().includes(q) ||
    i.desc.toLowerCase().includes(q) ||
    i.category.toLowerCase().includes(q)));
});

/* ============ تشغيل ============ */
const cafeName = (CONFIG.cafeName || "").trim();
document.title = "منيو " + cafeName;
document.getElementById("cafeName").textContent = cafeName;
if (CONFIG.cafeNameEn) {
  const en = document.getElementById("cafeNameEn");
  en.textContent = CONFIG.cafeNameEn;
  en.hidden = false;
}
document.getElementById("tagline").textContent = CONFIG.tagline;
if (CONFIG.whatsapp) {
  const wa = document.getElementById("waBtn");
  wa.href = "https://wa.me/" + CONFIG.whatsapp.replace(/\D/g, "");
  wa.hidden = false;
}

function fillFooter() {
  let any = false;
  if (CONFIG.address) {
    const p = document.getElementById("address");
    if (CONFIG.mapUrl) {
      const a = el("a", "", CONFIG.address);
      a.href = CONFIG.mapUrl; a.target = "_blank"; a.rel = "noopener";
      p.appendChild(a);
    } else p.textContent = CONFIG.address;
    any = true;
  }
  if (CONFIG.handle) {
    const h = document.getElementById("handle");
    h.textContent = CONFIG.handle;
    h.hidden = false;
    any = true;
  }
  const social = document.getElementById("social");
  [["instagram", "انستغرام"], ["tiktok", "تيك توك " ] , ["snapchat", "سناب شات"]].forEach(([key, label]) => {
    if (!CONFIG[key]) return;
    const a = el("a", "", label);
    a.href = CONFIG[key]; a.target = "_blank"; a.rel = "noopener";
    social.appendChild(a);
    any = true;
  });
  document.getElementById("foot").hidden = !any;
}
fillFooter();

let lastSig = "";
function refresh(silent) {
  usedFallback = false;
  return loadItems().then(items => {
    // تحديث صامت: لو القراءة فشلت أو مفيش تغيير، سيب الشاشة زي ما هي
    if (silent && usedFallback && ALL.length) return;
    const sig = JSON.stringify(items);
    if (silent && sig === lastSig) return;
    lastSig = sig;
    ALL = items;
    document.getElementById("notice").hidden = !usedFallback;
    const q = document.getElementById("search").value.trim();
    if (q) document.getElementById("search").dispatchEvent(new Event("input"));
    else render(ALL);
  });
}
refresh();

/* تحديث تلقائي كل CONFIG.refreshSeconds ثانية (افتراضي 10) طول ما الصفحة ظاهرة */
const POLL_MS = Math.max(5, Number(CONFIG.refreshSeconds) || 10) * 1000;
let busy = false;
function poll() {
  if (document.visibilityState !== "visible" || busy) return;
  busy = true;
  refresh(true).finally(() => { busy = false; });
}
setInterval(poll, POLL_MS);
document.addEventListener("visibilitychange", poll);