import { chartOptions } from "@/components/features/dashboard/clientAcquisition/helper";
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
