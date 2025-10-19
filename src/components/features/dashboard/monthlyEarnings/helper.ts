import { ApexOptions } from "apexcharts";

export function chartOptions() {
	const optionscolumnchart: ApexOptions = {
		chart: {
			type: "area",
			fontFamily: "'Plus Jakarta Sans', sans-serif;",
			foreColor: "#adb0bb",
			toolbar: {
				show: false,
			},
			height: 60,
			sparkline: {
				enabled: true,
			},
			group: "sparklines",
		},
		stroke: {
			curve: "smooth",
			width: 2,
		},
		markers: {
			size: 0,
		},
	};

	return optionscolumnchart;
}
