import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import { recentSessions } from "@/constants";
import Cta from "@/components/CTA";

const Page = () => {
  const companions = [
    {
      id: 1,
      subject: "Science",
      name: "Neura the Brainy Explorer",
      topic: "Neural Network of the Brain",
      duration: "45 mins duration",
      color: "#ffda6e",
    },
    {
      id: 2,
      subject: "Business",
      name: "The Growth Expert",
      topic: "Scalling your Business Successfully",
      duration: "20 mins duration",
      color: "#06da6e", // e5d0ff
    },
    {
      id: 3,
      subject: "Language",
      name: "Verba the Vocabulary Builder",
      topic: "English Literature",
      duration: "30 mins duration",
      color: "##BDE7FF",
    },
  ];
  return (
    <main>
      <h1 className="text-2xl underline">Popular companion</h1>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard key={companion.id} {...companion} />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
