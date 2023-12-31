"use client";

interface HeadingProps {
    center?: boolean;
    title: string;
    subtitle?: string;
}
const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
    return (
        <div
            className={`
                flex flex-col gap-3
                ${center ? "text-center" : "text-left"} 
               
            `}
        >
            <div
                className=" font-bold
                text-2xl "
            >
                {title}
            </div>
            <div
                className="
                font-light
                text-neutral-500
               
            "
            >
                {subtitle}
            </div>
        </div>
    );
};

export default Heading;
