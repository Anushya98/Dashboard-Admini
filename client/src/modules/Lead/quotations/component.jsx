import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const SelectProduct = ({ field, dummyProducts }) => (

        <div className="flex flex-col gap-4 items-center">
            <label className="min-w-[10rem]">Select Product</label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="min-w-[10rem]">
                    <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                    {dummyProducts.map((product, index) => (
                        <SelectItem key={index} value={product.name}>
                            {product.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );





export const ToggleSwitch = ({ value, onChange }) => (
    <label className="toggle-switch">
        <input type="checkbox" checked={value} onChange={onChange} />
        <span className="slider round"></span>
    </label>
);

