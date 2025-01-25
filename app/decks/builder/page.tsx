import CardSearch from "@/components/CardSearch";
import Link from "next/link";

export default function Builder() {
    return (
        <>
            <Link href="/">Go Home</Link>
            <CardSearch />
        </>
    );
}