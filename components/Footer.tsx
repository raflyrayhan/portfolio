export function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-sm text-slate-500 dark:text-slate-400
                      flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Rafly. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="mailto:hello@rafly.dev" className="hover:text-slate-800 dark:hover:text-slate-200">Email</a>
          <a href="https://www.linkedin.com/" className="hover:text-slate-800 dark:hover:text-slate-200">LinkedIn</a>
          <a href="https://github.com/" className="hover:text-slate-800 dark:hover:text-slate-200">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
