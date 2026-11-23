import { RecordCrate } from "@/app/components/RecordCrate";
import { CustomCursor } from "@/app/components/CustomCursor";

export default function Home() {
    return (
        <main className="min-h-screen">
            <RecordCrate />
            <CustomCursor />
        </main>
    );
}
