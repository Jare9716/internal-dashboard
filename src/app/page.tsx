import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Page() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<Link
				href="/dashboard"
				className="flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
			>
				<span>Go to dashboard</span> <ArrowRightIcon className="w-5 md:w-6" />
			</Link>
		</div>
	);
}
