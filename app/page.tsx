"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MuslimForm } from "@/components/muslim-form"
import { NonMuslimForm } from "@/components/non-muslim-form"
import { ChatInterface } from "@/components/chat-interface"
import { useRouter } from "next/navigation"

export default function Home() {
  const [userType, setUserType] = useState<"muslim" | "non-muslim" | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [userName, setUserName] = useState("")
  const [initialQuestion, setInitialQuestion] = useState("")
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  const handleMuslimFormSubmit = (name: string, question: string) => {
    setUserName(name)
    setInitialQuestion(question)
    setShowChat(true)
  }

  const handleNonMuslimFormSubmit = (name: string, question: string, data: { profession: string, beliefs: string }) => {
    setUserName(name)
    setInitialQuestion(question)
    setUserData(data)
    setShowChat(true)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  }

  if (showChat) {
    return (
      <ChatInterface 
        userName={userName} 
        userType={userType || "muslim"} 
        initialQuestion={initialQuestion}
        userData={userData}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      {!userType ? (
        <motion.div
          className="flex flex-col items-center justify-center text-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10 dark:opacity-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
          >
            <div className="islamic-pattern w-full h-full"></div>
          </motion.div>

          <motion.div variants={item} className="mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-25"></div>
              <div className="relative px-7 py-6 bg-white dark:bg-slate-900 rounded-lg leading-none flex items-center">
                <span className="text-emerald-500 dark:text-emerald-400 text-5xl md:text-6xl font-arabic">
                  ٱلسَّلَامُ عَلَيْكُمْ
                </span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-bold mb-4 text-emerald-800 dark:text-emerald-400"
          >
            Ask Islamically
          </motion.h1>

          <motion.p variants={item} className="text-xl md:text-2xl mb-12 max-w-2xl text-slate-700 dark:text-slate-300">
            Seek Islamic guidance or explore the truth about Islam with AI
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-6">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                onClick={() => setUserType("muslim")}
                className="text-lg px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg"
              >
                I&apos;m a Muslim
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                onClick={() => setUserType("non-muslim")}
                className="text-lg px-8 py-6 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg"
              >
                I&apos;m not a Muslim
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : userType === "muslim" ? (
        <MuslimForm onSubmit={handleMuslimFormSubmit} onBack={() => setUserType(null)} />
      ) : (
        <NonMuslimForm onSubmit={handleNonMuslimFormSubmit} onBack={() => setUserType(null)} />
      )}
    </div>
  )
}
