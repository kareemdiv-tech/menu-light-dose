/* ============ إعدادات الكافيه (غيّرها من هنا فقط) ============ */
const CONFIG = {
  cafeName: "جرعة خفيفة",
  cafeNameEn: "LIGHT DOSE", // الاسم بالإنجليزي تحت الاسم العربي (فاضي = يختفي)
  tagline: "قهوة مختصة ومعجنات طازجة كل يوم",
  currency: "ر.س",
  whatsapp: "966501330075", // مثال: 9665XXXXXXXX  (اتركه فارغًا لإخفاء الزرار)
  hideUnavailable: false, // true = الصنف اللي available = FALSE يختفي من المنيو | false = يظهر مشطوب "خلص"

  /* الفوتر (كل حقل فاضي بيختفي) */
  address: "الرياض - حي الشفا - شارع ابي تمام",
  mapUrl: "https://maps.app.goo.gl/AtNxV9LyDpFRSXVg7" ,  // رابط الموقع على خرائط جوجل (لو اتحط، العنوان بيبقى لينك)
  handle: "LIGHT . 1DOSE", // اسم الحساب زي ما هو مكتوب على المنيو المطبوع
  instagram: "", // رابط الحساب كامل، مثال: https://instagram.com/اسم_الحساب
  tiktok: "https://www.tiktok.com/@light.1dose.cafe?_r=1&_t=ZS-9APugVQCd6O",
  snapchat: "https://www.snapchat.com/add/light.1dose",

  /* رابط تطبيق الويب (Apps Script) - لو اتحط بيتقرا الأول */
  sheetApiUrl:
    "https://script.google.com/macros/s/AKfycbyWPdckBSn2cxWRoLmmz7WtMC5GzJ54ZVl8-zvL7GXqCCMjW0ZNEL7msTORBIOdf-PD/exec", // مثال: https://script.google.com/macros/s/XXXX/exec

  /* لينك الشيت المنشور CSV (File > Share > Publish to web > اختار التبويب > CSV) */
  sheetCsvUrl:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vToCUE87GKIArLWfl3J5Rix_vKoVgCkTOBawBAB0l3GISKH67Ygh8ZgfM5BJuqg1hmBtb7oditq3Eae/pub?gid=412001490&single=true&output=csv", // الملف جنب الموقع. لو عايزه يتحدّث من Google Sheets حط لينك الـ CSV المنشور هنا بدله
};
