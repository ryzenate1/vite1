'use client';

import { useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from '../Common/SectionTitle';

const projects = [
  {
    title: "Caroline Seiffert",
    imageUrl: "/projects/project_1.png",
    link: "https://www.lokkeestudios.com/project/carolineseiffert",
  },
  {
    title: "Little Ashé",
    imageUrl: "/projects/project_2.png",
    link: "https://www.lokkeestudios.com/project/little-ashe",
  },
  {
    title: "Contentary",
    imageUrl: "/projects/project_3.png",
    link: "https://www.lokkeestudios.com/project/contentary",
  },
  {
    title: "Nullpunkt",
    imageUrl: "/projects/project_4.png",
    link: "https://www.lokkeestudios.com/project/nullpunkt",
  },
  {
    title: "Weatherworks",
    imageUrl: "/projects/project_1.png",
    link: "https://www.lokkeestudios.com/project/weatherworks",
  },
  {
    title: "Lockey",
    imageUrl: "/projects/project_2.png",
    link: "https://www.lokkeestudios.com/project/lockey",
  },
];

interface ProjectsSectionProps {
  id: string;
  onContentReady?: () => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ id, onContentReady }) => {
  useEffect(() => {
    if (onContentReady) {
      const timeoutId = setTimeout(() => {
        onContentReady();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [onContentReady]);

  return (
    <section 
      id={id} 
      className="relative py-16 md:py-20 overflow-hidden bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url('/projects/bg1.webp')` }}
      data-scroll-section
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          label="Work"
          title="Work Showcase"
          paragraph="Check out our sample work with lokkee studios"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {projects.map((project, index) => (
            <motion.a 
              key={project.title + index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] backdrop-blur-md bg-white/10 border border-white/20"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              whileHover={{ y: -8 }}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = '/projects/project_1.png';
                }}
                className="absolute inset-0 object-cover object-center w-full h-full scale-105 group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                <h3 className="text-white text-xl md:text-2xl font-semibold text-center">
                  {project.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
