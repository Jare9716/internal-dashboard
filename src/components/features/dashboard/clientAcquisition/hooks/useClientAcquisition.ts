"use client";

import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { clientAcquisitionData } from "@/components/features/dashboard/clientAcquisition/mockup";
import {
    getClientYears,
    getDataForYear,
    buildClientAcquisitionChartConfig,
} from "@/components/features/dashboard/clientAcquisition/logic/clientAcquisitionLogic";
import { useAnimatedNumber } from "@/components/features/dashboard/clientAcquisition/hooks/useAnimatedNumber";

export function useClientAcquisition() {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.success.main;

    const [selectedYear, setSelectedYear] = useState("2025");

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

    const totalClientsDynamic = useAnimatedNumber(totalClients, { duration: 800 });

    const handleChangeYear = (event: SelectChangeEvent<string>) => {
        setSelectedYear(event.target.value);
    };

    return {
        years,
        selectedYear,
        totalClientsDynamic,
        optionsColumnChart,
        seriesColumnChart,
        avatarBgColor: theme.palette.success.dark,
        handleChangeYear,
    };
}