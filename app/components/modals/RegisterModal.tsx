"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((err) => {
                toast.error("Something went wrong!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to airbnb!" subtitle="Create an account!" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                errors={errors}
                register={register}
                required
            />
            <Input
                id="name"
                label="Name"
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
                onClick={() => signIn("github")}
                label={"Continue with GitHub"}
                disabled={isLoading}
                icon={AiFillGithub}
            />

            <Button
                outline
                onClick={() => signIn("google")}
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
            isOpen={registerModal.isOpen}
            title={"Register"}
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    );
};

export default RegisterModal;
