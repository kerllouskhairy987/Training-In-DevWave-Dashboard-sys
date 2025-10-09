"use client";

import { ChevronDown, CircleUser } from "lucide-react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

function NavbarDropdown() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className=" profile flex items-center gap-2 cursor-pointer">
                    <div className="font-medium sm:text-sm text-[12px] text-[var(--topbartext)] text-right">
                        <p className="">john doe</p>
                        <p className="text-gray-600">Admin</p>
                    </div>
                    <CircleUser size={30} className="text-[var(--topbartext)]" />
                    <ChevronDown size={20} className="text-[var(--topbartext)]" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>
                    <Link href={"/auth/register"} className="w-full ">
                        <Button variant={"outline"} size={"lg"} className="w-full">Register</Button>
                    </Link>
                </DropdownMenuCheckboxItem>


                <DropdownMenuCheckboxItem>
                    <Link href={"/auth/login"} className="w-full ">
                        <Button variant={"outline"} size={"lg"} className="w-full">Login</Button>
                    </Link>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NavbarDropdown