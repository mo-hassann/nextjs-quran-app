"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useLocale, useTranslations } from "next-intl";

type props = {
  chartData: {
    weekDay: string;
    minutes: number;
  }[];
};

export function WeekChart({ chartData }: props) {
  const t = useTranslations("StatisticsPage");
  const locale = useLocale();

  const chartConfig = {
    minutes: {
      label: t("minutes"),
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const today = new Date();
  const sixDaysAgo = new Date(today);
  sixDaysAgo.setDate(today.getDate() - 6);

  return (
    <Card className="bg-background flex-1 flex-shrink-0 h-full w-full lg:w-auto">
      <CardHeader>
        <CardTitle>{t("weekReading")}</CardTitle>
        <CardDescription>
          {sixDaysAgo.toLocaleDateString(locale, {
            month: "short",
            day: "numeric",
            year: "numeric",
            weekday: "long",
          })}{" "}
          -{" "}
          {today.toLocaleDateString(locale, {
            month: "short",
            day: "numeric",
            year: "numeric",
            weekday: "long",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-[280px]" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="weekDay" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="minutes" fill="var(--color-minutes)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
