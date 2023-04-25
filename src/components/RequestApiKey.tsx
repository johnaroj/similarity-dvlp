"use client"
import React, { FormEvent, useState } from 'react'
import LargeHeading from '@/components/ui/LargeHeading'
import { toast } from './ui/Toast'
import { createApiKey } from '@/helpers/create-api-key'
import { Key } from 'lucide-react'
import Paragraph from './ui/Paragraph'
import CopyButton from './CopyButton'
import { Input } from './ui/Input'
import Button from './ui/Button'

const RequestApiKey = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [apiKey, setAPiKey] = useState<string | null>(null)

    const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsCreating(true)
        try {
            const generatedApiKey = await createApiKey();
            setAPiKey(generatedApiKey)
        } catch (err) {
            if (err instanceof Error) {
                toast({
                    title: 'Error',
                    message: err.message,
                    type: 'error'
                })
            }
        } finally {
            setIsCreating(false)
        }
    }
    return (
        <div className="container md:max-w-2xl">
            <div className="flex flex-col gap-6 items-center">
                <Key className='mx-auto h-12 w-12 text-gray-600' />
                <LargeHeading>Request your API KEY</LargeHeading>
                <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
            </div>
            <form action="#" onSubmit={createNewApiKey} className="mt-6 sm:flex sn:items">
                <div className="relative rounded-md shadow-dm sm:min-w-0 sm:flex-1">
                    {apiKey ? (
                        <CopyButton type='button' valueToCopy={apiKey} className='absolute inset-y-0 right-0 animate-in fade-in duration-300' />
                    ) : null}
                    <Input readOnly value={apiKey ?? ''} placeholder='Request an API Key to display it here!' />
                </div>
                <div className="mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                    <Button disabled={!!apiKey} isLoading={isCreating}>Request Key</Button>
                </div>
            </form>
        </div>
    )
}

export default RequestApiKey