"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { EyeIcon } from "@heroicons/react/24/outline";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Chip,
    Button,
} from "@mui/material";

import { ClientsTableProps } from "@/models/types/clients/clientsTable";


export function ClientsTable({ clients }: ClientsTableProps) {
    const theme = useTheme();
    const router = useRouter();

    return (
        <TableContainer component={Paper} elevation={1}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">NIT</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Segment</TableCell>
                        <TableCell align="center">Plan</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {clients.map((client) => (
                        <TableRow 
                            key={client.id} 
                            hover
                            sx={{
                                "&:hover": {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            <TableCell align="center">{client.name}</TableCell>
                            <TableCell align="center">{client.email}</TableCell>
                            <TableCell align="center">{client.nit}</TableCell>
                            <TableCell align="center">{client.phone}</TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={client.segment}
                                    size="small"
                                    sx={{
                                        backgroundColor: "transparent !important",
                                        border: "none !important",
                                        boxShadow: "none",
                                        color: theme.palette.primary.dark,
                                        fontWeight: 500,
                                        padding: 0,
                                        "& .MuiChip-label": {
                                            padding: 0,
                                        },
                                    }}
                                    variant="filled"
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={client.plan}
                                    size="small"
                                    sx={{
                                        backgroundColor: theme.palette.primary.light,
                                        color: theme.palette.primary.dark,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Chip
                                    label={client.status === "active" ? "Active" : "Inactive"}
                                    size="small"
                                    sx={{
                                        backgroundColor:
                                            client.status === "active"
                                                ? theme.palette.success.light
                                                : theme.palette.grey[200],
                                        color:
                                            client.status === "active"
                                                ? theme.palette.success.dark
                                                : theme.palette.text.secondary,
                                    }}
                                />
                            </TableCell>
                            <TableCell 
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 0,
                                }}
                            >
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/clients/${client.id}`
                                        )
                                    }
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        minWidth: 30,
                                        borderRadius: "50%",
                                        padding: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: theme.palette.primary.dark,
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.primary.light,
                                        },
                                    }}
                                >
                                    <EyeIcon width={20} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    {clients.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={9} align="center">
                                No clients found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}