import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-t from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center sm:text-left"
        >
          © {new Date().getFullYear()} <span className="font-semibold text-slate-900">Rafly</span>.
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-5"
        >
          <a
            href="mailto:hello@rafly.dev"
            className="relative hover:text-blue-600 transition-colors group"
          >
            <span>Email</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            className="relative hover:text-blue-600 transition-colors group"
          >
            <span>LinkedIn</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            className="relative hover:text-blue-600 transition-colors group"
          >
            <span>GitHub</span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
