import Link from "next/link";

export default function ConceptLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4">
                <Link href="/" className="text-blue-500 hover:text-blue-700">
                    ← Back to Concepts
                </Link>
                </div>
            </nav>
            <div className="max-w-6xl mx-auto p-8">
                {children}
            </div>
        </div>
    );
}