import { HelpTroubleshootingItem } from "@/modules/protected/get-help/types/help.ui.type";
import { AlertCircle } from "lucide-react";

interface HelpTroubleshootingCardProps {
    item: HelpTroubleshootingItem;
    symptomLabel: string;
}

const HelpTroubleshootingCard = ({
    item,
    symptomLabel,
}: HelpTroubleshootingCardProps) => (
    <article
        id={`help-troubleshooting-${item.id}`}
        className="border-bdc-primary bg-bgc-page flex h-full scroll-mt-5 flex-col rounded-xl border p-5"
    >
        <h3 className="text-text-contrast flex items-start gap-x-2 text-base font-semibold">
            <AlertCircle className="text-bgc-highlight mt-0.5 h-5 w-5 shrink-0" />
            {item.title}
        </h3>

        <p className="border-bdc-primary bg-bgc-app text-text-muted mt-4 rounded-lg border px-4 py-3 text-sm leading-relaxed">
            <span className="text-text-contrast font-semibold">
                {symptomLabel}:{" "}
            </span>
            {item.symptom}
        </p>

        <ol className="mt-4 flex flex-col gap-y-3">
            {item.steps.map((step, index) => (
                <li key={step} className="flex gap-x-3">
                    <span className="bg-bgc-highlight/15 text-bgc-highlight flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums">
                        {index + 1}
                    </span>
                    <span className="text-text-contrast text-sm leading-relaxed">
                        {step}
                    </span>
                </li>
            ))}
        </ol>
    </article>
);

export default HelpTroubleshootingCard;
