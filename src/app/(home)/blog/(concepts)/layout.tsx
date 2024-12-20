export default function ConceptLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full lg:w-[calc(100%-20rem)]">
            <div className="max-w-6xl mx-auto p-8 pt-0">
                <div className="flex w-full h-full flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
}