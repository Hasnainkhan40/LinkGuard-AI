import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UrlShortenerForm } from "@/components/urls/url-shortener-form";
import { UserUrlsTable } from "@/components/urls/user-urls-table";
import { getUserUrls } from "@/server/actions/urls/get-user-urls";
import { auth } from "@/server/auth";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | ShortLink",
  description: "Dashboard page",
};

export default async function DashboardPage() {
  const session = await auth();

  // Get user's URLs
  const response = await getUserUrls(session?.user.id as string);
  const userUrls = response.success && response.data ? response.data : [];

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-center">Dashboard</h1>
        {session?.user.role && (
          <p className="text-sm text-muted-foreground">
            Your role: <span className="font-medium">{session.user.role}</span>
          </p>
        )}
      </div>

      <div className="grid gap-8 max-w-5xl mx-auto">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Create New Short URL</CardTitle>
            <CardDescription>
              Enter a long URL to create a shortened link. You can also
              customize the short code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UrlShortenerForm />
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-dashed">
          <CardHeader>
            <CardTitle>Your URLs</CardTitle>
            <CardDescription>
              Manage and track your shortened URLs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserUrlsTable urls={userUrls} />
          </CardContent>
        </Card>

        {session?.user.role === "admin" && (
          <div className="text-center mt-4">
            <Link
              href="/admin"
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Admin Tools
            </Link>
          </div>
        )}
      </div>
    </>
  );
}


