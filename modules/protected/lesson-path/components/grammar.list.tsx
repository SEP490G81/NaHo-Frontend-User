import React from "react";

interface GrammarGroup {
    num?: string;
    pattern: string;
    gloss?: string;
    examples: string[];
}

/** Gom mảng dòng grammar phẳng thành nhóm: mẫu ngữ pháp + các ví dụ (例) của nó. */
function parseGrammar(lines: string[]): GrammarGroup[] {
    const groups: GrammarGroup[] = [];
    for (const raw of lines) {
        const line = raw.trim();
        if (!line) continue;
        const isExample = /^[-•]/.test(line) || /^例[：:]/.test(line);
        const numMatch = !isExample && line.match(/^(\d+)\.\s*(.*)$/);
        if (numMatch) {
            let body = numMatch[2];
            let gloss: string | undefined;
            const g = body.match(/^([\s\S]*?)\s*(\([^)]*\))[.。]?\s*$/);
            if (g) {
                body = g[1];
                gloss = g[2];
            }
            groups.push({ num: numMatch[1], pattern: body, gloss, examples: [] });
        } else if (groups.length) {
            const ex = line.replace(/^[-•]\s*/, "").replace(/^例[：:]\s*/, "");
            groups[groups.length - 1].examples.push(ex);
        } else {
            groups.push({ pattern: line, examples: [] });
        }
    }
    return groups;
}

export function GrammarList({ grammar }: { grammar: string[] }) {
    const groups = parseGrammar(grammar);
    if (groups.length === 0) return null;

    return (
        <ul className="space-y-2.5">
            {groups.map((g, i) => (
                <li
                    key={i}
                    className="border-bdc-primary bg-bgc-page space-y-2 rounded-xl border p-3.5"
                >
                    <div className="flex items-start gap-2.5">
                        {g.num && (
                            <span className="bg-bgc-highlight/15 text-bgc-highlight mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-bold">
                                {g.num}
                            </span>
                        )}
                        <p className="font-noto-jp text-sm leading-relaxed">
                            <span className="text-text-contrast font-bold">
                                {g.pattern}
                            </span>
                            {g.gloss && (
                                <span className="text-text-muted font-normal">
                                    {" "}
                                    {g.gloss}
                                </span>
                            )}
                        </p>
                    </div>

                    {g.examples.map((ex, j) => (
                        <div
                            key={j}
                            className="border-bgc-highlight/30 ml-1 flex gap-2 border-l-2 pl-3"
                        >
                            <span className="text-bgc-highlight mt-0.5 shrink-0 text-[10px] font-bold">
                                例
                            </span>
                            <span className="font-noto-jp text-text-muted text-[13px] leading-relaxed">
                                {ex}
                            </span>
                        </div>
                    ))}
                </li>
            ))}
        </ul>
    );
}

export default GrammarList;
