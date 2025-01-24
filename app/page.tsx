import CardSearch from "@/components/CardSearch";
import Link from "next/link";


export default function Home() {
    return (
        <div className="m-10 flex flex-col items-center min-h-screen">
            <h1>Main Page</h1>
            <p>Latest Decks Created Appear Here</p>
            <CardSearch />
        </div>
    );
}