"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
import { User, Target, Wallet, TrendingUp, Percent } from "lucide-react";

interface YearlyProjection {
  year: number;
  age: number;
  balance: number;
  contribution: number;
}

const SAVINGS_STORAGE_KEY = "savings-calculator-inputs";

interface SavingsInputs {
  currentAge: string;
  retirementAge: string;
  currentSavings: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  annualReturn: string;
  targetAmount: string;
}

const defaultInputs: SavingsInputs = {
  currentAge: "30",
  retirementAge: "65",
  currentSavings: "10000000",
  monthlyIncome: "2000000",
  monthlyExpenses: "1500000",
  annualReturn: "5",
  targetAmount: "500000000",
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
  const [currentAge, setCurrentAge] = React.useState(defaultInputs.currentAge);
  const [retirementAge, setRetirementAge] = React.useState(
    defaultInputs.retirementAge,
  );
  const [currentSavings, setCurrentSavings] = React.useState(
    defaultInputs.currentSavings,
  );
  const [monthlyIncome, setMonthlyIncome] = React.useState(
    defaultInputs.monthlyIncome,
  );
  const [monthlyExpenses, setMonthlyExpenses] = React.useState(
    defaultInputs.monthlyExpenses,
  );
  const [annualReturn, setAnnualReturn] = React.useState(
    defaultInputs.annualReturn,
  );
  const [targetAmount, setTargetAmount] = React.useState(
    defaultInputs.targetAmount,
  );

  // Load from localStorage on mount
  React.useEffect(() => {
    const stored = loadFromStorage();
    setCurrentAge(stored.currentAge);
    setRetirementAge(stored.retirementAge);
    setCurrentSavings(stored.currentSavings);
    setMonthlyIncome(stored.monthlyIncome);
    setMonthlyExpenses(stored.monthlyExpenses);
    setAnnualReturn(stored.annualReturn);
    setTargetAmount(stored.targetAmount);
    setIsHydrated(true);
  }, []);

  // Save to localStorage when inputs change (debounced)
  React.useEffect(() => {
    if (!isHydrated) return;
    const timeoutId = setTimeout(() => {
      saveToStorage({
        currentAge,
        retirementAge,
        currentSavings,
        monthlyIncome,
        monthlyExpenses,
        annualReturn,
        targetAmount,
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [
    isHydrated,
    currentAge,
    retirementAge,
    currentSavings,
    monthlyIncome,
    monthlyExpenses,
    annualReturn,
    targetAmount,
  ]);

  const calculateSavings = () => {
    const age = parseFloat(currentAge);
    const retireAge = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings);
    const income = parseFloat(monthlyIncome);
    const expenses = parseFloat(monthlyExpenses);
    const returnRate = parseFloat(annualReturn) / 100;
    const target = parseFloat(targetAmount);

    if (age >= retireAge || returnRate <= 0 || target <= 0) {
      return null;
    }

    const months = (retireAge - age) * 12;
    const monthlyRate = returnRate / 12;

    // Calculate required monthly contribution
    const futureValueOfCurrentSavings =
      savings * Math.pow(1 + monthlyRate, months);
    const neededAmount = target - futureValueOfCurrentSavings;

    let monthlyContributionRequired = 0;
    if (neededAmount > 0) {
      monthlyContributionRequired =
        (neededAmount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    // Heuristic suggestion: 15% of surplus
    const suggestedFromIncome = Math.max(
      Math.round((income - expenses) * 0.15),
      0,
    );

    // Projection with suggested monthly savings
    const projection: YearlyProjection[] = [];
    let balance = savings;
    const monthlyContribution = Math.max(
      monthlyContributionRequired,
      suggestedFromIncome,
    );

    for (let year = 0; year <= retireAge - age; year++) {
      projection.push({
        year: age + year,
        age: age + year,
        balance: balance,
        contribution: monthlyContribution * 12,
      });

      // Calculate balance at end of year
      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }
    }

    const finalBalance = balance;
    const targetAchieved = finalBalance >= target;

    return {
      monthlyContributionRequired,
      suggestedFromIncome,
      monthlyContribution,
      projection,
      finalBalance,
      targetAchieved,
    };
  };

  const results = calculateSavings();

  const exportCSV = () => {
    if (!results) return;
    const headers = ["Жил", "Нас", "Үлдэгдэл", "Жилийн хувь нэмэр"];
    const rows = results.projection.map((row) => [
      row.year,
      row.age,
      row.balance.toFixed(2),
      row.contribution.toFixed(2),
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n",
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "savings-projection.csv";
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Main Calculator Section - Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - Input Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Хадгаламжийн мэдээлэл</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Age Range */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <Label
                  htmlFor="currentAge"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  Одоогийн нас: {currentAge}
                </Label>
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-emerald-200 accent-emerald-500 dark:bg-emerald-500/40"
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="retirementAge"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Target className="h-4 w-4 text-muted-foreground" />
                  Тэтгэврийн нас: {retirementAge}
                </Label>
                <input
                  type="range"
                  min="50"
                  max="75"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-emerald-200 accent-emerald-500 dark:bg-emerald-500/40"
                />
              </div>
            </div>

            {/* Current Savings */}
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

            {/* Income & Expenses */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <Label
                  htmlFor="monthlyIncome"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  Сарын орлого
                </Label>
                <MoneyInput
                  id="monthlyIncome"
                  value={monthlyIncome}
                  onChange={setMonthlyIncome}
                  placeholder="2,000,000"
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="monthlyExpenses"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                  Сарын зарлага
                </Label>
                <MoneyInput
                  id="monthlyExpenses"
                  value={monthlyExpenses}
                  onChange={setMonthlyExpenses}
                  placeholder="1,500,000"
                />
              </div>
            </div>

            {/* Annual Return */}
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
                min="1"
                max="15"
                step="0.5"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-emerald-200 accent-emerald-500 dark:bg-emerald-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span>{annualReturn}%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Target Amount */}
            <div className="space-y-3">
              <Label
                htmlFor="targetAmount"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Target className="h-4 w-4 text-muted-foreground" />
                Зорилтот дүн
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

        {/* Right Column - Results */}
        <div className="space-y-6">
          {results && (
            <>
              {/* Final Balance Card - Gradient */}
              <div
                className={`overflow-hidden rounded-2xl p-6 text-white shadow-lg ${
                  results.targetAchieved
                    ? "bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500"
                    : "bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500"
                }`}
              >
                <p className="text-sm font-medium text-white/80">
                  Төсөөлөгдсөн эцсийн үлдэгдэл
                </p>
                <p className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">
                  {formatMNT(results.finalBalance)}
                </p>
                <p className="mt-2 text-sm text-white/80">
                  {results.targetAchieved
                    ? "Зорилт хангагдлаа!"
                    : `Зорилт: ${formatMNT(parseFloat(targetAmount))}`}
                </p>
              </div>

              {/* Summary Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">
                    Шаардлагатай сарын хувь нэмэр
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {formatMNT(results.monthlyContributionRequired)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Зорилтот дүнд хүрэхийн тулд
                  </p>
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">
                    Санал болгож буй хэмнэлт
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {formatMNT(results.suggestedFromIncome)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Орлогын үлдэгдлийн 15%
                  </p>
                </div>
              </div>

              {/* Recommended Savings - Highlighted */}
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Зөвлөмжтэй сарын хэмнэлт
                </p>
                <p className="mt-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatMNT(results.monthlyContribution)}
                </p>
                <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80 mt-1">
                  {results.monthlyContribution >=
                  results.monthlyContributionRequired
                    ? "Орлогод үндэслэсэн"
                    : "Зорилтод хүрэхийн тулд шаардлагатай"}
                </p>
              </div>

              {/* Tip Card - Dark */}
              <div className="overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  <p className="font-semibold">Хадгаламжийн зөвлөгөө</p>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  Эрт эхлэх нь хамгийн сайн. Нийлмэл хүү нь таны хадгаламжийг
                  цаг хугацааны туршид мэдэгдэхүйц өсгөдөг.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {results && (
        <>

          {/* Chart Card */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <CardTitle className="text-xl">Жил бүрийн төсөөлөл</CardTitle>
              <CardDescription>
                Тэтгэврийн нас хүртэлх үлдэгдлийн өсөлтийн төсөөлөл
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={results.projection}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="age" className="text-xs" />
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

          {/* Projection Table */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    Жил бүрийн төсөөллийн хүснэгт
                  </CardTitle>
                  <CardDescription>
                    Таны хадгаламж хэрхэн өсөхийг харна уу
                  </CardDescription>
                </div>
                <Button onClick={exportCSV} variant="outline" size="sm" className="rounded-full">
                  CSV экспорт
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-card">
                    <tr className="border-b bg-muted/50">
                      <th className="p-4 text-left font-semibold">Нас</th>
                      <th className="p-4 text-right font-semibold">Үлдэгдэл</th>
                      <th className="p-4 text-right font-semibold">
                        Жилийн хувь нэмэр
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.projection.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b transition-colors hover:bg-muted/50 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="p-4 font-medium">{row.age} нас</td>
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
