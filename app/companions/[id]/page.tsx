import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface param {
  params: {
    id: string;
  };
}

async function ConpanionSession({ params }: param) {
  const { id } = await params;

  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const companion = await getCompanion(id);

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(companion.subject) }}
          >
            <Image
              src={`/icons/${companion.subject}.svg`}
              alt={companion.subject}
              width={35}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{companion.name}</p>
              <div className="subject-badge max-sm:hidden">
                {companion.subject}
              </div>
            </div>
            <p className="text-lg">{companion.topic}</p>
          </div>
        </div>
        <div className="items-end text-2xl max-md:hidden">
          {companion.duration} minutes
        </div>
      </article>
      <CompanionComponent
        companion={companion}
        username={user.firstName!}
        userImg={user.imageUrl!}
      />
    </main>
  );
}

export default ConpanionSession;
