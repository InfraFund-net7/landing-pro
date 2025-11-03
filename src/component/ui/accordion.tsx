'use client';

import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface AccordionProps {
  children: React.ReactNode;
  defaultValue?: string;
  type?: 'single' | 'multiple';
}

export function Accordion({ children }: AccordionProps) {
  return <div className="w-full">{children}</div>;
}

interface AccordionItemProps {
  children: React.ReactNode;
}

export function AccordionItem({ children }: AccordionItemProps) {
  return <div className="border-b last:border-b-0">{children}</div>;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
}

export function AccordionTrigger({ children }: AccordionTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none
          disabled:pointer-events-none disabled:opacity-50
          focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
          transition-all duration-500 ease-out`}
      >
        {children}
        <ChevronDownIcon
          className={`pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-500 ease-out ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AccordionContent open={open}>{children}</AccordionContent>
    </div>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  open: boolean;
}

export function AccordionContent({ children, open }: AccordionContentProps) {
  return (
    <div
      className={`overflow-hidden text-sm transition-all duration-500 ease-in-out ${
        open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="pt-0 pb-4">{children}</div>
    </div>
  );
}
