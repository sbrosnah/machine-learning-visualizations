import MLEVisualization from '@/components/mle/MLEVisualization'
import DynamicMDXContent from '@/components/shared/DynamicMDXContent'
import { getContent } from '@/utils/contentUtils'

export default async function MLEPage() {
  const content = getContent('mle')

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="prose prose-slate max-w-none">
        <h1>Maximum Likelihood Estimation</h1>
        <p>
          Maximum Likelihood Estimation (MLE) is a method of estimating the parameters
          of a probability distribution by maximizing a likelihood function. Use the
          interactive visualization below to explore how MLE works in practice.
        </p>
      </div>

      <div className="my-8">
        <MLEVisualization />
      </div>

      <div className="mt-12">
        <DynamicMDXContent content={content} />
      </div>
    </div>
  )
}