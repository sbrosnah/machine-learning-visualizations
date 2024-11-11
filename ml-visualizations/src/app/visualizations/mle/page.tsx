'use client'
import MLEVisualization from '@/components/custom/MLEVisualization'

export default function MLEPage() {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h1>Maximum Likelihood Estimation</h1>
        <p>
          Maximum Likelihood Estimation (MLE) is a method of estimating the parameters
          of a probability distribution by maximizing a likelihood function.
        </p>
      </div>
      <MLEVisualization />
    </div>
  )
}