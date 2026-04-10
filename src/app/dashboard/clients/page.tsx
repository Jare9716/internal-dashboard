"use client";

import { useMemo, useState } from "react";
import { Box, Grid, TextField, Button, Pagination } from "@mui/material";

import { Client } from "@/models/types/clients/clientsTable";
import { ClientsTable } from "@/components/features/clients/clientsTable/clientsTable";
import { ClientFormDialog } from "@/components/features/clients/clientFormDialog/clientFormDialog";
import { ClientFormValues } from "@/models/types/clients/clientFormDialog";
import { useClients } from "@/components/features/clients/clientsProvider/ClientsProvider";

const PAGE_SIZE = 15;

export default function ClientsPage() {
    const { clients, addClient, updateClient } = useClients();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const filtered = useMemo(() => {
        const target = search.toLowerCase().trim();
        if (!target) return clients;

        return clients.filter((client) =>
        (
            client.id +
            client.name +
            client.email +
            client.nit +
            client.phone +
            client.plan +
            client.segment +
            client.status
        )
            .toLowerCase()
            .includes(target)
        );
    }, [search, clients]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const openCreate = () => {
        setDialogMode("create");
        setSelectedClient(null);
        setIsDialogOpen(true);
    };

    const openEdit = (client: Client) => {
        setDialogMode("edit");
        setSelectedClient(client);
        setIsDialogOpen(true);
    };

    const handleSubmit = (values: ClientFormValues) => {
        if (dialogMode === "create") {
        addClient(values);
        } else if (dialogMode === "edit" && selectedClient) {
        updateClient(selectedClient.id, values);
        }
        setIsDialogOpen(false);
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            label="Search"
                            size="small"
                            placeholder="Type to filter client records..."
                            sx={{ flex: 1 }}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />

                        <Button
                            variant="contained"
                            size="small"
                            onClick={openCreate}
                            sx={{
                                px: 3,
                                py:0.5,
                                whiteSpace: "nowrap",
                            }}
                        >
                            Create client
                        </Button>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <ClientsTable clients={paginated} onEditClient={openEdit} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                        <Pagination
                            page={page}
                            count={totalPages}
                            onChange={(_, p) => setPage(p)}
                            color="primary"
                        />
                    </Box>
                </Grid>
            </Grid>

            <ClientFormDialog
                open={isDialogOpen}
                mode={dialogMode}
                initialClient={selectedClient}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}