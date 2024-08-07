import useGetTafseer from "@/client/verse/api/use-get-tafseer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ErrorCard from "./error-card";
import Loading from "./loading";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useTafseer } from "@/client/verse/hooks/use-tafseer";
import { useState } from "react";

type props = { verseId: number; chapterId: number };

export default function TafseerModel({ chapterId, verseId }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const { tafseerId } = useTafseer();
  const tafseerQuery = useGetTafseer({ chapterId, tafseerId, verseId, enabled: isOpen });

  const isLoading = tafseerQuery.isLoading || tafseerQuery.isPending;
  const isError = tafseerQuery.isError;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="p-0 text-primary font-bold" variant="link">
          <p>قراءة التفسير</p> <ArrowLeft size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        {isLoading && <Loading />}
        {isError && <ErrorCard />}
        {!isLoading && !isError && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-semibold">{tafseerQuery.data.name}</DialogTitle>
            </DialogHeader>
            <p className="text-justify text-2xl" style={{ fontFamily: "uthmanic" }}>
              {tafseerQuery.data.text.replace(/[،]/g, ",").replace(/[؟]/g, "?")}
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
