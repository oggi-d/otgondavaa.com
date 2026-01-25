"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { format } from "date-fns";
import { formatMNT, formatShortMNT } from "@/lib/utils";
import { Home, Percent, Calendar, TrendingDown } from "lucide-react";

interface AmortizationRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

const LOAN_STORAGE_KEY = "loan-calculator-inputs";

interface LoanInputs {
  loanAmount: string;
  annualRate: string;
  termYears: string;
  paymentsPerYear: string;
  extraPercent: string;
  startDate: string;
}

const defaultInputs: LoanInputs = {
  loanAmount: "20000000",
  annualRate: "20.0",
  termYears: "5",
  paymentsPerYear: "12",
  extraPercent: "0",
  startDate: format(new Date(), "yyyy-MM-dd"),
};

function loadFromStorage(): LoanInputs {
  if (typeof window === "undefined") return defaultInputs;
  try {
    const stored = localStorage.getItem(LOAN_STORAGE_KEY);
    if (stored) {
      return { ...defaultInputs, ...JSON.parse(stored) };
    }
  } catch {
    // Ignore errors
  }
  return defaultInputs;
}

function saveToStorage(inputs: LoanInputs) {
  try {
    localStorage.setItem(LOAN_STORAGE_KEY, JSON.stringify(inputs));
  } catch {
    // Ignore errors
  }
}

