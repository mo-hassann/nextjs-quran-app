export const QURAN_JSON_API_URL = "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist";

export const VERSE_AUDIO_API_URL = "https://everyayah.com/data";

export const TAFSEER_API_URL = "http://api.quran-tafseer.com/tafseer";

type Readers = "Basit" | "Dussary" | "Muaiqly" | "Minshawy";

export const AVAILABLE_READERS: { id: string; name: Readers }[] = [
  {
    id: "Abdul_Basit_Mujawwad_128kbps",
    name: "Basit",
  },
  {
    id: "Yasser_Ad-Dussary_128kbps",
    name: "Dussary",
  },
  {
    id: "MaherAlMuaiqly128kbps",
    name: "Muaiqly",
  },
  {
    id: "Minshawy_Murattal_128kbps",
    name: "Minshawy",
  },
];

export const AVAILABLE_TAFSEER = [
  { id: 1, name: "التفسير الميسر", author: "نخبة من العلماء", book_name: "التفسير الميسر" },
  { id: 2, name: "تفسير الجلالين", author: "جلال الدين المحلي و السيوطي", book_name: "تفسير الجلالين" },
  { id: 3, name: "تفسير السعدي", author: "عبد الرحمن بن ناصر بن عبد الله السعدي التميمي مفسر", book_name: "تيسير الكريم الرحمن في تفسير كلام المنان" },
  { id: 4, name: "تفسير ابن كثير", author: "عماد الدين أبي الفداء إسماعيل بن كثير القرشي", book_name: "تفسير القرآن العظيم" },
  { id: 5, name: "تفسير الوسيط لطنطاوي", author: "محمد سيد طنطاوي", book_name: "التفسير الوسيط للقرآن الكريم" },
  { id: 6, name: "تفسير البغوي", author: "الحسين بن مسعود البغوي أبو محمد", book_name: "معالم التنزيل" },
  { id: 7, name: "تفسير القرطبي", author: "أبو عبد الله محمد بن أحمد الأنصاري القرطبي", book_name: "الجامع لأحكام القرآن" },
  { id: 8, name: "تفسير الطبري", author: "الإمام أبو جعفر الطبري", book_name: "جامع البيان في تأويل القرآن" },
];

/* -- RECOURSES -- */
// api.quran-tafseer.com/tafseer/{tafseer_id}/{sura_number}/{ayah_number}
//---API URL --- https://quranapi.pages.dev/docs/getting-started/audio-of-an-ayah
//  "https://quranaudio.pages.dev"
// https://everyayah.com/data/Abdul_Basit_Mujawwad_128kbps/002144.mp3 {CHAPTER+VERSE}

// GET VERSES API
//https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/

// https://quranapi.pages.dev/docs/resources
