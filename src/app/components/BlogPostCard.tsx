import { Card, CardHeader, CardTitle, CardDescription } from "@/app/components/card"
import Link from "next/link"

export interface BlogPostCardProps {
  title: string
  description: string
  route: string
  tags: string[]
}

export default function BlogPostCard({ title, description, route, tags }: BlogPostCardProps) {

  return (
    <Link href={route} className="block transition-transform hover:scale-105">
      <Card className="h-full hover:shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </div>
          <CardDescription className="mt-2 text-gray-500">{description}</CardDescription>
          <div className="flex items-end flex-wrap">
            {tags.map((tag, index) => (
              <span key={index} className={`mt-1 mr-1 px-2 py-1 rounded-full text-sm bg-blue-500 text-white text-nowrap`}>
                {tag}
              </span>
            ))}
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}