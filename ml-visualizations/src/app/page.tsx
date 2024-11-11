import AlgorithmCard from '@/components/custom/AlgorithmCard'

export default function Home() {
  const algorithms = [
    {
      title: "Maximum Likelihood Estimation",
      description: "Visualize how MLE finds optimal parameters for probability distributions.",
      route: "/visualizations/mle",
      difficulty: "Intermediate"
    },
    {
      title: "K-Means Clustering",
      description: "Interactive clustering visualization with adjustable parameters.",
      route: "/visualizations/kmeans",
      difficulty: "Beginner"
    },
    {
      title: "Linear Regression",
      description: "Explore the relationship between variables with interactive line fitting.",
      route: "/visualizations/linear-regression",
      difficulty: "Beginner"
    },
    {
      title: "Principal Component Analysis",
      description: "Visualize dimensionality reduction and data transformation.",
      route: "/visualizations/pca",
      difficulty: "Advanced"
    }
  ]

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Interactive ML Visualizations</h1>
        <p className="text-gray-600 mb-8">
          Explore machine learning concepts through interactive visualizations.
          Select any card to dive deeper into the algorithm.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((algo) => (
            <AlgorithmCard key={algo.route} {...algo} />
          ))}
        </div>
      </div>
    </main>
  )
}
