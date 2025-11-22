export const monthLabels= [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

type ClientAcquisitionData = {
    total: number;
    [year: string]: number[] | number;
};

export const clientAcquisitionData: ClientAcquisitionData  = {
    "2024": [3, 5, 4, 6, 5, 7, 6, 8, 7, 5, 4, 6],
    "2025": [5, 8, 7, 10, 9, 12, 11, 14, 13, 10, 9, 11],
    "total": 185
};