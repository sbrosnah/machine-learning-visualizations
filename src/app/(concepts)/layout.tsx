import Link from "next/link";

export default function ConceptLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
                <div className="max-w-6xl mx-auto px-4 py-4">
                <Link href="/" className="text-blue-500 hover:text-blue-700">
                    ← Back to Dashboard
                </Link>
                </div>
            </nav>
            <div className="max-w-6xl mx-auto p-8 pt-20">
                {children}
            </div>
        </div>
    );
}