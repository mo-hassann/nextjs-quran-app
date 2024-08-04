export const QURAN_JSON_API_URL = "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist";

export const VERSE_AUDIO_API_URL = "https://everyayah.com/data";

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

/* -- RECOURSES -- */
// api.quran-tafseer.com/tafseer/{tafseer_id}/{sura_number}/{ayah_number}
//---API URL --- https://quranapi.pages.dev/docs/getting-started/audio-of-an-ayah
//  "https://quranaudio.pages.dev"
// https://everyayah.com/data/Abdul_Basit_Mujawwad_128kbps/002144.mp3 {CHAPTER+VERSE}

// GET VERSES API
//https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/

// https://quranapi.pages.dev/docs/resources
