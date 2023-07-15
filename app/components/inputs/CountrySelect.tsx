"use client";

import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
    flag: string;
    label: string;
    region: string;
    value: string;
    latlng: number[];
};

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
    const { getAll } = useCountries();

    return (
        <div>
            <Select
                placeholder="AnyWhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                            {option.label},
                            <span className="text-neutral-500 ml-1">
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default CountrySelect;