export function LoanCalculator() {
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [loanAmount, setLoanAmount] = React.useState(defaultInputs.loanAmount);
  const [annualRate, setAnnualRate] = React.useState(defaultInputs.annualRate);
  const [termYears, setTermYears] = React.useState(defaultInputs.termYears);
  const [paymentsPerYear, setPaymentsPerYear] = React.useState(
    defaultInputs.paymentsPerYear,
  );
  const [extraPercent, setExtraPercent] = React.useState(
    defaultInputs.extraPercent,
  );
  const [startDate, setStartDate] = React.useState(defaultInputs.startDate);

  // Load from localStorage on mount
  React.useEffect(() => {
    const stored = loadFromStorage();
    setLoanAmount(stored.loanAmount);
    setAnnualRate(stored.annualRate);
    setTermYears(stored.termYears);
    setPaymentsPerYear(stored.paymentsPerYear);
    setExtraPercent(stored.extraPercent);
    setStartDate(stored.startDate);
    setIsHydrated(true);
  }, []);

  // Save to localStorage when inputs change (debounced)
  React.useEffect(() => {
    if (!isHydrated) return;
    const timeoutId = setTimeout(() => {
      saveToStorage({
        loanAmount,
        annualRate,
        termYears,
        paymentsPerYear,
        extraPercent,
        startDate,
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [
    isHydrated,
    loanAmount,
    annualRate,
    termYears,
    paymentsPerYear,
    extraPercent,
    startDate,
  ]);

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(annualRate) / 100 / parseFloat(paymentsPerYear);
    const n = parseFloat(termYears) * parseFloat(paymentsPerYear);
    const extraPct = parseFloat(extraPercent) / 100;

    if (P <= 0 || r <= 0 || n <= 0) {
      return null;
    }

    const monthlyPayment = (P * r) / (1 - Math.pow(1 + r, -n));
    const extraAmount = monthlyPayment * extraPct;
    const totalPayment = monthlyPayment + extraAmount;

    // Calculate without extra
    let balance = P;
    let totalInterest = 0;
    const rowsWithoutExtra: AmortizationRow[] = [];
    let month = 0;

    while (balance > 0.01 && month < n) {
      month++;
      const interest = balance * r;
      const principal = monthlyPayment - interest;
      balance -= principal;
      totalInterest += interest;

      rowsWithoutExtra.push({
        month,
        payment: monthlyPayment,
        interest,
        principal,
        balance: Math.max(0, balance),
        cumulativeInterest: totalInterest,
        cumulativePrincipal: P - balance,
      });
    }

    const monthsWithoutExtra = month;
    const yearsWithoutExtra = monthsWithoutExtra / parseFloat(paymentsPerYear);

    // Calculate with extra
    balance = P;
    totalInterest = 0;
    const rowsWithExtra: AmortizationRow[] = [];
    month = 0;

    while (balance > 0.01) {
      month++;
      const interest = balance * r;
      const principal = totalPayment - interest;
      balance -= principal;
      totalInterest += interest;

      rowsWithExtra.push({
        month,
        payment: totalPayment,
        interest,
        principal,
        balance: Math.max(0, balance),
        cumulativeInterest: totalInterest,
        cumulativePrincipal: P - balance,
      });
    }

    const monthsWithExtra = month;
    const yearsWithExtra = monthsWithExtra / parseFloat(paymentsPerYear);
    const yearsSaved = yearsWithoutExtra - yearsWithExtra;

    const totalInterestWithoutExtra = rowsWithoutExtra.reduce(
      (sum, row) => sum + row.interest,
      0,
    );
    const totalInterestWithExtra = rowsWithExtra.reduce(
      (sum, row) => sum + row.interest,
      0,
    );
    const interestSaved = totalInterestWithoutExtra - totalInterestWithExtra;

    const totalPaidWithoutExtra = P + totalInterestWithoutExtra;
    const totalPaidWithExtra = P + totalInterestWithExtra;

    // Generate yearly summary data
    const paymentsPerYearNum = parseFloat(paymentsPerYear);
    const yearlySummary: {
      year: number;
      principalPaid: number;
      interestPaid: number;
      remainingBalance: number;
      percentPaid: number;
    }[] = [];

    for (let year = 1; year <= Math.ceil(yearsWithoutExtra); year++) {
      const startMonth = (year - 1) * paymentsPerYearNum;
      const endMonth = Math.min(
        year * paymentsPerYearNum,
        rowsWithoutExtra.length,
      );

      if (startMonth >= rowsWithoutExtra.length) break;

      const yearRows = rowsWithoutExtra.slice(startMonth, endMonth);
      const principalPaid = yearRows.reduce(
        (sum, row) => sum + row.principal,
        0,
      );
      const interestPaid = yearRows.reduce((sum, row) => sum + row.interest, 0);
      const remainingBalance = yearRows[yearRows.length - 1]?.balance ?? 0;
      const percentPaid = ((P - remainingBalance) / P) * 100;

      yearlySummary.push({
        year,
        principalPaid,
        interestPaid,
        remainingBalance,
        percentPaid,
      });
    }

    return {
      monthlyPayment,
      totalPaymentWithExtra: totalPayment,
      extraAmount,
      totalInterest: totalInterestWithoutExtra,
      totalInterestWithExtra,
      interestSaved,
      totalPaid: totalPaidWithoutExtra,
      totalPaidWithExtra,
      yearsWithoutExtra,
      yearsWithExtra,
      yearsSaved,
      yearlySummary,
      chartData: rowsWithoutExtra.map((row) => ({
        month: row.month,
        interest: row.cumulativeInterest,
        principal: row.cumulativePrincipal,
      })),
    };
  };

  const results = calculateLoan();

  // Helper to calculate years saved for a given extra percentage
  const calculateYearsSavedForPercent = (percent: number) => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(annualRate) / 100 / parseFloat(paymentsPerYear);
    const n = parseFloat(termYears) * parseFloat(paymentsPerYear);

    if (P <= 0 || r <= 0 || n <= 0) return 0;

    const monthlyPayment = (P * r) / (1 - Math.pow(1 + r, -n));
    const extraAmount = monthlyPayment * (percent / 100);
    const totalPayment = monthlyPayment + extraAmount;

    // Calculate months with extra
    let balance = P;
    let month = 0;
    while (balance > 0.01) {
      month++;
      const interest = balance * r;
      const principal = totalPayment - interest;
      balance -= principal;
      if (month > n * 2) break; // Safety limit
    }

    const yearsWithExtra = month / parseFloat(paymentsPerYear);
    const yearsWithoutExtra = n / parseFloat(paymentsPerYear);
    return yearsWithoutExtra - yearsWithExtra;
  };

  const yearsSaved10 = calculateYearsSavedForPercent(10);
  const yearsSaved20 = calculateYearsSavedForPercent(20);

  return (
    <div className="space-y-8">
      {/* Main Calculator Section - Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - Input Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Зээлийн мэдээлэл</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Loan Amount */}
            <div className="space-y-3">
              <Label
                htmlFor="loanAmount"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Home className="h-4 w-4 text-muted-foreground" />
                Зээлийн дүн
              </Label>
              <MoneyInput
                id="loanAmount"
                value={loanAmount}
                onChange={setLoanAmount}
                placeholder="50,000,000"
                className="h-12 text-lg"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <Label
                htmlFor="annualRate"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Percent className="h-4 w-4 text-muted-foreground" />
                Жилийн хүү: {annualRate}%
              </Label>
              <input
                type="range"
                min="1"
                max="25"
                step="0.1"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 accent-blue-500 dark:bg-blue-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span>{annualRate}%</span>
                <span>25%</span>
              </div>
            </div>

            {/* Term Years */}
            <div className="space-y-3">
              <Label
                htmlFor="termYears"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Хугацаа: {termYears} жил
              </Label>
              <input
                type="range"
                min="1"
                max="30"
                value={termYears}
                onChange={(e) => setTermYears(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 accent-blue-500 dark:bg-blue-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 жил</span>
                <span>{termYears} жил</span>
                <span>30 жил</span>
              </div>
            </div>

            {/* Extra Payment */}
            <div className="space-y-3">
              <Label
                htmlFor="extraPercent"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
                Нэмэлт төлбөр: {extraPercent}%
              </Label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={extraPercent}
                onChange={(e) => setExtraPercent(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 accent-blue-500 dark:bg-blue-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{extraPercent}%</span>
                <span>50%</span>
              </div>

              {/* Educational Info */}
              <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                <p className="font-medium">💡 Нэмэлт төлбөр гэж юу вэ?</p>
                <p className="mt-1 leading-relaxed">
                  Сар бүр зээлийн төлбөр дээрээ бага зэрэг нэмж төлснөөр зээлийн
                  үндсэн дүн хурдан буурч, нийт төлөх хүү эрс багасна.
                  Жишээлбэл, сарын төлбөр 500,000₮ бол 10% нэмэлт = 50,000₮ нэмж
                  төлнө гэсэн үг.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                variant={extraPercent === "10" ? "default" : "outline"}
                size="sm"
                onClick={() => setExtraPercent("10")}
                className="rounded-full"
              >
                10% нэмэлт
                {yearsSaved10 > 0 && (
                  <span className="ml-1 text-xs opacity-80">
                    ({yearsSaved10.toFixed(1)} жил хэмнэнэ)
                  </span>
                )}
              </Button>
              <Button
                variant={extraPercent === "20" ? "default" : "outline"}
                size="sm"
                onClick={() => setExtraPercent("20")}
                className="rounded-full"
              >
                20% нэмэлт
                {yearsSaved20 > 0 && (
                  <span className="ml-1 text-xs opacity-80">
                    ({yearsSaved20.toFixed(1)} жил хэмнэнэ)
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {results && (
            <>
              {/* Monthly Payment Card - Gradient */}
              <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-500 p-6 text-white shadow-lg">
                <p className="text-sm font-medium text-white/80">
                  Сарын төлбөр
                </p>
                <p className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">
                  {formatMNT(
                    parseFloat(extraPercent) > 0
                      ? results.totalPaymentWithExtra
                      : results.monthlyPayment,
                  )}
                </p>
                {parseFloat(extraPercent) > 0 && (
                  <p className="mt-1 text-sm text-white/80">
                    <span className="line-through opacity-70">
                      {formatMNT(results.monthlyPayment)}
                    </span>
                    <span className="ml-2">
                      + {formatMNT(results.extraAmount)} нэмэлт
                    </span>
                  </p>
                )}
                <p className="mt-2 text-sm text-white/80">
                  Зээлийн дүн: {formatMNT(parseFloat(loanAmount))}
                </p>
              </div>

              {/* Summary Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Нийт хүү</p>
                  <p className="mt-1 text-2xl font-bold text-red-500">
                    {formatMNT(
                      parseFloat(extraPercent) > 0
                        ? results.totalInterestWithExtra
                        : results.totalInterest,
                    )}
                  </p>
                  {parseFloat(extraPercent) > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="line-through">
                        {formatMNT(results.totalInterest)}
                      </span>
                      <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                        -{formatMNT(results.interestSaved)}
                      </span>
                    </p>
                  )}
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Нийт төлсөн</p>
                  <p className="mt-1 text-2xl font-bold">
                    {formatMNT(
                      parseFloat(extraPercent) > 0
                        ? results.totalPaidWithExtra
                        : results.totalPaid,
                    )}
                  </p>
                  {parseFloat(extraPercent) > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="line-through">
                        {formatMNT(results.totalPaid)}
                      </span>
                      <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                        -{formatMNT(results.interestSaved)}
                      </span>
                    </p>
                  )}
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Төлөх хугацаа</p>
                  <p className="mt-1 text-2xl font-bold">
                    {parseFloat(extraPercent) > 0
                      ? results.yearsWithExtra.toFixed(1)
                      : results.yearsWithoutExtra.toFixed(1)}{" "}
                    жил
                  </p>
                  {parseFloat(extraPercent) > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="line-through">
                        {results.yearsWithoutExtra.toFixed(1)} жил
                      </span>
                      <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                        -{results.yearsSaved.toFixed(1)} жил
                      </span>
                    </p>
                  )}
                </div>
                {parseFloat(extraPercent) > 0 && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400">
                      Нийт хэмнэлт
                    </p>
                    <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {formatMNT(results.interestSaved)}
                    </p>
                    <p className="mt-1 text-xs text-emerald-600/80 dark:text-emerald-400/80">
                      + {results.yearsSaved.toFixed(1)} жил хэмнэсэн
                    </p>
                  </div>
                )}
              </div>

              {/* Tip Card - Dark */}
              <div className="overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  <p className="font-semibold">Зөвлөгөө</p>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  Нэмэлт төлбөр хийснээр зээлийн хүү мэдэгдэхүйц буурч, төлөх
                  хугацаа богиносно. 10-20% нэмэлт хийхийг зөвлөж байна.
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
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Төлбөрийн график</CardTitle>
                {parseFloat(extraPercent) > 0 && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full dark:bg-amber-900/30 dark:text-amber-300">
                    Нэмэлт төлбөргүй тооцоолол
                  </span>
                )}
              </div>
              <CardDescription>
                Цаг хугацааны явцад хуримтлагдсан хүү болон үндсэн төлбөр
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Graph instruction */}
              <div className="rounded-lg bg-slate-100 p-3 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <p className="font-medium">📊 Графикийг хэрхэн унших вэ?</p>
                <ul className="mt-1 space-y-1 list-disc list-inside leading-relaxed">
                  <li>
                    <span className="text-red-500 font-medium">
                      Улаан талбай
                    </span>{" "}
                    = Хуримтлагдсан хүү (банкинд төлсөн мөнгө)
                  </li>
                  <li>
                    <span className="text-emerald-600 font-medium">
                      Ногоон талбай
                    </span>{" "}
                    = Хуримтлагдсан үндсэн төлбөр (таны эзэмшил болсон хэсэг)
                  </li>
                  <li>
                    Эхний саруудад улаан өндөр байгаа нь таны төлбөрийн ихэнх
                    хэсэг хүү байгааг харуулна
                  </li>
                </ul>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={results.chartData}>
                  <defs>
                    <linearGradient
                      id="colorInterest"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#ef4444"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorPrincipal"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#22c55e"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    label={{
                      value: "Сар",
                      position: "insideBottomRight",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    className="text-xs"
                    tickFormatter={(value: number) => {
                      if (value >= 1000000) {
                        return `${(value / 1000000).toFixed(0)}сая`;
                      }
                      if (value >= 1000) {
                        return `${(value / 1000).toFixed(0)}мян`;
                      }
                      return value.toString();
                    }}
                    width={80}
                  />
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
                    dataKey="interest"
                    stackId="1"
                    stroke="#ef4444"
                    fill="url(#colorInterest)"
                    name="Хуримтлагдсан хүү"
                  />
                  <Area
                    type="monotone"
                    dataKey="principal"
                    stackId="1"
                    stroke="#22c55e"
                    fill="url(#colorPrincipal)"
                    name="Хуримтлагдсан үндсэн"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Yearly Summary Table */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-xl">Жил бүрийн үлдэгдэл</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                    Жил бүрийн төлбөр:{" "}
                    {formatShortMNT(results.monthlyPayment * 12)}
                  </span>
                  {parseFloat(extraPercent) > 0 && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full dark:bg-amber-900/30 dark:text-amber-300">
                      Нэмэлт төлбөргүй
                    </span>
                  )}
                </div>
              </div>
              <CardDescription>
                Үндсэн зээлийн үлдэгдэл жил бүрийн эцэст
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-4 text-left font-semibold">Жил</th>
                      <th className="p-4 text-right font-semibold">
                        Үндсэн төлсөн
                      </th>
                      <th className="p-4 text-right font-semibold">
                        Хүү төлсөн
                      </th>
                      <th className="p-4 text-right font-semibold">Үлдэгдэл</th>
                      <th className="p-4 text-right font-semibold">Төлсөн %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlySummary.map((row, idx) => (
                      <tr
                        key={row.year}
                        className={`border-b transition-colors hover:bg-muted/50 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="p-4 font-medium">{row.year}-р жил</td>
                        <td className="p-4 text-right text-emerald-600 dark:text-emerald-400">
                          {formatShortMNT(row.principalPaid)}
                        </td>
                        <td className="p-4 text-right text-red-500">
                          {formatShortMNT(row.interestPaid)}
                        </td>
                        <td className="p-4 text-right font-medium">
                          {formatShortMNT(row.remainingBalance)}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{
                                  width: `${Math.min(row.percentPaid, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium w-12 text-right">
                              {row.percentPaid.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Yearly Payment Distribution Table */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-xl">
                  Жил бүрийн төлбөрийн хуваарилалт
                </CardTitle>
                {parseFloat(extraPercent) > 0 && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full dark:bg-amber-900/30 dark:text-amber-300">
                    Нэмэлт төлбөргүй
                  </span>
                )}
              </div>
              <CardDescription>
                Жил бүрийн төлбөрөөс хэдэн хувь нь үндсэн, хэдэн хувь нь хүү вэ?
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-4 text-left font-semibold">Жил</th>
                      <th className="p-4 text-right font-semibold">
                        Нийт төлсөн
                      </th>
                      <th className="p-4 text-center font-semibold">
                        Үндсэн / Хүү хуваарилалт
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlySummary.map((row, idx) => {
                      const totalYearPayment = row.principalPaid + row.interestPaid;
                      const principalPercent = (row.principalPaid / totalYearPayment) * 100;
                      const interestPercent = (row.interestPaid / totalYearPayment) * 100;
                      return (
                        <tr
                          key={row.year}
                          className={`border-b transition-colors hover:bg-muted/50 ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <td className="p-4 font-medium">{row.year}-р жил</td>
                          <td className="p-4 text-right font-medium">
                            {formatShortMNT(totalYearPayment)}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="bg-emerald-500 flex items-center justify-center text-[10px] font-medium text-white"
                                  style={{ width: `${principalPercent}%` }}
                                >
                                  {principalPercent >= 15 && `${principalPercent.toFixed(0)}%`}
                                </div>
                                <div
                                  className="bg-red-500 flex items-center justify-center text-[10px] font-medium text-white"
                                  style={{ width: `${interestPercent}%` }}
                                >
                                  {interestPercent >= 15 && `${interestPercent.toFixed(0)}%`}
                                </div>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-emerald-600 dark:text-emerald-400">
                                  Үндсэн: {formatShortMNT(row.principalPaid)}
                                </span>
                                <span className="text-red-500">
                                  Хүү: {formatShortMNT(row.interestPaid)}
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
