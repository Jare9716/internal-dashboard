import React from "react";

import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import { chartOptions } from "./helper";

import { DashboardCard } from "../dashboardCard/dashboardCard";
import { Chart } from "@/components/ui";
import { Years } from "./years";

export function YearlyBreakup() {
	const theme = useTheme();
	const primary = theme.palette.primary.main;
	const primarylight = theme.palette.secondary.main;
	const successlight = theme.palette.success.light;

	const optionscolumnchart = chartOptions(primary, primarylight);
	const seriescolumnchart = [20, 40];

	return (
		<DashboardCard title="Yearly Breakup">
			<Grid container spacing={3}>
				<Grid size={7}>
					<Typography variant="h3" fontWeight="700">
						$36,358
					</Typography>
					<Stack direction="row" spacing={1} mt={1} alignItems="center">
						<Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
							<ArrowUpRightIcon width={20} color="#39B69A" />
						</Avatar>
						<Typography variant="subtitle2" fontWeight="600">
							+50%
						</Typography>
						<Typography variant="subtitle2" color="textSecondary">
							last year
						</Typography>
					</Stack>
					<Years primary={primary} primarylight={primarylight} />
				</Grid>
				{/* column */}
				<Grid size={5}>
					<Chart
						options={optionscolumnchart}
						series={seriescolumnchart}
						type="donut"
						height={148}
						width={"100%"}
					/>
				</Grid>
			</Grid>
		</DashboardCard>
	);
}
