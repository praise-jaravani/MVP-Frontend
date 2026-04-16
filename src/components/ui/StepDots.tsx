import React from 'react';
import { Check } from 'lucide-react';

interface StepDotsProps {
  totalSteps: number;
  currentStep: number;
}

export default function StepDots({ totalSteps, currentStep }: StepDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        const isUpcoming = step > currentStep;

        return (
          <div
            key={step}
            className={`
              flex items-center justify-center rounded-full transition-all duration-200
              ${isCompleted ? 'w-6 h-6 bg-shield-blue border-2 border-shield-blue' : ''}
              ${isActive ? 'w-7 h-7 bg-shield-blue border-2 border-shield-blue scale-110' : ''}
              ${isUpcoming ? 'w-5 h-5 bg-transparent border-2 border-gray-500' : ''}
            `}
          >
            {isCompleted && <Check className="h-3 w-3 text-white" />}
          </div>
        );
      })}
    </div>
  );
}
