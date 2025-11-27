import { Platformfaqs } from '@/constants/platformData';
import { Investfaqs } from '@/constants/investorData';
import { Builderfaqs } from '@/constants/builderData';

type FaqItem = {
    id: string;
    question: string;
    answer: string;
    category: 'Platform' | 'Investor' | 'Builder';
};

export const combinedFaqs: FaqItem[] = [
    ...Platformfaqs.map(faq => ({ ...faq, category: 'Platform' as const })),
    ...Investfaqs.map(faq => ({ ...faq, category: 'Investor' as const })),
    ...Builderfaqs.map(faq => ({ ...faq, category: 'Builder' as const })),
];