"use client";

interface ItemMenu {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<ItemMenu> = ({ onClick, label }) => {
    return (
        <div
            onClick={onClick}
            className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
        select-none	
    "
        >
            {label}
        </div>
    );
};

export default MenuItem;
