import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import { SubjectFilter } from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import React from "react";

async function CompanionLibrary({ searchParams }: SearchParams) {
  const params = await searchParams;

  const subject = params?.subject || "";
  const topic = params?.topic || "";

  const companions = await getAllCompanions({ subject, topic });

  console.log(companions);

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  );
}

export default CompanionLibrary;
