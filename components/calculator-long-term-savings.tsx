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
import { cn, formatMNT, formatShortMNT } from "@/lib/utils";
import {
  calculateLongTermSavings,
  type LongTermSavingsInputs,
} from "@/lib/calculators/long-term-savings";
import { Sparkles, Percent, User, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "long-term-savings-calculator-inputs";
const LEGACY_STORAGE_KEY = "long-term-investment-calculator-inputs";

interface StoredInputs {
  initialSaving: string;
  annualInflationRatePct: string;
  taxRatePct: string;
  annualInterestRatePct: string;
  currentAge: string;
}

const defaultInputs: StoredInputs = {
  initialSaving: "10000000",
  annualInflationRatePct: "8",
  taxRatePct: "10",
  annualInterestRatePct: "12",
  currentAge: "30",
};

function loadFromStorage(): StoredInputs {
  if (typeof window === "undefined") return defaultInputs;
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(LEGACY_STORAGE_KEY);
    if (stored) return { ...defaultInputs, ...JSON.parse(stored) };
  } catch {
    // ignore
  }
  return defaultInputs;
}

function saveToStorage(inputs: StoredInputs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  } catch {
    // ignore
  }
}

function toNumber(value: string) {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

export function CalculatorLongTermSavings() {
  const [isHydrated, setIsHydrated] = React.useState(false);

  const [initialSaving, setInitialSaving] = React.useState(
    defaultInputs.initialSaving,
  );
  const [annualInflationRatePct, setAnnualInflationRatePct] = React.useState(
    defaultInputs.annualInflationRatePct,
  );
  const [taxRatePct, setTaxRatePct] = React.useState(defaultInputs.taxRatePct);
  const [annualInterestRatePct, setAnnualInterestRatePct] = React.useState(
    defaultInputs.annualInterestRatePct,
  );
  const [currentAge, setCurrentAge] = React.useState(defaultInputs.currentAge);

  React.useEffect(() => {
    const stored = loadFromStorage();
    setInitialSaving(stored.initialSaving);
    setAnnualInflationRatePct(stored.annualInflationRatePct);
    setTaxRatePct(stored.taxRatePct);
    setAnnualInterestRatePct(stored.annualInterestRatePct);
    setCurrentAge(stored.currentAge);
    setIsHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!isHydrated) return;
    const timeoutId = setTimeout(() => {
      saveToStorage({
        initialSaving,
        annualInflationRatePct,
        taxRatePct,
        annualInterestRatePct,
        currentAge,
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [
    isHydrated,
    initialSaving,
    annualInflationRatePct,
    taxRatePct,
    annualInterestRatePct,
    currentAge,
  ]);

  const inputs: LongTermSavingsInputs = React.useMemo(
    () => ({
      initialSaving: Math.max(0, toNumber(initialSaving)),
      annualInflationRatePct: Math.min(20, Math.max(0, toNumber(annualInflationRatePct))),
      taxRatePct: Math.min(20, Math.max(0, toNumber(taxRatePct))),
      annualInterestRatePct: Math.min(30, Math.max(0, toNumber(annualInterestRatePct))),
      currentAge: Math.min(65, Math.max(0, Math.round(toNumber(currentAge)))),
      retirementAge: 65,
    }),
    [
      initialSaving,
      annualInflationRatePct,
      taxRatePct,
      annualInterestRatePct,
      currentAge,
    ],
  );

  const results = React.useMemo(() => calculateLongTermSavings(inputs), [inputs]);
  const lastRow = results.rows[results.rows.length - 1];

  const yearsText =
    results.yearsProjected <= 0
      ? "0 жил"
      : `${results.yearsProjected} жил (${inputs.currentAge} → 65 нас)`;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Тохиргоо</CardTitle>
            <CardDescription>
              Энгийнээр “Нийлмэл хүү” буюу <span className="font-medium">Хүүгээс хүү бодох</span>{" "}
              нөлөөг харуулах тооцоолуур.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="initialSaving"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                Эхний хуримтлал
              </Label>
              <MoneyInput
                id="initialSaving"
                value={initialSaving}
                onChange={setInitialSaving}
                placeholder="10,000,000"
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="currentAge"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <User className="h-4 w-4 text-muted-foreground" />
                Одоогийн нас: {inputs.currentAge}
              </Label>
              <input
                type="range"
                id="currentAge"
                min="15"
                max="65"
                step="1"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-violet-200 accent-violet-500 dark:bg-violet-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>15</span>
                <span>{inputs.currentAge}</span>
                <span>65</span>
              </div>
              <p className="text-xs text-muted-foreground">
                65 нас хүртэл төсөөлнө: <span className="font-medium">{yearsText}</span>
              </p>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="annualInterestRatePct"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Percent className="h-4 w-4 text-muted-foreground" />
                Жилийн хүү: {inputs.annualInterestRatePct}%
              </Label>
              <input
                type="range"
                id="annualInterestRatePct"
                min="0"
                max="30"
                step="1"
                value={annualInterestRatePct}
                onChange={(e) => setAnnualInterestRatePct(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-violet-200 accent-violet-500 dark:bg-violet-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{inputs.annualInterestRatePct}%</span>
                <span>30%</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="annualInflationRatePct"
                className="flex items-center gap-2 text-sm font-medium"
              >
                Жилийн инфляц: {inputs.annualInflationRatePct}%
              </Label>
              <input
                type="range"
                id="annualInflationRatePct"
                min="0"
                max="20"
                step="1"
                value={annualInflationRatePct}
                onChange={(e) => setAnnualInflationRatePct(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-violet-200 accent-violet-500 dark:bg-violet-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{inputs.annualInflationRatePct}%</span>
                <span>20%</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="taxRatePct"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                Татвар: {inputs.taxRatePct}%
              </Label>
              <input
                type="range"
                id="taxRatePct"
                min="0"
                max="20"
                step="1"
                value={taxRatePct}
                onChange={(e) => setTaxRatePct(e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-violet-200 accent-violet-500 dark:bg-violet-500/40"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{inputs.taxRatePct}%</span>
                <span>20%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-500">
            <p className="text-sm font-medium text-white/80">
              65 нас хүрэх үеийн дүн (ойролцоогоор)
            </p>
            <p className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">
              {formatMNT(lastRow?.balanceNominal ?? 0)}
            </p>
            <p className="mt-2 text-sm text-white/80">
              Өнөөдрийн мөнгөөр (инфляцаар зассан):{" "}
              <span className="font-semibold">
                {formatMNT(lastRow?.balanceReal ?? 0)}
              </span>
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Анхны хуримтлал</p>
              <p className="mt-1 text-2xl font-bold">
                {formatMNT(Math.max(0, inputs.initialSaving))}
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Хугацаа</p>
              <p className="mt-1 text-2xl font-bold">{results.yearsProjected} жил</p>
            </div>
          </div>

          <div
            className={cn(
              "rounded-xl border p-4 shadow-sm",
              results.firstDouble
                ? "border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30"
                : "bg-card",
            )}
          >
            <p className="text-sm text-muted-foreground">
              Анхны хуримтлал <span className="font-medium">2 дахин</span> болох хамгийн эхний мөч
            </p>
            {inputs.initialSaving <= 0 ? (
              <p className="mt-1 text-sm text-muted-foreground">
                Эхний хуримтлалаа 0-ээс их болгоорой.
              </p>
            ) : results.firstDouble ? (
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold text-violet-700 dark:text-violet-300">
                  {results.firstDouble.year}-р жил (нас: {results.firstDouble.age})
                </p>
                <p className="text-sm text-muted-foreground">
                  Дүн:{" "}
                  <span className="font-semibold">
                    {formatMNT(results.firstDouble.balanceNominal)}
                  </span>
                </p>
              </div>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">
                Энэ тохиргоогоор 65 нас хүртэл 2 дахин болохгүй байна.
              </p>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <p className="font-semibold">Энгийн тайлбар</p>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              Жил бүр таны мөнгө өсөөд, дараа жил нь тэр өссөн дүн дээрээ дахин өснө. Үүнийг{" "}
              <span className="font-medium">Нийлмэл хүү</span> (Хүүгээс хүү бодох) гэдэг.
            </p>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-linear-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <CardTitle className="text-xl">Жил бүрийн төсөөлөл</CardTitle>
          <CardDescription>
            Үлдэгдэл нь жилийн эцсийн дүн; хүү бол тухайн жилийн хүүгийн нийлбэр (татварын
            өмнөх); сүүлийн багана нь инфляцаар өнөөдрийн худалдан авах чадварт шилжүүлсэн үлдэгдэл.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-semibold">Жил</th>
                  <th className="p-4 text-right font-semibold">Нас</th>
                  <th className="p-4 text-right font-semibold">Үлдэгдэл</th>
                  <th className="p-4 text-right font-semibold">Хүү</th>
                  <th className="p-4 text-right font-semibold">Татвар</th>
                  <th className="p-4 text-right font-semibold">
                    Инфляц тооцсон үлдэгдэл
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.rows.map((row, idx) => {
                  const highlight = row.isDoublingMoment;
                  return (
                    <tr
                      key={row.year}
                      className={cn(
                        "border-b transition-colors hover:bg-muted/50",
                        idx % 2 === 0 ? "bg-background" : "bg-muted/20",
                        highlight &&
                          "bg-violet-50/70 dark:bg-violet-950/20 hover:bg-violet-50 dark:hover:bg-violet-950/30",
                      )}
                    >
                      <td className="p-4 font-medium">
                        <div className="flex items-center gap-2">
                          <span>{row.year}-р жил</span>
                          {highlight && row.doublingMultiple && (
                            <span className="inline-flex items-center rounded-full bg-violet-600 px-2 py-0.5 text-xs font-semibold text-white">
                              {row.doublingMultiple} дахин
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">{row.age}</td>
                      <td className="p-4 text-right font-medium text-violet-700 dark:text-violet-300">
                        {formatShortMNT(row.balanceNominal)}
                      </td>
                      <td className="p-4 text-right text-muted-foreground">
                        {row.year === 0 ? "—" : formatShortMNT(row.interestNominal)}
                      </td>
                      <td className="p-4 text-right text-muted-foreground">
                        {row.year === 0 ? "—" : formatShortMNT(row.taxPaidNominal)}
                      </td>
                      <td className="p-4 text-right">
                        {formatShortMNT(row.balanceReal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

