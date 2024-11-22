import { Card, CardHeader, CardTitle, CardDescription } from "@/app/components/card"
import Link from "next/link"

export interface AlgorithmCardProps {
  title: string
  description: string
  route: string
  difficulty: string
}

export default function AlgorithmCard({ title, description, route, difficulty }: AlgorithmCardProps) {
  const getDifficultyColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Link href={route} className="block transition-transform hover:scale-105">
      <Card className="h-full hover:shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <span className={`px-2 py-1 rounded-full text-sm ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}