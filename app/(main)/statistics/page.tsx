"use client";
import { WeekChart } from "./_charts/week-chart";
import { DailyGoalChart } from "./_charts/daily-goal";
import { MonthChart } from "./_charts/month-chart";
import useGetReadingTime from "@/client/statistics/api/use-get-reading-time";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";
import ReadingGoalModel from "@/client/statistics/components/reading-goal-model";
import useGetReadingGoal from "@/client/statistics/api/use-get-reading-goal";
import { ChartNoAxesCombined } from "lucide-react";

export default function StatisticsPage() {
  const readingTimeQuery = useGetReadingTime();
  const readingGoalQuery = useGetReadingGoal();
  const t = useTranslations("StatisticsPage");

  if (readingTimeQuery.isPending || readingTimeQuery.isLoading || readingGoalQuery.isLoading || readingGoalQuery.isPending) return "loading..";
  if (readingTimeQuery.isError || readingGoalQuery.isError) return "error";

  const readingTimeInMinutes = Math.round((readingTimeQuery.data.find((data) => data.date === formatDate(new Date(), "yyyy-MM-dd"))?.readingTime || 0) / 60000);

  // get days from the current week
  const weekData = readingTimeQuery.data.slice(0, 7).map(({ date, readingTime }) => ({ weekDay: new Date(date).getDay(), minutes: Math.round(readingTime / 60000) }));
  // if the current week have days with no data in the database fill this week with zero (to be shown in the graph)
  const weekChartData = [0, 1, 2, 3, 4, 5, 6].map((weekDay) => {
    const existingWeek = weekData.find((data) => data.weekDay === weekDay);
    return { weekDay: t(`weekDays.${weekDay as 0 | 1 | 2 | 3 | 4 | 5 | 6}`), minutes: existingWeek ? existingWeek.minutes : 0 };
  });

  // show the data only if it contains more than 7 days
  const MonthChartData = readingTimeQuery.data.length > 7 ? readingTimeQuery.data.map(({ date, readingTime }) => ({ date, minutes: Math.round(readingTime / 60000) * 100 })) : undefined;

  const { dailyReadingGoal } = readingGoalQuery.data;

  return (
    <div className="size-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <div className="h-9 w-1.5 rounded-full bg-primary" />
          {t("statistics")}
        </h1>
        <ReadingGoalModel dailyReadingGoal={`${dailyReadingGoal}`} />
      </div>
      <div className="flex items-center flex-col lg:flex-row gap-3 w-full h-auto lg:h-[400px]">
        <DailyGoalChart goalTimeInMinutes={dailyReadingGoal} timeInMinutes={readingTimeInMinutes} />
        <WeekChart chartData={weekChartData} />
      </div>
      <div className="space-y-4 md:pb-4 pb-20">
        <h1 className="flex items-center gap-2 text-xl font-semibold my-4">
          <div className="h-9 w-1.5 rounded-full bg-primary" />
          {t("monthlyStatistics")}
        </h1>
        {MonthChartData ? (
          <MonthChart chartData={MonthChartData} />
        ) : (
          <div className="w-full h-[250px] bg-white text-muted-foreground rounded-md shadow-sm flex items-center justify-center flex-col">
            <ChartNoAxesCombined size={50} />
            <p className="text-lg">{t("monthlyStatisticsLabel")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
