import Link from "next/link";

import Button from "@mui/material/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Page() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<Link href="/dashboard">
				{/* <span>Go to dashboard</span> <ArrowRightIcon className="w-5 md:w-6" /> */}
				<Button
					variant="contained"
					size="large"
					endIcon={<ArrowRightIcon className="w-5 md:w-6" />}
				>
					Go to dashboard
				</Button>
			</Link>
		</div>
	);
}
