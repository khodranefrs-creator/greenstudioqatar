import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";

export default async function NotFound() {
  const dict = await getDictionary("en") as Record<string, Record<string, string>>;
  const common = dict.common;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="text-8xl font-display font-semibold tracking-tight text-charcoal/10">
        404
      </p>
      <h1 className="mt-4 text-2xl font-display font-medium text-charcoal">
        {common.pageNotFound}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center border border-charcoal px-6 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-offwhite"
      >
        {common.backToHome}
      </Link>
    </main>
  );
}
