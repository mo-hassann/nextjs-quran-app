"use client";
import { useQuranPlayer } from "@/client/verse/hooks/use-quran-player";
import { useTafseer } from "@/client/verse/hooks/use-tafseer";
import QuranPlayer from "@/components/quran-player";
import SignUpModel from "@/components/sign-up-model";
import TafseerModel from "@/components/tafseer-model";
import { useSignupModel } from "@/hooks/use-signup-model";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { useEffect } from "react";

export default function ModelProvider() {
  const quranPlayerModel = useQuranPlayer();
  const signupModel = useSignupModel();
  const tafseer = useTafseer();

  const { updateSearchParams } = useUpdateSearchParams();

  // when the quran player model is open update the search params of the verse id
  useEffect(() => {
    const { isOpen, chapterId, verseId } = quranPlayerModel;
    if (isOpen && verseId && chapterId) {
      updateSearchParams({ verse: verseId, chapter: chapterId }, { scroll: false });
    }
  }, [updateSearchParams, quranPlayerModel]);

  return (
    <>
      {quranPlayerModel.isOpen && <QuranPlayer />}
      {signupModel.isOpen && <SignUpModel onOpenChange={signupModel.onClose} />}
      {tafseer.isOpen && <TafseerModel tafseerId={tafseer.tafseerId} chapterId={tafseer.chapterId} verseId={tafseer.verseId} handleOpenChange={() => tafseer.onClose()} />}
    </>
  );
}
