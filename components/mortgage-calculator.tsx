"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { format } from "date-fns";

interface AmortizationRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

function formatMNT(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MNT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = React.useState("50000000");
  const [annualRate, setAnnualRate] = React.useState("5.5");
  const [termYears, setTermYears] = React.useState("30");
  const [paymentsPerYear, setPaymentsPerYear] = React.useState("12");
  const [extraPercent, setExtraPercent] = React.useState("0");
  const [startDate, setStartDate] = React.useState(format(new Date(), "yyyy-MM-dd"));

  const calculateMortgage = () => {
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

    return {
      monthlyPayment,
      totalInterest: rowsWithoutExtra.reduce((sum, row) => sum + row.interest, 0),
      totalPaid: P + rowsWithoutExtra.reduce((sum, row) => sum + row.interest, 0),
      yearsWithoutExtra,
      yearsWithExtra,
      yearsSaved,
      rowsWithoutExtra: rowsWithoutExtra.slice(0, 12),
      rowsWithExtra: rowsWithExtra.slice(0, 12),
      chartData: rowsWithoutExtra.slice(0, 60).map((row) => ({
        month: row.month,
        interest: row.cumulativeInterest,
        principal: row.cumulativePrincipal,
      })),
    };
  };

  const results = calculateMortgage();

  const exportCSV = () => {
    if (!results) return;
    const headers = ["Month", "Payment", "Interest", "Principal", "Balance"];
    const rows = results.rowsWithoutExtra.map((row) => [
      row.month,
      row.payment.toFixed(2),
      row.interest.toFixed(2),
      row.principal.toFixed(2),
      row.balance.toFixed(2),
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mortgage-amortization.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mortgage Calculator</CardTitle>
          <CardDescription>
            Calculate your monthly payments and see how extra payments can save you time and money.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount (₮)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="50000000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualRate">Annual Interest Rate (%)</Label>
              <Input
                id="annualRate"
                type="number"
                step="0.1"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                placeholder="5.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="termYears">Term (years)</Label>
              <Input
                id="termYears"
                type="number"
                value={termYears}
                onChange={(e) => setTermYears(e.target.value)}
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentsPerYear">Payments per Year</Label>
              <Input
                id="paymentsPerYear"
                type="number"
                value={paymentsPerYear}
                onChange={(e) => setPaymentsPerYear(e.target.value)}
                placeholder="12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="extraPercent">Extra Payment (%)</Label>
              <Input
                id="extraPercent"
                type="number"
                step="0.1"
                value={extraPercent}
                onChange={(e) => setExtraPercent(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setExtraPercent("10")}
            >
              Add 10% Extra
            </Button>
            <Button
              variant="outline"
              onClick={() => setExtraPercent("0")}
            >
              Reset Extra
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-2xl font-bold">{formatMNT(results.monthlyPayment)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-2xl font-bold">{formatMNT(results.totalInterest)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-2xl font-bold">{formatMNT(results.totalPaid)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Years to Payoff (without extra)</p>
                  <p className="text-2xl font-bold">{results.yearsWithoutExtra.toFixed(1)} years</p>
                </div>
                {parseFloat(extraPercent) > 0 && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Years to Payoff (with extra)</p>
                      <p className="text-2xl font-bold">{results.yearsWithExtra.toFixed(1)} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Years Saved</p>
                      <p className="text-2xl font-bold text-accent">{results.yearsSaved.toFixed(1)} years</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amortization Chart</CardTitle>
              <CardDescription>
                Cumulative interest vs principal paid over time. Notice how early payments are mostly interest.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatMNT(value) : ''} />
                  <Legend />
                  <Area type="monotone" dataKey="interest" stackId="1" stroke="#ef4444" fill="#ef4444" name="Cumulative Interest" />
                  <Area type="monotone" dataKey="principal" stackId="1" stroke="#00BFA6" fill="#00BFA6" name="Cumulative Principal" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>First 12 Months Breakdown</CardTitle>
              <CardDescription>
                This table shows how early payments are mostly interest. The principal portion increases over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Month</th>
                      <th className="p-2 text-right">Payment</th>
                      <th className="p-2 text-right">Interest</th>
                      <th className="p-2 text-right">Principal</th>
                      <th className="p-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.rowsWithoutExtra.map((row) => (
                      <tr key={row.month} className="border-b">
                        <td className="p-2">{row.month}</td>
                        <td className="p-2 text-right">{formatMNT(row.payment)}</td>
                        <td className="p-2 text-right">{formatMNT(row.interest)}</td>
                        <td className="p-2 text-right">{formatMNT(row.principal)}</td>
                        <td className="p-2 text-right">{formatMNT(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button onClick={exportCSV} className="mt-4" variant="outline">
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
