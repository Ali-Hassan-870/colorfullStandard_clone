// components/ui/faq.tsx
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
  className?: string;
}

export function Faq({ items, className = "" }: FaqProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  if (!items.length) return null;

  return (
    <div className={`space-y-0 ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={"border-b border-gray-200"}
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full py-4 flex items-center justify-between text-left cursor-pointer group"
          >
            <span className="font-bold text-gray-900">{item.question}</span>
            <span
              className="ml-2 flex items-center justify-center w-7 h-7 rounded-full bg-[#F1F1F1] 
               group-hover:bg-black group-hover:text-white transition-colors duration-200"
            >
              {expandedItem === item.id ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </span>
          </button>

          {expandedItem === item.id && (
            <div className="pb-4 px-0">
              <div className="prose prose-sm max-w-none text-gray-700">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-3 last:mb-0">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-1 mb-3">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                  }}
                >
                  {item.answer}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
