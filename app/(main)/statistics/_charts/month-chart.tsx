"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n.config";

type props = {
  chartData: {
    date: string;
    minutes: number;
  }[];
};

export function MonthChart({ chartData }: props) {
  const t = useTranslations("StatisticsPage");
  const locale = useLocale();
  const chartConfig = {
    minutes: {
      label: t("minutes"),
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="bg-background w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="leading-normal">{t("monthReading")}</CardTitle>
          <CardDescription>{t("monthReadingDetails")}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString(locale, {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="minutes"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString(locale, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="minutes" fill={`var(--color-minutes)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
