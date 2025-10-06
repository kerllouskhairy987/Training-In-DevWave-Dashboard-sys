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
    selectors: TCategory[];
    setGetSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export function SelectCategory({ selectors, setGetSelectedCategory }: IProps) {
    const [selectedCategory, setSelectedCategory] = React.useState("");

    React.useEffect(() => {
        setGetSelectedCategory(selectedCategory)
    }, [selectedCategory])

    return (
        <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-[180px]" >
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>categories</SelectLabel>
                    {
                        selectors.map(select => (
                            <SelectItem value={select.name}>{select.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
