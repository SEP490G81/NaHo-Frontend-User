"use client";
import React from "react";
import RoadmapHeader from "../features/roadmap.header";
import BookLibrary from "../features/book.library";

export function Topics() {
    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-6xl space-y-8">
                <RoadmapHeader />
                <BookLibrary />
            </div>
        </div>
    );
}

export default Topics;
