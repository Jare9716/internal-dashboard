import { ApexOptions } from "apexcharts";
import { monthLabels, clientAcquisitionData } from "@/components/features/dashboard/clientAcquisition/mockup";

export type ClientAcquisitionData = typeof clientAcquisitionData;

export function getClientYears(data: ClientAcquisitionData): string[] {
    return Object.keys(data)
        .filter((key) => key !== "total")
        .sort();
}

export function getDataForYear(
    data: ClientAcquisitionData,
    year: string
): number[] {
    return (data[year] as number[]) || [];
}

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

export function buildClientAcquisitionChartConfig(params: {
    primaryColor: string;
    secondaryColor: string;
    selectedYear: string;
    dataForYear: number[];
}) {
    const { primaryColor, secondaryColor, selectedYear, dataForYear } = params;

    const baseOptions = chartOptions(primaryColor, secondaryColor);

    const optionsColumnChart = {
        ...baseOptions,
        xaxis: {
            ...baseOptions.xaxis,
            categories: monthLabels,
        },
        colors: [primaryColor],
    };

    const seriesColumnChart = [
        {
            name: selectedYear,
            data: dataForYear,
        },
    ];

    return { optionsColumnChart, seriesColumnChart };
}
