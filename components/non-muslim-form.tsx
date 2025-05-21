"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NonMuslimFormProps {
  onSubmit: (
    name: string,
    initialQuestion: string,
    userData: { profession: string; beliefs: string }
  ) => void;
  onBack: () => void;
}

export function NonMuslimForm({ onSubmit, onBack }: NonMuslimFormProps) {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [beliefs, setBeliefs] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const professions = [
    "Student",
    "Teacher",
    "Doctor",
    "Engineer",
    "Artist",
    "Writer",
    "Scientist",
    "Business Professional",
    "Other",
  ];

  const beliefSystems = [
    "Atheist",
    "Agnostic",
    "Christian",
    "Jewish",
    "Hindu",
    "Buddhist",
    "Sikh",
    "Spiritual but not religious",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profession || !beliefs) return;

    setIsSubmitting(true);
    // Pass name, question, and user data to the parent
    setTimeout(() => {
      onSubmit(name, question, { profession, beliefs });
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
          Explore Islam
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-300">
          We&apos;ll help you explore Islam based on your background
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
            htmlFor="profession"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Your Profession <span className="text-red-500">*</span>
          </label>
          <Select value={profession} onValueChange={setProfession} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your profession" />
            </SelectTrigger>
            <SelectContent>
              {professions.map((prof) => (
                <SelectItem key={prof} value={prof}>
                  {prof}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="beliefs"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Current Beliefs <span className="text-red-500">*</span>
          </label>
          <Select value={beliefs} onValueChange={setBeliefs} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your current beliefs" />
            </SelectTrigger>
            <SelectContent>
              {beliefSystems.map((belief) => (
                <SelectItem key={belief} value={belief}>
                  {belief}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Your Question (Optional)
          </label>
          <Textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What are the core beliefs of Islam?"
            className="w-full min-h-[120px]"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            disabled={!profession || !beliefs || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Start Exploring
              </div>
            )}
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
}
