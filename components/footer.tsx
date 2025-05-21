import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Ask Islamically. All rights
              reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/about"
              className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
