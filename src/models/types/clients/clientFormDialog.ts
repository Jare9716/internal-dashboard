import { Client, ClientPlan, ClientSegment, ClientStatus } from "@/models/types/clients/clientsTable";

type Mode = "create" | "edit";

export interface ClientFormValues {
    name: string;
    email: string;
    nit: string;
    phone: string;
    segment: ClientSegment;
    plan: ClientPlan;
    status: ClientStatus;
}

export interface ClientFormDialogProps {
    open: boolean;
    mode: Mode;
    initialClient?: Client | null;
    onClose: () => void;
    onSubmit: (values: ClientFormValues) => void;
}

export const SEGMENTS: ClientSegment[] = [ "Individual", "Accounting", "SMB", "Retail", "Technology", "Enterprise", "Other" ];