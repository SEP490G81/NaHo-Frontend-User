import { Link } from "@/i18n/navigation";
import { HELP_GUIDE_ICON } from "@/modules/protected/get-help/constants/help.constant";
import { HelpGuide } from "@/modules/protected/get-help/types/help.ui.type";
import { ArrowRight, Clock } from "lucide-react";

interface HelpGuideCardProps {
    guide: HelpGuide;
    stepLabel: (index: number) => string;
}

const HelpGuideCard = ({ guide, stepLabel }: HelpGuideCardProps) => {
    const Icon = HELP_GUIDE_ICON;

    return (
        <article
            id={`help-guide-${guide.id}`}
            className="border-bdc-primary bg-bgc-page flex h-full scroll-mt-5 flex-col rounded-xl border p-5"
        >
            <div className="flex items-start gap-3">
                <span className="bg-bgc-highlight/15 text-bgc-highlight flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                    <h3 className="text-text-contrast text-base font-semibold">
                        {guide.title}
                    </h3>
                    <p className="text-text-muted mt-1 text-sm leading-relaxed">
                        {guide.description}
                    </p>
                </div>
            </div>

            <p className="text-text-muted mt-4 flex items-center gap-1.5 text-xs">
                <Clock className="h-3.5 w-3.5" />
                {guide.duration}
            </p>

            <ol className="mt-4 flex flex-col gap-y-3">
                {guide.steps.map((step, index) => (
                    <li key={step} className="flex gap-x-3">
                        <span
                            aria-label={stepLabel(index + 1)}
                            className="bg-bgc-highlight/15 text-bgc-highlight flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums"
                        >
                            {index + 1}
                        </span>
                        <span className="text-text-contrast text-sm leading-relaxed">
                            {step}
                        </span>
                    </li>
                ))}
            </ol>

            {guide.action && (
                <Link
                    href={guide.action.href}
                    className="text-bgc-highlight mt-6 inline-flex items-center gap-x-1.5 self-start text-sm font-semibold hover:underline"
                >
                    {guide.action.label}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            )}
        </article>
    );
};

export default HelpGuideCard;
