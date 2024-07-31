import { Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

type props = {
  verseId: number;
  chapterId: number;
};

export default function ShareAction({ verseId, chapterId }: props) {
  const t = useTranslations("General");
  const tMeta = useTranslations("HomePageMetaData");
  const pathname = usePathname();

  const handleShare = async () => {
    const url = `${window.location.origin}${pathname}?verse=${verseId}&chapter=${chapterId}`;
    const shareData = {
      title: tMeta("title"),
      text: tMeta("description"),
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success(t("success"));
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      console.log("Web Share API is not supported in this browser");
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success(t("success"));
        })
        .catch(() => {
          toast.success(t("fail"));
        });
    }
  };

  return (
    <button onClick={handleShare}>
      <Share2 className={"text-muted-foreground  cursor-pointer"} />
    </button>
  );
}
