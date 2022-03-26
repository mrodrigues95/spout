import { ReactElement, useMemo } from 'react';

interface ModalSteps {
  modal: ReactElement;
  step: number;
}

interface UseModalStepperProps {
  currentStep: number;
  modals: ModalSteps[];
}

export const useModalStepper = ({
  currentStep,
  modals,
}: UseModalStepperProps) => {
  const currentModalStep = useMemo(
    () => modals.find(({ step }) => step === currentStep)?.modal ?? null,
    [modals, currentStep],
  );

  return { currentModalStep };
};
