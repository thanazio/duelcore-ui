"use client";

import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

import useBoolean from "@/hooks/useBoolean";
import useDebounce from "@/hooks/useDebounce";
import { CardType } from "@/types/CardType";


export default function CardSearch() {
    const [searchValue, setSearchValue] = useState('');
    const [hoveredCard, setHoveredCard] = useState<CardType | null>(null);
    const debouncedSearchValue = useDebounce(searchValue);
    const [searchResults, setSearchResults] = useState<CardType[]>([]);
    const {
        bool: isLoading,
        boolToTrue,
        boolToFalse
    } = useBoolean(true);
    const {
        bool: hoveredCardFlag,
        boolToFalse: hideHoveredCard,
        boolToTrue: showHoveredCard
    } = useBoolean(true);


    useEffect(() => {
        async function fetchCards() {
            const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${debouncedSearchValue}`)
            const data = (await res.json()).data;
            console.log(data);
            setSearchResults(data);
            boolToFalse();
        }

        if (isLoading && searchValue.length >= 3) {
            fetchCards();
        }
    }, [debouncedSearchValue]);

    const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
        if (searchValue.length > 3) {
            boolToTrue();
        }
    };

    const handleShowCardData = (card: CardType) => {
        showHoveredCard();
        setHoveredCard(card);
    };

    const handleHideCardData = () => {
        hideHoveredCard();
        setHoveredCard(null);
    }

    return (
        <div className="grid grid-cols-3 gap-2 h-screen">
            <div className="flex items-center flex-col bg-red-400">
                <input type="text" className="text-black" value={searchValue} onChange={handleSearchValue} placeholder="Search for a card" />
                {isLoading && <h1>Now Loading</h1>}
                <div className="grid grid-cols-5 gap-1 overflow-x-hidden overflow-y-auto">
                    {!isLoading && searchResults.map((card) =>
                        <div
                            key={card.id}
                            className="border-slate-400 border-2"
                            onMouseEnter={() => handleShowCardData(card)}
                            onMouseLeave={() => handleHideCardData()}
                        >
                            <Image src={card.card_images[0].image_url_small} width={268} height={392} alt={card.name} />
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-5 w-full gap-2 overflow-x-hidden overflow-y-auto bg-blue-400">
                <h1>MY DECK</h1>
            </div>
        </div>
    );
}