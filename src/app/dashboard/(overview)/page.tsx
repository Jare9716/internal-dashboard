"use client";
import { Grid, Box } from "@mui/material";

import {
	SalesOverview,
	MonthlyEarnings,
	RecentTransactions,
	YearlyBreakup,
} from "@/components/features";

function Dashboard() {
	return (
		<Box>
			<Grid container spacing={3}>
				<Grid
					size={{
						xs: 12,
						lg: 8,
					}}
				>
					<SalesOverview />
				</Grid>
				<Grid
					size={{
						xs: 12,
						lg: 4,
					}}
				>
					<Grid container spacing={3}>
						<Grid size={12}>
							<YearlyBreakup />
						</Grid>
						<Grid size={12}>
							<MonthlyEarnings />
						</Grid>
					</Grid>
				</Grid>
				<Grid
					size={{
						xs: 12,
						lg: 4,
					}}
				>
					<RecentTransactions />
				</Grid>
			</Grid>
		</Box>
	);
}

export default Dashboard;
