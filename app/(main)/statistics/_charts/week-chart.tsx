"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import { formatDate } from "date-fns";

type props = {
  chartData: {
    weekDay: string;
    minutes: number;
  }[];
};

export function WeekChart({ chartData }: props) {
  const t = useTranslations("StatisticsPage");

  const chartConfig = {
    minutes: {
      label: t("minutes"),
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-background flex-1 flex-shrink-0 h-full w-full lg:w-auto">
      <CardHeader>
        <CardTitle>{t("weekReading")}</CardTitle>
        <CardDescription>{formatDate(new Date(), "dd-MM-yyyy")}</CardDescription>
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
