"use client";

import * as React from "react";
import { MoneyInput } from "@/components/ui/money-input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { formatMNT } from "@/lib/utils";
import { Wallet, Target, Percent } from "lucide-react";

interface YearlyProjection {
  year: number;
  balance: number;
  contribution: number;
}

const SAVINGS_STORAGE_KEY = "savings-calculator-inputs";

interface SavingsInputs {
  currentSavings: string;
  monthlyContribution: string;
  years: string;
  annualReturn: string;
  targetAmount: string;
}

const defaultInputs: SavingsInputs = {
  currentSavings: "0",
  monthlyContribution: "50000",
  years: "5",
  annualReturn: "10",
  targetAmount: "10000000",
};

function loadFromStorage(): SavingsInputs {
  if (typeof window === "undefined") return defaultInputs;
  try {
    const stored = localStorage.getItem(SAVINGS_STORAGE_KEY);
    if (stored) {
      return { ...defaultInputs, ...JSON.parse(stored) };
    }
  } catch {
    // Ignore errors
  }
  return defaultInputs;
}

function saveToStorage(inputs: SavingsInputs) {
  try {
    localStorage.setItem(SAVINGS_STORAGE_KEY, JSON.stringify(inputs));
  } catch {
    // Ignore errors
  }
}

export function SavingsCalculator() {
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [currentSavings, setCurrentSavings] = React.useState(
    defaultInputs.currentSavings,
  );
  const [monthlyContribution, setMonthlyContribution] = React.useState(
    defaultInputs.monthlyContribution,
  );
  const [years, setYears] = React.useState(defaultInputs.years);
  const [annualReturn, setAnnualReturn] = React.useState(
    defaultInputs.annualReturn,
  );
  const [targetAmount, setTargetAmount] = React.useState(
    defaultInputs.targetAmount,
  );

  React.useEffect(() => {
    const stored = loadFromStorage();
    setCurrentSavings(stored.currentSavings);
    setMonthlyContribution(stored.monthlyContribution);
    setYears(stored.years);
    setAnnualReturn(stored.annualReturn);
    setTargetAmount(stored.targetAmount);
    setIsHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!isHydrated) return;
    const timeoutId = setTimeout(() => {
      saveToStorage({
        currentSavings,
        monthlyContribution,
        years,
        annualReturn,
        targetAmount,
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [
    isHydrated,
    currentSavings,
    monthlyContribution,
    years,
    annualReturn,
    targetAmount,
  ]);

  const calculateSavings = () => {
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const numYears = parseFloat(years);
    const returnRate = parseFloat(annualReturn) / 100;
    const target = parseFloat(targetAmount);

    if (numYears <= 0 || returnRate < 0) return null;

    const months = numYears * 12;
    const monthlyRate = returnRate / 12;

    // Future value: FV = PV(1+r)^n + PMT * [((1+r)^n - 1) / r]
    const futureValueOfCurrent = savings * Math.pow(1 + monthlyRate, months);
    const futureValueOfContributions =
      monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const finalBalance = futureValueOfCurrent + futureValueOfContributions;

    // Required monthly to reach target (if target > 0)
    let monthlyRequired = 0;
    if (target > 0 && numYears > 0) {
      const needed = target - futureValueOfCurrent;
      if (needed > 0) {
        monthlyRequired =
          (needed * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
      }
    }

    const projection: YearlyProjection[] = [];
    let balance = savings;

    for (let y = 0; y <= numYears; y++) {
      projection.push({
        year: y,
        balance: Math.round(balance),
        contribution: monthly * 12,
      });
      for (let m = 0; m < 12 && y < numYears; m++) {
        balance = balance * (1 + monthlyRate) + monthly;
      }
    }

    return {
      monthlyRequired,
      projection,
      finalBalance,
      targetAchieved: target > 0 && finalBalance >= target,
    };
  };

  const results = calculateSavings();

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Хадгаламжийн мэдээлэл</CardTitle>
            <CardDescription>
              Одоогийн хадгаламж, сард хуримтлуулах дүн, хугацаа болон өгөөжийг
              оруулна уу
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="currentSavings"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Wallet className="h-4 w-4 text-muted-foreground" />
                Одоогийн хадгаламж
              </Label>
              <MoneyInput
                id="currentSavings"
                value={currentSavings}
                onChange={setCurrentSavings}
                placeholder="10,000,000"
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="monthlyContribution"
                className="flex items-center gap-2 text-sm font-medium"
              >
                Сард хуримтлуулах дүн
              </Label>
              <MoneyInput
                id="monthlyContribution"
                value={monthlyContribution}
                onChange={setMonthlyContribution}
                placeholder="500,000"
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="years"
                className="flex items-center gap-2 text-sm font-medium"
              >
                Хугацаа (жил): {years}
              </Label>
              <input
                type="range"
                min="1"
                max="40"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-emerald-200 accent-emerald-500 dark:bg-emerald-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 жил</span>
                <span>{years} жил</span>
                <span>40 жил</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="annualReturn"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Percent className="h-4 w-4 text-muted-foreground" />
                Жилийн өгөөж: {annualReturn}%
              </Label>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-emerald-200 accent-emerald-500 dark:bg-emerald-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{annualReturn}%</span>
                <span>15%</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="targetAmount"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Target className="h-4 w-4 text-muted-foreground" />
                Зорилтот дүн (заавал биш)
              </Label>
              <MoneyInput
                id="targetAmount"
                value={targetAmount}
                onChange={setTargetAmount}
                placeholder="500,000,000"
                className="h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {results && (
            <>
              <div className="overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-linear-to-r from-emerald-400 via-green-400 to-teal-500">
                <p className="text-sm font-medium text-white/80">
                  {years} жилийн дараах үлдэгдэл
                </p>
                <p className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">
                  {formatMNT(results.finalBalance)}
                </p>
                {parseFloat(targetAmount) > 0 && (
                  <p className="mt-2 text-sm text-white/80">
                    {results.targetAchieved
                      ? "Зорилт хангагдлаа!"
                      : `Зорилт: ${formatMNT(parseFloat(targetAmount))}`}
                  </p>
                )}
              </div>

              {parseFloat(targetAmount) > 0 && (
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">
                    Зорилтот дүнд хүрэхэд шаардлагатай сард хуримтлуулах дүн
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {formatMNT(results.monthlyRequired)}
                  </p>
                </div>
              )}

              <div className="overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  <p className="font-semibold">Зөвлөгөө</p>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  Тогтмол дүнг сард хуримтлуулах нь нийлмэл хүүгээр үлдэгдлийг
                  тогтвортой өсгөдөг.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {results && (
        <>
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-linear-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <CardTitle className="text-xl">Жил бүрийн төсөөлөл</CardTitle>
              <CardDescription>
                Хадгаламжийн үлдэгдлийн өсөлтийн төсөөлөл
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={results.projection}>
                  <defs>
                    <linearGradient
                      id="colorBalance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="year" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      value !== undefined ? formatMNT(value) : ""
                    }
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#10b981"
                    fill="url(#colorBalance)"
                    strokeWidth={2}
                    name="Үлдэгдэл"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-linear-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <CardTitle className="text-xl">
                Жил бүрийн төсөөллийн хүснэгт
              </CardTitle>
              <CardDescription>
                Хадгаламж хэрхэн өсөхийг харна уу
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-card">
                    <tr className="border-b bg-muted/50">
                      <th className="p-4 text-left font-semibold">Жил</th>
                      <th className="p-4 text-right font-semibold">Үлдэгдэл</th>
                      <th className="p-4 text-right font-semibold">
                        Жилд хуримтлуулах дүн
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.projection.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b transition-colors hover:bg-muted/50 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="p-4 font-medium">{row.year} дахь жил</td>
                        <td className="p-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                          {formatMNT(row.balance)}
                        </td>
                        <td className="p-4 text-right">
                          {formatMNT(row.contribution)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
