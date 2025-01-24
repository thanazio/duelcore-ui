import CardType from "@/types/CardType";
import Image from "next/image";

import monsterLevel from '@/public/level.webp';


export default function DisplayCardData({ card }: { card: CardType }) {
    const {
        cardmarket_price,
        tcgplayer_price,
        ebay_price,
        amazon_price,
        coolstuffinc_price
    } = card.card_prices[0];

    return (
        <div className="bg-cyan-900 text-xs w-[550px] h-auto flex items-center justify-start p-2 gap-2">
            <div>
                <div className="bg-red-600 w-[134px] h-[196px]">
                    <Image src={card.card_images[0].image_url_small} width={268} height={391} alt={card.name} />
                </div>
            </div>
            <div>
                <div>
                    <div className="flex justify-between">
                        <span>{card.name}</span>
                        <div className="flex justify-end gap-2">
                            <span>
                                <Image
                                    src={`https://images.ygoprodeck.com/images/cards/${card?.attribute}.jpg`}
                                    width={20}
                                    height={20}
                                    alt={card?.attribute}
                                    className="inline"
                                />
                                {card?.attribute}
                            </span>
                            <span>
                            <Image
                                    src={monsterLevel}
                                    width={20}
                                    height={20}
                                    alt={card?.level.toString()}
                                    className="inline"
                                />
                            
                                {card.level}
                            </span>
                        </div>
                    </div>
                    <p>{card.desc.split('\n').map((line, index) => (<span key={index}>{line}<br /></span>))}</p>
                    <p className="pt-2">ATK: {card.atk} DEF: {card.def}</p>
                </div>
                <div className="pt-2">
                    <h3 className="underline">Prices</h3>
                    <p>Card Market Price: {cardmarket_price} &#8364;</p>
                    <p>TCG Player Price: &#x24; {tcgplayer_price}</p>
                    <p>Ebay Price: &#x24; {ebay_price}</p>
                    <p>Amazon Price: &#x24; {amazon_price}</p>
                    <p>Cool Stuff inc. Price: &#x24; {coolstuffinc_price}</p>
                </div>
            </div>

        </div>
    )
}