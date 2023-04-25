"use client"

import React, { useState } from 'react'
import Button from './ui/Button'
import { signOut } from 'next-auth/react'
import { toast } from './ui/Toast'
import { useRouter } from 'next/navigation'
type SignOutButtonProps = {}

const SignOutButton = (props: SignOutButtonProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const signOutUser = async () => {
        setIsLoading(true);
        try {
            await signOut()
        } catch (error) {
            toast({
                title: 'Error signing out',
                message: 'Please try again later',
                type: 'error'
            })
        }
    }
    return (
        <Button onClick={signOutUser} isLoading={isLoading}>Sign out</Button>
    )
}

export default SignOutButton