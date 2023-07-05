"use client";

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenuState = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <div className="flex items-center gap-3">
                <div
                    onClick={() => {}}
                    className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    
                 "
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleMenuState}
                    className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                
                "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    overflow-hidden
                    right-0
                    top-20
                    sm:top-12
                    text-sm
                    cursor-pointer
                    bg-white
                "
                >
                    {currentUser ? (
                        <>
                            <MenuItem onClick={() => {}} label="My trips" />
                            <MenuItem
                                onClick={() => {}}
                                label="My favourites"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="My reservations"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="My properties"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="Airbnb my home"
                            />
                            <hr />
                            <MenuItem
                                onClick={() => signOut()}
                                label="Logout"
                            />
                        </>
                    ) : (
                        <>
                            <MenuItem
                                onClick={loginModal.onOpen}
                                label="Log in"
                            />
                            <MenuItem
                                onClick={registerModal.onOpen}
                                label="Sign up"
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserMenu;
