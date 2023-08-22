"use client";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SaveUser } from "../types/Index";
interface HeartButtonProps {
    listingId: string;
    currentUser?: SaveUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser,
}) => {
    const hasFavorited = false;
    const toggleFavorited = () => {};
    return (
        <div
            onClick={toggleFavorited}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={28}
                className="fill-white
            absolute
            -top-[2px]
            -right-[2px]
            "
            />
            <AiFillHeart
                size={24}
                className={
                    hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"
                }
            />
        </div>
    );
};

export default HeartButton;
