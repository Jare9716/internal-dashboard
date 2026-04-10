"use client";

import { useState, useEffect } from "react";
import { Box, Stack, Typography, Avatar, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { DashboardCard } from "@/components/features/dashboard/dashboardCard/dashboardCard";
import { Chart } from "@/components/ui";
import { clientAcquisitionData } from "@/components/features/dashboard/clientAcquisition/mockup";
import { getClientYears, getDataForYear, buildClientAcquisitionChartConfig } from "@/components/features/dashboard/clientAcquisition/helper";

export function ClientAcquisition() {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.success.main;

    const [selectedYear, setSelectedYear] = useState("2025");
    const [totalClientsDynamic, setTotalClientsDynamic] = useState(0);

    const totalClients: number = clientAcquisitionData["total"];
    const years = getClientYears(clientAcquisitionData);
    const dataForYear = getDataForYear(clientAcquisitionData, selectedYear);

    const { optionsColumnChart, seriesColumnChart } =
        buildClientAcquisitionChartConfig({
            primaryColor,
            secondaryColor,
            selectedYear,
            dataForYear,
        });

    const handleChangeYear = (event: SelectChangeEvent<string>) => {
        setSelectedYear(event.target.value);
    };

    useEffect(() => {
        const duration = 800;
        const start = performance.now();

        const animate = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            const current = Math.floor(totalClients * progress);
            setTotalClientsDynamic(current);

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
            <Box height={120} display="flex" alignItems="center">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Select
                        value={selectedYear}
                        onChange={handleChangeYear}
                        size="small"
                        sx={{ minWidth: 120 }}
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* RIGHT */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="h2" fontWeight={700}>
                            {totalClientsDynamic}
                        </Typography>

                        <Avatar
                            sx={{
                                bgcolor: theme.palette.success.dark,
                                width: 45,
                                height: 45,
                            }}
                        >
                            <UserGroupIcon width={26} strokeWidth={1.2} />
                        </Avatar>
                    </Stack>
                </Stack>
                </Box>
            
        </DashboardCard>
    );
}