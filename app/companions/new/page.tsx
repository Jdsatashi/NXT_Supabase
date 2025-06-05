import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function NewCompanion() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const isAllowed = await newCompanionPermissions();

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {isAllowed ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="Companion Limit Reach"
            width={360}
            height={230}
          />
          <div className="cta-bagde">Upgrade your plan</div>
          <h1>{`You've reach your limit`}</h1>
          <p>{`Companion's number reached, upgrade your plan to unlock more.`}</p>
          <Link href="/subscription" className="btn-primary w-full justify-center">Upgrade my plan</Link>
        </article>
      )}
    </main>
  );
}

export default NewCompanion;
