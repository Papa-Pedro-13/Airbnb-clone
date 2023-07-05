"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("Logged in");
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back!" subtitle="Log in to your account!" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                errors={errors}
                register={register}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                errors={errors}
                register={register}
                required
            />
        </div>
    );

    const footerContent = (
        <div
            className="flex flex-col gap-4 mt-4 relative
        "
        >
            <hr />
            <label
                className="
                    absolute 
                    text-neutral-500 
                    top-[-10px] 
                    font-light 
                    text-sm 
                    bg-white 
                    px-2 
                    left-[50%] 
                    translate-x-[-50%]
            "
            >
                or
            </label>
            <Button
                outline
                onClick={() => {}}
                label={"Continue with GitHub"}
                disabled={isLoading}
                icon={AiFillGithub}
            />

            <Button
                outline
                onClick={() => {}}
                label={"Continue with Google"}
                disabled={isLoading}
                icon={FcGoogle}
            />
            <div
                className="
                text-neutral-500
                text-center
                mt-4
                font-light
            "
            >
                <div
                    className="flex items-center justify-center
                gap-2"
                >
                    <div>Already have an account?</div>
                    <div
                        className="
                            text-neutral-800 
                            cursor-pointer
                            hover:underline"
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title={"Login"}
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    );
};

export default LoginModal;
