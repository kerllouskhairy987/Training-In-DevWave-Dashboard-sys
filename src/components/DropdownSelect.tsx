"use client";

import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TCategory } from "@/app/categories/_types"

type IProps = {
    selectors: TCategory[] | { name: string }[];
    placeholder?: string;
    title?: string;
    setSelector: React.Dispatch<React.SetStateAction<string>>;
}

export function DropdownSelect({ selectors, placeholder = "Select a category", title = "categories", setSelector }: IProps) {
    const [selectedItem, setSelectedItem] = React.useState("");

    React.useEffect(() => {
        setSelector(selectedItem)
    }, [selectedItem])

    return (
        <Select onValueChange={(value) => setSelectedItem(value)}>
            <SelectTrigger className="w-[180px]" >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{title}</SelectLabel>
                    {
                        selectors.map((select, idx) => (
                            <SelectItem key={idx} value={select.name}>{select.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
