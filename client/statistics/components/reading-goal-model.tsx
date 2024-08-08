import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useGetReadingGoal from "../api/use-get-reading-goal";
import useSetReadingGoal from "../api/use-set-reading-goal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";

type props = {
  dailyReadingGoal: string;
};

export default function ReadingGoalModel({ dailyReadingGoal }: props) {
  const readingGoalMutation = useSetReadingGoal();
  const [goal, setGoal] = useState(dailyReadingGoal);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("StatisticsPage");

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        {t("editGoal")}
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{t("setGoal")}</DialogTitle>
          <DialogDescription className="text-center">{t("setGoalLabel")}</DialogDescription>
        </DialogHeader>
        {goal ? (
          <div className="grid gap-4 py-4">
            <ToggleGroup type="single" value={goal} onValueChange={(value) => setGoal(value)}>
              <ToggleGroupItem className="size-20 md:size-24  data-[state=on]:bg-primary data-[state=on]:text-white" value="10" aria-label="Toggle bold">
                {t("minutesNumber", { minutes: 10 })}
              </ToggleGroupItem>
              <ToggleGroupItem className="size-20 md:size-24  data-[state=on]:bg-primary data-[state=on]:text-white" value="15" aria-label="Toggle italic">
                {t("minutesNumber", { minutes: 15 })}
              </ToggleGroupItem>
              <ToggleGroupItem className="size-20 md:size-24  data-[state=on]:bg-primary data-[state=on]:text-white" value="30" aria-label="Toggle underline">
                {t("minutesNumber", { minutes: 30 })}
              </ToggleGroupItem>
              <ToggleGroupItem className="size-20 md:size-24  data-[state=on]:bg-primary data-[state=on]:text-white" value="60" aria-label="Toggle underline">
                {t("minutesNumber", { minutes: 60 })}
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        ) : (
          <Loading />
        )}
        <DialogFooter>
          <Button disabled={dailyReadingGoal === goal || readingGoalMutation.isPending} onClick={() => readingGoalMutation.mutate({ readingGoal: +goal }, { onSuccess: () => setIsOpen(false) })}>
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
