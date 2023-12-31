"use client";
import Container from "../Container";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "This property is close to the beach!",
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "This property has windmills!",
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "This property is modern",
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This property is in the countryside!",
    },
    {
        label: "Pool",
        icon: TbPool,
        description: "This property has a pool!",
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "This property is on island!",
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is close to lake!",
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "This property has skiing activity!",
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "This property is in a castle!",
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This property has camping activities!",
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "This property is in a arctic!",
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This property is in the cave!",
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This property is in the desert!",
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "This property is in the barn!",
    },
    {
        label: "Lux",
        icon: IoDiamond,
        description: "This property is luxurious!",
    },
];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";
    if (!isMainPage) return null;
    return (
        <Container>
            <div
                className="flex justify-between items-center
            pt-4
            overflow-x-auto"
            >
                {categories.map((el) => (
                    <CategoryBox
                        key={el.label}
                        label={el.label}
                        icon={el.icon}
                        selected={category === el.label}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
