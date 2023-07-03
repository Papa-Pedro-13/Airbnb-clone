"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
    onSubmit: () => void;
    onClose: () => void;
    secondaryAction?: () => void;
    footer?: React.ReactElement;
    body?: React.ReactElement;
    title?: string;
    actionLabel: string;
    secondaryLabel?: string;
    disabled?: boolean;
    isOpen?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryLabel,
    secondaryAction,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleOnClose = useCallback(() => {
        if (disabled) return;

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction();
    }, [disabled, secondaryAction]);
    return isOpen ? (
        <>
            <div
                className="
                flex
                justify-center
                items-center
                overflow-x-hidden
                inset-0
                fixed
                bg-neutral-800/70
                z-50
                outline-none
                "
            >
                <div
                    className="
                        w-full
                        relative
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/6
                        my-6
                    
                        h-full
                        lg:h-auto
                        md:h-auto
                    "
                >
                    <div
                        className={`
                            translate
                            duration-300
                            h-full
                            ${showModal ? "opacity-100" : "opacity-0"}
                            ${showModal ? "translate-y-0" : "translate-y-full"}
                        `}
                    >
                        <div
                            className="
                            translate
                            rounded-xl
                            bg-white
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0
                            shadow-lg
                            flex
                            flex-col
                            w-full
                            outline-none
                        "
                        >
                            <div
                                className="
                                flex
                                items-center
                                p-6
                                rounded-t
                                justify-center
                                relative
                                border-b-[1px]
                            "
                            >
                                <button
                                    className="
                                    p-1
                                    border-0
                                    outline-none
                                    rounded-full
                                    absolute
                                    left-6
                                    translate
                                    duration-300
                                    flex
                                    justify-center
                                    items-center
                                    hover:bg-neutral-200
                                    w-[32px]
                                    h-[32px]
                                "
                                    onClick={handleOnClose}
                                >
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/*Body*/}
                            <div className="p-6 relative">{body}</div>
                            {/*Footer*/}
                            <div className="p-6 gap-2 flex flex-col">
                                <div
                                    className="
                                    flex
                                    items-center
                                    gap-4
                                    w-full
                                "
                                >
                                    {secondaryAction && secondaryLabel && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}

                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        false
    );
};

export default Modal;
