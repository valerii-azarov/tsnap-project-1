import { DataTypes as TYPES } from "../../../actionTypes";
import { SetDataAction, ResetDataAction } from "../../../actions";
import { Data } from "../../../../interfaces";

export const setData = (data: Data): SetDataAction => ({
  type: TYPES.SET_DATA,
  payload: data,
});

export const resetData = (): ResetDataAction => ({
  type: TYPES.RESET_DATA,
});
