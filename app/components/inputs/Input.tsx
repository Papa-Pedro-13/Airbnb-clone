import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    type?: string;
    disabled?: boolean;
    label: string;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    formatPrice,
    disabled,
    required,
    register,
    errors,
}) => {
    return (
        <div className="relative w-full">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="
                        text-neutral-700
                        absolute
                        top-5
                        left-2
                    "
                />
            )}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={type}
                className={`
                    peer
                    w-full
                    border-2
                    outline-none
                    pt-6
                    rounded-md
                    p-4
                    font-light
                    bg-white
                    transition
                    disabled:opacity-70
                    ${formatPrice ? "pl-9" : "pl-4"}
                    ${errors[id] ? "border-rose-500" : "border-neutral-300"}
                    ${
                        errors[id]
                            ? "focus:border-rose-500"
                            : "focus:border-black"
                    }

                `}
            />
            <label
                className={`
                absolute
                text-md
                duration-150
                transform
                -translate-y-3
                top-5
                z-10
                origin-[0]
                ${formatPrice ? "left-9" : "left-4"}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${errors[id] ? "text-rose-500" : "text-zinc-400"}
                `}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
