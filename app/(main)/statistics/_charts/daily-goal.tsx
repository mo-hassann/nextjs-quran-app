"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useLocale, useTranslations } from "next-intl";

type props = {
  goalTimeInMinutes: number;
  timeInMinutes: number;
};

export function DailyGoalChart({ goalTimeInMinutes, timeInMinutes }: props) {
  const chartData = [{ minutes: timeInMinutes, fill: "var(--color-chart)" }];
  const t = useTranslations("StatisticsPage");
  const locale = useLocale();

  const chartConfig = {
    minutes: {
      label: t("minutes"),
    },
    chart: {
      label: "Chart",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const goalPresent = chartData[0].minutes / goalTimeInMinutes;

  return (
    <Card className="flex flex-col flex-shrink-0 bg-background h-full w-full lg:w-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle className="leading-normal">{t("dayGoal")}</CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString(locale, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart data={chartData} startAngle={90} endAngle={goalPresent * 360 + 90} innerRadius={80} outerRadius={110}>
            <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-muted last:fill-background" polarRadius={[86, 74]} />
            <RadialBar dataKey="minutes" background cornerRadius={10} /> time
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                          {chartData[0].minutes.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          {t("minutes")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
          {t("dailyGoalStatus", { present: (goalPresent < 1 ? goalPresent * 100 : 100).toFixed(1) })}
        </div>
        <div className="leading-none text-muted-foreground">{t("dayGoalLabel", { goal: goalTimeInMinutes })}</div>
      </CardFooter>
    </Card>
  );
}
