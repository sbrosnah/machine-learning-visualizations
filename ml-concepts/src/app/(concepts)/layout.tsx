export default function ConceptLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div>{children}</div>
            </div>
        </main>
    );
}