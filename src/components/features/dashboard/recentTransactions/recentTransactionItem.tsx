import { Typography, Link } from "@mui/material";
import {
	TimelineItem,
	TimelineOppositeContent,
	TimelineSeparator,
	TimelineDot,
	TimelineConnector,
	TimelineContent,
} from "@mui/lab";

import { timelineData } from "./mockup";

export function RecenTransactionItem() {
	return timelineData.map((item, index) => (
		<TimelineItem key={index}>
			<TimelineOppositeContent>{item.time}</TimelineOppositeContent>{" "}
			<TimelineSeparator>
				<TimelineDot color={item.dotColor} variant="outlined" />
				{index < timelineData.length - 1 && <TimelineConnector />}
			</TimelineSeparator>
			<TimelineContent>
				{item.description ? (
					item.description
				) : (
					<>
						<Typography fontWeight="600">{item.title} </Typography>
						{item.link && (
							<Link href="/" underline="none">
								{item.link.text}
							</Link>
						)}
					</>
				)}
			</TimelineContent>
		</TimelineItem>
	));
}
