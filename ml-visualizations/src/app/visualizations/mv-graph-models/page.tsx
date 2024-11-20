import React from 'react';
import { getContent } from '@/utils/contentUtils'
import DynamicGaussianPlot from '@/components/mv-graph-models/DynamicGaussianPlot'

export default async function MVGraphModelsPage() {

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="prose prose-slate max-w-none"></div>

      <div className="my-8">
        <DynamicGaussianPlot />
      </div>
    </div>
  )
}