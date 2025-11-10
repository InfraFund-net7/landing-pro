'use client';

import React, { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqListProps {
  faqs: FaqItem[];
  allowMultiple?: boolean;
}

type OpenState =
  | { type: 'single'; id: string | null }
  | { type: 'multiple'; ids: Set<string> };

const FaqList: React.FC<FaqListProps> = ({ faqs, allowMultiple = false }) => {
  const initialId = faqs[0]?.id ?? '';
  const [openState, setOpenState] = useState<OpenState>(() =>
    allowMultiple
      ? { type: 'multiple' as const, ids: new Set<string>([initialId]) }
      : { type: 'single' as const, id: initialId }
  );

  const toggleFaq = (id: string) => {
    setOpenState((prev: OpenState) => {
      if (allowMultiple || prev.type === 'multiple') {
        const newIds = new Set<string>(
          prev.type === 'multiple' ? prev.ids : new Set<string>()
        );
        if (newIds.has(id)) {
          newIds.delete(id);
        } else {
          newIds.add(id);
        }
        return { type: 'multiple' as const, ids: newIds };
      } else {
        if (prev.id === id) {
          return prev;
        }
        return { type: 'single' as const, id };
      }
    });
  };

  const isOpen = (id: string): boolean => {
    if (allowMultiple || openState.type === 'multiple') {
      return openState.type === 'multiple' && openState.ids.has(id);
    }
    return openState.type === 'single' && openState.id === id;
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => {
        return (
          <div
            key={faq.id}
            onClick={() => toggleFaq(faq.id)}
            className={`cursor-pointer border border-slate-700 rounded-lg bg-slate-800/50 overflow-hidden transition-all`}
          >
            <div className="w-full flex items-center justify-between px-6 py-6 text-left transition-colors hover:text-slate-200 max-md:px-4 max-md:py-4">
              <span className="text-lg text-white font-bold max-md:text-base">
                {faq.question}
              </span>
              <svg
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFaq(faq.id);
                }}
                className={`w-5 h-5 text-white transition-transform duration-500 ease-out cursor-pointer ${isOpen(faq.id) ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div
              className={`transition-all duration-500 ease-out ${isOpen(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div
                className="px-6 pb-6 text-slate-300 leading-relaxed max-md:px-4 max-md:text-sm"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqList;
