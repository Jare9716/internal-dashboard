import { TimelineDotProps } from "@mui/lab";

type TimeLineData = {
	id: number;
	time: string;
	dotColor: TimelineDotProps["color"];
	title: string | null;
	description: string | null;
	link: {
		href: string;
		text: string;
	} | null;
};

export const timelineData: TimeLineData[] = [
	{
		id: 1,
		time: "09:30 am",
		dotColor: "primary",
		title: null,
		description: "Payment received from John Doe of $385.90",
		link: null,
	},
	{
		id: 2,
		time: "10:00 am",
		dotColor: "secondary",
		title: "New sale recorded",
		description: null,
		link: {
			href: "/",
			text: "#ML-3467",
		},
	},
	{
		id: 3,
		time: "12:00 am",
		dotColor: "success",
		title: null,
		description: "Payment was made of $64.95 to Michael",
		link: null,
	},
	{
		id: 4,
		time: "09:30 am",
		dotColor: "warning",
		title: "New sale recorded",
		description: null,
		link: {
			href: "/",
			text: "#ML-3467",
		},
	},
	{
		id: 5,
		time: "09:30 am",
		dotColor: "error",
		title: "New arrival recorded",
		description: null,
		link: null,
	},
	{
		id: 6,
		time: "12:00 am",
		dotColor: "success",
		title: null,
		description: "Payment Received",
		link: null,
	},
];
