import { SidebarLinks } from "./sidebar-links";

export function Sidebar() {
	return (
		<div className="flex h-full flex-col px-3 py-4 lg:px-2">
			<div className="flex grow flex-row justify-between space-x-2 lg:flex-col lg:space-y-2 lg:space-x-0">
				<SidebarLinks />
				<div className="hidden h-auto w-full grow rounded-md bg-gray-50 lg:block"></div>
			</div>
		</div>
	);
}
