import { Button } from "../../components/ui/button";
import { Cloud } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-gray-900">
      <div className="px-6 text-center">
        <div className="mb-8 flex justify-center">
          <Cloud className="h-16 w-16 text-blue-400" />
        </div>
        <h1 className="mb-8 bg-gradient-to-r from-neutral-200 to-neutral-500 bg-clip-text text-4xl font-bold text-transparent text-white sm:text-5xl md:text-6xl">
          Your files, anywhere
        </h1>
        <form
          action={async () => {
            "use server";

            const session = await auth();
            if (!session.userId) {
              return redirect("/sign-in");
            }
            return redirect("/drive");
          }}
        >
          <Button size="lg" type="submit">
            Get Started
          </Button>
        </form>
      </div>
    </div>
  );
}
