"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SaveUser } from "@/app/types/Index";

interface NavbarProps {
    currentUser?: SaveUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    console.log(currentUser);
    return (
        <div className="fixed w-full z-10 shadow-sm bg-white">
            <div className="py-4 borber-b-[1px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
