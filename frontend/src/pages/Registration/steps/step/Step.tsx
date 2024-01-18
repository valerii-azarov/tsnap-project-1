import React, { ReactNode } from "react";
import Button from "../../../../components/Button/Button";
import HeadingBlock from "../../../../components/HeadingBlock/HeadingBlock";

interface StepProps {
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
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  handleBackButton?: () => void;
  isButtonDisabled?: boolean;
  children: ReactNode;
}

const Step: React.FC<StepProps> = ({ title, subtitle, buttons, handleSubmit, handleBackButton, isButtonDisabled, children }) => {
  // Деструктуризуємо пропси
  const { backButton, nextButton } = buttons;

  return (
    <React.Fragment>
      <HeadingBlock 
        title={title} 
        subtitle={subtitle} 
      />
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form__content">
          {children}
        </fieldset>
        <div className="form__footer">
          {backButton.hasButton && (
            <Button 
              text={backButton.text} 
              onClick={handleBackButton} 
              type="submit"
            />
          )}
          {nextButton.hasButton && (
            <Button 
              text={nextButton.text} 
              disabled={isButtonDisabled} 
              type="submit"
            />
          )}
        </div>
      </form>
    </React.Fragment>
  );
};

export default Step;
