import AlgorithmCard from "./components/AlgorithmCard";

export default function Home() {
  const algorithms = [
    {
      title: "Maximum Likelihood Estimation",
      description: "Visualize how MLE finds optimal parameters for probability distributions.",
      route: "/mle",
      tags: ["Theory", "Interactive", "Machine Learning"]
    },
    // {
    //   title: "K-Means Clustering",
    //   description: "Interactive clustering visualization with adjustable parameters.",
    //   route: "/k-means",
    //   tags: "Beginner"
    // },
    {
      title: "Bayesian Inference",
      description: "Visualize how Bayesian inference updates probability distributions based on data.",
      route: "/bayesian-inference",
      tags: ["Theory", "Machine Learning"]
    }
  ]
  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Spencer&apos;s Blog Posts</h1>
        <p className="text-gray-600 mb-8">
          Click on a card below to explore math and machine learning concepts with visualizations, tutorials, and more!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((algo) => (
            <AlgorithmCard key={algo.route} {...algo} />
          ))}
        </div>
      </div>
    </main>
  );
}
