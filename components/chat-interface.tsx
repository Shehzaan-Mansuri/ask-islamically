"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  RefreshCw,
  Trash2,
  Mic,
  Copy,
  Download,
  Volume2,
  StopCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math"; // Optional, for rendering LaTeX math
import rehypeRaw from "rehype-raw"; // Optional, if you need to parse raw HTML

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  userName: string;
  userType: "muslim" | "non-muslim";
  initialQuestion?: string;
  userData?: {
    profession?: string;
    beliefs?: string;
  };
}

export function ChatInterface({
  userName,
  userType,
  initialQuestion = "",
  userData,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Speech Recognition setup
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: {
          results: Iterable<unknown> | ArrayLike<unknown>;
        }) => {
          const transcript = Array.from(event.results)
            .map((result) => (result as SpeechRecognitionResult)[0])
            .map((result) => result.transcript)
            .join("");

          setInput(transcript);
        };

        recognitionRef.current.onerror = (event: { error: any }) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          toast({
            title: "Error",
            description: "Speech recognition failed. Please try again.",
            variant: "destructive",
          });
        };
      }

      // Speech Synthesis setup
      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis;
      }
    }

    return () => {
      // Cleanup
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current && utteranceRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Initial greeting message and process initial question if provided
  useEffect(() => {
    // Set the greeting based on user type
    const greeting =
      userType === "muslim"
        ? `Assalamu alaikum${
            userName ? `, ${userName}` : ""
          }! I'm your Islamic AI assistant. How can I help you with your questions about Islam based on the Quran and Hadith?`
        : `Welcome${
            userName ? `, ${userName}` : ""
          }! I'm here to help you explore Islam and answer any questions you might have. Feel free to ask anything you're curious about.`;

    // Create initial messages array with greeting
    const initialMessages: ChatMessage[] = [
      {
        id: "greeting",
        role: "assistant",
        content: greeting,
      },
    ];

    setMessages(initialMessages);

    // Process initial question if provided
    if (initialQuestion && initialQuestion.trim()) {
      // Short delay to allow the UI to render first
      const timer = setTimeout(() => {
        const userQuestion: ChatMessage = {
          id: Date.now().toString(),
          role: "user",
          content: initialQuestion,
        };

        setMessages((prevMessages) => [...prevMessages, userQuestion]);

        // Process the initial question
        processQuestion(initialQuestion, initialMessages);
      }, 1000);

      return () => clearTimeout(timer);
    }

    // Focus the input field if no initial question
    if (!initialQuestion && inputRef.current) {
      inputRef.current.focus();
    }
  }, [userName, userType, initialQuestion]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to process questions (new or initial)
  const processQuestion = async (
    question: string,
    contextMessages: ChatMessage[] = messages
  ) => {
    try {
      setIsLoading(true); // Ensure that loading is true before processing the request
      const requestData: any = {
        message: question,
        history: contextMessages,
      };

      if (userData) {
        requestData.userData = userData;
      }

      requestData.userType = userType;

      const response = await axios.post("/api/message", requestData);

      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: response.data.response,
      };

      setMessages((prev) => [...prev, aiMessage]); // Add assistant response to the chat
      scrollToBottom(); // Scroll down after response
    } catch (error) {
      console.error("Error generating response from AI:", error);
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Make sure loading is stopped after the process
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return; // Prevent sending if input is empty or if already loading

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]); // Add the user's message to the chat
    setInput(""); // Clear the input field
    setIsLoading(true); // Set loader to true while processing the request

    try {
      // Call the processQuestion function that sends the request to the backend
      await processQuestion(input);
    } catch (error) {
      console.error("Error generating response from AI:", error);
      setIsLoading(false); // Ensure loader stops even if there's an error
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearChat = () => {
    const greeting =
      userType === "muslim"
        ? `Assalamu alaikum${
            userName ? `, ${userName}` : ""
          }! I'm your Islamic AI assistant. How can I help you with your questions about Islam based on the Quran and Hadith?`
        : `Welcome${
            userName ? `, ${userName}` : ""
          }! I'm here to help you explore Islam and answer any questions you might have. Feel free to ask anything you're curious about.`;

    setMessages([
      {
        id: "greeting",
        role: "assistant",
        content: greeting,
      },
    ]);
  };

  const handleRegenerateResponse = async () => {
    if (messages.length <= 1 || isLoading) return;

    // Find the last user message
    const lastUserMessageIndex = [...messages]
      .reverse()
      .findIndex((msg) => msg.role === "user");

    if (lastUserMessageIndex !== -1) {
      const lastUserMessage =
        messages[messages.length - lastUserMessageIndex - 1];

      // Remove the last assistant response
      const newMessages = messages.slice(
        0,
        messages.length - lastUserMessageIndex
      );
      setMessages(newMessages);

      // Process the question again
      await processQuestion(lastUserMessage.content, newMessages.slice(0, -1));
    }
  };

  // Speech to text functions
  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak now. Click the microphone again to stop.",
      });
    }
  };

  // Text to speech function
  const speakText = (text: string) => {
    if (!synthRef.current) {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    // Stop any ongoing speech
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    // Create a new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(text);

    // Set language based on content (simple detection)
    if (/[\u0600-\u06FF]/.test(text)) {
      utteranceRef.current.lang = "ar-SA"; // Arabic
    } else {
      utteranceRef.current.lang = "en-UK"; // English
    }

    // Event handlers
    utteranceRef.current.onstart = () => setIsSpeaking(true);
    utteranceRef.current.onend = () => setIsSpeaking(false);
    utteranceRef.current.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Error",
        description: "Failed to speak the text. Please try again.",
        variant: "destructive",
      });
    };

    // Speak
    synthRef.current.speak(utteranceRef.current);
  };

  // Copy text function
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied!",
          description: "Text copied to clipboard.",
        });
      },
      () => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy manually.",
          variant: "destructive",
        });
      }
    );
  };

  // Download chat function
  const downloadChat = () => {
    if (messages.length <= 1) {
      toast({
        title: "No conversation to download",
        description: "Please have a conversation first.",
        variant: "destructive",
      });
      return;
    }

    // Create HTML content
    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ask Islamically - Chat Export</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
          color: #333;
        }
        h1 {
          color: #059669;
          text-align: center;
          margin-bottom: 30px;
        }
        .chat-container {
          display: flex;
          flex-direction: column;
        }
        .message {
          margin-bottom: 15px;
          max-width: 80%;
          padding: 10px 15px;
          border-radius: 10px;
        }
        .user {
          align-self: flex-end;
          background-color: #059669;
          color: white;
        }
        .assistant {
          align-self: flex-start;
          background-color: #e2e8f0;
          color: #1e293b;
        }
        .timestamp {
          font-size: 12px;
          color: #64748b;
          margin-top: 5px;
        }
        .source {
          font-size: 12px;
          font-style: italic;
          margin-top: 8px;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <h1>Ask Islamically - Chat Export</h1>
      <div class="chat-container">
    `;

    // Add messages
    messages.forEach((message) => {
      const date = new Date().toLocaleString();
      htmlContent += `
        <div class="message ${message.role}">
          <div>${message.content}</div>
          <div class="timestamp">${date}</div>
          ${
            message.role === "assistant" && message.content.includes("Quran")
              ? '<div class="source">Source: Quran and authentic Hadith</div>'
              : ""
          }
        </div>
      `;
    });

    // Close HTML
    htmlContent += `
      </div>
    </body>
    </html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ask-islamically-chat-${new Date()
      .toISOString()
      .slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Chat has been downloaded as HTML file.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
          Islamic AI Assistant
        </h2>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadChat}
                  disabled={messages.length <= 1}
                  className="flex items-center text-slate-700 dark:text-slate-300"
                >
                  <Download className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:ml-2">
                    Download
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download chat history</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateResponse}
                  disabled={messages.length <= 1 || isLoading}
                  className="flex items-center text-slate-700 dark:text-slate-300"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:ml-2">
                    Regenerate
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Regenerate last response</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearChat}
                  disabled={messages.length <= 1}
                  className="flex items-center text-slate-700 dark:text-slate-300"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:ml-2">Clear</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear chat history</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id || Date.now()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${
                message.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                }`}
              >
                <ReactMarkdown
                  children={message.content}
                  remarkPlugins={[remarkGfm, remarkMath]} // Enables GitHub Flavored Markdown (GFM) and math support
                  rehypePlugins={[rehypeRaw]} // Enables raw HTML rendering, useful for custom HTML if necessary
                  components={{
                    // Custom rendering for bold and italic
                    strong: ({ node, ...props }) => (
                      <strong {...props} className="font-bold" />
                    ),
                    em: ({ node, ...props }) => (
                      <em {...props} className="italic" />
                    ),
                    // Handling lists (ordered/unordered)
                    ul: ({ node, ...props }) => (
                      <ul {...props} className="list-disc pl-5" />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol {...props} className="list-decimal pl-5" />
                    ),
                    li: ({ node, ...props }) => (
                      <li {...props} className="ml-2" />
                    ),
                    // Handling code blocks
                    code: ({ node, className, children, ...props }) => {
                      const isInline =
                        typeof (props as any).inline === "boolean"
                          ? (props as any).inline
                          : false;
                      if (isInline) {
                        return (
                          <code
                            {...props}
                            className={`bg-slate-200 dark:bg-slate-600 rounded px-1 py-0.5 ${className}`}
                          >
                            {children}
                          </code>
                        );
                      }
                      return (
                        <pre
                          {...(props as React.HTMLAttributes<HTMLPreElement>)}
                          className={`bg-slate-200 dark:bg-slate-600 p-4 rounded`}
                        >
                          <code>{children}</code>
                        </pre>
                      );
                    },
                  }}
                />
                {message.role === "assistant" && (
                  <div className="mt-2 flex items-center justify-between">
                    {message.content.includes("Quran") && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                        Source: Quran and authentic Hadith
                      </div>
                    )}
                    <div className="flex space-x-2 ml-auto">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => copyText(message.content)}
                              className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                              aria-label="Copy text"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy text</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => speakText(message.content)}
                              className={`${
                                isSpeaking
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-slate-500 dark:text-slate-400"
                              } hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors`}
                              aria-label={
                                isSpeaking ? "Stop speaking" : "Speak text"
                              }
                            >
                              {isSpeaking ? (
                                <StopCircle className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isSpeaking ? "Stop speaking" : "Speak text"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="pr-10"
            disabled={isLoading || isListening}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                    isListening
                      ? "text-red-500"
                      : "text-slate-500 dark:text-slate-400"
                  } hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors`}
                  disabled={isLoading}
                >
                  <Mic className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isListening ? "Stop listening" : "Start voice input"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          type="submit"
          disabled={!input.trim() || isLoading} // Disable button when input is empty or during loading
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
