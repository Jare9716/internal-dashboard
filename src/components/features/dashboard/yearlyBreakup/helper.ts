import { ApexOptions } from "apexcharts";

export function chartOptions(primary: string, primarylight: string) {
	const optionscolumnchart: ApexOptions = {
		chart: {
			type: "donut",
			fontFamily: "'Plus Jakarta Sans', sans-serif;",
			foreColor: "#adb0bb",
			toolbar: {
				show: false,
			},
		},
		labels: ["2024", "2025"],
		colors: [primary, primarylight],
		tooltip: {
			theme: "light",
			fillSeriesColor: false,
		},
		plotOptions: {
			pie: {
				donut: {
					size: "75%",
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		legend: {
			show: false,
		},
	};

	return optionscolumnchart;
}
