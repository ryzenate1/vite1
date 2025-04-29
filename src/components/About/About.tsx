import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import SectionTitle from '../Common/SectionTitle';

// Icon Imports
import { SiUbuntu } from "react-icons/si";
import { FaReact, FaCloud } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import type { IconType } from 'react-icons';

// Skill Type
type Skill = {
  name: string;
  Icon: IconType;
  color: string;
  textLines: string[];
};

// Skills Array
const skills: Skill[] = [
  {
    name: "Linux",
    Icon: SiUbuntu,
    color: "text-[#E95420]",
    textLines: ["Server Provisioning", "Shell Scripting & Automation", "Service Monitoring & Uptime"],
  },
  {
    name: "React.js",
    Icon: FaReact,
    color: "text-[#61DAFB]",
    textLines: ["Component Architecture", "State Management Patterns", "Performance Optimization"],
  },
  {
    name: "Cloud",
    Icon: FaCloud,
    color: "text-[#4285F4]",
    textLines: ["Scalable Cloud Solutions", "Infrastructure as Code (IaC)", "Serverless Computing"],
  },
  {
    name: "Networking",
    Icon: IoShareSocialOutline,
    color: "text-[#34A853]",
    textLines: ["Network Configuration", "Troubleshooting Protocols", "Security Best Practices"],
  },
];

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

interface AboutProps {
  id: string;
}

const About: React.FC<AboutProps> = ({ id }: AboutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [startTyping, setStartTyping] = useState(false);

  const terminalContent = 
`ryzen@portfolio/root:~$ bash /.Ryzen

Processing... 
Compiling sources...
Installing necessary packages...
Fetching profile...

Initializing Ryzen Portfolio...

I'm a 16-year-old tech enthusiast passionate about building the future. I specialize in web and mobile app development, server management, cloud computing, virtualization, and penetration testing. With hands-on experience in networking, Linux command-line environments, and physical servers like Cisco, Dell, HPE and Supermicro, I bring both technical expertise and real-world understanding to every project.

I love experimenting with new software, enhancing web performance with JavaScript and its frameworks, and consulting clients to choose the right hardware and solutions. Always thinking creatively, I embrace daily learning and strive to stay ahead in the evolving tech landscape.

I take pride in teaching what I've learned, listening to others, and delivering solutions that work. Whether it's building apps, securing networks, or optimizing server infrastructure — I'm ready to collaborate, create, and innovate.

ryzen@portfolio/root:~$ _
`;

  const typingSpeed = 25;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startTyping) {
          setStartTyping(true);
        }
      },
      { threshold: 0.3 }
    );
    if (terminalBodyRef.current) observer.observe(terminalBodyRef.current);

    return () => {
      if (terminalBodyRef.current) observer.unobserve(terminalBodyRef.current);
    };
  }, [startTyping]);

  useEffect(() => {
    if (!startTyping || displayedText.length >= terminalContent.length) return;

    const timeoutId = setTimeout(() => {
      const nextChar = terminalContent.charAt(displayedText.length);
      setDisplayedText(prev => prev + nextChar);
    }, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [startTyping, displayedText, terminalContent, typingSpeed]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <section 
      id={id} 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1117]"
      data-scroll-section
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="About Me"
            title="Who Am I?"
            paragraph="A passionate developer with a keen eye for design and a love for creating beautiful, functional experiences."
            center
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white">My Journey</h3>
              <p className="text-gray-400 leading-relaxed">
                I've been passionate about technology and design since I was young. 
                My journey in web development started with simple HTML pages and has 
                evolved into creating complex, interactive web applications.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I believe in writing clean, maintainable code and creating intuitive 
                user experiences that make a difference.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white">What I Do</h3>
              <p className="text-gray-400 leading-relaxed">
                I specialize in creating modern web applications using React, TypeScript, 
                and other cutting-edge technologies. I focus on performance, accessibility, 
                and creating memorable user experiences.
              </p>
              <p className="text-gray-400 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing my knowledge with others.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm">
              React
            </span>
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm">
              TypeScript
            </span>
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm">
              Node.js
            </span>
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm">
              Tailwind CSS
            </span>
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm">
              Framer Motion
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Skills Icons */}
      <motion.div
        className="max-w-screen-lg mx-auto flex flex-wrap justify-center items-start gap-x-20 gap-y-12 md:gap-x-28 mb-16 sm:mb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skill) => {
          const SkillIcon = skill.Icon as React.ComponentType<any>;

          return (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="flex flex-col items-center w-28 sm:w-32 md:w-36 text-center"
              title={skill.name}
              aria-label={`Skill: ${skill.name}`}
            >
              {SkillIcon && (
                <SkillIcon size={35} className={`${skill.color}`} aria-label={skill.name} />
              )}
              <span className="mt-2 text-sm font-semibold text-center text-neutral-300 font-sans">
                {skill.name}
              </span>
              <div className="skill-popup-text w-full min-h-[3.5em] text-center text-xs sm:text-sm">
                <Typewriter
                  words={skill.textLines}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={40}
                  deleteSpeed={20}
                  delaySpeed={2500}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Terminal */}
      <motion.div
        className="mac-terminal max-w-4xl w-full mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2 p-2 bg-neutral-800">
          <span className="h-3 w-3 bg-red-500 rounded-full"></span>
          <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
          <span className="h-3 w-3 bg-green-500 rounded-full"></span>
        </div>
        <div
          ref={terminalBodyRef}
          className="p-4 text-green-400 font-mono text-xs sm:text-sm md:text-base h-[250px] sm:h-[350px] md:h-[400px] overflow-y-auto whitespace-pre-wrap leading-relaxed scrollbar-hide"
        >
          <pre className="whitespace-pre-wrap">{displayedText}</pre>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
