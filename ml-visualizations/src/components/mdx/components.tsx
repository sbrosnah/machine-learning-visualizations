import React from 'react'
import { ComponentType } from '@/types'

export const components: Record<string, ComponentType> = {
    p: ({ children }) => (
        <p className="my-4 text-gray-800">{children}</p>
    ),
    h2: ({ children }) => (
        <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
    ),
    ul: ({ children }) => (
        <ul className="list-disc pl-6 my-4">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 my-4">{children}</ol>
    ),
}