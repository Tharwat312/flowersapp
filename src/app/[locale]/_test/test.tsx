'use client'
import { Button } from '@/components/ui/shadcn/button'
import React from 'react'

export default function Test() {
    const test = async () => {
        const response = await fetch(`/api/auth/signoutapi`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        const payload = await response.json();
        console.log(payload);
    }
    return (
        <Button className='mt-12' onClick={test}>Click Me</Button>
    )
}
