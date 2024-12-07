import { Card, CardHeader, CardTitle, CardDescription } from "@/app/components/card"
import Link from "next/link"

export interface AlgorithmCardProps {
  title: string
  description: string
  route: string
  tags: string[]
}

export default function AlgorithmCard({ title, description, route, tags }: AlgorithmCardProps) {

  const getTagColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'theory': return 'bg-green-100 text-green-800'
      case 'interactive': return 'bg-yellow-100 text-yellow-800'
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
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
          <div className="flex items-end">
            {tags.map((tag) => (
              <span className={`px-2 py-1 rounded-full text-sm ${getTagColor(tag)}`}>
                {tag}
              </span>
            ))}
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}