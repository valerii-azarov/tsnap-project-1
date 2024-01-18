import { StepActions } from "../../../actions";
import { StepTypes as TYPES } from "../../../actionTypes";

const initialState = 0;

export const stepReducer = (state = initialState, action: StepActions): number => {
  return action.type === TYPES.SET_CURRENT_STEP ? action.payload : state;
};
