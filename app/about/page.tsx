"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-emerald-800 dark:text-emerald-400"
        >
          About Ask Islamically
        </motion.h1>

        <motion.div variants={item} className="mb-12 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-25"></div>
          <div className="relative p-6 bg-white dark:bg-slate-900 rounded-lg shadow-xl">
            <p className="text-xl text-center italic text-slate-700 dark:text-slate-300">
              "Indeed, Allah is with those who fear Him and those who are doers
              of good."
              <span className="block mt-2 text-sm">— Quran 16:128</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-500">
            Our Mission
          </h2>
          <p className="mb-6">
            Ask Islamically was created to provide accurate, authentic Islamic
            knowledge based on the Quran and Sunnah. Our AI assistant aims to
            help Muslims strengthen their faith and practice, while also
            providing non-Muslims with accurate information about Islam from
            reliable sources.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-500">
            How It Works
          </h2>
          <p className="mb-6">
            Our AI has been trained on authentic Islamic texts, including the
            Quran, Hadith collections, and works of respected scholars. When you
            ask a question, the AI searches through this knowledge to provide
            you with the most accurate answer possible, always citing sources.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-500">
            Our Values
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              Authenticity: All answers are based on the Quran and authentic
              Hadith
            </li>
            <li>
              Respect: We respect different madhabs and valid differences of
              opinion
            </li>
            <li>
              Accessibility: Islamic knowledge should be accessible to everyone
            </li>
            <li>
              Clarity: Complex topics explained in simple, understandable
              language
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-500">
            Disclaimer
          </h2>
          <p className="mb-6">
            While our AI strives for accuracy, it should not replace consulting
            with knowledgeable scholars for important religious matters. Always
            verify critical information with qualified Islamic scholars.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-500">
            Disclaimer
          </h2>
          <p className="mb-6">
            While our AI strives for accuracy, it should not replace consulting
            with knowledgeable scholars for important religious matters. Always
            verify critical information with qualified Islamic scholars.
          </p>

          {/* Credits Section */}

          <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-500">
            Credits & About the Creator
          </h2>
          <p className="mb-2">
            This project, <b>Ask Islamically</b>, was developed and designed by{" "}
            <strong>Shehzaan Mansuri</strong>, a passionate software developer
            dedicated to making authentic Islamic knowledge easily accessible to
            everyone using modern technology.
          </p>
          <p className="mb-2">
            I have a strong background in web development, AI, and machine
            learning, which enabled me to create an AI-powered assistant that
            offers accurate and reliable information from the Quran and Sunnah.
            My goal is to bridge the gap between traditional Islamic knowledge
            and modern technology to help users of all backgrounds better
            understand Islam in a respectful and educational manner.
          </p>
          <p className="mb-2">
            <b>Ask Islamically</b> is more than just a sample project—it's a
            commitment to providing a user-friendly platform for learning and
            sharing authentic Islamic teachings. I hope that this project not
            only helps Muslims strengthen their faith but also serves as a
            valuable resource for non-Muslims seeking a deeper understanding of
            Islam.
          </p>
          <p className="mb-2">
            If you have feedback, suggestions, or are interested in
            collaborating, feel free to reach out to me at{" "}
            <a
              href="mailto:shehzaanmansuri1@gmail.com"
              className="text-emerald-700 dark:text-emerald-400 underline"
            >
              shehzaanmansuri1@gmail.com
            </a>
            . I’m always eager to connect with people who share my vision of
            leveraging technology for positive impact.
          </p>
          <p>
            You can also explore my work and projects on my{" "}
            <a
              href="https://www.linkedin.com/in/shehzaan-mansuri-997210195/"
              className="text-emerald-700 dark:text-emerald-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            , where I share insights into my development journey, skills, and
            other tech-related projects.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
