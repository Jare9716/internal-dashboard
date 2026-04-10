"use client";

import { useState } from "react";
import { Box, Stack, Typography, Select, MenuItem, Divider } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

import { DashboardCard } from "@/components/features/dashboard/dashboardCard/dashboardCard";
import { Chart } from "@/components/ui";

import {
    UsageType,
    usageTypeLabels,
    buildUsageChartOptions,
    YearMonth,
    buildDailyBlockFromMonthlyTotal
} from "@/components/features/dashboard/usage/helper";

import {
    YEARS,
    MONTHS,
    companyUsageByYearMock
} from "@/components/features/dashboard/usage/mockup";


export default function Usage() {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    const [usageType, setUsageType] = useState<UsageType>("general");

    const [monthPick, setMonthPick] = useState<YearMonth>({
        year: YEARS[YEARS.length - 1],
        month: MONTHS[MONTHS.length - 1]
    });

    const yearData = companyUsageByYearMock[monthPick.year];
    const providerBlock = yearData?.[usageType];

    const monthIdx =
        providerBlock?.categories.indexOf(monthPick.month) ?? -1;

    const monthTotal =
        monthIdx >= 0 ? providerBlock!.data[monthIdx] : 0;

    const companyBlock = buildDailyBlockFromMonthlyTotal(
        monthTotal,
        monthPick.month
    );

    const series = [
        {
        name: usageTypeLabels[usageType],
        data: companyBlock.data
        }
    ];

    const options = {
        ...buildUsageChartOptions(
        primaryColor,
        companyBlock.categories,
        "0%"
        ),

        plotOptions: {
        bar: {
            columnWidth: "65%",
            borderRadius: 4
        }
        }
    };

    const handleUsageType = (event: SelectChangeEvent<string>) =>
        setUsageType(event.target.value as UsageType);

    return (
        <DashboardCard
            title="Usage"
            footer={
                <Box
                    sx={{
                        height: "calc(100vh - 180px)",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={2}
                        mx={3}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <BuildingOffice2Icon width={18} strokeWidth={1.6} />
                            <Typography variant="subtitle1" fontWeight={700}>
                                JokerLabs
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Select
                                value={monthPick.year}
                                onChange={(e) =>
                                    setMonthPick((p) => ({ ...p, year: e.target.value }))
                                }
                                size="small"
                                sx={{ minWidth: 90 }}
                            >
                                {YEARS.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>

                            <Select
                                value={monthPick.month}
                                onChange={(e) =>
                                    setMonthPick((p) => ({ ...p, month: e.target.value }))
                                }
                                size="small"
                                sx={{ minWidth: 100 }}
                            >
                                {MONTHS.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>

                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                            <Select
                                value={usageType}
                                onChange={handleUsageType}
                                size="small"
                                sx={{ minWidth: 150 }}
                            >
                                {Object.entries(usageTypeLabels).map(([key, label]) => (
                                    <MenuItem key={key} value={key}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>

                        </Stack>
                    </Stack>

                    <Box sx={{ flex: 1 }}>
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            height="80%"
                            width="100%"
                        />
                    </Box>
                </Box>
            }
        />
    );
}