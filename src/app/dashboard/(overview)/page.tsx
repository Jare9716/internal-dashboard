"use client";
import { Grid, Box } from "@mui/material";

import { SalesOverview } from "@/components/features";

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
			</Grid>
		</Box>
	);
}

export default Dashboard;
