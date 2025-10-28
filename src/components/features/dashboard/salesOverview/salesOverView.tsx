import React from "react";

import { useTheme } from "@mui/material/styles";

import { chartOptions } from "./helper";

import { DashboardCard } from "../dashboardCard/dashboardCard";
import { Chart } from "@/components/ui";

export function SalesOverview() {
	const theme = useTheme();
	const primaryColor = theme.palette.primary.main;
	const secondaryColor = theme.palette.secondary.main;

	const optionscolumnchart = chartOptions(primaryColor, secondaryColor);
	const seriescolumnchart = [
		{
			name: "Eanings this month",
			data: [355, 390, 300, 350, 390, 180, 355, 390],
		},
		{
			name: "Expense this month",
			data: [280, 250, 325, 215, 250, 310, 280, 250],
		},
	];

	return (
		<DashboardCard title="Sales Overview">
			<Chart
				options={optionscolumnchart}
				series={seriescolumnchart}
				type="bar"
				height={400}
				width={"100%"}
			/>
		</DashboardCard>
	);
}
