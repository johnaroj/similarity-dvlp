import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import ApiDashboard from '@/components/ApiDashboard'
import RequestApiKey from '@/components/RequestApiKey'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
    title: 'Similarity API | Dashboard',
    description: 'Free & open-source text similarity API'
}
const page = async () => {
    const session = await getServerSession(authOptions)

    if (!session) notFound()

    const apiKey = await db.apiKey.findFirst({
        where: { userId: session.user.id, enabled: true }
    })
    return (
        <div className="max-w-7xl mx-auto mt-16">
            {/* @ts-expect-error Server Component */}
            {apiKey ? <ApiDashboard /> : <RequestApiKey />}
        </div>
    )
}

export default page