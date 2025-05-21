"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";

interface MuslimFormProps {
  onSubmit: (name: string, initialQuestion: string) => void;
  onBack: () => void;
}

export function MuslimForm({ onSubmit, onBack }: MuslimFormProps) {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsSubmitting(true);
    // Pass both name and question to the parent
    setTimeout(() => {
      onSubmit(name, question);
      setIsSubmitting(false);
    }, 1000);
  };

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
    <motion.div
      className="max-w-2xl mx-auto"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.button
        variants={item}
        onClick={onBack}
        className="flex items-center text-emerald-600 dark:text-emerald-400 mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to selection
      </motion.button>

      <motion.div variants={item} className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-emerald-800 dark:text-emerald-400">
          Ask Your Question
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-300">
          Ask your questions based on Quran and Hadith
        </p>
      </motion.div>

      <motion.form
        variants={item}
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Your Name (Optional)
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Your Question <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What does the Quran say about patience?"
            className="w-full min-h-[120px]"
            required
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={!question.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Submit Question
              </div>
            )}
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
}
