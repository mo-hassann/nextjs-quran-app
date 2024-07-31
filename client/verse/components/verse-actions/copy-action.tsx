import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function CopyAction({ text }: { text: string }) {
  const t = useTranslations("General");
  return (
    <button
      onClick={() => {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            toast.success(t("success"));
          })
          .catch((err) => {
            toast.success(t("fail"));
          });
      }}
    >
      <Copy className={"text-muted-foreground  cursor-pointer"} />
    </button>
  );
}
