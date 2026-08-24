"use client";

import { useContext } from "react";
import { PersonaSetupContext } from "../providers/persona.setup.provider";
import { PersonaSetupContextType } from "../types/persona.setup.type";

export function usePersonaSetup(): PersonaSetupContextType {
    const context = useContext(PersonaSetupContext);
    if (!context) {
        throw new Error(
            "usePersonaSetup must be used within a PersonaSetupProvider",
        );
    }
    return context;
}
