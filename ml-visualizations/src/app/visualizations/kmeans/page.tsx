'use client'
import KMeansVisualization from '@/components/custom/KMeansVisualization'

export default function KMeansPage() {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h1>K-Means Clustering</h1>
        <p>
          K-means clustering is an unsupervised learning algorithm that groups
          similar data points together based on their features.
        </p>
      </div>
      <KMeansVisualization />
    </div>
  )
}