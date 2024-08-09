"use client";
import { WeekChart } from "./_charts/week-chart";
import { DailyGoalChart } from "./_charts/daily-goal";
import { MonthChart } from "./_charts/month-chart";
import useGetReadingTime from "@/client/statistics/api/use-get-reading-time";
import { useLocale, useTranslations } from "next-intl";
import ReadingGoalModel from "@/client/statistics/components/reading-goal-model";
import useGetReadingGoal from "@/client/statistics/api/use-get-reading-goal";
import { ChartNoAxesCombined } from "lucide-react";

export default function StatisticsPage() {
  const readingTimeQuery = useGetReadingTime();
  const readingGoalQuery = useGetReadingGoal();
  const t = useTranslations("StatisticsPage");
  const locale = useLocale();

  if (readingTimeQuery.isPending || readingTimeQuery.isLoading || readingGoalQuery.isLoading || readingGoalQuery.isPending) return "loading..";
  if (readingTimeQuery.isError || readingGoalQuery.isError) return "error";

  const convertToMinutes = (milliSeconds: number = 0) => {
    return Math.round(milliSeconds / 60000);
  };

  // get today reading  for daily reading goal
  const getTodayReading = () => {
    const todayReading = readingTimeQuery.data.find((data) => new Date(data.date).toDateString() === new Date().toDateString());
    return convertToMinutes(todayReading?.readingTime);
  };

  const getCurWeekReading = () => {
    // Get today's date and the date 6 days ago
    const today = new Date();
    const sixDaysAgo = new Date(today);
    sixDaysAgo.setDate(today.getDate() - 6);

    // Convert array of date strings to Date objects
    const dates = readingTimeQuery.data.map((readingTime) => ({ date: new Date(readingTime.date), readingTime: readingTime.readingTime }));

    // Filter dates to get those within the last 6 days including today
    const recentDates = dates.filter((readingTime) => readingTime.date >= sixDaysAgo && readingTime.date <= today);

    // if the current week have days with no data in the database fill this week with zero (to be shown in the graph)
    const fullWeek = [0, 1, 2, 3, 4, 5, 6].map((weekDay) => {
      const existingWeek = recentDates.find((readingTime) => new Date(readingTime.date).getDay() === weekDay);
      // get the week name using week number
      const date = new Date();
      date.setDate(date.getDate() - date.getDay() + weekDay);
      return { weekDay: date.toLocaleDateString(locale, { weekday: "long" }), minutes: existingWeek ? convertToMinutes(existingWeek.readingTime) : 0 };
    });
    return fullWeek;
  };

  const getCurMonthReading = () => {
    // show the data only if it contains more than 7 days
    return readingTimeQuery.data.length > 7 ? readingTimeQuery.data.map(({ date, readingTime }) => ({ date, minutes: convertToMinutes(readingTime) })) : undefined;
  };

  const { dailyReadingGoal } = readingGoalQuery.data;
  const readingTimeInMinutes = getTodayReading();
  const weekChartData = getCurWeekReading();
  const MonthChartData = getCurMonthReading();

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
          <div className="w-full h-[250px] bg-background text-muted-foreground rounded-md shadow-sm flex items-center justify-center flex-col">
            <ChartNoAxesCombined size={50} />
            <p className="text-lg">{t("monthlyStatisticsLabel")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
