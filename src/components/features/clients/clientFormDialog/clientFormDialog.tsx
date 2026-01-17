"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid,
} from "@mui/material";

import { ClientFormValues, ClientFormDialogProps, SEGMENTS } from "@/models/types/clients/clientFormDialog"
import { ClientPlan, ClientStatus } from "@/models/types/clients/clientsTable";


// Constants
const PLANS: ClientPlan[] = ["Basic", "Pro", "Enterprise"];
const STATUSES: ClientStatus[] = ["active", "inactive"];

export function ClientFormDialog({
    open,
    mode,
    initialClient,
    onClose,
    onSubmit,
}: ClientFormDialogProps) {
    const [form, setForm] = useState<ClientFormValues>({
        name: "",
        email: "",
        nit: "",
        phone: "",
        segment: "SMB",
        plan: "Basic",
        status: "active",
    });

    useEffect(() => {
        if (mode === "edit" && initialClient) {
        setForm({
            name: initialClient.name,
            email: initialClient.email,
            nit: initialClient.nit,
            phone: initialClient.phone,
            segment: initialClient.segment,
            plan: initialClient.plan,
            status: initialClient.status,
        });
        } else {
        setForm({
            name: "",
            email: "",
            nit: "",
            phone: "",
            segment: "SMB",
            plan: "Basic",
            status: "active",
        });
        }
    }, [mode, initialClient, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {mode === "create" ? "New Client" : "Edit Client"}
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                        <TextField
                            fullWidth
                            size="small"
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                type="email"
                                label="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label="NIT"
                                name="nit"
                                value={form.nit}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label="Phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Segment"
                                name="segment"
                                value={form.segment}
                                onChange={handleChange}
                            >
                                {SEGMENTS.map((s) => (
                                    <MenuItem key={s} value={s}>
                                        {s}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Plan"
                                name="plan"
                                value={form.plan}
                                onChange={handleChange}
                            >
                                {PLANS.map((p) => (
                                    <MenuItem key={p} value={p}>
                                        {p}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                {STATUSES.map((s) => (
                                    <MenuItem key={s} value={s}>
                                        {s === "active" ? "Active" : "Inactive"}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="outlined" size="small">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" size="small">
                        {mode === "create" ? "Create" : "Save changes"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}