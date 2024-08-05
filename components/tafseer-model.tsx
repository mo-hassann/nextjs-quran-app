import useGetTafseer from "@/client/verse/api/use-get-tafseer";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type props = { onOpenChange: () => void; tafseerId: number; verseId?: number; chapterId?: number };

export default function TafseerModel({ onOpenChange, chapterId, tafseerId, verseId }: props) {
  const tafseerQuery = useGetTafseer({ chapterId, tafseerId, verseId });

  const isLoading = tafseerQuery.isLoading || tafseerQuery.isPending;
  const isError = tafseerQuery.isError;

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        {isLoading && <p>loading...</p>}
        {isError && <p>error.</p>}
        {!isLoading && !isError && (
          <>
            <DialogHeader>
              <p className="text-center text-2xl font-semibold">{tafseerQuery.data.name}</p>
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
