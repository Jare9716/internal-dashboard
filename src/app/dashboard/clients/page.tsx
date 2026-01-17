"use client";

import { useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import {
    Box,
    Grid,
    TextField,
    Button,
    Pagination
} from "@mui/material";

import { Client } from "@/models/types/clients/clientsTable";
import { clientsData } from "@/components/features/clients/clientsTable/mockup";
import { ClientsTable } from "@/components/features/clients/clientsTable/clientsTable";
import { ClientFormDialog } from "@/components/features/clients/clientFormDialog/clientFormDialog";
import { ClientFormValues } from "@/models/types/clients/clientFormDialog";

const PAGE_SIZE = 15;

export default function Clients() {
    const theme = useTheme();
    const [clients, setClients] = useState<Client[]>(clientsData);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    // Table filter
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

    // Pagination
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    const paginated = filtered.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );

    // Add new client
    const openCreate = () => {
        setDialogMode("create");
        setSelectedClient(null);
        setIsDialogOpen(true);
    };

    // Edit an existent client
    const openEdit = (client: Client) => {
        setDialogMode("edit");
        setSelectedClient(client);
        setIsDialogOpen(true);
    };

    // Save changes
    const handleSubmit = (values: ClientFormValues) => {
        if (dialogMode === "create") {
        const newClient: Client = {
            id: `CL-${String(clients.length + 1).padStart(3, "0")}`,
            createdAt: new Date().toISOString().slice(0, 10),
            ...values,
        };
        setClients((prev) => [newClient, ...prev]);
        } else if (dialogMode === "edit" && selectedClient) {
        setClients((prev) =>
            prev.map((c) =>
            c.id === selectedClient.id ? { ...c, ...values } : c
            )
        );
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
                            justifyContent: "space-between",
                        }}
                    >
                        <TextField
                            label="Search"
                            size="small"
                            placeholder="Type to filter client records..."
                            sx={{ maxWidth: 500 }}
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
                                minWidth: 40,
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <UserPlusIcon width={22} height={22}/>
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