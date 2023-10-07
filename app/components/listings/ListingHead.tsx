"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types/Index";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    id: string;
    imageSrc: string;
    currentUser: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    id,
    imageSrc,
    currentUser,
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);
    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div
                className="
                w-full
                h-[60vh]
                overflow-hidden
                rounded-xl
                relative
                "
            >
                <Image
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div
                    className="
                absolute top-5 right-5
            "
                >
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
};

export default ListingHead;
