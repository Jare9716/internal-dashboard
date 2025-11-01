import React from "react";

import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar } from "@mui/material";
import { ArrowDownRightIcon } from "@heroicons/react/24/outline";

import { chartOptions } from "./helper";

import { DashboardCard } from "../dashboardCard/dashboardCard";
import { Chart } from "@/components/ui";

export function MonthlyEarnings() {
	const theme = useTheme();
	const secondary = theme.palette.secondary.main;
	const errorlight = theme.palette.error.light;

	const optionscolumnchart = chartOptions();
	const seriescolumnchart = [
		{
			name: "",
			color: secondary,
			data: [25, 66, 20, 40, 12, 58, 20, 25, 66, 20, 40, 12, 58, 20],
		},
	];
	return (
		<DashboardCard
			title="Monthly Earnings"
			footer={
				<Chart
					options={optionscolumnchart}
					series={seriescolumnchart}
					type="area"
					height={60}
					width={"100%"}
				/>
			}
		>
			<Typography variant="h3" fontWeight="700" mt="-20px">
				$6,820
			</Typography>
			<Stack direction="row" spacing={1} my={1} alignItems="center">
				<Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
					<ArrowDownRightIcon width={20} color="#FA896B" />
				</Avatar>
				<Typography variant="subtitle2" fontWeight="600">
					+9%
				</Typography>
				<Typography variant="subtitle2" color="textSecondary">
					last year
				</Typography>
			</Stack>
		</DashboardCard>
	);
}
