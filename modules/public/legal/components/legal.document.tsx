import { Link } from "@/i18n/navigation";
import LegalLanguageSelect from "@/modules/public/legal/components/legal.language.select";
import LegalTableOfContents from "@/modules/public/legal/components/legal.table.of.contents";
import {
    LegalBlock,
    LegalDocument,
    LegalDocumentKey,
} from "@/modules/public/legal/types/legal.ui.type";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useMessages, useTranslations } from "next-intl";

const LEGAL_TOP_ID = "legal-top";

const BlockContent = ({ block }: { block: LegalBlock }) => (
    <>
        {block.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[17px] leading-8">
                {paragraph}
            </p>
        ))}
        {block.items && (
            <ul className="mt-4 flex list-disc flex-col gap-y-2.5 pl-6 text-[17px] leading-8 marker:text-[var(--color-text-highlight)]">
                {block.items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        )}
    </>
);

const LegalDocumentView = ({
    documentKey,
}: {
    documentKey: LegalDocumentKey;
}) => {
    const t = useTranslations();
    // đọc qua useMessages vì t() chỉ trả về chuỗi, ở đây cần cả object tài liệu
    const document = useMessages().legal[
        documentKey
    ] as unknown as LegalDocument;

    const otherKey: LegalDocumentKey =
        documentKey === "terms" ? "privacy" : "terms";

    return (
        <article
            id={LEGAL_TOP_ID}
            className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16"
        >
            <header className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl">
                    {document.title}
                </h1>
                <p className="text-text-muted mx-auto mt-6 max-w-xl text-[17px] leading-8">
                    {document.summary}
                </p>
            </header>

            <div className="border-bdc-primary mt-12 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                <p className="font-semibold">
                    {t("legal.meta.effective", {
                        date: t("legal.meta.effectiveDate"),
                    })}
                </p>
                <LegalLanguageSelect />
            </div>

            <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-[248px_minmax(0,1fr)]">
                <LegalTableOfContents
                    title={t("legal.meta.tableOfContents")}
                    items={document.sections.map((section) => ({
                        id: section.id,
                        heading: section.heading,
                    }))}
                />

                <div className="min-w-0">
                    {document.intro.map((paragraph) => (
                        <p
                            key={paragraph}
                            className="mb-5 text-[17px] leading-8"
                        >
                            {paragraph}
                        </p>
                    ))}

                    <div className="mt-10 flex flex-col gap-y-12">
                        {document.sections.map((section, index) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-6"
                            >
                                <h2 className="text-2xl leading-snug font-bold md:text-3xl">
                                    {index + 1}. {section.heading}
                                </h2>
                                <BlockContent block={section} />

                                {section.subsections?.map((subsection) => (
                                    <div
                                        key={subsection.heading}
                                        className="mt-6"
                                    >
                                        <h3 className="text-xl font-semibold">
                                            {subsection.heading}
                                        </h3>
                                        <BlockContent block={subsection} />
                                    </div>
                                ))}
                            </section>
                        ))}
                    </div>

                    <section className="border-bdc-primary bg-bgc-app/60 mt-14 rounded-xl border px-6 py-6">
                        <h2 className="text-xl font-semibold">
                            {document.contact.heading}
                        </h2>
                        {document.contact.paragraphs.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="text-text-muted mt-3 text-[17px] leading-8"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </section>

                    <div className="border-bdc-primary mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
                        <Link
                            href={otherKey === "terms" ? "/terms" : "/privacy"}
                            className="text-text-highlight text-[17px] hover:underline"
                        >
                            {t(`legal.meta.${otherKey}Link`)}
                        </Link>
                        <a
                            href={`#${LEGAL_TOP_ID}`}
                            className="text-text-muted hover:text-text-highlight flex items-center gap-x-1 text-[17px] transition-colors"
                        >
                            <ArrowUpwardIcon fontSize="small" />
                            {t("legal.meta.backToTop")}
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default LegalDocumentView;
