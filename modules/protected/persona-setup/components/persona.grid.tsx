"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PersonaGridProps } from "../types/persona.setup.type";
import PersonaCard from "./persona.card";

const PersonaGrid = ({
    personas = [],
    selectedPersonaId,
    onSelectPersona,
}: PersonaGridProps) => {
    const t = useTranslations("dialogueSetup");

    if (personas.length === 0) {
        return (
            <div className="border-bdc-primary bg-bgc-app flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
                <p className="text-text-muted text-sm italic">
                    {t("companionUnavailable")}
                </p>
            </div>
        );
    }

    return (
        <div className="custom-scrollbar max-h-127.5 overflow-y-auto py-0.5 pr-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {personas.map((persona) => {
                    const isSelected = persona.id === selectedPersonaId;
                    return (
                        <PersonaCard
                            key={persona.id}
                            persona={persona}
                            isSelected={isSelected}
                            onSelect={onSelectPersona}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PersonaGrid;
