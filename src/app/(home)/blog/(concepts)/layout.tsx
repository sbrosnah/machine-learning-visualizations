import Link from "next/link";

export default function ConceptLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full">
            <div className="w-[calc(100%-16rem)]">
                <div className="max-w-6xl mx-auto p-8 pt-0">
                    {children}
                </div>
            </div>
        </div>

    );
}