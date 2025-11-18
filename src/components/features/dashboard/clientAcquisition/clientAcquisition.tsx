"use client";

import React from "react";
import { useTheme } from "@mui/material/styles";
import { Stack, Select, MenuItem, Avatar, Box, Typography } from "@mui/material";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import { chartOptions } from "@/components/features/dashboard/clientAcquisition/helper";
import { monthLabels, clientAcquisitionData } from "@/components/features/dashboard/clientAcquisition/mockup";
import { DashboardCard } from "../dashboardCard/dashboardCard";
import { Chart } from "@/components/ui";

export function ClientAcquisition() {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.success.main;

    const [selectedYear, setSelectedYear] = React.useState<string>("2025");
    const totalClients: number = clientAcquisitionData["total"];
    const [totalClientsDynamic, setTotalClientsDynamic] = React.useState(0);

    const handleChangeYear = (
        event: React.ChangeEvent<{ value: unknown }> | any
    ) => {
        setSelectedYear(event.target.value as string);
    };

    const dataForYear = (clientAcquisitionData[selectedYear] as number[]) || [];

    const baseOptions = chartOptions(primaryColor, secondaryColor);

    const optionsColumnChart = {
        ...baseOptions,
        xaxis: {
            ...baseOptions.xaxis,
            categories: monthLabels,
        },
        colors: [primaryColor],
    };

    const seriesColumnChart = [
        {
            name: selectedYear,
            data: dataForYear,
        },
    ];

    React.useEffect(() => {
        const start = 0;
        const end = totalClients;
        const duration = 800; // ms
        const startTime = performance.now();

        const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            setTotalClientsDynamic(Math.floor(start + (end - start) * progress));

            if (progress < 1) requestAnimationFrame(animate);
        };

        const id = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(id);
    }, [totalClients]);

    return (
        <DashboardCard
            title="Client Acquisition"
            footer={
                <Box>
                    <Chart
                        options={optionsColumnChart}
                        series={seriesColumnChart}
                        type="bar"
                        height={280}
                        width="100%"
                    />
                </Box>
            }
        >
            <Stack 
                direction="row" 
                spacing={2} 
                alignItems="center" 
                justifyContent="end"
            >
                <Typography variant="h2" fontWeight={700}>
                    {totalClientsDynamic}
                </Typography>

                <Avatar
                    sx={{
                        bgcolor: theme.palette.success.dark,
                        width: 45,
                        height: 45,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >
                    <UserGroupIcon width={26} strokeWidth={1.2} />
                </Avatar>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt="-8px"
                mb={1}
            >
                <Select
                    value={selectedYear}
                    onChange={handleChangeYear}
                    size="small"
                    sx={{ minWidth: 90, fontSize: 14 }}
                >
                    {Object.keys(clientAcquisitionData)
                        .filter((key) => key !== "total")
                        .sort()
                        .map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                </Select>
            </Stack>
        </DashboardCard>
    );
}