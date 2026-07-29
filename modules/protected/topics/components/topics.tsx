"use client";
import React from "react";
import RoadmapHeader from "../features/roadmap.header";
import BookLibrary from "../features/book.library";

export function Topics() {
    return (
        <div className="mx-auto max-w-6xl space-y-5">
            <RoadmapHeader />
            <BookLibrary />
        </div>
    );
}

export default Topics;
