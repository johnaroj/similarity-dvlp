import React from 'react'
import type { Metadata } from 'next'
import LargeHeading from '@/ui/LargeHeading';
import Paragraph from '@/ui/LargeHeading';
import DocumentationTabs from '@/components/DocumentationTabs';

import 'simplebar-react/dist/simplebar.min.css'
export const metadata: Metadata = {
    title: 'Similarity API | Documentation',
    description: "Free & open-source text similarity API"
}
type Props = {}

const page = (props: Props) => {
    return (
        <div className="container max-w-7xl mx-auto mt-12">
            <div className="flex flex-col items-center gap-6">
                <LargeHeading>Making request</LargeHeading>
                <Paragraph>api/v1/simlarity</Paragraph>

                <DocumentationTabs></DocumentationTabs>
            </div>
        </div>
    )
}

export default page