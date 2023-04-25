"use client"
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu'
import Button from './ui/Button'
import { Loader2 } from 'lucide-react'
import { toast } from './ui/Toast'
import { useRouter } from 'next/navigation'
import { createApiKey } from '@/helpers/create-api-key'
import { revokeApiKey } from '@/helpers/revoke-api-key'
type Props = {
    apiKeyId: string
    key: string
}

const ApiKeyOptions = ({ apiKeyId, key }: Props) => {
    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
    const [isRevoking, setIsRevoking] = useState<boolean>(false)
    const router = useRouter()
    const createNewApiKey = async () => {
        setIsCreatingNew(true)
        try {
            await revokeApiKey({ keyId: apiKeyId })
            await createApiKey()
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error creating api key',
                message: 'Please try again later',
                type: 'error'
            })
        } finally {
            setIsCreatingNew(false)
        }
    }
    const revokeCurrentApiKey = async () => {
        setIsRevoking(true)
        try {
            await revokeApiKey({ keyId: apiKeyId })
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error revoking api key',
                message: 'Please try again later',
                type: 'error'
            })
        } finally {
            setIsRevoking(false)
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
                <Button variant="ghost" className="flex gap-2 items-center">
                    <p>
                        {isCreatingNew ? 'Creating new key' : isRevoking ? 'Revoking key' : 'Options'}
                    </p>
                    {isCreatingNew || isRevoking ? (<Loader2 className='animate-spin h-4 w-4' />) : null}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {
                    navigator.clipboard.writeText(apiKeyId)
                    toast({
                        title: 'Copied ',
                        message: 'Api key copied to clipboard',
                        type: 'success'
                    })
                }}>Copy</DropdownMenuItem>
                <DropdownMenuItem onClick={createNewApiKey}>
                    Create new key
                </DropdownMenuItem>
                <DropdownMenuItem onClick={revokeCurrentApiKey}>
                    Revoke key
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ApiKeyOptions