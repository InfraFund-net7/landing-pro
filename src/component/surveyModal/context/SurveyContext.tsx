'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Step, SurveyData } from '../types';

type SurveyContextValue = {
  isModalOpen: boolean;
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  selectedAction: string;
  setSelectedAction: (action: string) => void;
  userType: 'individual' | 'organization' | null;
  setUserType: (type: 'individual' | 'organization' | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  initialRole?: string;
  onSuccess?: (data: SurveyData) => void;
  onError?: (error: Error) => void;
  handleTypeSelect: (type: 'individual' | 'organization') => void;
};

const SurveyContext = createContext<SurveyContextValue | undefined>(undefined);

export function SurveyProvider({
  children,
  isModalOpen,
  setIsModalOpen,
  initialRole,
  onSuccess,
  onError,
  onInitialRole,
  onModalClosedReset,
}: {
  children: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  initialRole?: string;
  onSuccess?: (data: SurveyData) => void;
  onError?: (error: Error) => void;
  onInitialRole?: (role: string) => void;
  onModalClosedReset?: () => void;
}) {
  const [currentStep, setCurrentStep] = useState<Step>(Step.categorySelect);
  const [selectedAction, setSelectedAction] = useState('');
  const [userType, setUserType] = useState<
    'individual' | 'organization' | null
  >(null);
  const handleTypeSelect = (type: 'individual' | 'organization') => {
    setUserType(type);
  };

  useEffect(() => {
    if (isModalOpen && initialRole) {
      onInitialRole?.(initialRole);
    }
  }, [isModalOpen, initialRole, onInitialRole]);

  useEffect(() => {
    if (!isModalOpen) {
      onModalClosedReset?.();
    }
  }, [isModalOpen, onModalClosedReset]);

  const value: SurveyContextValue = {
    isModalOpen,
    setIsModalOpen,
    initialRole,
    onSuccess,
    currentStep,
    setCurrentStep,
    selectedAction,
    setSelectedAction,
    userType,
    setUserType,
    onError,
    handleTypeSelect,
  };

  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  );
}

export function useSurveyContext(): SurveyContextValue {
  const ctx = useContext(SurveyContext);
  if (!ctx) {
    throw new Error('useSurveyContext must be used within a SurveyProvider');
  }
  return ctx;
}
