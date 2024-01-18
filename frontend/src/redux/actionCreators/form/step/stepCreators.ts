import { StepTypes as TYPES } from "../../../actionTypes";
import { StepActions } from "../../../actions";

export const setStep = (currentStep: number): StepActions => ({
  type: TYPES.SET_CURRENT_STEP,
  payload: currentStep,
});
