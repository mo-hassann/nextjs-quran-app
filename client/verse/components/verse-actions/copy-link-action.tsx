import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

type props = {
  verseId: number;
  chapterId: number;
};

export default function CopyLinkAction({ verseId, chapterId }: props) {
  const t = useTranslations("General");
  const pathname = usePathname();

  return (
    <button
      onClick={() => {
        navigator.clipboard
          .writeText(`${window.location.origin}${pathname}?verse=${verseId}&chapter=${chapterId}`)
          .then(() => {
            toast.success(t("success"));
          })
          .catch((err) => {
            toast.success(t("fail"));
          });
      }}
    >
      <Link2 className={"text-muted-foreground  cursor-pointer"} />
    </button>
  );
}
