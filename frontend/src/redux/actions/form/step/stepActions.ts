import { StepTypes as TYPES } from "../../../actionTypes";

interface SetCurrentStepActions {
  type: typeof TYPES.SET_CURRENT_STEP;
  payload: number;
}

export type StepActions = SetCurrentStepActions;
