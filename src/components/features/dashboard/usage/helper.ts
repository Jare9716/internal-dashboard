// Types
export type UsageType = "general" | "cloud" | "openai" | "anthropic";

export const usageTypeLabels: Record<UsageType, string> = {
    general: "General",
    cloud: "Cloud",
    openai: "OpenAI",
    anthropic: "Anthropic",
};

export type UsageBlock = {
    categories: string[];
    data: number[];
};

export type CompanyUsageMock = {
    general: UsageBlock;
    cloud: UsageBlock;
    openai: UsageBlock;
    anthropic: UsageBlock;
};

export type ClientMonthlyUsage = {
    general: UsageBlock;
    cloud?: UsageBlock;
    openai?: UsageBlock;
    anthropic?: UsageBlock;
};

export type ClientsMonthlyUsageMock = {
    [clientId: string]: ClientMonthlyUsage;
};

export type TimeView = "months" | "days";

export type YearMonth = {
    year: string;
    month: string;
};

export type ClientUsageProps = {
    clientId: string;
};

// Chart Options
export function buildUsageChartOptions(primaryColor: string, categories: string[], columnWidth: string = "20%") {
    return {
        chart: {
            toolbar: { show: false },
            fontFamily: "inherit",
        },
        xaxis: {
            categories,
            labels: { style: { fontSize: "12px" } },
        },
        yaxis: {
            labels: { style: { fontSize: "12px" } },
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth,
            },
        },
        dataLabels: { enabled: false },
        grid: { strokeDashArray: 4 },
        tooltip: { theme: "dark" },
        colors: [primaryColor],
    };
}

export function getCompanyUsageBlock(usageType: UsageType, companyUsage: CompanyUsageMock): UsageBlock {
    return companyUsage[usageType];
}

export function getSelectedClientUsageBlock(
    clientId: string,
    usageType: UsageType,
    clientsMonthlyUsage: ClientsMonthlyUsageMock
): UsageBlock {
    const clientUsage = clientsMonthlyUsage[clientId];
    if (!clientUsage) return { categories: [], data: [] };
    return clientUsage[usageType] ?? clientUsage.general;
}

// -------------------- NEW: Range by (year+month) --------------------

function compareYearMonth(a: YearMonth, b: YearMonth, monthsOrder: string[]) {
    if (a.year !== b.year) return Number(a.year) - Number(b.year);
    return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
}

function nextYearMonth(current: YearMonth, monthsOrder: string[]): YearMonth {
    const idx = monthsOrder.indexOf(current.month);
    if (idx === -1) return current;

    const isLast = idx === monthsOrder.length - 1;
    if (!isLast) return { year: current.year, month: monthsOrder[idx + 1] };

    return { year: String(Number(current.year) + 1), month: monthsOrder[0] };
}

function listMonthsBetween(start: YearMonth, end: YearMonth, monthsOrder: string[]): YearMonth[] {
    const result: YearMonth[] = [];

    const s = compareYearMonth(start, end, monthsOrder) <= 0 ? start : end;
    const e = compareYearMonth(start, end, monthsOrder) <= 0 ? end : start;

    let cur: YearMonth = { ...s };

    for (let i = 0; i < 200; i++) {
        result.push(cur);
        if (cur.year === e.year && cur.month === e.month) break;
        cur = nextYearMonth(cur, monthsOrder);
    }

    return result;
    }

function monthValueFromBlock(block: UsageBlock | undefined, month: string): number {
    if (!block) return 0;
    const idx = block.categories.indexOf(month);
    return idx >= 0 ? block.data[idx] : 0;
}

export function buildCompanyBlockByYearMonthRange(args: {
    usageType: UsageType;
    start: YearMonth;
    end: YearMonth;
    monthsOrder: string[];
    companyUsageByYear: Record<string, CompanyUsageMock>;
}): UsageBlock {
    const { usageType, start, end, monthsOrder, companyUsageByYear } = args;
    const points = listMonthsBetween(start, end, monthsOrder);

    return {
        categories: points.map((p) => `${p.month} ${p.year}`),
        data: points.map((p) => {
        const yearData = companyUsageByYear[p.year];
        const block = yearData ? yearData[usageType] : undefined;
        return monthValueFromBlock(block, p.month);
        }),
    };
}

export function buildClientBlockByYearMonthRange(args: {
    clientId: string;
    usageType: UsageType;
    start: YearMonth;
    end: YearMonth;
    monthsOrder: string[];
    clientsUsageByYear: Record<string, ClientsMonthlyUsageMock>;
}): UsageBlock {
    const { clientId, usageType, start, end, monthsOrder, clientsUsageByYear } = args;
    const points = listMonthsBetween(start, end, monthsOrder);

    return {
        categories: points.map((p) => `${p.month} ${p.year}`),
        data: points.map((p) => {
            const yearClients = clientsUsageByYear[p.year];
            const clientUsage = yearClients ? yearClients[clientId] : undefined;
            const block = clientUsage?.[usageType] ?? clientUsage?.general;
            return monthValueFromBlock(block, p.month);
        }),
    };
}

// Days (from monthly total)

function getDaysInMonth(month: string) {
    if (month === "Feb") return 28;
    if (month === "Apr" || month === "Jun") return 30;
    return 31;
}

export function buildDailyBlockFromMonthlyTotal(monthTotal: number, month: string): UsageBlock {
    const days = getDaysInMonth(month);

    const weights = Array.from({ length: days }, () => 0.6 + Math.random() * 0.8);
    const weightsSum = weights.reduce((a, b) => a + b, 0);

    const dailyData = weights.map((w) => Math.round((w / weightsSum) * monthTotal));

    return {
        categories: Array.from({ length: days }, (_, i) => String(i + 1)),
        data: dailyData,
    };
}