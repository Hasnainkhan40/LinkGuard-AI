import { UrlShortenerForm } from "@/components/urls/url-shortener-form";
import { auth } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-24">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Shorten Your Links
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Paste your long URL and get a shortened one. It&apos;s free and easy
          to use.
        </p>

        <UrlShortenerForm />

        <div className="mt-8 flex justify-center gap-4">
          {session?.user ? (
            <Link
              href="/dashboard"
              className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-block rounded-md border border-muted-foreground px-4 py-2 text-sm font-medium hover:bg-muted/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-block rounded-md bg-secondary px-4 py-2 text-sm font-medium text-background hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
