"use client";

import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

import useBoolean from "@/hooks/useBoolean";
import useDebounce from "@/hooks/useDebounce";
import CardType from "@/types/CardType";

import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";

const acrobaticMagician = {
    "id": 33656832,
    "name": "Acrobatic Magician",
    "typeline": [
        "Spellcaster",
        "Pendulum",
        "Effect"
    ],
    "type": "Pendulum Effect Monster",
    "humanReadableCardType": "Pendulum Effect Monster",
    "frameType": "effect_pendulum",
    "desc": "[ Pendulum Effect ] \nWhen a monster(s) you control is destroyed by a card effect (except during the Damage Step): You can Special Summon this card from your Pendulum Zone. You can only use this effect of \"Acrobatic Magician\" once per turn.\n\n[ Monster Effect ] \nIf the activation of a Spell/Trap Card is negated (except during the Damage Step): You can Special Summon this card from your hand. When this card is destroyed by battle: You can place this card in your Pendulum Zone.",
    "race": "Spellcaster",
    "pend_desc": "When a monster(s) you control is destroyed by a card effect (except during the Damage Step): You can Special Summon this card from your Pendulum Zone. You can only use this effect of \"Acrobatic Magician\" once per turn.",
    "monster_desc": "If the activation of a Spell/Trap Card is negated (except during the Damage Step): You can Special Summon this card from your hand. When this card is destroyed by battle: You can place this card in your Pendulum Zone.",
    "atk": 800,
    "def": 2300,
    "level": 5,
    "attribute": "DARK",
    "archetype": "Magician",
    "scale": 2,
    "ygoprodeck_url": "https://ygoprodeck.com/card/acrobatic-magician-2854",
    "card_sets": [
        {
            "set_name": "The Dark Illusion",
            "set_code": "TDIL-EN009",
            "set_rarity": "Rare",
            "set_rarity_code": "(R)",
            "set_price": "0"
        }
    ],
    "card_images": [
        {
            "id": 33656832,
            "image_url": "https://images.ygoprodeck.com/images/cards/33656832.jpg",
            "image_url_small": "https://images.ygoprodeck.com/images/cards_small/33656832.jpg",
            "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/33656832.jpg"
        }
    ],
    "card_prices": [
        {
            "cardmarket_price": "0.10",
            "tcgplayer_price": "0.25",
            "ebay_price": "1.25",
            "amazon_price": "0.25",
            "coolstuffinc_price": "0.25"
        }
    ]
};


export default function CardSearch() {
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebounce(searchValue);
    const [searchResults, setSearchResults] = useState<CardType[]>([acrobaticMagician]);
    const [displayedCardsOffset, setDisplayedCardsOffset] = useState<number>(0);
    const {
        bool: isLoading,
        boolToTrue,
        boolToFalse
    } = useBoolean(true);
    const {
        bool: hoveredCardFlag,
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

    const displayPopup = (card: CardType) => {

    };

    return (
        <div className="flex flex-col items-center">
            <input type="text" className="text-black" value={searchValue} onChange={handleSearchValue} placeholder="Search for a card" />
            <div className="flex items-center flex-col border-cyan-300 border-2 w-[500px] max-h-96 bg-slate-900 overflow-x-auto overflow-y-scroll">
                {searchResults?.length === 0 && <h1>No Cards Found</h1>}
                <div className="grid grid-cols-5 gap-1 z-1">
                    {searchResults?.length > 0 && searchResults.map((card) =>
                        <div key={card.id}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div key={card.id}>
                                        <Image src={card.card_images[0].image_url_small} width={268} height={392} alt={card.name} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="Tooltip">
                                    <div>
                                        {card.desc}
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </div>
            {searchResults.length > 0 && <h3>You have {searchResults.length} results</h3>}
        </div>
    );
}