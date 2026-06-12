"use client";
import React from "react";
import RecordButton from "../../sandbox/features/record.button";
import NotesPanel from "../../sandbox/components/notes.panel";
import CustomQuestionCard from "./custom.question.card";

interface SandboxStep2Props {
  questionJp: string;
  hintVi?: string;
  showFurigana: boolean;
  recording: boolean;
  elapsed: number;
  toggleRecord: () => void;
}

export function SandboxStep2({
  questionJp,
  hintVi,
  showFurigana,
  recording,
  elapsed,
  toggleRecord,
}: SandboxStep2Props) {
  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_340px] animate-fade-in">
      <div className="space-y-5">
        <CustomQuestionCard
          jp={questionJp}
          vi={hintVi}
          showFurigana={showFurigana}
        />
        <div className="flex flex-col items-center justify-center rounded-2xl border border-bdc-primary bg-bgc-app p-6">
          <RecordButton recording={recording} elapsed={elapsed} onToggle={toggleRecord} />
        </div>
      </div>
      <aside>
        <NotesPanel />
      </aside>
    </section>
  );
}

export default SandboxStep2;
