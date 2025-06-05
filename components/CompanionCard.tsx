"use client";

import {
  getAllCompanions,
  updateBookmark,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export interface Companion {
  id: number;
  subject: string;
  name: string;
  topic: string;
  duration: string;
  color: string;
  bookmarks: Array<object>;
}

function CompanionCard({
  subject,
  name,
  topic,
  duration,
  id,
  bookmarks,
}: Companion) {
  const [bookmarked, setBookmarked] = useState(false);
  const handleBookmarking = async () => {
    setBookmarked(!bookmarked);
    try {
      await updateBookmark(id);
    } catch (error) {
      console.log(error);
      setBookmarked(!bookmarked);
    } finally {
      await getAllCompanions({ subject, topic });
    }
  };

  return (
    <>
      <article
        className="companion-card"
        style={{ backgroundColor: getSubjectColor(subject) }}
      >
        <div className="flex justify-between items-center">
          <div className="subject-badge">{subject}</div>
          <button onClick={handleBookmarking} className="companion-bookmark">
            <Image
              src={
                bookmarked || bookmarks?.length > 0
                  ? "/icons/bookmark-filled.svg"
                  : "/icons/bookmark.svg"
              }
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
