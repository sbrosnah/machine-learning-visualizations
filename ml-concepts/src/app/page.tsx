import AlgorithmCard from "./components/AlgorithmCard";

export default function Home() {
  const algorithms = [
    {
      title: "Maximum Likelihood Estimation",
      description: "Visualize how MLE finds optimal parameters for probability distributions.",
      route: "/mle",
      difficulty: "Intermediate"
    },
    {
      title: "K-Means Clustering",
      description: "Interactive clustering visualization with adjustable parameters.",
      route: "/k-means",
      difficulty: "Beginner"
    },
    {
      title: "Bayesian Inference",
      description: "Visualize how Bayesian inference updates probability distributions based on data.",
      route: "/bayesian-inference",
      difficulty: "Advanced"
    }
  ]
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Machine Learning Concepts</h1>
        <p className="text-gray-600 mb-8">
          Explore machine learning concepts through interactive visualizations.
          Select any card to dive deeper.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((algo) => (
            <AlgorithmCard key={algo.route} {...algo} />
          ))}
        </div>
      </div>
    </main>
  );
}
