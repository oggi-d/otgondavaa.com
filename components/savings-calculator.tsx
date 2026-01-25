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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatMNT } from "@/lib/utils";

interface YearlyProjection {
  year: number;
  age: number;
  balance: number;
  contribution: number;
}

export function SavingsCalculator() {
  const [currentAge, setCurrentAge] = React.useState("30");
  const [retirementAge, setRetirementAge] = React.useState("65");
  const [currentSavings, setCurrentSavings] = React.useState("10000000");
  const [monthlyIncome, setMonthlyIncome] = React.useState("2000000");
  const [monthlyExpenses, setMonthlyExpenses] = React.useState("1500000");
  const [annualReturn, setAnnualReturn] = React.useState("5");
  const [targetAmount, setTargetAmount] = React.useState("500000000");

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Хадгаламж & Тэтгэврийн тооцоолуур</CardTitle>
          <CardDescription>
            Тэтгэвэр болон хадгаламжийн зорилгоо төлөвлө. Сар бүр хэр их хэмнэх
            хэрэгтэйг хараарай.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentAge">Одоогийн нас</Label>
              <Input
                id="currentAge"
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retirementAge">Тэтгэврийн нас</Label>
              <Input
                id="retirementAge"
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                placeholder="65"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentSavings">Одоогийн хадгаламж</Label>
              <MoneyInput
                id="currentSavings"
                value={currentSavings}
                onChange={setCurrentSavings}
                placeholder="10,000,000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Сарын орлого</Label>
              <MoneyInput
                id="monthlyIncome"
                value={monthlyIncome}
                onChange={setMonthlyIncome}
                placeholder="2,000,000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyExpenses">Сарын зарлага</Label>
              <MoneyInput
                id="monthlyExpenses"
                value={monthlyExpenses}
                onChange={setMonthlyExpenses}
                placeholder="1,500,000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualReturn">Жилийн өгөөж (%)</Label>
              <Input
                id="annualReturn"
                type="number"
                step="0.1"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                placeholder="5"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="targetAmount">Зорилтот дүн</Label>
              <MoneyInput
                id="targetAmount"
                value={targetAmount}
                onChange={setTargetAmount}
                placeholder="500,000,000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {results && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Хадгаламжийн зөвлөмж</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Шаардлагатай сарын хувь нэмэр
                  </p>
                  <p className="text-2xl font-bold">
                    {formatMNT(results.monthlyContributionRequired)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Зорилтот дүнд хүрэхийн тулд
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Санал болгож буй сарын хэмнэлт
                  </p>
                  <p className="text-2xl font-bold">
                    {formatMNT(results.suggestedFromIncome)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Орлогын үлдэгдлийн 15%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Зөвлөмжтэй сарын хэмнэлт
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatMNT(results.monthlyContribution)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {results.monthlyContribution >=
                    results.monthlyContributionRequired
                      ? "Орлогод үндэслэсэн"
                      : "Зорилтод хүрэхийн тулд шаардлагатай"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Төсөөлөгдсөн эцсийн үлдэгдэл
                  </p>
                  <p
                    className={`text-2xl font-bold ${results.targetAchieved ? "text-accent" : ""}`}
                  >
                    {formatMNT(results.finalBalance)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {results.targetAchieved
                      ? "Зорилт хангагдлаа! ✓"
                      : "Зорилтоос доогуур"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Жил бүрийн төсөөлөл</CardTitle>
              <CardDescription>
                Тэтгэврийн нас хүртэлх үлдэгдлийн өсөлтийн төсөөлөл.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={results.projection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      value !== undefined ? formatMNT(value) : ""
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#6C5CE7"
                    strokeWidth={2}
                    name="Үлдэгдэл"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Жил бүрийн төсөөллийн хүснэгт</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Жил</th>
                      <th className="p-2 text-left">Нас</th>
                      <th className="p-2 text-right">Үлдэгдэл</th>
                      <th className="p-2 text-right">Жилийн хувь нэмэр</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.projection.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2">{row.year}</td>
                        <td className="p-2">{row.age}</td>
                        <td className="p-2 text-right">
                          {formatMNT(row.balance)}
                        </td>
                        <td className="p-2 text-right">
                          {formatMNT(row.contribution)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button onClick={exportCSV} className="mt-4" variant="outline">
                CSV экспортлох
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
