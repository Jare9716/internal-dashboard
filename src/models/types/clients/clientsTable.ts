export type ClientStatus = "active" | "inactive";
export type ClientPlan = "Basic" | "Pro" | "Enterprise";
export type ClientSegment = "Individual" | "SMB" | "Enterprise" | "Retail" | "Accounting" | "Technology" | "Other";

// Individual -> Independent users or freelancers
// SMB -> Small and medium-sized businesses
// Enterprise -> Large companies with complex operations
// Retail -> Businesses that sell products directly to customers
// Accounting -> Firms or professionals focused on financial and tax services
// Technology -> Tech companies or startups using digital or automated workflows
// Other -> Clients that don’t fit into the main categories.

export interface Client {
    id: string;
    name: string;
    email: string;
    nit: string;
    phone: string;
    status: ClientStatus;
    segment: ClientSegment;
    plan: ClientPlan;
    createdAt: string;
}

export interface ClientsTableProps {
    clients: Client[];
    onEditClient: (client: Client) => void;
}