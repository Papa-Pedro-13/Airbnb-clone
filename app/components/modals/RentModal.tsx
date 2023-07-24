"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";

import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        },
    });

    const category = watch("category");
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");
    const Map = useMemo(
        () =>
            dynamic(() => import("../Map"), {
                ssr: false,
            }),
        [location]
    );

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };
    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) return "Create";

        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) return undefined;

        return "Back";
    }, [step]);
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describe your place"
                subtitle="Pick a category"
            />
            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto 
            "
            >
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            label={item.label}
                            icon={item.icon}
                            onClick={(category) =>
                                setCustomValue("category", category)
                            }
                            selected={category === item.label}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place?" subtitle="Help guests" />
                <CountrySelect
                    value={location}
                    onChange={(value) => {
                        setCustomValue("location", value);
                    }}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8 ">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenties do you have?"
                />
                <Counter
                    onChange={(value: number) =>
                        setCustomValue("guestCount", value)
                    }
                    value={guestCount}
                    title="Guests"
                    subtitle="How many guests do you allow?"
                />
                <Counter
                    onChange={(value: number) =>
                        setCustomValue("roomCount", value)
                    }
                    value={roomCount}
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                />
                <Counter
                    onChange={(value: number) =>
                        setCustomValue("bathroomCount", value)
                    }
                    value={bathroomCount}
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                />
            </div>
        );
    }
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place look like"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => {
                        setCustomValue("imageSrc", value);
                    }}
                />
            </div>
        );
    }
    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={step == STEPS.PRICE ? rentModal.onClose : onNext}
            secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
            actionLabel={actionLabel}
            secondaryLabel={secondaryActionLabel}
            title="Airbnb your home!"
            body={bodyContent}
        />
    );
};

export default RentModal;
