import { ApexOptions } from "apexcharts";

export function chartOptions(primaryColor: string, secondaryColor: string) {
	const optionscolumnchart: ApexOptions = {
		chart: {
			type: "bar",
			fontFamily: "'Plus Jakarta Sans', sans-serif;",
			foreColor: "#adb0bb",
			toolbar: {
				show: false,
			},
		},
		colors: [primaryColor, secondaryColor],
		plotOptions: {
			bar: {
				horizontal: false,
				barHeight: "60%",
				columnWidth: "42%",
				borderRadius: 6,
				borderRadiusApplication: "end",
				borderRadiusWhenStacked: "all",
			},
		},
		stroke: {
			show: true,
			width: 5,
			lineCap: "butt",
			colors: ["transparent"],
		},
		dataLabels: {
			enabled: false,
		},
		legend: {
			show: false,
		},
		grid: {
			borderColor: "rgba(0,0,0,0.1)",
			strokeDashArray: 3,
			xaxis: {
				lines: {
					show: false,
				},
			},
		},
		yaxis: {
			tickAmount: 4,
		}
	};

	return optionscolumnchart;
}

