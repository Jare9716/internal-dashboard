"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";

import { Client } from "@/models/types/clients/clientsTable";
import { ClientFormValues } from "@/models/types/clients/clientFormDialog";
import { clientsData } from "@/components/features/clients/clientsTable/mockup";

type State = {
    clients: Client[];
};

type Action =
    | { type: "ADD_CLIENT"; payload: Client }
    | { type: "UPDATE_CLIENT"; payload: { id: string; values: ClientFormValues } };

function clientsReducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_CLIENT":
        return { clients: [action.payload, ...state.clients] };

        case "UPDATE_CLIENT":
        return {
            clients: state.clients.map((c) =>
            c.id === action.payload.id ? { ...c, ...action.payload.values } : c
            ),
        };

        default:
        return state;
    }
}

type ClientsContextValue = {
    clients: Client[];
    addClient: (values: ClientFormValues) => void;
    updateClient: (id: string, values: ClientFormValues) => void;
    getClientById: (id: string) => Client | null;
};

const ClientsContext = createContext<ClientsContextValue | null>(null);

export function ClientsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(clientsReducer, { clients: clientsData });

    const value = useMemo<ClientsContextValue>(() => {
        return {
        clients: state.clients,

        addClient: (values) => {
            const newClient: Client = {
            id: `CL-${String(state.clients.length + 1).padStart(3, "0")}`,
            createdAt: new Date().toISOString().slice(0, 10),
            ...values,
            };
            dispatch({ type: "ADD_CLIENT", payload: newClient });
        },

        updateClient: (id, values) => {
            dispatch({ type: "UPDATE_CLIENT", payload: { id, values } });
        },

        getClientById: (id) => state.clients.find((c) => c.id === id) ?? null,
        };
    }, [state.clients]);

    return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>;
}

export function useClients() {
    const ctx = useContext(ClientsContext);
    if (!ctx) throw new Error("useClients must be used within ClientsProvider");
    return ctx;
}