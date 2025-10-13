import SidebarLinks from "./sidebar-links";

export default function Sidebar() {
	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
				<SidebarLinks />
				<div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
			</div>
		</div>
	);
}
