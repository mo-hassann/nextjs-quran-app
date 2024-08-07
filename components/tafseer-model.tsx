import useGetTafseer from "@/client/verse/api/use-get-tafseer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ErrorCard from "./error-card";
import Loading from "./loading";

type props = { tafseerId: number; verseId?: number; chapterId?: number; handleOpenChange: () => void };

export default function TafseerModel({ tafseerId, chapterId, verseId, handleOpenChange }: props) {
  const tafseerQuery = useGetTafseer({ chapterId, tafseerId, verseId });

  const isLoading = tafseerQuery.isLoading || tafseerQuery.isPending;
  const isError = tafseerQuery.isError;

  return (
    <Dialog open onOpenChange={handleOpenChange}>
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
