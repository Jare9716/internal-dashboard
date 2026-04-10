"use client";

import { useState } from "react";
import { Stack, Typography, Select, MenuItem, Divider } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "@/components/ui";

import {
    UsageType,
    usageTypeLabels,
    buildUsageChartOptions,
    YearMonth,
    buildDailyBlockFromMonthlyTotal,
    ClientUsageProps
} from "./helper";

import {
    YEARS,
    MONTHS,
    clientsMonthlyUsageByYearMock
} from "./mockup";

export default function ClientUsageChart({ clientId }: ClientUsageProps) {

    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    const [clientUsageType, setClientUsageType] = useState<UsageType>("general");

    const [clientMonthPick, setClientMonthPick] = useState<YearMonth>({
        year: YEARS[YEARS.length - 1],
        month: MONTHS[MONTHS.length - 1],
    });

    const yearClients = clientsMonthlyUsageByYearMock[clientMonthPick.year];
    const clientUsage = yearClients?.[clientId];

    const providerBlock =
        clientUsage?.[clientUsageType] ?? clientUsage?.general;

    const monthIdx =
        providerBlock?.categories.indexOf(clientMonthPick.month) ?? -1;

    const monthTotal =
        monthIdx >= 0 ? providerBlock!.data[monthIdx] : 0;

    const clientBlock = buildDailyBlockFromMonthlyTotal(
        monthTotal,
        clientMonthPick.month
    );

    const clientSeries = [
        {
            name: usageTypeLabels[clientUsageType],
            data: clientBlock.data
        }
    ];

    const clientOptions = {
        ...buildUsageChartOptions(
            primaryColor,
            clientBlock.categories,
            "0%"
        ),

        plotOptions: {
            bar: {
                columnWidth: "60%",
                borderRadius: 4
            }
        }
    };

    const handleClientType = (event: SelectChangeEvent<string>) =>
        setClientUsageType(event.target.value as UsageType);

    return (
        <>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Select
                    value={clientMonthPick.year}
                    onChange={(e) =>
                        setClientMonthPick((p) => ({ ...p, year: e.target.value }))
                    }
                    size="small"
                >
                    {YEARS.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    value={clientMonthPick.month}
                    onChange={(e) =>
                        setClientMonthPick((p) => ({ ...p, month: e.target.value }))
                    }
                    size="small"
                >
                    {MONTHS.map((month) => (
                        <MenuItem key={month} value={month}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    value={clientUsageType}
                    onChange={handleClientType}
                    size="small"
                    sx={{ minWidth: 140 }}
                >
                    {Object.entries(usageTypeLabels).map(([key, label]) => (
                        <MenuItem key={key} value={key}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>

            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Chart
                options={clientOptions}
                series={clientSeries}
                type="bar"
                height={260}
                width="100%"
            />
        </>
    );
}