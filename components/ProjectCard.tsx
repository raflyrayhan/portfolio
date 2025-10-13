"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tech?: string[];
  link?: string;
}

export function ProjectCard({ title, description, image, tech, link }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      className="group overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
    >
      <div className="overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-44 object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-textPrimary">{title}</h3>
        <p className="mt-2 text-muted text-sm leading-relaxed">{description}</p>

        {tech && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="text-xs bg-gray-100 text-muted px-2 py-1 font-medium uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {link && (
          <motion.a
            href={link}
            target="_blank"
            whileHover={{ x: 2 }}
            className="inline-flex items-center gap-1 mt-4 text-accent font-medium hover:underline"
          >
            Visit <ExternalLink size={16} />
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}
