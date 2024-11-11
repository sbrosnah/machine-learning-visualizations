'use client'
import { Suspense } from 'react'
import MLEVisualization from '@/components/mle/MLEVisualization'
import ContentLoader from '@/components/shared/ContentLoader'

export default function MLEPage() {

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header section */}
      <div className="prose prose-slate max-w-none">
        <h1>Maximum Likelihood Estimation</h1>
        <p>
          Maximum Likelihood Estimation (MLE) is a method of estimating the parameters
          of a probability distribution by maximizing a likelihood function. Use the
          interactive visualization below to explore how MLE works in practice.
        </p>
      </div>

      {/* Interactive visualization */}
      <div className="my-8">
        <MLEVisualization />
      </div>

      {/* MDX content */}
      <div className="mt-12">
        <Suspense fallback={<div>Loading content...</div>}>
          <ContentLoader contentType="mle" />
        </Suspense>
      </div>
    </div>
  )
}