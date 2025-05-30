import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface Companion {
  id: number;
  subject: string;
  name: string;
  topic: string;
  duration: string;
  color: string;
}

function CompanionCard({
  color,
  subject,
  name,
  topic,
  duration,
  id,
}: Companion) {
  return (
    <>
      <article className="companion-card" style={{ backgroundColor: color }}>
        <div className="flex justify-between items-center">
          <div className="subject-badge">{subject}</div>
          <button className="companion-bookmark">
            <Image
              src="/icons/bookmark.svg"
              alt="bookmark"
              width={12.5}
              height={15}
            />
          </button>
        </div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm">{topic}</p>
        <div className="flex items-center gap-2">
          <Image
            src="/icons/clock.svg"
            alt="duration"
            width={12}
            height={13.5}
          />
          <p className="text-sm">{duration}</p>
        </div>
        <Link href={`/companions/${id}`}>
          <button className="btn-primary w-full justify-center">
            Lauch Lesson
          </button>
        </Link>
      </article>
    </>
  );
}

export default CompanionCard;
