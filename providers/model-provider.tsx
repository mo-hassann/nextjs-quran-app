"use client";
import { useQuranPlayer } from "@/client/verse/hooks/use-quran-player";
import QuranPlayer from "@/components/quran-player";

export default function ModelProvider() {
  const { isOpen } = useQuranPlayer();

  return <>{isOpen && <QuranPlayer />}</>;
}
