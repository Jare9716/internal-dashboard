import { Stack, Typography, Avatar } from "@mui/material";

type YearsProps = {
	primary: string;
	primarylight: string;
};

export function Years({ primary, primarylight }: YearsProps) {
	return (
		<Stack spacing={3} mt={5} direction="row">
			<Stack direction="row" spacing={1} alignItems="center">
				<Avatar
					sx={{
						width: 9,
						height: 9,
						bgcolor: primary,
						svg: { display: "none" },
					}}
				></Avatar>
				<Typography variant="subtitle2" color="textSecondary">
					2024
				</Typography>
			</Stack>
			<Stack direction="row" spacing={1} alignItems="center">
				<Avatar
					sx={{
						width: 9,
						height: 9,
						bgcolor: primarylight,
						svg: { display: "none" },
					}}
				></Avatar>
				<Typography variant="subtitle2" color="textSecondary">
					2025
				</Typography>
			</Stack>
		</Stack>
	);
}
