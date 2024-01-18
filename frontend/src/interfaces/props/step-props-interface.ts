export interface StepProps {
  title: string;
  subtitle: string;
  buttons: {
    backButton: {
      hasButton: boolean;
      text: string;
    };
    nextButton: {
      hasButton: boolean;
      text: string;
    };
  };
}