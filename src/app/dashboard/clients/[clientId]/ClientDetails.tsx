"use client";

import { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Stack,
    Chip,
    Button,
    Avatar,
    Divider,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { ClientFormDialog } from "@/components/features/clients/clientFormDialog/clientFormDialog";
import { ClientFormValues } from "@/models/types/clients/clientFormDialog";
import { useClients } from "@/components/features/clients/clientsProvider/ClientsProvider";
import ClientUsageChart from "@/components/features/dashboard/usage/clientUsageChart";

export default function ClientDetails({ clientId }: { clientId: string }) {
    const router = useRouter();
    const { getClientById, updateClient } = useClients();

    const client = useMemo(() => getClientById(clientId), [getClientById, clientId]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (!client) {
        return <Box p={4}>Client not found</Box>;
    }

    const handleSubmit = (values: ClientFormValues) => {
        updateClient(client.id, values);
        setIsDialogOpen(false);
    };

    return (
        <Box p={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 56, height: 56 }}>
                        {client.name?.charAt(0)}
                    </Avatar>

                    <Box>
                        <Typography variant="h5" fontWeight={600}>
                            {client.name}
                        </Typography>

                        <Stack direction="row" spacing={1} mt={0.5}>
                            <Chip label={client.plan} size="small" color="primary" />
                            <Chip
                                label={client.status === "active" ? "Active" : "Inactive"}
                                size="small"
                                color={client.status === "active" ? "success" : "default"}
                            />
                        </Stack>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={() => router.push("/dashboard/clients")}>
                        Back
                    </Button>

                    <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
                        Edit
                    </Button>
                </Stack>
            </Stack>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" mb={2}>
                    Information
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1}>
                    <Typography>Email: {client.email}</Typography>
                    <Typography>NIT: {client.nit}</Typography>
                    <Typography>Phone: {client.phone}</Typography>
                    <Typography>Segment: {client.segment}</Typography>
                    <Typography>Plan: {client.plan}</Typography>
                    <Typography>Status: {client.status}</Typography>
                </Stack>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" mb={2}>
                    Usage
                </Typography>

                <ClientUsageChart clientId={client.id} />
            </Paper>

            <ClientFormDialog
                open={isDialogOpen}
                mode="edit"
                initialClient={client}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleSubmit}
            />
        </Box>
        
    );
}