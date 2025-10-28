import React from "react";

import { Timeline, timelineOppositeContentClasses } from "@mui/lab";

import { DashboardCard } from "../dashboardCard/dashboardCard";
import { RecenTransactionItem } from "./recentTransactionItem";

export function RecentTransactions() {
	return (
		<DashboardCard title="Recent Transactions">
			<Timeline
				sx={{
					"& .MuiTimelineConnector-root": {
						width: "1px",
						backgroundColor: "divider",
					},
					[`& .${timelineOppositeContentClasses.root}`]: {
						flex: 0.5,
					},
					height: 415,
				}}
			>
				<RecenTransactionItem />
			</Timeline>
		</DashboardCard>
	);
}
