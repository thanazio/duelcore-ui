import CardType from "@/types/CardType";
import Image from "next/image";


export default function DisplayCardData({ card }: { card: CardType}) {
    if (!card) {
        return <p>Select a card</p>
    }

    const {
        cardmarket_price,
        tcgplayer_price,
        ebay_price,
        amazon_price,
        coolstuffinc_price
    } = card.card_prices[0];

    return (
        <div className="p-2 flex flex-col justify-center items-center">
            <Image src={card.card_images[0].image_url_small} width={268} height={391} alt={card.name} />           
            <div>
                <p>{card?.attribute} {card.level} {card.scale}</p>
                <p>{card.type}</p>
                <p>{card.desc.split('\n').map((line, index) => (<span key={index}>{line}<br /></span>))}</p>
                <p>ATK: {card.atk} DEF: {card.def}</p>
            </div>
            <div>
                <h3>Prices (may be out of date)</h3>
                <p>Card Market Price: {cardmarket_price}</p>
                <p>TCG Player Price: {tcgplayer_price}</p>
                <p>Ebay Price: {ebay_price}</p>
                <p>Amazon Price: {amazon_price}</p>
                <p>Cool Stuff inc. Price: {coolstuffinc_price}</p>
            </div>
        </div>
    )
}