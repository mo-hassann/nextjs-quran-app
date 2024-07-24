import React from "react";
import SurahCard from "./surah-card";

export default function SurahContainer() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
      {Array(144)
        .fill(null)
        .map((_, i) => (
          <SurahCard key={i} />
        ))}
    </div>
  );
}
