import { ClientsProvider } from "@/components/features/clients/clientsProvider/ClientsProvider";

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
    return <ClientsProvider>{children}</ClientsProvider>;
}