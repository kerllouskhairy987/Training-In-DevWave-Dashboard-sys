'use client' // Error boundaries must be Client Components

import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='w-full h-screen '>
            <div className='flex flex-col justify-center items-center gap-10 w-full h-full'>
                <h2>Something went wrong!</h2>
                <div className='flex items-center gap-2'>
                    <Link href={"dashboard"} className={buttonVariants({ variant: "default", size: "lg" })}>Dashboard</Link>
                    <Button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className={`${buttonVariants({ variant: "outline", size: "lg" })} text-black` }
                    >
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    )
}