import { Button } from "../../components/ui/button";
import { Cloud } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="px-6 text-center">
        <div className="mb-8 flex justify-center">
          <Cloud className="animate-float h-20 w-20 text-blue-400" />
        </div>
        <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
          Your files, anywhere
        </h1>
        <p className="mb-8 text-lg text-gray-300">
          Secure, simple, and seamless file management
        </p>
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
          <Button
            size="lg"
            type="submit"
            className="transform bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-purple-700"
          >
            Get Started
          </Button>
        </form>
      </div>
    </div>
  );
}
