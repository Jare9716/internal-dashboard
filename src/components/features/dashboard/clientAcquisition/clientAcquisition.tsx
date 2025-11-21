"use client";

import React from "react";
import { Box, Stack, Typography, Avatar, Select, MenuItem } from "@mui/material";
import { UserGroupIcon } from "@heroicons/react/24/outline";

import { DashboardCard } from "../dashboardCard/dashboardCard";
import { Chart } from "@/components/ui";
import { useClientAcquisition } from "@/components/features/dashboard/clientAcquisition/hooks/useClientAcquisition";

export function ClientAcquisition() {
    const {
        years,
        selectedYear,
        totalClientsDynamic,
        optionsColumnChart,
        seriesColumnChart,
        avatarBgColor,
        handleChangeYear,
    } = useClientAcquisition();

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
                justifyContent="flex-end"
            >
                <Typography variant="h2" fontWeight={700}>
                    {totalClientsDynamic}
                </Typography>

                <Avatar
                    sx={{
                        bgcolor: avatarBgColor,
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
                    {years.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </Stack>
        </DashboardCard>
    );
}