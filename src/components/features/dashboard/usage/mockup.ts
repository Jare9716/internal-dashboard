import { Client } from "@/models/types/clients/clientsTable";
import { clientsData } from "@/components/features/clients/clientsTable/mockup";

import type {
    CompanyUsageMock,
    ClientsMonthlyUsageMock,
    UsageBlock,
} from "@/components/features/dashboard/usage/helper";

// Time dimensions
export const YEARS = ["2024", "2025"] as const;
export type Year = (typeof YEARS)[number];

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] as const;
export type Month = (typeof MONTHS)[number];

// Company by year

export type CompanyUsageByYearMock = {
    [year: string]: CompanyUsageMock;
};

export const companyUsageByYearMock: CompanyUsageByYearMock = {
    "2024": {
        cloud: { categories: MONTHS as unknown as string[], data: [50, 70, 65, 80, 95, 110] },
        openai: { categories: MONTHS as unknown as string[], data: [35, 45, 48, 60, 70, 85] },
        anthropic: { categories: MONTHS as unknown as string[], data: [15, 20, 18, 25, 22, 35] },
        general: { categories: MONTHS as unknown as string[], data: [100, 135, 131, 165, 187, 230] },
    },
    "2025": {
        cloud: { categories: MONTHS as unknown as string[], data: [60, 80, 75, 90, 105, 120] },
        openai: { categories: MONTHS as unknown as string[], data: [40, 55, 52, 70, 78, 95] },
        anthropic: { categories: MONTHS as unknown as string[], data: [20, 25, 23, 30, 27, 45] },
        general: { categories: MONTHS as unknown as string[], data: [120, 160, 150, 190, 210, 260] },
    },
};

// Clients by year

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChance(probability: number) {
    return Math.random() < probability;
}

function buildMonthlyUsage(min: number, max: number, multiplier: number): UsageBlock {
    return {
        categories: MONTHS as unknown as string[],
        data: (MONTHS as unknown as string[]).map(() => Math.round(randomBetween(min, max) * multiplier)),
    };
}

export function buildClientsMonthlyUsageMock(clients: Client[]): ClientsMonthlyUsageMock {
    const usageByClient: ClientsMonthlyUsageMock = {};

    clients.forEach((client) => {
        const planMultiplier =
        client.plan === "Enterprise" ? 1.8 :
        client.plan === "Pro" ? 1.3 :
        1;

        const hasCloud = randomChance(0.7);
        const hasOpenAI = randomChance(0.8);
        const hasAnthropic = randomChance(0.4);

        const cloud = hasCloud ? buildMonthlyUsage(10, 40, planMultiplier) : undefined;
        const openai = hasOpenAI ? buildMonthlyUsage(8, 45, planMultiplier) : undefined;
        const anthropic = hasAnthropic ? buildMonthlyUsage(5, 30, planMultiplier) : undefined;

        const finalOpenAI = cloud || openai || anthropic ? openai : buildMonthlyUsage(8, 25, planMultiplier);

        const generalData = (MONTHS as unknown as string[]).map((_, i) =>
        (cloud?.data[i] ?? 0) + (finalOpenAI?.data[i] ?? 0) + (anthropic?.data[i] ?? 0)
        );

        usageByClient[client.id] = {
        general: { categories: MONTHS as unknown as string[], data: generalData },
        ...(cloud ? { cloud } : {}),
        ...(finalOpenAI ? { openai: finalOpenAI } : {}),
        ...(anthropic ? { anthropic } : {}),
        };
    });

    return usageByClient;
}

export type ClientsMonthlyUsageByYearMock = {
    [year: string]: ClientsMonthlyUsageMock;
};

export const clientsMonthlyUsageByYearMock: ClientsMonthlyUsageByYearMock = {
    "2024": buildClientsMonthlyUsageMock(clientsData),
    "2025": buildClientsMonthlyUsageMock(clientsData),
};

export { clientsData };