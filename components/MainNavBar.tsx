"use client";

import Link from "next/link";

export default function MainNavBar() {

    return (
        <nav className="flex h-16 w-full items-center justify-center py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10">
            <ul className="list-none flex items-center justify-center gap-5">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/decks">All Decks</Link></li>
                <li><Link href="/decks/builder">Deck Builder</Link></li>
            </ul>
        </nav>
    );
}