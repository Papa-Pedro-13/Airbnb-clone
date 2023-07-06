"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    description?: string;
    selected: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon: Icon,
    description,
    selected,
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        };

        if (params?.get("category") === label) {
            delete updatedQuery.category;
        }
        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );
        router.push(url);
    }, [label, params, router]);
    return (
        <div
            onClick={handleClick}
            className={`
        flex
        flex-col
        items-center
        m-2
        py-2
        cursor-pointer
        gap-2
        transition
        hover:text-black
        border-b-2
        ${selected ? "text-black" : "text-neutral-500"}
        ${selected ? "border-black" : "border-transparent"}
    `}
        >
            <Icon size={26} />
            <div
                className="
            text-sm font-medium
            "
            >
                {label}
            </div>
        </div>
    );
};

export default CategoryBox;
