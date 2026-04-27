export interface LongTermSavingsInputs {
  initialSaving: number;
  annualInterestRatePct: number; // 0..30
  annualInflationRatePct: number; // 0..20
  taxRatePct: number; // 0..20
  currentAge: number;
  retirementAge?: number; // default 65
}

export interface LongTermSavingsYearRow {
  year: number; // 0..N
  age: number;
  balanceNominal: number;
  balanceReal: number;
  /** Жилийн эхэнд үлдэгдэл дээр тооцсон нийт хүү (татварын өмнө) */
  interestNominal: number;
  gainLossNominal: number;
  gainLossReal: number;
  taxPaidNominal: number;
  isDoublingMoment: boolean;
  doublingMultiple?: number; // 2, 4, 8, ...
}

export interface LongTermSavingsResults {
  yearsProjected: number;
  retirementAge: number;
  rows: LongTermSavingsYearRow[];
  firstDouble?: {
    year: number;
    age: number;
    balanceNominal: number;
    multiple: number; // always 2 for "first double"
  };
}

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function nextDoublingThresholdMultiple(
  initialSaving: number,
  balanceNominal: number,
): number | null {
  if (!(initialSaving > 0) || !(balanceNominal > 0)) return null;
  const ratio = balanceNominal / initialSaving;
  if (ratio < 2) return null;
  const exponent = Math.floor(Math.log2(ratio));
  const multiple = 2 ** exponent;
  return multiple >= 2 ? multiple : null;
}

export function calculateLongTermSavings(
  rawInputs: LongTermSavingsInputs,
): LongTermSavingsResults {
  const retirementAge = clampNumber(rawInputs.retirementAge ?? 65, 40, 100);
  const currentAge = clampNumber(rawInputs.currentAge, 0, 100);
  const yearsProjected = Math.max(0, Math.floor(retirementAge - currentAge));

  const initialSaving = Math.max(0, rawInputs.initialSaving);
  const annualInterestRatePct = clampNumber(rawInputs.annualInterestRatePct, 0, 30);
  const annualInflationRatePct = clampNumber(rawInputs.annualInflationRatePct, 0, 20);
  const taxRatePct = clampNumber(rawInputs.taxRatePct, 0, 20);

  const interestRate = annualInterestRatePct / 100;
  const inflationRate = annualInflationRatePct / 100;
  const taxRate = taxRatePct / 100;

  const rows: LongTermSavingsYearRow[] = [];

  let balanceNominal = initialSaving;
  let prevNominal = balanceNominal;
  let prevReal = balanceNominal;
  const seenDoublingMultiples = new Set<number>();
  let firstDouble:
    | {
        year: number;
        age: number;
        balanceNominal: number;
        multiple: number;
      }
    | undefined;

  // Year 0 (starting point)
  rows.push({
    year: 0,
    age: currentAge,
    balanceNominal,
    balanceReal: balanceNominal,
    interestNominal: 0,
    gainLossNominal: 0,
    gainLossReal: 0,
    taxPaidNominal: 0,
    isDoublingMoment: false,
  });

  for (let year = 1; year <= yearsProjected; year++) {
    prevNominal = balanceNominal;
    prevReal = rows[year - 1]!.balanceReal;

    // Apply interest, then tax on the nominal gain.
    const preTax = balanceNominal * (1 + interestRate);
    const interestNominal = Math.max(0, preTax - balanceNominal);
    const gain = interestNominal;
    const taxPaidNominal = gain * taxRate;
    balanceNominal = preTax - taxPaidNominal;

    const balanceReal = balanceNominal / Math.pow(1 + inflationRate, year);
    const gainLossNominal = balanceNominal - prevNominal;
    const gainLossReal = balanceReal - prevReal;

    let isDoublingMoment = false;
    let doublingMultiple: number | undefined;
    const multiple = nextDoublingThresholdMultiple(initialSaving, balanceNominal);
    if (multiple !== null && !seenDoublingMultiples.has(multiple)) {
      const prevMultiple = nextDoublingThresholdMultiple(initialSaving, prevNominal);
      if (prevMultiple === null || prevMultiple < multiple) {
        isDoublingMoment = true;
        doublingMultiple = multiple;
        seenDoublingMultiples.add(multiple);
      }
    }

    if (!firstDouble && initialSaving > 0 && balanceNominal >= initialSaving * 2) {
      firstDouble = {
        year,
        age: currentAge + year,
        balanceNominal,
        multiple: 2,
      };
    }

    rows.push({
      year,
      age: currentAge + year,
      balanceNominal,
      balanceReal,
      interestNominal,
      gainLossNominal,
      gainLossReal,
      taxPaidNominal,
      isDoublingMoment,
      doublingMultiple,
    });
  }

  return { yearsProjected, retirementAge, rows, firstDouble };
}
